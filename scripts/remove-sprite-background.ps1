param(
  [Parameter(Mandatory = $true)][string]$InputPath,
  [Parameter(Mandatory = $true)][string]$OutputPath
)

Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies 'System.Drawing' -TypeDefinition @'
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;

public static class SpriteBackgroundCleaner {
  public static void Clean(string input, string output) {
    using (var source = new Bitmap(input))
    using (var image = new Bitmap(source.Width, source.Height, PixelFormat.Format32bppArgb)) {
      using (var graphics = Graphics.FromImage(image)) graphics.DrawImageUnscaled(source, 0, 0);
      int width = image.Width, height = image.Height;
      var visited = new bool[width * height];
      var queue = new Queue<Point>();
      Action<int, int> enqueue = (x, y) => {
        int key = y * width + x;
        if (!visited[key]) { visited[key] = true; queue.Enqueue(new Point(x, y)); }
      };
      for (int x = 0; x < width; x++) { enqueue(x, 0); enqueue(x, height - 1); }
      for (int y = 0; y < height; y++) { enqueue(0, y); enqueue(width - 1, y); }
      while (queue.Count > 0) {
        Point point = queue.Dequeue();
        Color color = image.GetPixel(point.X, point.Y);
        int high = Math.Max(color.R, Math.Max(color.G, color.B));
        int low = Math.Min(color.R, Math.Min(color.G, color.B));
        if (low < 218 || high - low > 22) continue;
        image.SetPixel(point.X, point.Y, Color.Transparent);
        if (point.X > 0) enqueue(point.X - 1, point.Y);
        if (point.X + 1 < width) enqueue(point.X + 1, point.Y);
        if (point.Y > 0) enqueue(point.X, point.Y - 1);
        if (point.Y + 1 < height) enqueue(point.X, point.Y + 1);
      }
      image.Save(output, ImageFormat.Png);
    }
  }
}
'@

[SpriteBackgroundCleaner]::Clean((Resolve-Path -LiteralPath $InputPath).Path, $OutputPath)
