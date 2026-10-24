# 도해 자산의 마디·기둥 위치를 알파 채널로 측정한다 (사이트 좌표 계산용, 1회성)
Add-Type -AssemblyName System.Drawing
$in = "D:\크랙\무협 vs 중판\사이트\design\incoming"
# power-east: 가로 중앙 근처 열에서 알파가 큰 구간(마디) 찾기
$img = New-Object System.Drawing.Bitmap (Join-Path $in 'power-east.png')
$cx = [int]($img.Width / 2); $rows = @()
for ($y = 0; $y -lt $img.Height; $y++) { $m = 0; for ($x = $cx - 40; $x -le $cx + 40; $x++) { $a = $img.GetPixel($x, $y).A; if ($a -gt $m) { $m = $a } }; $rows += $m }
# 폭이 넓은 구간 = 마디: 중심에서 ±40px 안에 불투명 픽셀이 30개 이상인 행
$wide = @()
for ($y = 0; $y -lt $img.Height; $y++) { $c = 0; for ($x = $cx - 40; $x -le $cx + 40; $x++) { if ($img.GetPixel($x, $y).A -gt 120) { $c++ } }; if ($c -ge 24) { $wide += $y } }
$groups = @(); $s = $null; $prev = -5
foreach ($y in $wide) { if ($y - $prev -gt 3) { if ($s -ne $null) { $groups += "$s-$prev" }; $s = $y }; $prev = $y }
if ($s -ne $null) { $groups += "$s-$prev" }
"power-east $($img.Width)x$($img.Height) nodes(y): $($groups -join ' ')"
$img.Dispose()
# power-west: 각 기둥의 가로 범위와 속(비어 있는 밝은 면)의 세로 범위
$img = New-Object System.Drawing.Bitmap (Join-Path $in 'power-west.png')
$cols = @(); for ($x = 0; $x -lt $img.Width; $x += 2) { $c = 0; for ($y = 600; $y -lt 1200; $y += 10) { if ($img.GetPixel($x, $y).A -gt 120) { $c++ } }; $cols += ($c -ge 30) }
$spans = @(); $s = $null
for ($i = 0; $i -lt $cols.Count; $i++) { if ($cols[$i] -and $s -eq $null) { $s = $i * 2 }; if (-not $cols[$i] -and $s -ne $null) { $spans += "$s-$($i*2)"; $s = $null } }
if ($s -ne $null) { $spans += "$s-$($img.Width)" }
"power-west $($img.Width)x$($img.Height) pillars(x): $($spans -join ' ')"
# 첫 기둥 중앙 열에서 밝은 면(속)의 세로 범위
$px = [int](($spans[0] -split '-')[0]) + 80
$body = @(); for ($y = 0; $y -lt $img.Height; $y += 4) { $p = $img.GetPixel($px, $y); if ($p.A -gt 200 -and $p.R -gt 200 -and $p.G -gt 190) { $body += $y } }
"pillar body(y) at x=$px : $($body[0])-$($body[-1])"
$img.Dispose()
