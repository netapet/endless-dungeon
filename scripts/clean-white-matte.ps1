param(
  [Parameter(Mandatory)][string]$InputPath,
  [Parameter(Mandatory)][string]$OutputPath,
  [int]$Width = 1024,
  [int]$Height = 1024
)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
public static class WhiteMatteCleaner {
  public static void Clean(Bitmap bitmap) {
    var rect = new Rectangle(0, 0, bitmap.Width, bitmap.Height);
    var data = bitmap.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
    try {
      int stride = Math.Abs(data.Stride);
      byte[] pixels = new byte[stride * bitmap.Height];
      Marshal.Copy(data.Scan0, pixels, 0, pixels.Length);
      for (int y = 0; y < bitmap.Height; y++) for (int x = 0; x < bitmap.Width; x++) {
        int p = y * stride + x * 4;
        int b = pixels[p], g = pixels[p + 1], r = pixels[p + 2];
        int minimum = Math.Min(r, Math.Min(g, b));
        int maximum = Math.Max(r, Math.Max(g, b));
        // Neutral near-white belongs to the matte. Warm ivory bone retains
        // enough colour separation to remain untouched.
        if (minimum >= 218 && maximum - minimum <= 11) {
          double coverage = Math.Max(0, Math.Min(1, (248 - minimum) / 30.0));
          pixels[p + 3] = (byte)Math.Round(pixels[p + 3] * coverage);
        }
      }
      Marshal.Copy(pixels, 0, data.Scan0, pixels.Length);
    } finally { bitmap.UnlockBits(data); }
  }
}
'@
$source = [Drawing.Bitmap]::FromFile((Resolve-Path -LiteralPath $InputPath).Path)
$output = [Drawing.Bitmap]::new($Width, $Height, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
try {
  $graphics = [Drawing.Graphics]::FromImage($output)
  try {
    $graphics.Clear([Drawing.Color]::Transparent)
    $graphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.DrawImage($source, [Drawing.Rectangle]::new(0, 0, $Width, $Height))
  } finally { $graphics.Dispose() }
  [WhiteMatteCleaner]::Clean($output)
  $output.Save($OutputPath, [Drawing.Imaging.ImageFormat]::Png)
} finally { $source.Dispose(); $output.Dispose() }
