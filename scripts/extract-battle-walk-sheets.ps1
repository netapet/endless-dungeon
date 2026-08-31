param([switch]$OnlyBow, [switch]$OnlyOxenScale, [switch]$OnlyOxen, [switch]$OnlyDog)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies 'System.Drawing' -TypeDefinition @'
using System;
using System.Collections.Generic;
using System.Drawing;

public static class WalkSheetCleaner {
  public static Rectangle GetAlphaBounds(Bitmap image) {
    int minX = image.Width, minY = image.Height, maxX = -1, maxY = -1;
    for (int y = 0; y < image.Height; y++) for (int x = 0; x < image.Width; x++) {
      if (image.GetPixel(x, y).A <= 8) continue;
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
    return maxX < minX ? Rectangle.Empty : Rectangle.FromLTRB(minX, minY, maxX + 1, maxY + 1);
  }

  public static void KeepCentralComponent(Bitmap image, int centerX, int centerY) {
    int width = image.Width, height = image.Height;
    var visited = new bool[width * height];
    List<int> best = null;
    double bestScore = -1;
    for (int y = 0; y < height; y++) for (int x = 0; x < width; x++) {
      int start = y * width + x;
      if (visited[start] || image.GetPixel(x, y).A <= 24) continue;
      var component = new List<int>();
      var queue = new Queue<int>();
      visited[start] = true; queue.Enqueue(start);
      long sumX = 0, sumY = 0;
      while (queue.Count > 0) {
        int key = queue.Dequeue(); component.Add(key);
        int px = key % width, py = key / width; sumX += px; sumY += py;
        int[] nextKeys = { key - 1, key + 1, key - width, key + width };
        foreach (int next in nextKeys) {
          if (next < 0 || next >= width * height || visited[next]) continue;
          int nx = next % width, ny = next / width;
          if (Math.Abs(nx - px) + Math.Abs(ny - py) != 1) continue;
          visited[next] = true;
          if (image.GetPixel(nx, ny).A > 24) queue.Enqueue(next);
        }
      }
      double cx = (double)sumX / component.Count, cy = (double)sumY / component.Count;
      double distance = Math.Sqrt((cx - centerX) * (cx - centerX) + (cy - centerY) * (cy - centerY));
      double score = component.Count / (1.0 + distance * 0.18);
      if (score > bestScore) { bestScore = score; best = component; }
    }
    var keep = new bool[width * height];
    if (best != null) foreach (int key in best) keep[key] = true;
    for (int y = 0; y < height; y++) for (int x = 0; x < width; x++)
      if (!keep[y * width + x]) image.SetPixel(x, y, Color.Transparent);
  }
}
'@

function Normalize-WalkFrames {
  param([string[]]$Directories, [int]$Padding = 18)
  $files = @($Directories | ForEach-Object { Get-ChildItem -LiteralPath $_ -Filter 'walk-*.png' | Where-Object { $_.Name -notlike '*.normalized.png' } } | Sort-Object FullName)
  $boundsByPath = @{}
  $maxWidth = 0; $maxHeight = 0
  foreach ($file in $files) {
    $bitmap = [Drawing.Bitmap]::FromFile($file.FullName)
    try {
      $bounds = [WalkSheetCleaner]::GetAlphaBounds($bitmap)
      $boundsByPath[$file.FullName] = $bounds
      $maxWidth = [Math]::Max($maxWidth, $bounds.Width)
      $maxHeight = [Math]::Max($maxHeight, $bounds.Height)
    } finally { $bitmap.Dispose() }
  }
  $padding = $Padding
  foreach ($file in $files) {
    $bitmap = [Drawing.Bitmap]::FromFile($file.FullName)
    try {
      $bounds = $boundsByPath[$file.FullName]
      $normalized = [Drawing.Bitmap]::new($maxWidth + $padding * 2, $maxHeight + $padding * 2, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
      try {
        $graphics = [Drawing.Graphics]::FromImage($normalized)
        try {
          $graphics.Clear([Drawing.Color]::Transparent)
          $x = $padding + [int](($maxWidth - $bounds.Width) / 2)
          $y = $padding + [int](($maxHeight - $bounds.Height) / 2)
          $graphics.DrawImage($bitmap, [Drawing.Rectangle]::new($x, $y, $bounds.Width, $bounds.Height), $bounds, [Drawing.GraphicsUnit]::Pixel)
        } finally { $graphics.Dispose() }
        $normalized.Save($file.FullName + '.normalized.png', [Drawing.Imaging.ImageFormat]::Png)
      } finally { $normalized.Dispose() }
    } finally { $bitmap.Dispose() }
    Move-Item -LiteralPath ($file.FullName + '.normalized.png') -Destination $file.FullName -Force
  }
  Write-Output "Normalized $($files.Count) frames to $($maxWidth + $padding * 2)x$($maxHeight + $padding * 2)"
}

function Match-OxenContinuationScale {
  $files = Get-ChildItem -LiteralPath 'assets\protectors\oxen-walk-2' -Filter 'walk-??.png'
  foreach ($file in $files) {
    $bitmap = [Drawing.Bitmap]::FromFile($file.FullName)
    try {
      $bounds = [WalkSheetCleaner]::GetAlphaBounds($bitmap)
      $scale = [Math]::Min(1.2, [Math]::Min(($bitmap.Width - 24) / $bounds.Width, ($bitmap.Height - 24) / $bounds.Height))
      $width = [int][Math]::Round($bounds.Width * $scale)
      $height = [int][Math]::Round($bounds.Height * $scale)
      $output = [Drawing.Bitmap]::new($bitmap.Width, $bitmap.Height, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
      try {
        $graphics = [Drawing.Graphics]::FromImage($output)
        try {
          $graphics.Clear([Drawing.Color]::Transparent)
          $graphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
          $graphics.PixelOffsetMode = [Drawing.Drawing2D.PixelOffsetMode]::HighQuality
          $graphics.DrawImage($bitmap, [Drawing.Rectangle]::new([int](($bitmap.Width - $width) / 2), [int](($bitmap.Height - $height) / 2), $width, $height), $bounds, [Drawing.GraphicsUnit]::Pixel)
        } finally { $graphics.Dispose() }
        $output.Save($file.FullName + '.scaled.png', [Drawing.Imaging.ImageFormat]::Png)
      } finally { $output.Dispose() }
    } finally { $bitmap.Dispose() }
    Move-Item -LiteralPath ($file.FullName + '.scaled.png') -Destination $file.FullName -Force
  }
  Write-Output "Matched 25 continuation frames to the original oxen body scale."
}

if ($OnlyOxenScale) {
  Match-OxenContinuationScale
  return
}

function Export-WalkSheet {
  param(
    [string]$InputPath,
    [string]$OutputDirectory,
    [int]$Columns,
    [int]$Rows,
    [bool]$UseBleed = $true
  )
  $workspace = (Resolve-Path -LiteralPath '.').Path
  $sourcePath = (Resolve-Path -LiteralPath $InputPath -ErrorAction Stop).Path
  $outputPath = [IO.Path]::GetFullPath((Join-Path $workspace $OutputDirectory))
  if (-not $outputPath.StartsWith($workspace + [IO.Path]::DirectorySeparatorChar)) { throw "Unsafe output path: $outputPath" }
  [IO.Directory]::CreateDirectory($outputPath) | Out-Null
  $padding = 12
  $scale = 2
  $source = [Drawing.Bitmap]::FromFile($sourcePath)
  try {
    $baseCellWidth = [int][Math]::Ceiling($source.Width / $Columns)
    $baseCellHeight = [int][Math]::Ceiling($source.Height / $Rows)
    $bleedX = if ($UseBleed) { [int][Math]::Ceiling($baseCellWidth * 0.35) } else { 0 }
    $bleedY = if ($UseBleed) { [int][Math]::Ceiling($baseCellHeight * 0.45) } else { 0 }
    $workingWidth = $baseCellWidth + $bleedX * 2
    $workingHeight = $baseCellHeight + $bleedY * 2
    $cellCanvasWidth = $workingWidth * $scale + $padding * 2
    $cellCanvasHeight = $workingHeight * $scale + $padding * 2
    $frame = 0
    for ($row = 0; $row -lt $Rows; $row += 1) {
      $top = [int][Math]::Floor($row * $source.Height / $Rows)
      $bottom = [int][Math]::Floor(($row + 1) * $source.Height / $Rows)
      for ($column = 0; $column -lt $Columns; $column += 1) {
        $left = [int][Math]::Floor($column * $source.Width / $Columns)
        $right = [int][Math]::Floor(($column + 1) * $source.Width / $Columns)
        $cropLeft = [Math]::Max(0, $left - $bleedX)
        $cropTop = [Math]::Max(0, $top - $bleedY)
        $cropRight = [Math]::Min($source.Width, $right + $bleedX)
        $cropBottom = [Math]::Min($source.Height, $bottom + $bleedY)
        $cellWidth = $cropRight - $cropLeft
        $cellHeight = $cropBottom - $cropTop
        $working = [Drawing.Bitmap]::new($workingWidth, $workingHeight, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
        try {
          $workingGraphics = [Drawing.Graphics]::FromImage($working)
          try {
            $workingGraphics.Clear([Drawing.Color]::Transparent)
            $offsetX = $cropLeft - ($left - $bleedX)
            $offsetY = $cropTop - ($top - $bleedY)
            $workingGraphics.DrawImage($source, [Drawing.Rectangle]::new($offsetX, $offsetY, $cellWidth, $cellHeight), [Drawing.Rectangle]::new($cropLeft, $cropTop, $cellWidth, $cellHeight), [Drawing.GraphicsUnit]::Pixel)
          } finally { $workingGraphics.Dispose() }
          [WalkSheetCleaner]::KeepCentralComponent($working, $bleedX + [int](($right - $left) / 2), $bleedY + [int](($bottom - $top) / 2))
        $output = [Drawing.Bitmap]::new($cellCanvasWidth, $cellCanvasHeight, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
        try {
          $graphics = [Drawing.Graphics]::FromImage($output)
          try {
            $graphics.Clear([Drawing.Color]::Transparent)
            $graphics.CompositingMode = [Drawing.Drawing2D.CompositingMode]::SourceCopy
            $graphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graphics.PixelOffsetMode = [Drawing.Drawing2D.PixelOffsetMode]::HighQuality
            $graphics.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::HighQuality
            $destination = [Drawing.Rectangle]::new($padding, $padding, $workingWidth * $scale, $workingHeight * $scale)
            $graphics.DrawImage($working, $destination, [Drawing.Rectangle]::new(0, 0, $workingWidth, $workingHeight), [Drawing.GraphicsUnit]::Pixel)
          } finally { $graphics.Dispose() }
          $frame += 1
          $output.Save((Join-Path $outputPath ('walk-{0:d2}.png' -f $frame)), [Drawing.Imaging.ImageFormat]::Png)
        } finally { $output.Dispose() }
        } finally { $working.Dispose() }
      }
    }
    Write-Output "Extracted $frame ordered 2x frames from $InputPath to $OutputDirectory"
  } finally { $source.Dispose() }
}

if ($OnlyOxen) {
  Export-WalkSheet 'assets\protectors\oxen walk.png' 'assets\protectors\oxen-walk' 5 4
  Export-WalkSheet 'assets\protectors\oxen walk 2.png' 'assets\protectors\oxen-walk-2' 5 5
  Normalize-WalkFrames @('assets\protectors\oxen-walk', 'assets\protectors\oxen-walk-2') 100
  Match-OxenContinuationScale
  return
}

if ($OnlyDog) {
  Export-WalkSheet 'assets\protectors\dog walk.png' 'assets\protectors\dog-walk' 6 5
  Normalize-WalkFrames @('assets\protectors\dog-walk') 50
  return
}

if (-not $OnlyBow) {
  Export-WalkSheet 'assets\protectors\oxen walk.png' 'assets\protectors\oxen-walk' 5 4
  Export-WalkSheet 'assets\protectors\oxen walk 2.png' 'assets\protectors\oxen-walk-2' 5 5
  Export-WalkSheet 'assets\protectors\roman sword walk.png' 'assets\protectors\roman-sword-walk' 7 3 $false
  Export-WalkSheet 'assets\protectors\roman sword walk 2.png' 'assets\protectors\roman-sword-walk-2' 7 3 $false
  Export-WalkSheet 'assets\protectors\horse walk.png' 'assets\protectors\horse-walk' 6 5
  Normalize-WalkFrames @('assets\protectors\oxen-walk', 'assets\protectors\oxen-walk-2') 100
  Match-OxenContinuationScale
  Normalize-WalkFrames @('assets\protectors\roman-sword-walk', 'assets\protectors\roman-sword-walk-2')
  Normalize-WalkFrames @('assets\protectors\horse-walk')
}
Export-WalkSheet 'assets\protectors\bow walk.png' 'assets\protectors\bow-walk' 9 5
Normalize-WalkFrames @('assets\protectors\bow-walk')
Export-WalkSheet 'assets\protectors\dog walk.png' 'assets\protectors\dog-walk' 6 5
Normalize-WalkFrames @('assets\protectors\dog-walk') 50
