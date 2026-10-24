# 원본(../인물 컷, ../등장 카드)에서 웹용 JPEG 파생본을 만든다. 원본은 건드리지 않는다.
# img/l  큰 이미지 (가로 1600)  img/t 썸네일 (가로 400)  img/card 등장 카드 (가로 1600)
param([string]$Root = (Split-Path $PSScriptRoot -Parent))
Add-Type -AssemblyName System.Drawing
$src = Join-Path (Split-Path $Root -Parent) '인물 컷'
$cards = Join-Path (Split-Path $Root -Parent) '등장 카드'
$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
function Save($img, $out, $w, $q) {
  if (Test-Path $out) { return }
  $h = [int][math]::Round($img.Height * $w / $img.Width)
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'; $g.SmoothingMode = 'HighQuality'; $g.PixelOffsetMode = 'HighQuality'
  $g.DrawImage($img, 0, 0, $w, $h)
  $p = New-Object System.Drawing.Imaging.EncoderParameters 1
  $p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]$q)
  $bmp.Save($out, $enc, $p)
  $g.Dispose(); $bmp.Dispose()
}
$n = 0
Get-ChildItem (Join-Path $src '*.png') | ForEach-Object {
  $img = [System.Drawing.Image]::FromFile($_.FullName)
  Save $img (Join-Path $Root "img/l/$($_.BaseName).jpg") 1600 80
  Save $img (Join-Path $Root "img/t/$($_.BaseName).jpg") 400 78
  $img.Dispose(); $n++
}
Get-ChildItem (Join-Path $cards '?_1.png') | ForEach-Object {
  $img = [System.Drawing.Image]::FromFile($_.FullName)
  Save $img (Join-Path $Root "img/card/$($_.BaseName.Substring(0,1)).jpg") 1600 82
  $img.Dispose(); $n++
}
"done $n"
