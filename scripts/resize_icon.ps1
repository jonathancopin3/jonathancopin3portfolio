
Add-Type -AssemblyName System.Drawing

$sourcePath = "c:\Users\User\Desktop\kpfa\public\Image all projet\Logo\Logo.png"
$destPath = "c:\Users\User\Desktop\kpfa\public\favicon.png"

if (-not (Test-Path $sourcePath)) {
    Write-Error "Source file not found: $sourcePath"
    exit 1
}

$img = [System.Drawing.Image]::FromFile($sourcePath)
$size = 512

# Create square canvas
$bmp = New-Object System.Drawing.Bitmap($size, $size)
$graph = [System.Drawing.Graphics]::FromImage($bmp)
$graph.Clear([System.Drawing.Color]::Transparent)
$graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# Calculate aspect ratio
$ratio = [Math]::Min($size / $img.Width, $size / $img.Height)
$newWidth = [int]($img.Width * $ratio)
$newHeight = [int]($img.Height * $ratio)
$posX = [int](($size - $newWidth) / 2)
$posY = [int](($size - $newHeight) / 2)

# Draw image centered
$graph.DrawImage($img, $posX, $posY, $newWidth, $newHeight)

# Save
$bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Cleanup
$img.Dispose()
$bmp.Dispose()
$graph.Dispose()

Write-Host "Favicon resized and saved to $destPath"
