# design/incoming-v3 → assets/skin3. v3(제목·균열·검격)는 전부 투명 PNG. 크기 검수 뒤, 화면 크기에 비해 지나치게 큰 것만 비율 그대로 균일 축소한다(사이트는 늘리지 않는다).
param([string]$Root = (Split-Path $PSScriptRoot -Parent))
Add-Type -AssemblyName System.Drawing
$in = Join-Path $Root 'design\incoming-v3'; $out = Join-Path $Root 'assets\skin3'
New-Item -ItemType Directory -Force $out | Out-Null
$want = @{ 'title-v'='560x2200'; 'title-h'='2200x560'; 'title-ink'='1400x320'; 'seam-crack'='800x2400'; 'seam-crack-h'='2400x800';
  'slash-core'='3000x400'; 'slash-aura'='3000x1200'; 'slash-haze'='3000x1600'; 'flash-burst'='1600x1600'; 'shock-ring'='1600x1600'; 'cut-edge-a'='3000x240'; 'cut-edge-b'='3000x240'; 'cut-dust'='3000x1000' }
# 균일 축소(가로x세로, 비율 동일): 균열 띠는 화면 높이의 1.7배면 충분, 검격 층은 대각선 길이보다 조금 큰 2000이면 충분
$shrink = @{ 'seam-crack'=@(600,1800); 'seam-crack-h'=@(1800,600); 'slash-aura'=@(2000,800); 'shock-ring'=@(1200,1200); 'cut-edge-a'=@(2000,160); 'cut-edge-b'=@(2000,160); 'cut-dust'=@(2001,667) }
$n = 0
Get-ChildItem (Join-Path $in '*.png') | ForEach-Object {
  $name = $_.BaseName; $img = [System.Drawing.Image]::FromFile($_.FullName); $size = "$($img.Width)x$($img.Height)"
  if ($want.ContainsKey($name) -and $want[$name] -ne $size) { Write-Warning "$name size $size (ordered $($want[$name]))" }
  if ($shrink.ContainsKey($name)) {
    $w = $shrink[$name][0]; $h = $shrink[$name][1]
    $bmp = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($bmp); $g.InterpolationMode = 'HighQualityBicubic'; $g.CompositingMode = 'SourceCopy'
    $g.DrawImage($img, 0, 0, $w, $h); $g.Dispose()
    $bmp.Save((Join-Path $out "$name.png"), [System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose()
  } else { Copy-Item $_.FullName (Join-Path $out "$name.png") -Force }
  $img.Dispose(); $n++
}
"done $n -> $out"
