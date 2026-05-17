# ToolCalcs daily Indexing API campaign — invoked by Task Scheduler at 09:00.
# Logs to logs/seo/scheduler-YYYY-MM-DD.log (always under main repo dir).

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

# Run npm and capture both streams
$output = & cmd /c "`"$npmCmd`" run seo:reindex -- --limit=200" 2>&1
$output | ForEach-Object { $_.ToString() } | Add-Content $LogFile
"=== exit code: $LASTEXITCODE ===" | Add-Content $LogFile
