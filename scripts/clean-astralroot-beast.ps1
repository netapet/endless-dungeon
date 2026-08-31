param(
  [string]$Path = "assets/themes/astralroot-colossus/prismhide-beast.png"
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$resolved = (Resolve-Path -LiteralPath $Path).Path
$workspace = (Resolve-Path -LiteralPath '.').Path
if (-not $resolved.StartsWith($workspace + [IO.Path]::DirectorySeparatorChar)) { throw 'Unsafe sprite path' }

$source = [Drawing.Bitmap]::FromFile($resolved)
try {
  $clean = [Drawing.Bitmap]::new($source.Width, $source.Height, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
  for ($y = 0; $y -lt $source.Height; $y++) {
    for ($x = 0; $x -lt $source.Width; $x++) {
      $pixel = $source.GetPixel($x, $y)
      $maximum = [Math]::Max($pixel.R, [Math]::Max($pixel.G, $pixel.B))
      $minimum = [Math]::Min($pixel.R, [Math]::Min($pixel.G, $pixel.B))
      $range = $maximum - $minimum
      $checker = $minimum -ge 205 -and $range -le 34
      $floorBand = $y -ge [int]($source.Height * 0.76)
      $paleFloor = $floorBand -and $pixel.B -ge 82 -and $pixel.R -ge 48 -and $pixel.G -ge 52 -and $range -le 72
      $faintFloor = $floorBand -and $maximum -lt 95 -and $range -lt 28
      $betweenFrontPaws = $y -ge [int]($source.Height * 0.77) -and $x -ge 62 -and $x -le 102
      $betweenRearPaws = $y -ge [int]($source.Height * 0.76) -and $x -ge 138 -and $x -le 218
      $belowFeet = $y -ge [int]($source.Height * 0.94)
      if ($checker -or $paleFloor -or $faintFloor -or $betweenFrontPaws -or $betweenRearPaws -or $belowFeet) {
        $clean.SetPixel($x, $y, [Drawing.Color]::FromArgb(0, $pixel.R, $pixel.G, $pixel.B))
      } else {
        $clean.SetPixel($x, $y, $pixel)
      }
    }
  }
  $source.Dispose()
  $source = $null
  $clean.Save($resolved, [Drawing.Imaging.ImageFormat]::Png)
  $clean.Dispose()
} finally {
  if ($source) { $source.Dispose() }
}
