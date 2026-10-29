# 시작 대화(프롤로그)에 쓰는 배경 그림 → img/bg/{코드}.jpg (가로 1600, 비율 그대로 균일 축소). 원본 ../배경/*.png 는 건드리지 않는다.
# 코드는 ../캐릭터 챗/시작 설정/프롤로그(*).md 의 cjivip.uk/mvs/b/{코드}.png 에서 찾는다. 있는 파일도 다시 만든다(원본이 바뀌었을 수 있으니)
param([string]$Root = (Split-Path $PSScriptRoot -Parent))
Add-Type -AssemblyName System.Drawing
$top = Split-Path $Root -Parent
$codes = Get-ChildItem (Join-Path $top '캐릭터 챗\시작 설정') -Filter '프롤로그*.md' | ForEach-Object { [regex]::Matches([IO.File]::ReadAllText($_.FullName), 'mvs/b/([A-Z]+\d+)\.png') | ForEach-Object { $_.Groups[1].Value } } | Sort-Object -Unique
$out = Join-Path $Root 'img\bg'; New-Item -ItemType Directory -Force $out | Out-Null
$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
foreach ($c in $codes) {
  $img = [System.Drawing.Image]::FromFile((Join-Path $top "배경\$c.png"))
  $w = 1600; $h = [int][math]::Round($img.Height * $w / $img.Width)
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'; $g.SmoothingMode = 'HighQuality'; $g.PixelOffsetMode = 'HighQuality'
  $g.DrawImage($img, 0, 0, $w, $h)
  $p = New-Object System.Drawing.Imaging.EncoderParameters 1
  $p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]84)
  $bmp.Save((Join-Path $out "$c.jpg"), $enc, $p)
  "$c $($img.Width)x$($img.Height) -> ${w}x$h"
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
}
