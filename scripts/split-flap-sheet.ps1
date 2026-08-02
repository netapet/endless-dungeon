param(
  [Parameter(Mandatory = $true)][string]$InputPath,
  [Parameter(Mandatory = $true)][string]$OutputPrefix
)

Add-Type -AssemblyName System.Drawing
$source = [System.Drawing.Bitmap]::FromFile((Resolve-Path -LiteralPath $InputPath).Path)
$frameWidth = [int]($source.Width / 3)
$names = @('up', 'middle', 'down')
for ($index = 0; $index -lt 3; $index += 1) {
  $frame = New-Object System.Drawing.Bitmap $frameWidth, $source.Height
  $graphics = [System.Drawing.Graphics]::FromImage($frame)
  $destination = New-Object System.Drawing.Rectangle 0, 0, $frameWidth, $source.Height
  $region = New-Object System.Drawing.Rectangle ($index * $frameWidth), 0, $frameWidth, $source.Height
  $graphics.DrawImage($source, $destination, $region, [System.Drawing.GraphicsUnit]::Pixel)
  $graphics.Dispose()
  $frame.Save("$OutputPrefix-$($names[$index])-source.png", [System.Drawing.Imaging.ImageFormat]::Png)
  $frame.Dispose()
}
$source.Dispose()
