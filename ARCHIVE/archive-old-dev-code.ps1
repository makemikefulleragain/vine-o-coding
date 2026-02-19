# archive-old-dev-code.ps1
# Archive old Dev_Code folders that are no longer active.
# Run this from PowerShell when ready. Review each folder before deleting.
# Created: Feb 19, 2026

$DevCode = "c:\Users\mikef\OneDrive\1 KomUnity\1a New KU Plans\Dev_Code"
$ArchiveDest = "c:\Users\mikef\OneDrive\1 KomUnity\1a New KU Plans\Dev_Code\Kamunity-Tabletop-Plan\ARCHIVE"

# Folders to archive (confirmed old/inactive)
$toArchive = @(
    "1 K-Demo",
    "1a-neovibefactory",
    "Vibe Coded",
    "KamunityAI_Code",
    "Kamunity-MVP",
    "community-hub-app",
    "HeroGameTest",
    "kamunity_catalyst",
    "Dev-Stuff",
    "LANN MVP and Build",
    "RAG MAterial"
)

# DO NOT ARCHIVE — still active:
# - NeoKamunity/           (kamunity-org-rebuild + kamunity repos — active until CI/CD confirmed from PROJECTS/)
# - kamunity-engine/       (outcome-vine = vine-o-coding.netlify.app — live site)
# - Kamunity-Tabletop-Plan/ (THIS IS THE NERVE CENTRE)
# - important teck/         *** MANUAL — contains API keys — move to secure location first ***

$timestamp = Get-Date -Format "yyyy-MM-dd"

foreach ($folder in $toArchive) {
    $source = Join-Path $DevCode $folder
    $dest = Join-Path $ArchiveDest "old-dev-code-$folder-$timestamp.zip"

    if (Test-Path $source) {
        Write-Host "Archiving: $folder..." -ForegroundColor Cyan
        Compress-Archive -Path $source -DestinationPath $dest -Force
        Write-Host "  -> Created: $dest" -ForegroundColor Green
        Write-Host "  -> VERIFY ZIP IS GOOD before deleting source: $source" -ForegroundColor Yellow
        # Uncomment the next line ONLY after verifying the zip:
        # Remove-Item -Path $source -Recurse -Force
    } else {
        Write-Host "  Skipping (not found): $folder" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "=== ARCHIVE COMPLETE ===" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor White
Write-Host "  1. Verify each zip file opens and contains the expected contents" -ForegroundColor White
Write-Host "  2. Uncomment Remove-Item lines and re-run to delete source folders" -ForegroundColor White
Write-Host "  3. MANUAL: Move 'important teck/' to secure location (contains API keys)" -ForegroundColor Red
Write-Host "  4. Once NeoKamunity/ CI/CD is confirmed via PROJECTS/ — archive NeoKamunity/ too" -ForegroundColor White
