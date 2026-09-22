param(
    [string]$inFile = "c:\Users\ext.xierenxiang3\Desktop\wx7fdf6d9ce022162f\__APP__.decrypted.wxapkg",
    [string]$outDir = "c:\Users\ext.xierenxiang3\Desktop\wx7fdf6d9ce022162f\unpacked"
)

# read big-endian uint32 at offset
function Read-BE-UInt32([byte[]]$buf, [int]$off) {
    $le = [byte[]]@($buf[$off+3], $buf[$off+2], $buf[$off+1], $buf[$off])
    return [BitConverter]::ToUInt32($le, 0)
}

$data = [System.IO.File]::ReadAllBytes($inFile)
if ($data[0] -ne 0xBE) { throw "bad firstMark 0x{0:X2}" -f $data[0] }
if ($data[13] -ne 0xED) { throw "bad lastMark 0x{0:X2}" -f $data[13] }
$info1     = Read-BE-UInt32 $data 1
$indexLen  = Read-BE-UInt32 $data 5
$dataLen   = Read-BE-UInt32 $data 9
$fileCount = Read-BE-UInt32 $data 14
Write-Host ("firstMark=BE lastMark=ED info1={0} indexLen={1} dataLen={2} fileCount={3}" -f $info1,$indexLen,$dataLen,$fileCount)

$p = 18
$files = @()
for ($i = 0; $i -lt [int]$fileCount; $i++) {
    $nameLen = [int](Read-BE-UInt32 $data $p); $p += 4
    $name = [System.Text.Encoding]::UTF8.GetString($data, $p, $nameLen); $p += $nameLen
    $offset = [uint32](Read-BE-UInt32 $data $p); $p += 4
    $size   = [uint32](Read-BE-UInt32 $data $p); $p += 4
    $files += [PSCustomObject]@{ Name=$name; Offset=$offset; Size=$size }
}

if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }
foreach ($f in $files) {
    $rel  = $f.Name.TrimStart('/')
    $full = Join-Path $outDir $rel
    $dir  = Split-Path $full -Parent
    if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    $content = New-Object byte[] $f.Size
    [Array]::Copy($data, [int]$f.Offset, $content, 0, [int]$f.Size)
    [System.IO.File]::WriteAllBytes($full, $content)
    Write-Host ("{0,8}  {1}" -f $f.Size, $f.Name)
}
Write-Host ("done: {0} files -> {1}" -f $files.Count, $outDir)
