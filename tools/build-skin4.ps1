# design/incoming-v4 → assets/skin4. 인물 기록 그림(두루마리·양피지 서류). 크기는 바꾸지 않는다(사이트가 1/2 또는 균일 축소로만 쓴다).
# 완전 불투명한 종이 띠 두 장만 JPEG(세로 반복용, 무게 ↓). 나머지(투명 바깥이 있는 카드·위 끝·아래 끝)는 PNG 그대로.
param([string]$Root = (Split-Path $PSScriptRoot -Parent))
Add-Type -AssemblyName System.Drawing
$in = Join-Path $Root 'design\incoming-v4'; $out = Join-Path $Root 'assets\skin4'
New-Item -ItemType Directory -Force $out | Out-Null
$want = @{ 'scroll-card'='2200x1040'; 'scroll-card-v'='1000x1800'; 'scroll-top'='2400x400'; 'scroll-paper'='2400x800'; 'scroll-bottom'='2400x400';
  'dossier-card'='2200x1040'; 'dossier-card-v'='1000x1800'; 'dossier-top'='2400x400'; 'dossier-paper'='2400x800'; 'dossier-bottom'='2400x400' }
$jpeg = @('scroll-paper', 'dossier-paper')
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$n = 0
Get-ChildItem (Join-Path $in '*.png') | ForEach-Object {
  $name = $_.BaseName; $img = [System.Drawing.Image]::FromFile($_.FullName); $size = "$($img.Width)x$($img.Height)"
  if ($want.ContainsKey($name) -and $want[$name] -ne $size) { Write-Warning "$name size $size (ordered $($want[$name]))" }
  if ($jpeg -contains $name) {
    $flat = New-Object System.Drawing.Bitmap $img.Width, $img.Height, ([System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
    $g = [System.Drawing.Graphics]::FromImage($flat); $g.DrawImage($img, 0, 0, $img.Width, $img.Height); $g.Dispose()
    $p = New-Object System.Drawing.Imaging.EncoderParameters 1
    $p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]90)
    $flat.Save((Join-Path $out "$name.jpg"), $codec, $p); $flat.Dispose()
  } else { Copy-Item $_.FullName (Join-Path $out "$name.png") -Force }
  $img.Dispose(); $n++
}
"done $n -> $out"
