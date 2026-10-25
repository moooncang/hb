# design/incoming-v2 → assets/skin2. 불투명 판은 JPEG, 투명 부품은 PNG. 크기는 바꾸지 않는다(사이트가 1/2로만 줄여 쓴다). 예외: 너무 큰 안개·검격만 축소.
param([string]$Root = (Split-Path $PSScriptRoot -Parent))
Add-Type -AssemblyName System.Drawing
$in = Join-Path $Root 'design\incoming-v2'; $out = Join-Path $Root 'assets\skin2'
New-Item -ItemType Directory -Force $out | Out-Null
$jpg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$opaque = @('hero-panel-east','hero-panel-west','status-cell','panel2-front-tall','panel2-east-wide','panel2-west-wide','panel2-gray-wide','sheet2-east','sheet2-west','paper2-east','slab2-west','panel2-east-mid','panel2-west-mid','panel2-front-mid','panel2-front-box','panel2-east-box','panel2-front-wide','panel2-east-short','panel2-west-short')
$shrink = @{ 'cover-glow'=512; 'cover-slash'=1600; 'cover-flash'=1000; 'cover-moon'=1000 }   # 안개·검격·섬광·달은 화면에 잠깐/부드럽게만 보이므로 줄여도 티가 안 난다(입장 첫 화면 무게 ↓)
function Resize($img, $w) {
  $h = [int][math]::Round($img.Height * $w / $img.Width)
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp); $g.InterpolationMode = 'HighQualityBicubic'; $g.CompositingMode = 'SourceCopy'
  $g.DrawImage($img, 0, 0, $w, $h); $g.Dispose(); return $bmp
}
$n = 0
Get-ChildItem (Join-Path $in '*.png') | ForEach-Object {
  $name = $_.BaseName; $img = [System.Drawing.Image]::FromFile($_.FullName)
  if ($opaque -contains $name) {
    $flat = New-Object System.Drawing.Bitmap $img.Width, $img.Height, ([System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
    $g = [System.Drawing.Graphics]::FromImage($flat); $g.Clear([System.Drawing.Color]::Black); $g.DrawImage($img, 0, 0, $img.Width, $img.Height); $g.Dispose()
    $p = New-Object System.Drawing.Imaging.EncoderParameters 1
    $p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]86)
    $flat.Save((Join-Path $out "$name.jpg"), $jpg, $p); $flat.Dispose()
  } elseif ($shrink.ContainsKey($name)) {
    $r = Resize $img $shrink[$name]; $r.Save((Join-Path $out "$name.png"), [System.Drawing.Imaging.ImageFormat]::Png)
  } else {
    Copy-Item $_.FullName (Join-Path $out "$name.png") -Force
  }
  $img.Dispose(); $n++
}
"done $n -> $out"
