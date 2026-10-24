# 검수용 밀착 인화: 여러 PNG를 한 장에 모아 본다. 사용: contact.ps1 out.jpg cellW cols file1 file2 ...
param([string]$Out, [int]$CellW, [int]$Cols, [string[]]$Files)
Add-Type -AssemblyName System.Drawing
$cellH = [int]($CellW * 0.75)
$rows = [math]::Ceiling($Files.Count / $Cols)
$bmp = New-Object System.Drawing.Bitmap ($CellW * $Cols), ($cellH * $rows)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::FromArgb(255, 96, 128, 96))   # 녹색 바탕: 투명 영역 확인용
$g.InterpolationMode = 'HighQualityBicubic'
$font = New-Object System.Drawing.Font 'Arial', 11
$i = 0
foreach ($f in $Files) {
  $img = [System.Drawing.Image]::FromFile($f)
  $x = ($i % $Cols) * $CellW; $y = [math]::Floor($i / $Cols) * $cellH
  $sc = [math]::Min(($CellW - 8) / $img.Width, ($cellH - 24) / $img.Height)
  $w = [int]($img.Width * $sc); $h = [int]($img.Height * $sc)
  $g.DrawImage($img, $x + 4, $y + 4, $w, $h)
  $g.DrawString([System.IO.Path]::GetFileName($f), $font, [System.Drawing.Brushes]::White, $x + 4, $y + $cellH - 18)
  $img.Dispose(); $i++
}
$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$p = New-Object System.Drawing.Imaging.EncoderParameters 1
$p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]85)
$bmp.Save($Out, $enc, $p); $g.Dispose(); $bmp.Dispose()
"saved $Out"
