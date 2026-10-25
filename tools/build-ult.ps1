# 필살기 카드(../필살기 카드/{코드}_20.png, _21.png — 필살기 이름을 얹은 완성본, 1856×1280)로 img/l·img/t 의 20·21번 파생본을 덮어쓴다. 원본은 건드리지 않는다.
# build-images.ps1 뒤에 돌린다(그 스크립트는 있는 파일을 건너뛰므로, 글자 없는 20·21은 여기서 글자 있는 판으로 바뀐다).
param([string]$Root = (Split-Path $PSScriptRoot -Parent))
Add-Type -AssemblyName System.Drawing
$src = Join-Path (Split-Path $Root -Parent) '필살기 카드'
$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
function Save($img, $out, $w, $q) {
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
Get-ChildItem (Join-Path $src '?_2[01].png') | ForEach-Object {
  $img = [System.Drawing.Image]::FromFile($_.FullName)
  if ($img.Width -ne 1856 -or $img.Height -ne 1280) { Write-Warning "$($_.Name) $($img.Width)x$($img.Height)" }
  Save $img (Join-Path $Root "img/l/$($_.BaseName).jpg") 1600 82
  Save $img (Join-Path $Root "img/t/$($_.BaseName).jpg") 400 78
  $img.Dispose(); $n++
}
"done $n"
