@echo off
echo Running Daily Intel Collector...
cd "%~dp0"
python scripts\daily_intel_collector.py
echo Intel collection complete. Check your Inbox/reports folder.
pause
