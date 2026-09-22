param(
    [string]$wxid = "wx7fdf6d9ce022162f",
    [string]$inFile = "c:\Users\ext.xierenxiang3\Desktop\wx7fdf6d9ce022162f\2\__APP__.wxapkg",
    [string]$outFile = "c:\Users\ext.xierenxiang3\Desktop\wx7fdf6d9ce022162f\__APP__.decrypted.wxapkg"
)

$data = [System.IO.File]::ReadAllBytes($inFile)
$magic = [System.Text.Encoding]::ASCII.GetString($data, 0, 6)
if ($magic -ne "V1MMWX") { throw "Not a PC-encrypted wxapkg (magic: $magic)" }
Write-Host "magic OK: $magic"

# PBKDF2-SHA1 -> 32-byte AES-256 key
$wxidBytes  = [System.Text.Encoding]::UTF8.GetBytes($wxid)
$saltBytes  = [System.Text.Encoding]::UTF8.GetBytes("saltiest")
$rfc = New-Object System.Security.Cryptography.Rfc2898DeriveBytes($wxidBytes, $saltBytes, 1000)
$key = $rfc.GetBytes(32)
$ivBytes = [System.Text.Encoding]::UTF8.GetBytes("the iv: 16 bytes")

# AES-256-CBC, NoPadding (head is block-aligned 1024 bytes)
$aes = New-Object System.Security.Cryptography.AesManaged
$aes.Mode = [System.Security.Cryptography.CipherMode]::CBC
$aes.Padding = [System.Security.Cryptography.PaddingMode]::None
$aes.Key = $key
$aes.IV = $ivBytes

$headEnc = New-Object byte[] 1024
[Array]::Copy($data, 6, $headEnc, 0, 1024)
$headDec = $aes.CreateDecryptor().TransformFinalBlock($headEnc, 0, 1024)

# XOR the tail with second-to-last char of wxid
$xorKey = 0x66
if ($wxid.Length -ge 2) { $xorKey = [int][char]$wxid[$wxid.Length - 2] }
Write-Host ("xorKey=0x{0:X2} (from '{1}')" -f $xorKey, $wxid[$wxid.Length - 2])

$tailLen = $data.Length - 6 - 1024
$tailDec = New-Object byte[] $tailLen
$base = 6 + 1024
for ($i = 0; $i -lt $tailLen; $i++) { $tailDec[$i] = $data[$base + $i] -bxor $xorKey }

$out = New-Object byte[] (1024 + $tailLen)
[Array]::Copy($headDec, 0, $out, 0, 1024)
[Array]::Copy($tailDec, 0, $out, 1024, $tailLen)
[System.IO.File]::WriteAllBytes($outFile, $out)

Write-Host ("decrypted -> {0} ({1} bytes)" -f $outFile, $out.Length)
Write-Host ("firstByte=0x{0:X2}  first16={1}" -f $out[0], (($out[0..15] | ForEach-Object { $_.ToString('X2') }) -join ' '))
