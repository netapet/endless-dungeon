param(
  [string]$Source = "assets/attacks.png",
  [string]$OutputDirectory = "assets/effects/attacks"
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$sourcePath = (Resolve-Path -LiteralPath $Source).Path
$workspace = (Resolve-Path -LiteralPath '.').Path
$outputPath = Join-Path $workspace $OutputDirectory
if (-not $outputPath.StartsWith($workspace + [IO.Path]::DirectorySeparatorChar)) { throw 'Unsafe output path' }
[IO.Directory]::CreateDirectory($outputPath) | Out-Null

$regions = @(
  @{ Name='mob-fire-bolt'; X=286; Y=84; W=126; H=66 },
  @{ Name='mob-ice-shard'; X=176; Y=281; W=118; H=120 },
  @{ Name='mob-water-orb'; X=164; Y=539; W=78; H=78 },
  @{ Name='mob-nature-bolt'; X=313; Y=659; W=170; H=75 },
  @{ Name='mob-shadow-bolt'; X=231; Y=870; W=186; H=94 },
  @{ Name='mob-holy-bolt'; X=87; Y=1080; W=212; H=80 },
  @{ Name='mob-arcane-bolt'; X=245; Y=1260; W=206; H=86 },
  @{ Name='boss-fire-pillar'; X=536; Y=105; W=215; H=184 },
  @{ Name='boss-ice-nova'; X=531; Y=281; W=220; H=198 },
  @{ Name='boss-nature-thorns'; X=716; Y=690; W=194; H=181 },
  @{ Name='boss-shadow-gate'; X=435; Y=876; W=124; H=205 },
  @{ Name='boss-holy-star'; X=686; Y=1060; W=158; H=183 },
  @{ Name='boss-arcane-vortex'; X=584; Y=1351; W=214; H=180 }
)

$sourceBitmap = [Drawing.Bitmap]::FromFile($sourcePath)
try {
  foreach ($region in $regions) {
    $rect = [Drawing.Rectangle]::new($region.X, $region.Y, $region.W, $region.H)
    $crop = $sourceBitmap.Clone($rect, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
    try {
      $width=$crop.Width; $height=$crop.Height
      $visited=[bool[]]::new($width*$height)
      $queue=[Collections.Generic.Queue[int]]::new()
      function Add-Seed([int]$x,[int]$y){$i=$y*$width+$x;if(-not $visited[$i]){$visited[$i]=$true;$queue.Enqueue($i)}}
      for($x=0;$x-lt $width;$x++){Add-Seed $x 0;Add-Seed $x ($height-1)}
      for($y=1;$y-lt $height-1;$y++){Add-Seed 0 $y;Add-Seed ($width-1) $y}
      while($queue.Count-gt 0){
        $i=$queue.Dequeue();$x=$i%$width;$y=[Math]::Floor($i/$width)
        $color=$crop.GetPixel($x,$y)
        $crop.SetPixel($x,$y,[Drawing.Color]::FromArgb(0,$color.R,$color.G,$color.B))
        foreach($offset in @(@{X=-1;Y=0},@{X=1;Y=0},@{X=0;Y=-1},@{X=0;Y=1})){
          $nx=$x+$offset.X;$ny=$y+$offset.Y
          if($nx-lt 0-or$nx-ge $width-or$ny-lt 0-or$ny-ge $height){continue}
          $nextIndex=$ny*$width+$nx;if($visited[$nextIndex]){continue}
          $next=$crop.GetPixel($nx,$ny)
          $distance=[Math]::Sqrt([Math]::Pow($color.R-$next.R,2)+[Math]::Pow($color.G-$next.G,2)+[Math]::Pow($color.B-$next.B,2))
          if($distance-le 36){$visited[$nextIndex]=$true;$queue.Enqueue($nextIndex)}
        }
      }
      $destination=Join-Path $outputPath ($region.Name+'.png')
      $crop.Save($destination,[Drawing.Imaging.ImageFormat]::Png)
      Write-Output $destination
    } finally {$crop.Dispose()}
  }
} finally {$sourceBitmap.Dispose()}
