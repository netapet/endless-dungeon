param([string]$Source="assets/themes/desert-ruins/clock boss.png",[string]$Destination="assets/themes/clockwork-citadel/clockwork-archon.png")
$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Drawing
$workspace=(Resolve-Path '.').Path;$sourcePath=(Resolve-Path -LiteralPath $Source).Path;$destinationPath=Join-Path $workspace $Destination
if(-not $sourcePath.StartsWith($workspace+[IO.Path]::DirectorySeparatorChar)-or-not $destinationPath.StartsWith($workspace+[IO.Path]::DirectorySeparatorChar)){throw 'Unsafe path'}
if(-not('ClockworkAlphaCleaner'-as[type])){Add-Type -ReferencedAssemblies 'System.Drawing.dll' -TypeDefinition @'
using System; using System.Collections.Generic; using System.Drawing; using System.Drawing.Imaging;
public static class ClockworkAlphaCleaner {
 class C { public List<int> P=new List<int>(); public long Chroma,Luma; }
 public static void Clean(string input,string output){
  using(var file=new Bitmap(input)) using(var b=new Bitmap(file.Width,file.Height,PixelFormat.Format32bppArgb)){
   using(var g=Graphics.FromImage(b))g.DrawImageUnscaled(file,0,0);
   int w=b.Width,h=b.Height; var seen=new bool[w*h]; var all=new List<C>(); var q=new Queue<int>();
   for(int y=0;y<h;y++)for(int x=0;x<w;x++){int s=y*w+x;if(seen[s]||b.GetPixel(x,y).A<=10)continue;var c=new C();seen[s]=true;q.Enqueue(s);
    while(q.Count>0){int i=q.Dequeue(),px=i%w,py=i/w;Color col=b.GetPixel(px,py);c.P.Add(i);int hi=Math.Max(col.R,Math.Max(col.G,col.B)),lo=Math.Min(col.R,Math.Min(col.G,col.B));c.Chroma+=hi-lo;c.Luma+=col.R+col.G+col.B;
     int[] ns={i-1,i+1,i-w,i+w};foreach(int n in ns){if(n<0||n>=w*h||seen[n])continue;int nx=n%w,ny=n/w;if(Math.Abs(nx-px)+Math.Abs(ny-py)!=1||b.GetPixel(nx,ny).A<=10)continue;seen[n]=true;q.Enqueue(n);}}
    all.Add(c);}
   C largest=null;foreach(C c in all)if(largest==null||c.P.Count>largest.P.Count)largest=c;
   foreach(C c in all){if(c==largest)continue;double chroma=c.Chroma/(double)c.P.Count,luma=c.Luma/(double)(c.P.Count*3);if(c.P.Count>=14&&(chroma>17||luma<175))continue;foreach(int i in c.P){int x=i%w,y=i/w;Color col=b.GetPixel(x,y);b.SetPixel(x,y,Color.FromArgb(0,col.R,col.G,col.B));}}
   b.Save(output,ImageFormat.Png);
  }
 }
}
'@}
[ClockworkAlphaCleaner]::Clean($sourcePath,$destinationPath)
