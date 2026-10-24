# design/incoming 의 납품 PNG 를 사이트용 assets/skin 으로 변환한다. 불투명 큰 그림은 JPEG, 투명 부품은 PNG(필요하면 축소).
param([string]$Root = (Split-Path $PSScriptRoot -Parent))
Add-Type -AssemblyName System.Drawing
$in = Join-Path $Root 'design\incoming'; $out = Join-Path $Root 'assets\skin'
New-Item -ItemType Directory -Force $out | Out-Null
$jpg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
# 불투명으로 쓸 그림: 이름 = 출력 가로폭
$opaque = @{ 'key-visual'=2400; 'key-visual-tall'=1200; 'menu-backdrop'=2000; 'viewer-backdrop'=1600; 'front-map'=1800; 'neutral-placeholder'=1600;
  'mode-east-idle'=900; 'mode-east-selected'=900; 'mode-west-idle'=900; 'mode-west-selected'=900; 'mode-free-idle'=900; 'mode-free-selected'=900;
  'tex-paper'=1024; 'tex-stone'=1024; 'tex-ink-night'=1024 }
# 투명 부품 중 줄일 것: 이름 = 출력 가로폭 (나머지는 원본 크기 그대로 복사)
$shrink = @{ 'power-west'=1200; 'title-plate'=1400; 'seam-band'=1600; 'frame-east'=1400; 'frame-west'=1400; 'panel-east'=1000; 'panel-west'=1000; 'panel-front'=700;
  'paper-east'=1200; 'slab-west'=1200; 'prologue-east'=1000; 'prologue-west'=1000; 'menu-backdrop'=0 }
function Resize($img, $w) {
  if ($w -ge $img.Width) { return $img }
  $h = [int][math]::Round($img.Height * $w / $img.Width)
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp); $g.InterpolationMode = 'HighQualityBicubic'; $g.CompositingMode = 'SourceCopy'
  $g.DrawImage($img, 0, 0, $w, $h); $g.Dispose(); return $bmp
}
$n = 0
Get-ChildItem (Join-Path $in '*.png') | ForEach-Object {
  $name = $_.BaseName; $img = [System.Drawing.Image]::FromFile($_.FullName)
  if ($opaque.ContainsKey($name)) {
    $r = Resize $img $opaque[$name]
    $flat = New-Object System.Drawing.Bitmap $r.Width, $r.Height, ([System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
    $g = [System.Drawing.Graphics]::FromImage($flat); $g.Clear([System.Drawing.Color]::Black); $g.DrawImage($r, 0, 0, $r.Width, $r.Height); $g.Dispose()
    $p = New-Object System.Drawing.Imaging.EncoderParameters 1
    $p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]84)
    $flat.Save((Join-Path $out "$name.jpg"), $jpg, $p); $flat.Dispose()
  } else {
    $r = if ($shrink.ContainsKey($name)) { Resize $img $shrink[$name] } else { $img }
    $r.Save((Join-Path $out "$name.png"), [System.Drawing.Imaging.ImageFormat]::Png)
  }
  $img.Dispose(); $n++
}
"done $n -> $out"
