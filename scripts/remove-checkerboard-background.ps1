param(
  [Parameter(Mandatory = $true)]
  [string]$InputPath,
  [Parameter(Mandatory = $true)]
  [string]$OutputPath
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$source = [System.Drawing.Bitmap]::FromFile((Resolve-Path -LiteralPath $InputPath).Path)
$result = New-Object System.Drawing.Bitmap($source.Width, $source.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($result)
$graphics.DrawImageUnscaled($source, 0, 0)
$graphics.Dispose()
$source.Dispose()

$visited = New-Object 'bool[,]' $result.Width, $result.Height
$queue = New-Object 'System.Collections.Generic.Queue[System.Drawing.Point]'
foreach ($point in @(
  [System.Drawing.Point]::new(0, 0),
  [System.Drawing.Point]::new($result.Width - 1, 0),
  [System.Drawing.Point]::new(0, $result.Height - 1),
  [System.Drawing.Point]::new($result.Width - 1, $result.Height - 1)
)) {
  $queue.Enqueue($point)
}

while ($queue.Count -gt 0) {
  $point = $queue.Dequeue()
  if ($point.X -lt 0 -or $point.Y -lt 0 -or $point.X -ge $result.Width -or $point.Y -ge $result.Height) { continue }
  if ($visited[$point.X, $point.Y]) { continue }
  $visited[$point.X, $point.Y] = $true
  $color = $result.GetPixel($point.X, $point.Y)
  $highest = [Math]::Max($color.R, [Math]::Max($color.G, $color.B))
  $lowest = [Math]::Min($color.R, [Math]::Min($color.G, $color.B))
  if ($lowest -lt 178 -or ($highest - $lowest) -gt 15) { continue }
  $result.SetPixel($point.X, $point.Y, [System.Drawing.Color]::Transparent)
  $queue.Enqueue([System.Drawing.Point]::new($point.X - 1, $point.Y))
  $queue.Enqueue([System.Drawing.Point]::new($point.X + 1, $point.Y))
  $queue.Enqueue([System.Drawing.Point]::new($point.X, $point.Y - 1))
  $queue.Enqueue([System.Drawing.Point]::new($point.X, $point.Y + 1))
}

# Checkerboard pockets can be fully enclosed by capes or cloth tails and are
# therefore unreachable from the canvas edge. Remove only their near-white,
# near-neutral pixels; the dark and strongly coloured armor remains untouched.
for ($y = 0; $y -lt $result.Height; $y += 1) {
  for ($x = 0; $x -lt $result.Width; $x += 1) {
    $color = $result.GetPixel($x, $y)
    $highest = [Math]::Max($color.R, [Math]::Max($color.G, $color.B))
    $lowest = [Math]::Min($color.R, [Math]::Min($color.G, $color.B))
    if ($lowest -ge 220 -and ($highest - $lowest) -le 10) {
      $result.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
    }
  }
}

$destination = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $OutputPath))
$result.Save($destination, [System.Drawing.Imaging.ImageFormat]::Png)
$result.Dispose()
