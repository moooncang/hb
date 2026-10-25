# 판 그림: 투명 여백을 잘라낸 뒤 JPEG로 (검은 테가 생기지 않게). 자른 크기를 출력한다.
Add-Type -AssemblyName System.Drawing
$in = "D:\크랙\무협 vs 중판\사이트\design\incoming"; $out = "D:\크랙\무협 vs 중판\사이트\assets\skin"
$jpg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
foreach ($n in 'panel-east','panel-west','panel-front','prologue-east','prologue-west','paper-east','slab-west') {
  $bmp = New-Object System.Drawing.Bitmap (Join-Path $in "$n.png")
  $w = $bmp.Width; $h = $bmp.Height
  $l = $w; $r = 0; $t = $h; $b = 0
  for ($y = 0; $y -lt $h; $y += 2) { for ($x = 0; $x -lt $w; $x += 2) { if ($bmp.GetPixel($x, $y).A -gt 250) { if ($x -lt $l) { $l = $x }; if ($x -gt $r) { $r = $x }; if ($y -lt $t) { $t = $y }; if ($y -gt $b) { $b = $y } } } }
  $l += 2; $t += 2; $r -= 1; $b -= 1
  $cw = $r - $l; $ch = $b - $t
  $crop = New-Object System.Drawing.Bitmap $cw, $ch, ([System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
  $g = [System.Drawing.Graphics]::FromImage($crop); $g.Clear([System.Drawing.Color]::Black)
  $g.DrawImage($bmp, (New-Object System.Drawing.Rectangle 0, 0, $cw, $ch), (New-Object System.Drawing.Rectangle $l, $t, $cw, $ch), [System.Drawing.GraphicsUnit]::Pixel); $g.Dispose()
  $p = New-Object System.Drawing.Imaging.EncoderParameters 1
  $p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]86)
  $crop.Save((Join-Path $out "$n.jpg"), $jpg, $p); $crop.Dispose(); $bmp.Dispose()
  "{0}: {1}x{2} -> crop {3},{4} {5}x{6}" -f $n, $w, $h, $l, $t, $cw, $ch
}
