param(
  [string]$Source = "assets/themes/umbral-expanse/umbral-mobs-master.png",
  [string]$OutputDirectory = "assets/themes/umbral-expanse"
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$sourcePath = (Resolve-Path -LiteralPath $Source).Path
$workspace = (Resolve-Path -LiteralPath '.').Path
$outputPath = Join-Path $workspace $OutputDirectory
if (-not $outputPath.StartsWith($workspace + [IO.Path]::DirectorySeparatorChar)) {
  throw "Output must remain inside the workspace: $outputPath"
}
[IO.Directory]::CreateDirectory($outputPath) | Out-Null

$regions = @(
  @{ Name='veilborn-shade'; X=0; Y=0; W=397; H=397 },
  @{ Name='eclipse-shrike'; X=397; Y=0; W=396; H=397 },
  @{ Name='singularity-eye'; X=793; Y=0; W=397; H=397 },
  @{ Name='nightcoil-drake'; X=1190; Y=0; W=396; H=397 },
  @{ Name='duskweaver'; X=1586; Y=0; W=397; H=397 },
  @{ Name='void-panther'; X=0; Y=397; W=397; H=396 },
  @{ Name='eclipse-reaper'; X=397; Y=397; W=396; H=396 },
  @{ Name='starless-courser'; X=793; Y=397; W=397; H=396 },
  @{ Name='gloomfin-serpent'; X=1190; Y=397; W=396; H=396 },
  @{ Name='eclipse-spider'; X=1586; Y=397; W=397; H=396 }
)

function Remove-SpriteArtifacts([Drawing.Bitmap]$bitmap) {
  $width = $bitmap.Width; $height = $bitmap.Height
  $visited = [bool[]]::new($width * $height)
  $components = [Collections.Generic.List[object]]::new()
  for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
      $start = $y * $width + $x
      if ($visited[$start] -or $bitmap.GetPixel($x, $y).A -eq 0) { continue }
      $queue = [Collections.Generic.Queue[int]]::new()
      $pixels = [Collections.Generic.List[int]]::new()
      $queue.Enqueue($start); $visited[$start] = $true
      $minX = $width; $maxX = 0; $minY = $height; $maxY = 0
      while ($queue.Count -gt 0) {
        $index = $queue.Dequeue(); $pixels.Add($index)
        $cx = $index % $width; $cy = [Math]::Floor($index / $width)
        $minX = [Math]::Min($minX, $cx); $maxX = [Math]::Max($maxX, $cx)
        $minY = [Math]::Min($minY, $cy); $maxY = [Math]::Max($maxY, $cy)
        foreach ($offset in @(@(-1, 0), @(1, 0), @(0, -1), @(0, 1))) {
          $nx = $cx + $offset[0]; $ny = $cy + $offset[1]
          if ($nx -lt 0 -or $nx -ge $width -or $ny -lt 0 -or $ny -ge $height) { continue }
          $next = $ny * $width + $nx
          if (-not $visited[$next] -and $bitmap.GetPixel($nx, $ny).A -gt 0) {
            $visited[$next] = $true; $queue.Enqueue($next)
          }
        }
      }
      $components.Add([pscustomobject]@{ Pixels=$pixels; Count=$pixels.Count; MinX=$minX; MaxX=$maxX; MinY=$minY; MaxY=$maxY })
    }
  }
  $largest = $components | Sort-Object Count -Descending | Select-Object -First 1
  foreach ($component in $components) {
    $seamFragment = $component -ne $largest -and (
      $component.MinX -le 10 -or $component.MaxX -ge $width - 11 -or
      $component.MinY -le 10 -or $component.MaxY -ge $height - 11
    )
    if ($component.Count -ge 12 -and -not $seamFragment) { continue }
    foreach ($index in $component.Pixels) {
      $px = $index % $width; $py = [Math]::Floor($index / $width)
      $color = $bitmap.GetPixel($px, $py)
      $bitmap.SetPixel($px, $py, [Drawing.Color]::FromArgb(0, $color.R, $color.G, $color.B))
    }
  }
}

