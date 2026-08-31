$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$jobs = @(
  @{ Source = 'assets\protectors\romans 1-2.png'; Prefix = 'guard'; Start = 1 },
  @{ Source = 'assets\protectors\roman-12-half-clean-sheet.png'; Prefix = 'half'; Start = 1 },
  @{ Source = 'assets\protectors\roman-12-thrust-clean-sheet.png'; Prefix = 'thrust'; Start = 1 },
  @{ Source = 'assets\protectors\romans 3-4.png'; Prefix = 'guard'; Start = 3 },
  @{ Source = 'assets\protectors\roman-34-half-clean-sheet.png'; Prefix = 'half'; Start = 3 },
  @{ Source = 'assets\protectors\roman-34-thrust-clean-sheet.png'; Prefix = 'thrust'; Start = 3 }
)

foreach ($job in $jobs) {
  $sourcePath = (Resolve-Path -LiteralPath $job.Source).Path
  $source = [Drawing.Bitmap]::FromFile($sourcePath)
  try {
    $frameWidth = [Math]::Floor($source.Width / 2)
    for ($column = 0; $column -lt 2; $column += 1) {
      $frame = [Drawing.Bitmap]::new($frameWidth, $source.Height, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
      try {
        $graphics = [Drawing.Graphics]::FromImage($frame)
        try {
          $graphics.CompositingMode = [Drawing.Drawing2D.CompositingMode]::SourceCopy
          $graphics.DrawImage(
            $source,
            [Drawing.Rectangle]::new(0, 0, $frameWidth, $source.Height),
            [Drawing.Rectangle]::new($column * $frameWidth, 0, $frameWidth, $source.Height),
            [Drawing.GraphicsUnit]::Pixel
          )
        } finally {
          $graphics.Dispose()
        }
        $number = $job.Start + $column
        $output = Join-Path (Resolve-Path -LiteralPath 'assets\protectors').Path "roman-$number-$($job.Prefix).png"
        $frame.Save($output, [Drawing.Imaging.ImageFormat]::Png)
      } finally {
        $frame.Dispose()
      }
    }
  } finally {
    $source.Dispose()
  }
}
