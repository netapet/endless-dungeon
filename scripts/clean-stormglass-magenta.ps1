param([string]$Directory="assets/themes/stormglass-leviathan")
$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Drawing
$workspace=(Resolve-Path '.').Path;$folder=(Resolve-Path -LiteralPath $Directory).Path
if(-not $folder.StartsWith($workspace+[IO.Path]::DirectorySeparatorChar)){throw 'Unsafe folder path'}
if(-not('StormglassMagentaCleaner'-as[type])){Add-Type -ReferencedAssemblies 'System.Drawing.dll' -TypeDefinition @'
using System; using System.Collections.Generic; using System.Drawing; using System.Drawing.Imaging; using System.IO;
public static class StormglassMagentaCleaner {
 static bool IsMagenta(Color c){return c.R>115&&c.B>125&&c.G<150&&c.R>c.G*1.22&&c.B>c.G*1.12;}
 public static void Clean(string path){ string temp=path+".clean.png";
  using(var file=new Bitmap(path)) using(var b=new Bitmap(file.Width,file.Height,PixelFormat.Format32bppArgb)){
   using(var g=Graphics.FromImage(b))g.DrawImageUnscaled(file,0,0);
   int w=b.Width,h=b.Height;
   for(int pass=0;pass<10;pass++){
    var remove=new List<int>();
    for(int y=1;y<h-1;y++)for(int x=1;x<w-1;x++){Color c=b.GetPixel(x,y);if(c.A==0||!IsMagenta(c))continue;bool edge=false;
     for(int oy=-1;oy<=1&&!edge;oy++)for(int ox=-1;ox<=1;ox++)if((ox!=0||oy!=0)&&b.GetPixel(x+ox,y+oy).A<24){edge=true;break;}
     if(edge)remove.Add(y*w+x);
    }
    foreach(int i in remove){int x=i%w,y=i/w;Color c=b.GetPixel(x,y);b.SetPixel(x,y,Color.FromArgb(0,c.R,c.G,c.B));}
   }
   b.Save(temp,ImageFormat.Png);
  } File.Copy(temp,path,true);File.Delete(temp);
 }
}
'@}
$targets=Get-ChildItem -LiteralPath $folder -Filter 'stormglass-*.png' | Where-Object {$_.Name -notin @('stormglass-arena.png','stormglass-leviathan-source.png')}
foreach($target in $targets){[StormglassMagentaCleaner]::Clean($target.FullName);Write-Output $target.Name}
