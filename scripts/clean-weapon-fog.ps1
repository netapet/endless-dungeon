param(
    [Parameter(Mandatory = $true)]
    [string] $InputPath,

    [Parameter(Mandatory = $true)]
    [string] $OutputPath,

    [int] $CoreAlpha = 220,
    [int] $EdgeRadius = 4
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$inputFile = (Resolve-Path -LiteralPath $InputPath).Path
$outputFile = [IO.Path]::GetFullPath((Join-Path (Get-Location) $OutputPath))
$workspace = [IO.Path]::GetFullPath((Get-Location).Path)
if (-not $outputFile.StartsWith($workspace + [IO.Path]::DirectorySeparatorChar)) {
    throw "Output must be inside the workspace: $outputFile"
}

$source = [Drawing.Bitmap]::FromFile($inputFile)
try {
    $width = $source.Width
    $height = $source.Height
    $core = New-Object 'bool[,]' $width, $height

    for ($y = 0; $y -lt $height; $y++) {
        for ($x = 0; $x -lt $width; $x++) {
            $core[$x, $y] = $source.GetPixel($x, $y).A -ge $CoreAlpha
        }
    }

    $clean = New-Object Drawing.Bitmap $width, $height, ([Drawing.Imaging.PixelFormat]::Format32bppArgb)
    try {
        for ($y = 0; $y -lt $height; $y++) {
            for ($x = 0; $x -lt $width; $x++) {
                $pixel = $source.GetPixel($x, $y)
                $keep = $false
                $minY = [Math]::Max(0, $y - $EdgeRadius)
                $maxY = [Math]::Min($height - 1, $y + $EdgeRadius)
                $minX = [Math]::Max(0, $x - $EdgeRadius)
                $maxX = [Math]::Min($width - 1, $x + $EdgeRadius)
                for ($nearY = $minY; $nearY -le $maxY -and -not $keep; $nearY++) {
                    for ($nearX = $minX; $nearX -le $maxX; $nearX++) {
                        $dx = $nearX - $x
                        $dy = $nearY - $y
                        if (($dx * $dx + $dy * $dy) -le ($EdgeRadius * $EdgeRadius) -and $core[$nearX, $nearY]) {
                            $keep = $true
                            break
                        }
                    }
                }

                if ($keep) {
                    $clean.SetPixel($x, $y, $pixel)
                } else {
                    $clean.SetPixel($x, $y, [Drawing.Color]::Transparent)
                }
            }
        }

        $directory = [IO.Path]::GetDirectoryName($outputFile)
        if (-not [IO.Directory]::Exists($directory)) {
            [IO.Directory]::CreateDirectory($directory) | Out-Null
        }
        $clean.Save($outputFile, [Drawing.Imaging.ImageFormat]::Png)
    } finally {
        $clean.Dispose()
    }
} finally {
    $source.Dispose()
}
