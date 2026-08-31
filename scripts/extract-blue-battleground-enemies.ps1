$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public static class BlueLegionSpriteEnhancer {
  private static byte Clamp(double value) {
    return (byte)Math.Max(0, Math.Min(255, Math.Round(value)));
  }

  public static void ClearBorderBackground(Bitmap bitmap) {
    Rectangle bounds = new Rectangle(0, 0, bitmap.Width, bitmap.Height);
    BitmapData data = bitmap.LockBits(bounds, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
    int stride = Math.Abs(data.Stride);
    byte[] pixels = new byte[stride * bitmap.Height];
    Marshal.Copy(data.Scan0, pixels, 0, pixels.Length);
    bool[] visited = new bool[bitmap.Width * bitmap.Height];
    int[] queue = new int[visited.Length];
    int head = 0, tail = 0;

    Action<int, int> enqueue = (x, y) => {
      int position = y * bitmap.Width + x;
      if (visited[position]) return;
      int pixel = y * stride + x * 4;
      int brightest = Math.Max(pixels[pixel], Math.Max(pixels[pixel + 1], pixels[pixel + 2]));
      if (brightest > 24) return;
      visited[position] = true;
      queue[tail++] = position;
    };

    for (int x = 0; x < bitmap.Width; x++) { enqueue(x, 0); enqueue(x, bitmap.Height - 1); }
    for (int y = 0; y < bitmap.Height; y++) { enqueue(0, y); enqueue(bitmap.Width - 1, y); }
    while (head < tail) {
      int position = queue[head++];
      int x = position % bitmap.Width, y = position / bitmap.Width;
      int pixel = y * stride + x * 4;
      pixels[pixel + 3] = 0;
      if (x > 0) enqueue(x - 1, y);
      if (x + 1 < bitmap.Width) enqueue(x + 1, y);
      if (y > 0) enqueue(x, y - 1);
      if (y + 1 < bitmap.Height) enqueue(x, y + 1);
    }

    Marshal.Copy(pixels, 0, data.Scan0, pixels.Length);
    bitmap.UnlockBits(data);
  }

  public static void Enhance(Bitmap bitmap) {
    Rectangle bounds = new Rectangle(0, 0, bitmap.Width, bitmap.Height);
    BitmapData data = bitmap.LockBits(bounds, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
    int stride = Math.Abs(data.Stride);
    byte[] source = new byte[stride * bitmap.Height];
    byte[] output = new byte[source.Length];
    Marshal.Copy(data.Scan0, source, 0, source.Length);
    Buffer.BlockCopy(source, 0, output, 0, source.Length);

    for (int y = 1; y < bitmap.Height - 1; y++) {
      for (int x = 1; x < bitmap.Width - 1; x++) {
        int index = y * stride + x * 4;
        byte alpha = source[index + 3];
        if (alpha < 20) continue;

        int[] neighbours = { index - 4, index + 4, index - stride, index + stride };
        for (int channel = 0; channel < 3; channel++) {
          double centre = source[index + channel];
          double neighbourTotal = 0;
          int neighbourCount = 0;
          foreach (int neighbour in neighbours) {
            // Substituting the centre colour at transparent edges prevents dark outlines.
            if (source[neighbour + 3] >= 20) {
              neighbourTotal += source[neighbour + channel];
              neighbourCount++;
            }
          }
          double average = neighbourCount > 0 ? neighbourTotal / neighbourCount : centre;
          double sharpened = centre + 0.38 * (centre - average);
          double contrasted = (sharpened - 128.0) * 1.035 + 128.0;
          output[index + channel] = Clamp(contrasted);
        }
      }
    }

    Marshal.Copy(output, 0, data.Scan0, output.Length);
    bitmap.UnlockBits(data);
  }
}
'@

$workspace = (Resolve-Path -LiteralPath '.').Path
$sheets = @(
  @{ Name = 'blue-elephant'; File = 'blue elephant.png'; Columns = 5; Rows = 4 },
  @{ Name = 'blue-bow'; File = 'blue bow.png'; Columns = 8; Rows = 5 },
  @{ Name = 'blue-dog'; File = 'blue dog.png'; Columns = 6; Rows = 5 },
  @{ Name = 'blue-sword'; File = 'blue sword.png'; Columns = 7; Rows = 4 },
  @{ Name = 'blue-oxen'; File = 'blue oxen.png'; Columns = 5; Rows = 5 },
  @{ Name = 'blue-horse'; File = 'blue horse.png'; Columns = 5; Rows = 4 }
)

foreach ($sheet in $sheets) {
  $sourcePath = (Resolve-Path -LiteralPath (Join-Path 'assets\protectors' $sheet.File)).Path
  $outputPath = [IO.Path]::GetFullPath((Join-Path $workspace (Join-Path 'assets\enemies\blue-legion' $sheet.Name)))
  if (-not $outputPath.StartsWith($workspace + [IO.Path]::DirectorySeparatorChar)) { throw "Unsafe output path: $outputPath" }
  [IO.Directory]::CreateDirectory($outputPath) | Out-Null
  $source = [Drawing.Bitmap]::FromFile($sourcePath)
  try {
    $frame = 0
    for ($row = 0; $row -lt $sheet.Rows; $row += 1) {
      $top = [int][Math]::Floor($row * $source.Height / $sheet.Rows)
      $bottom = [int][Math]::Floor(($row + 1) * $source.Height / $sheet.Rows)
      for ($column = 0; $column -lt $sheet.Columns; $column += 1) {
        $left = [int][Math]::Floor($column * $source.Width / $sheet.Columns)
        $right = [int][Math]::Floor(($column + 1) * $source.Width / $sheet.Columns)
        $width = $right - $left; $height = $bottom - $top
        $output = [Drawing.Bitmap]::new($width * 2, $height * 2, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
        try {
          $graphics = [Drawing.Graphics]::FromImage($output)
          try {
            $graphics.Clear([Drawing.Color]::Transparent)
            $graphics.CompositingMode = [Drawing.Drawing2D.CompositingMode]::SourceCopy
            $graphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graphics.PixelOffsetMode = [Drawing.Drawing2D.PixelOffsetMode]::HighQuality
            $graphics.DrawImage($source, [Drawing.Rectangle]::new(0, 0, $width * 2, $height * 2), [Drawing.Rectangle]::new($left, $top, $width, $height), [Drawing.GraphicsUnit]::Pixel)
          } finally { $graphics.Dispose() }
          [BlueLegionSpriteEnhancer]::ClearBorderBackground($output)
          [BlueLegionSpriteEnhancer]::Enhance($output)
          $frame += 1
          $output.Save((Join-Path $outputPath ('frame-{0:d2}.png' -f $frame)), [Drawing.Imaging.ImageFormat]::Png)
        } finally { $output.Dispose() }
      }
    }
    Write-Output "Extracted $frame frames for $($sheet.Name)."
  } finally { $source.Dispose() }
}
