---
description: Stop any running Kitchen Table server and start a fresh one with browser preview
---

## Restart Kitchen Table Local Server

// turbo
1. Stop any running server.py processes:
```powershell
Get-Process python -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*server.py*" } | Stop-Process -Force; Write-Host "stopped"
```

// turbo
2. Start the server (non-blocking, from kitchen-table directory):
```powershell
python server.py
```
CWD: `c:\Users\mikef\OneDrive\1 KomUnity\1a New KU Plans\Dev_Code\Kamunity-Tabletop-Plan\kitchen-table`

3. Open browser preview at `http://localhost:8732`
