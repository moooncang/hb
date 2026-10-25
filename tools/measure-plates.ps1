# 판 그림의 "글자를 놓을 수 있는 밝은 면" 경계를 잰다. 결과는 원본 px (사이트는 ×0.5)
Add-Type -AssemblyName System.Drawing
$in = "D:\크랙\무협 vs 중판\사이트\design\incoming"
function Box($name, $light) {
  $bmp = New-Object System.Drawing.Bitmap (Join-Path $in "$name.png")
  $w = $bmp.Width; $h = $bmp.Height
  # 가로 중앙선 기준: 왼쪽/오른쪽에서 밝은 면이 시작되는 x
  $cy = [int]($h / 2); $l = -1; $r = -1
  for ($x = 0; $x -lt $w; $x++) { $p = $bmp.GetPixel($x, $cy); if ($p.A -gt 240 -and (($light -and $p.R -gt 175 -and $p.G -gt 170) -or (-not $light -and $p.R -lt 90))) { if ($l -lt 0) { $l = $x }; $r = $x } }
  # 세로 중앙열 기준: 위/아래
  $cx = [int]($w / 2); $t = -1; $b = -1
  for ($y = 0; $y -lt $h; $y++) { $p = $bmp.GetPixel($cx, $y); if ($p.A -gt 240 -and (($light -and $p.R -gt 175 -and $p.G -gt 170) -or (-not $light -and $p.R -lt 90))) { if ($t -lt 0) { $t = $y }; $b = $y } }
  # 밝은 면이 연속인지: 중앙선에서 어두운 픽셀 비율
  $bmp.Dispose()
  "{0}: {1}x{2} light x {3}-{4} y {5}-{6}" -f $name, $w, $h, $l, $r, $t, $b
}
foreach ($n in 'title-plate','name-east','name-west','btn-east-idle','btn-west-idle','btn-gray-idle','chip-east-idle','chip-west-idle','menu-east-idle','menu-west-idle','list-east','list-west','paper-east','slab-west','panel-east','panel-west','prologue-east','prologue-west','thumb-east-idle','thumb-west-idle') { Box $n $true }
Box 'panel-front' $false
