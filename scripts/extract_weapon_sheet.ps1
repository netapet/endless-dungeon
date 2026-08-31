$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$sourcePath = (Resolve-Path -LiteralPath 'assets\player\weapons\weapons.png').Path
$outputDirectory = Join-Path (Resolve-Path -LiteralPath 'assets\player\weapons').Path 'celestial-arsenal'
[IO.Directory]::CreateDirectory($outputDirectory) | Out-Null
$names = @(
  'verdant-oathblade', 'froststar-greatsword', 'inferno-riftblade', 'sunspire-greatsword',
  'violet-eclipse-blade', 'bloodthorn-greatsword', 'stormglass-greatsword',
  'worldvine-greatsword', 'silver-dawnblade', 'void-crown-greatsword'
)

$source = [Drawing.Bitmap]::new($sourcePath)
try {
  for ($index = 0; $index -lt $names.Count; $index++) {
    $left = [Math]::Floor(($source.Width * $index) / 10) + 3
    $right = [Math]::Floor(($source.Width * ($index + 1)) / 10) - 4
    $top = 0
    $bottom = [Math]::Min(359, $source.Height - 1)
    $cropWidth = $right - $left + 1
    $cropHeight = $bottom - $top + 1
    $cutout = [Drawing.Bitmap]::new($cropWidth, $cropHeight, [Drawing.Imaging.PixelFormat]::Format32bppArgb)

    for ($y = 0; $y -lt $cropHeight; $y++) {
      $edgeLeft = $source.GetPixel($left, $top + $y)
      $edgeRight = $source.GetPixel($right, $top + $y)
      for ($x = 0; $x -lt $cropWidth; $x++) {
        $pixel = $source.GetPixel($left + $x, $top + $y)
        $mix = $x / [Math]::Max(1, $cropWidth - 1)
        $backgroundR = $edgeLeft.R * (1 - $mix) + $edgeRight.R * $mix
        $backgroundG = $edgeLeft.G * (1 - $mix) + $edgeRight.G * $mix
        $backgroundB = $edgeLeft.B * (1 - $mix) + $edgeRight.B * $mix
        $distance = [Math]::Sqrt(
          [Math]::Pow($pixel.R - $backgroundR, 2) +
          [Math]::Pow($pixel.G - $backgroundG, 2) +
          [Math]::Pow($pixel.B - $backgroundB, 2)
        )
        # The source has broad painted glows. A firm matte threshold removes
        # those gradients while retaining the sharper, high-contrast weapon.
        $alpha = [Math]::Round([Math]::Max(0, [Math]::Min(255, ($distance - 36) * 9.5)))
        if ($x -lt 2 -or $x -ge $cropWidth - 2) { $alpha = 0 }
        $cutout.SetPixel($x, $y, [Drawing.Color]::FromArgb($alpha, $pixel.R, $pixel.G, $pixel.B))
      }
    }

    $output = [Drawing.Bitmap]::new(512, 1024, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $graphics = [Drawing.Graphics]::FromImage($output)
    try {
      $graphics.Clear([Drawing.Color]::Transparent)
      $graphics.CompositingMode = [Drawing.Drawing2D.CompositingMode]::SourceCopy
      $graphics.CompositingQuality = [Drawing.Drawing2D.CompositingQuality]::HighQuality
      $graphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::HighQuality
      $scale = [Math]::Min(464 / $cropWidth, 976 / $cropHeight)
      $drawWidth = [Math]::Round($cropWidth * $scale)
      $drawHeight = [Math]::Round($cropHeight * $scale)
      $drawX = [Math]::Round((512 - $drawWidth) / 2)
      $drawY = [Math]::Round((1024 - $drawHeight) / 2)
      $graphics.DrawImage($cutout, $drawX, $drawY, $drawWidth, $drawHeight)
    } finally {
      $graphics.Dispose()
      $cutout.Dispose()
    }
    try {
      $path = Join-Path $outputDirectory ($names[$index] + '.png')
      $output.Save($path, [Drawing.Imaging.ImageFormat]::Png)
    } finally {
      $output.Dispose()
    }
  }
} finally {
  $source.Dispose()
}