$sourceBitmap = [Drawing.Bitmap]::FromFile($sourcePath)
try {
  foreach ($region in $regions) {
    $rect = [Drawing.Rectangle]::new($region.X, $region.Y, $region.W, $region.H)
    $crop = $sourceBitmap.Clone($rect, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
    try {
      $width = $crop.Width
      $height = $crop.Height
      # Remove only the master sheet's bright, near-neutral checker pixels.
      # Do not flood-fill: gradients inside these purple creatures are locally
      # smooth, so connectivity-based removal can travel into a body and leave
      # it hollow or missing.
      for ($y = 0; $y -lt $height; $y++) {
        for ($x = 0; $x -lt $width; $x++) {
          $color = $crop.GetPixel($x, $y)
          $minimum = [Math]::Min($color.R, [Math]::Min($color.G, $color.B))
          $maximum = [Math]::Max($color.R, [Math]::Max($color.G, $color.B))
          if ($minimum -ge 235 -and ($maximum - $minimum) -le 10) {
            $crop.SetPixel($x, $y, [Drawing.Color]::FromArgb(0, $color.R, $color.G, $color.B))
          }
        }
      }

      Remove-SpriteArtifacts $crop

      # The generated master has generous padding. Clear only its outermost
      # two pixels to discard isolated checkerboard flecks at cell seams; no
      # creature silhouette reaches this safety border.
      $cleanup = [Drawing.Graphics]::FromImage($crop)
      try {
        $cleanup.CompositingMode = [Drawing.Drawing2D.CompositingMode]::SourceCopy
        $cleanup.FillRectangle([Drawing.Brushes]::Transparent, 0, 0, $width, 2)
        $cleanup.FillRectangle([Drawing.Brushes]::Transparent, 0, $height - 2, $width, 2)
        $cleanup.FillRectangle([Drawing.Brushes]::Transparent, 0, 0, 2, $height)
        $cleanup.FillRectangle([Drawing.Brushes]::Transparent, $width - 2, 0, 2, $height)
      } finally { $cleanup.Dispose() }

      $destination = Join-Path $outputPath ($region.Name + '.png')
      $crop.Save($destination, [Drawing.Imaging.ImageFormat]::Png)
      Write-Output $destination
    } finally {
      $crop.Dispose()
    }
  }
} finally {
  $sourceBitmap.Dispose()
}

$contactSheet = [Drawing.Bitmap]::new(1200, 760, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [Drawing.Graphics]::FromImage($contactSheet)
try {
  $graphics.Clear([Drawing.Color]::FromArgb(255, 32, 18, 48))
  $graphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  for ($i = 0; $i -lt $regions.Count; $i++) {
    $file = Join-Path $outputPath ($regions[$i].Name + '.png')
    $sprite = [Drawing.Bitmap]::FromFile($file)
    try {
      $column = $i % 5; $row = [Math]::Floor($i / 5)
      $cellX = $column * 240; $cellY = $row * 380
      $scale = [Math]::Min(220 / $sprite.Width, 320 / $sprite.Height)
      $drawWidth = [int]($sprite.Width * $scale); $drawHeight = [int]($sprite.Height * $scale)
      $graphics.DrawImage($sprite, $cellX + [int]((240-$drawWidth)/2), $cellY + 12, $drawWidth, $drawHeight)
      $graphics.DrawString($regions[$i].Name, [Drawing.Font]::new('Arial', 12), [Drawing.Brushes]::White, $cellX + 8, $cellY + 345)
    } finally { $sprite.Dispose() }
  }
  $contactSheet.Save((Join-Path $outputPath '_contact-sheet.png'), [Drawing.Imaging.ImageFormat]::Png)
} finally {
  $graphics.Dispose(); $contactSheet.Dispose()
}
