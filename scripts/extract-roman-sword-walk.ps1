param(
  [string]$InputPath = 'assets\protectors\roman sword walk.png',
  [string]$OutputDirectory = 'assets\protectors\roman-sword-walk'
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies 'System.Drawing' -TypeDefinition @'
using System;
using System.Collections.Generic;
using System.Drawing;

public static class RomanWalkCleaner {
  public static void KeepLargestAlphaComponent(Bitmap image) {
    int width = image.Width, height = image.Height;
    var visited = new bool[width * height];
    List<int> largest = null;
    for (int y = 0; y < height; y++) {
      for (int x = 0; x < width; x++) {
        int start = y * width + x;
        if (visited[start] || image.GetPixel(x, y).A <= 2) continue;
        var component = new List<int>();
        var queue = new Queue<int>();
        visited[start] = true;
        queue.Enqueue(start);
        while (queue.Count > 0) {
          int key = queue.Dequeue();
          component.Add(key);
          int px = key % width, py = key / width;
          int[] neighbours = { key - 1, key + 1, key - width, key + width };
          for (int index = 0; index < neighbours.Length; index++) {
            int next = neighbours[index];
            int nx = next % width, ny = next / width;
            if (next < 0 || next >= width * height || Math.Abs(nx - px) + Math.Abs(ny - py) != 1 || visited[next]) continue;
            visited[next] = true;
            if (image.GetPixel(nx, ny).A > 2) queue.Enqueue(next);
          }
        }
        if (largest == null || component.Count > largest.Count) largest = component;
      }
    }
    var keep = new bool[width * height];
    if (largest != null) foreach (int key in largest) keep[key] = true;
    for (int y = 0; y < height; y++) for (int x = 0; x < width; x++) {
      if (!keep[y * width + x]) image.SetPixel(x, y, Color.Transparent);
    }
  }
}
'@
$sourcePath = (Resolve-Path -LiteralPath $InputPath -ErrorAction Stop).Path
$workspace = (Resolve-Path -LiteralPath '.').Path
$outputPath = [IO.Path]::GetFullPath((Join-Path $workspace $OutputDirectory))
if (-not $outputPath.StartsWith($workspace + [IO.Path]::DirectorySeparatorChar)) { throw "Unsafe output directory: $outputPath" }
[IO.Directory]::CreateDirectory($outputPath) | Out-Null

$columns = 7
$rows = 3
$padding = 6
$canvasWidth = [int][Math]::Ceiling((1536 / $columns)) + $padding * 2
$canvasHeight = [int][Math]::Ceiling((1024 / $rows)) + $padding * 2
$source = [Drawing.Bitmap]::FromFile($sourcePath)
try {
  $frame = 0
  for ($row = 0; $row -lt $rows; $row += 1) {
    $sourceTop = [int][Math]::Floor($row * $source.Height / $rows)
    $sourceBottom = [int][Math]::Floor(($row + 1) * $source.Height / $rows)
    for ($column = 0; $column -lt $columns; $column += 1) {
      $sourceLeft = [int][Math]::Floor($column * $source.Width / $columns)
      $sourceRight = [int][Math]::Floor(($column + 1) * $source.Width / $columns)
      $cellWidth = $sourceRight - $sourceLeft
      $cellHeight = $sourceBottom - $sourceTop
      $output = [Drawing.Bitmap]::new($canvasWidth, $canvasHeight, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
      try {
        $graphics = [Drawing.Graphics]::FromImage($output)
        try {
          $graphics.Clear([Drawing.Color]::Transparent)
          $graphics.CompositingMode = [Drawing.Drawing2D.CompositingMode]::SourceCopy
          $destinationX = $padding + [int][Math]::Floor(($canvasWidth - $padding * 2 - $cellWidth) / 2)
          $destinationY = $padding + [int][Math]::Floor(($canvasHeight - $padding * 2 - $cellHeight) / 2)
          $sourceRectangle = [Drawing.Rectangle]::new($sourceLeft, $sourceTop, $cellWidth, $cellHeight)
          $destinationRectangle = [Drawing.Rectangle]::new($destinationX, $destinationY, $cellWidth, $cellHeight)
          $graphics.DrawImage($source, $destinationRectangle, $sourceRectangle, [Drawing.GraphicsUnit]::Pixel)
        } finally { $graphics.Dispose() }
        [RomanWalkCleaner]::KeepLargestAlphaComponent($output)
        $frame += 1
        $filename = 'walk-{0:d2}.png' -f $frame
        $output.Save((Join-Path $outputPath $filename), [Drawing.Imaging.ImageFormat]::Png)
      } finally { $output.Dispose() }
    }
  }
} finally { $source.Dispose() }

Write-Output "Extracted $frame non-overlapping frames to $outputPath ($canvasWidth x $canvasHeight each)."
