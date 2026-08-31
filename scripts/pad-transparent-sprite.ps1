param(
  [Parameter(Mandatory)][string]$InputPath,
  [Parameter(Mandatory)][string]$OutputPath,
  [int]$Padding = 64
)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$source = [Drawing.Bitmap]::FromFile((Resolve-Path -LiteralPath $InputPath).Path)
$output = [Drawing.Bitmap]::new($source.Width + $Padding * 2, $source.Height + $Padding * 2, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
try {
  $graphics = [Drawing.Graphics]::FromImage($output)
  try {
    $graphics.Clear([Drawing.Color]::Transparent)
    $graphics.CompositingMode = [Drawing.Drawing2D.CompositingMode]::SourceCopy
    $graphics.DrawImageUnscaled($source, $Padding, $Padding)
  } finally { $graphics.Dispose() }
  $output.Save($OutputPath, [Drawing.Imaging.ImageFormat]::Png)
} finally { $source.Dispose(); $output.Dispose() }
