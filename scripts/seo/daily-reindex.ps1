# ToolCalcs daily SEO campaign — invoked by Task Scheduler at 04:00 KST.
# Steps:
#   1. Indexing API reindex (npm run seo:reindex --limit=200)
#   2. Efficacy check (npm run seo:efficacy --days=2)
# Both write to logs/seo/scheduler-YYYY-MM-DD.log under the main repo dir.

$ErrorActionPreference = 'Continue'
$ProjectDir = 'C:\Users\master\Projects\toolcalcs'
$LogDir = Join-Path $ProjectDir 'logs\seo'
$Date = Get-Date -Format 'yyyy-MM-dd'
$LogFile = Join-Path $LogDir "scheduler-$Date.log"

New-Item -ItemType Directory -Path $LogDir -Force | Out-Null

"" | Add-Content $LogFile
"=== $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') ===" | Add-Content $LogFile
"CWD: $ProjectDir" | Add-Content $LogFile

Set-Location $ProjectDir
$npmCmd = 'C:\Program Files\nodejs\npm.cmd'
if (-not (Test-Path $npmCmd)) {
  "ERROR: npm.cmd not found at $npmCmd" | Add-Content $LogFile
  exit 1
}

# Pre-flight: the GSC service-account credential lives on x:\ — a RaiDrive
# network mount (\\RaiDrive-master\jupjupday.kr) that is occasionally not yet
# mounted when the 04:00 trigger fires (observed 2026-06-02). Wait/retry for it
# rather than failing both steps with a generic ENOENT.
$CredPath = 'x:\www\storage\credentials\river-overview-384807-53137236c33c.json'
$credReady = $false
for ($i = 1; $i -le 10; $i++) {
  if (Test-Path $CredPath) { $credReady = $true; break }
  "WARN: credential not reachable (attempt $i/10): $CredPath — waiting 30s for x:\ mount" | Add-Content $LogFile
  Start-Sleep -Seconds 30
}
if (-not $credReady) {
  "ERROR: credential still unreachable after 10 attempts (5 min). x:\ drive (RaiDrive) likely unmounted. Aborting — will retry at next 04:00 trigger." | Add-Content $LogFile
  exit 1
}
"OK: credential reachable at $CredPath" | Add-Content $LogFile

# Step 1: Indexing API reindex (200 URLs)
"--- step 1: seo:reindex (200 URLs) ---" | Add-Content $LogFile
$output = & cmd /c "`"$npmCmd`" run seo:reindex -- --limit=200" 2>&1
$output | ForEach-Object { $_.ToString() } | Add-Content $LogFile
$reindexExit = $LASTEXITCODE
"=== step 1 exit code: $reindexExit ===" | Add-Content $LogFile

# Step 2: Efficacy check (--days=2 covers yesterday's reindex + today's,
# so we accumulate transition history without re-inspecting the full week's
# batch every day, which would burn URL Inspection quota).
"" | Add-Content $LogFile
"--- step 2: seo:efficacy --days=2 ---" | Add-Content $LogFile
$output2 = & cmd /c "`"$npmCmd`" run seo:efficacy -- --days=2" 2>&1
$output2 | ForEach-Object { $_.ToString() } | Add-Content $LogFile
"=== step 2 exit code: $LASTEXITCODE ===" | Add-Content $LogFile
