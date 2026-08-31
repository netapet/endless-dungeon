param([Parameter(Mandatory)][string]$ImagePath)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
public static class GeneratedCheckerCleaner {
  public static void Clean(Bitmap bitmap) {
    var rect = new Rectangle(0, 0, bitmap.Width, bitmap.Height);
    var data = bitmap.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
    try {
      int stride = Math.Abs(data.Stride), width = bitmap.Width, height = bitmap.Height;
      byte[] pixels = new byte[stride * height]; Marshal.Copy(data.Scan0, pixels, 0, pixels.Length);
      bool[] seen = new bool[width * height]; int[] queue = new int[width * height]; int head = 0, tail = 0;
      Action<int,int> add = (x,y) => { int i=y*width+x, p=y*stride+x*4; byte b=pixels[p],g=pixels[p+1],r=pixels[p+2];
        if (!seen[i] && Math.Min(r,Math.Min(g,b)) >= 220 && Math.Max(r,Math.Max(g,b))-Math.Min(r,Math.Min(g,b)) <= 10) { seen[i]=true; queue[tail++]=i; }
      };
      for (int x=0;x<width;x++){add(x,0);add(x,height-1);} for(int y=0;y<height;y++){add(0,y);add(width-1,y);}
      while(head<tail){int i=queue[head++],x=i%width,y=i/width;if(x>0)add(x-1,y);if(x+1<width)add(x+1,y);if(y>0)add(x,y-1);if(y+1<height)add(x,y+1);}
      for(int i=0;i<seen.Length;i++) if(seen[i]) pixels[(i/width)*stride+(i%width)*4+3]=0;
      Marshal.Copy(pixels,0,data.Scan0,pixels.Length);
    } finally { bitmap.UnlockBits(data); }
  }
}
'@
$resolved = (Resolve-Path -LiteralPath $ImagePath).Path
$source = [Drawing.Bitmap]::FromFile($resolved)
$bitmap = [Drawing.Bitmap]::new($source.Width, $source.Height, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
try {
  $graphics = [Drawing.Graphics]::FromImage($bitmap)
  try { $graphics.DrawImageUnscaled($source, 0, 0) } finally { $graphics.Dispose(); $source.Dispose() }
  [GeneratedCheckerCleaner]::Clean($bitmap)
  $temporary = "$resolved.cleaned.png"
  $bitmap.Save($temporary, [Drawing.Imaging.ImageFormat]::Png)
} finally { $bitmap.Dispose() }
Move-Item -LiteralPath $temporary -Destination $resolved -Force
