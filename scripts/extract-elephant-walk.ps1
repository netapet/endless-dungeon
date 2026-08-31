param(
  [string]$InputPath = 'assets\protectors\elaphant walk.png',
  [string]$OutputDirectory = 'assets\protectors\elephant-walk'
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$sourcePath = (Resolve-Path -LiteralPath $InputPath -ErrorAction Stop).Path
$workspace = (Resolve-Path -LiteralPath '.').Path
$outputPath = [IO.Path]::GetFullPath((Join-Path $workspace $OutputDirectory))
if (-not $outputPath.StartsWith($workspace + [IO.Path]::DirectorySeparatorChar)) { throw "Unsafe output directory: $outputPath" }
[IO.Directory]::CreateDirectory($outputPath) | Out-Null

$columns = 5
$rows = 4
$padding = 8
$frontTrim = 10
$source = [Drawing.Bitmap]::FromFile($sourcePath)
$canvasWidth = [int][Math]::Ceiling($source.Width / $columns) + $padding * 2
$canvasHeight = [int][Math]::Ceiling($source.Height / $rows) + $padding * 2
try {
  $frame = 0
  for ($row = 0; $row -lt $rows; $row += 1) {
    $top = [int][Math]::Floor($row * $source.Height / $rows)
    $bottom = [int][Math]::Floor(($row + 1) * $source.Height / $rows)
    for ($column = 0; $column -lt $columns; $column += 1) {
      $left = [int][Math]::Floor($column * $source.Width / $columns)
      $right = [int][Math]::Floor(($column + 1) * $source.Width / $columns)
      $cellWidth = $right - $left
      $cellHeight = $bottom - $top
      $output = [Drawing.Bitmap]::new($canvasWidth, $canvasHeight, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
      try {
        $graphics = [Drawing.Graphics]::FromImage($output)
        try {
          $graphics.Clear([Drawing.Color]::Transparent)
          $graphics.CompositingMode = [Drawing.Drawing2D.CompositingMode]::SourceCopy
          $destinationX = $padding + [int][Math]::Floor(($canvasWidth - $padding * 2 - $cellWidth) / 2)
          $destinationY = $padding + [int][Math]::Floor(($canvasHeight - $padding * 2 - $cellHeight) / 2)
          $graphics.DrawImage(
            $source,
            [Drawing.Rectangle]::new($destinationX, $destinationY, $cellWidth, $cellHeight),
            [Drawing.Rectangle]::new($left, $top, $cellWidth, $cellHeight),
            [Drawing.GraphicsUnit]::Pixel
          )
          # The generated sheet lets a thin piece of the following elephant
          # cross into the front/right edge of each cell. Clear only that
          # contaminated strip while preserving the frame's stable canvas.
          $graphics.CompositingMode = [Drawing.Drawing2D.CompositingMode]::SourceCopy
          $graphics.FillRectangle(
            [Drawing.Brushes]::Transparent,
            $destinationX + $cellWidth - $frontTrim,
            $destinationY,
            $frontTrim,
            $cellHeight
          )
        } finally { $graphics.Dispose() }
        $frame += 1
        $output.Save((Join-Path $outputPath ('walk-{0:d2}.png' -f $frame)), [Drawing.Imaging.ImageFormat]::Png)
      } finally { $output.Dispose() }
    }
  }
} finally { $source.Dispose() }

Write-Output "Extracted $frame elephant frames to $outputPath ($canvasWidth x $canvasHeight each)."
