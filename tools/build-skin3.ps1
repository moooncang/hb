# design/incoming-v3 → assets/skin3. v3(제목·균열·검격)는 전부 투명 PNG라 복사만 한다. 크기는 바꾸지 않는다(사이트가 1/2 또는 균일 축소로만 쓴다).
param([string]$Root = (Split-Path $PSScriptRoot -Parent))
Add-Type -AssemblyName System.Drawing
$in = Join-Path $Root 'design\incoming-v3'; $out = Join-Path $Root 'assets\skin3'
New-Item -ItemType Directory -Force $out | Out-Null
$want = @{ 'title-v'='560x2200'; 'title-h'='2200x560'; 'title-ink'='1400x320'; 'seam-crack'='800x2400'; 'seam-crack-h'='2400x800';
  'slash-core'='3000x400'; 'slash-aura'='3000x1200'; 'slash-haze'='3000x1600'; 'flash-burst'='1600x1600'; 'shock-ring'='1600x1600'; 'cut-edge-a'='3000x240'; 'cut-edge-b'='3000x240'; 'cut-dust'='3000x1000' }
$n = 0
Get-ChildItem (Join-Path $in '*.png') | ForEach-Object {
  $name = $_.BaseName; $img = [System.Drawing.Image]::FromFile($_.FullName); $size = "$($img.Width)x$($img.Height)"; $img.Dispose()
  if ($want.ContainsKey($name) -and $want[$name] -ne $size) { Write-Warning "$name 크기 $size (주문 $($want[$name]))" }
  Copy-Item $_.FullName (Join-Path $out "$name.png") -Force; $n++
}
"done $n -> $out  (main.js 의 ART 표시를 켤 것)"
