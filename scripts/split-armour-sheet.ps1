param(
  [string]$InputPath = 'assets/player/armor/armour.png',
  [string]$OutputDirectory = 'assets/player/armor/sheet-sets'
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public static class ArmorSpriteCleaner {
  public static void KeepLargestAlphaComponent(Bitmap bitmap) {
    Rectangle rect = new Rectangle(0, 0, bitmap.Width, bitmap.Height);
    BitmapData data = bitmap.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
    try {
      int stride = Math.Abs(data.Stride);
      byte[] pixels = new byte[stride * bitmap.Height];
      Marshal.Copy(data.Scan0, pixels, 0, pixels.Length);
      int count = bitmap.Width * bitmap.Height;
      int[] labels = new int[count];
      int[] queue = new int[count];
      int label = 0, largestLabel = 0, largestSize = 0;
      int[] dx = {-1, 0, 1, -1, 1, -1, 0, 1};
      int[] dy = {-1, -1, -1, 0, 0, 1, 1, 1};

      for (int y = 0; y < bitmap.Height; y++) {
        for (int x = 0; x < bitmap.Width; x++) {
          int start = y * bitmap.Width + x;
          if (labels[start] != 0 || pixels[y * stride + x * 4 + 3] < 96) continue;
          label++;
          int head = 0, tail = 0;
          queue[tail++] = start;
          labels[start] = label;
          while (head < tail) {
            int current = queue[head++];
            int cx = current % bitmap.Width, cy = current / bitmap.Width;
            for (int n = 0; n < 8; n++) {
              int nx = cx + dx[n], ny = cy + dy[n];
              if (nx < 0 || ny < 0 || nx >= bitmap.Width || ny >= bitmap.Height) continue;
              int next = ny * bitmap.Width + nx;
              if (labels[next] == 0 && pixels[ny * stride + nx * 4 + 3] >= 96) {
                labels[next] = label;
                queue[tail++] = next;
              }
            }
          }
          if (tail > largestSize) { largestSize = tail; largestLabel = label; }
        }
      }

      // Grow from the solid central silhouette through nearby translucent effects.
      int[] distance = new int[count];
      for (int i = 0; i < count; i++) distance[i] = -1;
      int growHead = 0, growTail = 0;
      for (int i = 0; i < count; i++) {
        if (labels[i] == largestLabel) { distance[i] = 0; queue[growTail++] = i; }
      }
      while (growHead < growTail) {
        int current = queue[growHead++];
        // Keep close glow/cloth antialiasing without reaching disconnected
        // boots, heads, or capes belonging to adjacent sheet cells.
        if (distance[current] >= 8) continue;
        int cx = current % bitmap.Width, cy = current / bitmap.Width;
        for (int n = 0; n < 8; n++) {
          int nx = cx + dx[n], ny = cy + dy[n];
          if (nx < 0 || ny < 0 || nx >= bitmap.Width || ny >= bitmap.Height) continue;
          int next = ny * bitmap.Width + nx;
          if (distance[next] < 0 && pixels[ny * stride + nx * 4 + 3] >= 8) {
            distance[next] = distance[current] + 1;
            queue[growTail++] = next;
          }
        }
      }
      for (int y = 0; y < bitmap.Height; y++) for (int x = 0; x < bitmap.Width; x++) {
        int index = y * bitmap.Width + x;
        if (distance[index] < 0) pixels[y * stride + x * 4 + 3] = 0;
      }
      Marshal.Copy(pixels, 0, data.Scan0, pixels.Length);
    } finally {
      bitmap.UnlockBits(data);
    }
  }
}
'@

$inputFile = (Resolve-Path -LiteralPath $InputPath).Path
$workspace = (Resolve-Path -LiteralPath '.').Path
$outputRoot = [IO.Path]::GetFullPath((Join-Path $workspace $OutputDirectory))
if (-not $outputRoot.StartsWith($workspace + [IO.Path]::DirectorySeparatorChar)) {
  throw "Unsafe output path: $outputRoot"
}
if (-not (Test-Path -LiteralPath $outputRoot)) {
  New-Item -ItemType Directory -Path $outputRoot | Out-Null
}

$sheet = [Drawing.Bitmap]::FromFile($inputFile)
try {
  if ($sheet.Width -ne 1024 -or $sheet.Height -ne 1536) {
    throw "Expected a 1024x1536 armor sheet, received $($sheet.Width)x$($sheet.Height)."
  }

  $sets = @('sunspire', 'frostveil', 'bloodthorn', 'wildcrown', 'starweave', 'hellfire')
  for ($row = 0; $row -lt 3; $row++) {
    for ($pairColumn = 0; $pairColumn -lt 2; $pairColumn++) {
      $setName = $sets[$row * 2 + $pairColumn]
      for ($genderIndex = 0; $genderIndex -lt 2; $genderIndex++) {
        $gender = @('male', 'female')[$genderIndex]
        $column = $pairColumn * 2 + $genderIndex
        # Characters and effects deliberately cross the nominal 256x512 grid.
        # Read 32 pixels beyond every cell edge, then let the alpha-component
        # cleaner discard neighbouring figures. This prevents clipped boots,
        # antlers, capes, flames, and shoulder effects.
        $wantedRect = [Drawing.Rectangle]::new($column * 256 - 32, $row * 512 - 32, 320, 576)
        $sheetRect = [Drawing.Rectangle]::new(0, 0, $sheet.Width, $sheet.Height)
        $sourceRect = [Drawing.Rectangle]::Intersect($wantedRect, $sheetRect)
        $destinationRect = [Drawing.Rectangle]::new(
          $sourceRect.X - $wantedRect.X,
          $sourceRect.Y - $wantedRect.Y,
          $sourceRect.Width,
          $sourceRect.Height
        )

        # A larger transparent canvas supplies safety room around effects and boots.
        $output = [Drawing.Bitmap]::new(320, 576, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
        try {
          $graphics = [Drawing.Graphics]::FromImage($output)
          try {
            $graphics.Clear([Drawing.Color]::Transparent)
            $graphics.CompositingMode = [Drawing.Drawing2D.CompositingMode]::SourceCopy
            $graphics.DrawImage($sheet, $destinationRect, $sourceRect, [Drawing.GraphicsUnit]::Pixel)
          } finally {
            $graphics.Dispose()
          }
          [ArmorSpriteCleaner]::KeepLargestAlphaComponent($output)
          # Remove the preceding/following row's feet or head from the overflow
          # margin. The owning character never occupies these outer 28 pixels.
          if ($row -gt 0) {
            for ($y = 0; $y -lt 42; $y++) {
              for ($x = 0; $x -lt $output.Width; $x++) {
                if ($x -ge 105 -and $x -le 215) { continue }
                $pixel = $output.GetPixel($x, $y)
                $output.SetPixel($x, $y, [Drawing.Color]::FromArgb(0, $pixel.R, $pixel.G, $pixel.B))
              }
            }
          }
          if ($row -lt 2) {
            for ($y = 535; $y -lt $output.Height; $y++) {
              for ($x = 105; $x -le 215; $x++) {
                $pixel = $output.GetPixel($x, $y)
                $output.SetPixel($x, $y, [Drawing.Color]::FromArgb(0, $pixel.R, $pixel.G, $pixel.B))
              }
            }
          }
          $fileName = "$gender-$setName.png"
          $output.Save((Join-Path $outputRoot $fileName), [Drawing.Imaging.ImageFormat]::Png)
        } finally {
          $output.Dispose()
        }
      }
    }
  }
} finally {
  $sheet.Dispose()
}

Write-Output "Created 12 padded armor sprites in $outputRoot"
