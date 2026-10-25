# 자산 다이어트: 네 모서리가 불투명한 판은 JPEG로, 작은 표식은 표시 크기(2배)로 줄인다. 원본(design/incoming)은 그대로.
param([string]$Root = (Split-Path $PSScriptRoot -Parent))
Add-Type -AssemblyName System.Drawing
$in = Join-Path $Root 'design\incoming'; $out = Join-Path $Root 'assets\skin'
$jpg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
function SaveJpg($img, $path, $q) {
  $flat = New-Object System.Drawing.Bitmap $img.Width, $img.Height, ([System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
  $g = [System.Drawing.Graphics]::FromImage($flat); $g.Clear([System.Drawing.Color]::Black); $g.DrawImage($img, 0, 0, $img.Width, $img.Height); $g.Dispose()
  $p = New-Object System.Drawing.Imaging.EncoderParameters 1
  $p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]$q)
  $flat.Save($path, $jpg, $p); $flat.Dispose()
}
function Resize($img, $w) {
  $h = [int][math]::Round($img.Height * $w / $img.Width)
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp); $g.InterpolationMode = 'HighQualityBicubic'; $g.CompositingMode = 'SourceCopy'
  $g.DrawImage($img, 0, 0, $w, $h); $g.Dispose(); return $bmp
}
function Opaque($bmp) {
  $pts = @(@(1,1), @($bmp.Width-2,1), @(1,$bmp.Height-2), @($bmp.Width-2,$bmp.Height-2), @([int]($bmp.Width/2),1), @([int]($bmp.Width/2),$bmp.Height-2), @(1,[int]($bmp.Height/2)), @($bmp.Width-2,[int]($bmp.Height/2)))
  foreach ($p in $pts) { if ($bmp.GetPixel($p[0], $p[1]).A -lt 250) { return $false } }
  return $true
}
# 판: 불투명이면 JPEG(가로폭 지정)
$plates = @{ 'slab-west'=1200; 'paper-east'=1200; 'panel-front'=700; 'panel-west'=1000; 'panel-east'=1000; 'prologue-east'=1000; 'prologue-west'=1000 }
foreach ($n in $plates.Keys) {
  $bmp = New-Object System.Drawing.Bitmap (Join-Path $in "$n.png")
  if (Opaque $bmp) { $r = Resize $bmp $plates[$n]; SaveJpg $r (Join-Path $out "$n.jpg") 86; Remove-Item (Join-Path $out "$n.png") -ErrorAction SilentlyContinue; "$n -> jpg" } else { "$n keeps png (transparent edge)" }
  $bmp.Dispose()
}
# 작은 표식: 표시 2배 크기로
$small = @{ 'fa-'=160; 'pin-'=96; 'step-'=64; 'icon-'=96; 'seal-east'=160; 'emblem-west'=160; 'btn-round-'=120 }
Get-ChildItem (Join-Path $in '*.png') | ForEach-Object {
  $n = $_.BaseName; $w = $null
  foreach ($k in $small.Keys) { if ($n.StartsWith($k)) { $w = $small[$k] } }
  if ($w -and $w -lt 10000) { $img = [System.Drawing.Image]::FromFile($_.FullName); if ($img.Width -gt $w) { $r = Resize $img $w; $r.Save((Join-Path $out "$n.png"), [System.Drawing.Imaging.ImageFormat]::Png) }; $img.Dispose() }
}
# 큰 투명 그림 축소
$big = @{ 'power-west'=1000; 'title-plate'=1200; 'seam-band'=1400 }
foreach ($n in $big.Keys) { $img = [System.Drawing.Image]::FromFile((Join-Path $in "$n.png")); $r = Resize $img $big[$n]; $r.Save((Join-Path $out "$n.png"), [System.Drawing.Imaging.ImageFormat]::Png); $img.Dispose() }
"done"
