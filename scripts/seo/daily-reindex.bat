@echo off
REM ToolCalcs daily Indexing API campaign — invoked by Task Scheduler at 09:00.
REM Logs are appended to logs/seo/scheduler-YYYY-MM-DD.log (date in local time).

cd /d C:\Users\master\Projects\toolcalcs

set LOGDIR=logs\seo
if not exist "%LOGDIR%" mkdir "%LOGDIR%"

set DATE_TAG=%date:~0,4%-%date:~5,2%-%date:~8,2%
set LOGFILE=%LOGDIR%\scheduler-%DATE_TAG%.log

echo. >> "%LOGFILE%"
echo === %date% %time% === >> "%LOGFILE%"
call npm run seo:reindex -- --limit=200 >> "%LOGFILE%" 2>&1
echo === exit code: %errorlevel% === >> "%LOGFILE%"
