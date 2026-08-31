$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$source = [Drawing.Bitmap]::new((Resolve-Path 'assets\protectors\enemies.png').Path)
$outputRoot = Join-Path (Resolve-Path 'assets\enemies').Path 'sheet-additions'
[IO.Directory]::CreateDirectory($outputRoot) | Out-Null
$sprites = @(
  @{ Name='bone-shieldbearer'; X=0; Y=0; W=150; H=190 },
  @{ Name='frost-direwolf'; X=485; Y=195; W=160; H=145 },
  @{ Name='cinder-imp-1'; X=0; Y=345; W=112; H=138 },
  @{ Name='cinder-imp-2'; X=130; Y=345; W=98; H=138 },
  @{ Name='amethyst-colossus'; X=525; Y=505; W=145; H=150 },
  @{ Name='abyss-jelly'; X=1120; Y=940; W=104; H=145 }
)

try {
  foreach ($sprite in $sprites) {
    $rect = [Drawing.Rectangle]::new($sprite.X, $sprite.Y, $sprite.W, $sprite.H)
    $crop = $source.Clone($rect, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
    for ($y = 0; $y -lt $crop.Height; $y++) {
      for ($x = 0; $x -lt $crop.Width; $x++) {
        $pixel = $crop.GetPixel($x, $y)
        if ($pixel.A -lt 48) {
          $crop.SetPixel($x, $y, [Drawing.Color]::FromArgb(0, $pixel.R, $pixel.G, $pixel.B))
        }
      }
    }
    $output = [Drawing.Bitmap]::new(512, 512, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $graphics = [Drawing.Graphics]::FromImage($output)
    try {
      $graphics.Clear([Drawing.Color]::Transparent)
      $graphics.CompositingMode = [Drawing.Drawing2D.CompositingMode]::SourceCopy
      $graphics.CompositingQuality = [Drawing.Drawing2D.CompositingQuality]::HighQuality
      $graphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::HighQuality
      $scale = [Math]::Min(452 / $crop.Width, 452 / $crop.Height)
      $width = [Math]::Round($crop.Width * $scale)
      $height = [Math]::Round($crop.Height * $scale)
      $x = [Math]::Round((512 - $width) / 2)
      $y = [Math]::Round((512 - $height) / 2)
      $graphics.DrawImage($crop, $x, $y, $width, $height)
    } finally {
      $graphics.Dispose()
      $crop.Dispose()
    }
    try {
      $output.Save((Join-Path $outputRoot ($sprite.Name + '.png')), [Drawing.Imaging.ImageFormat]::Png)
    } finally {
      $output.Dispose()
    }
  }
} finally {
  $source.Dispose()
}
