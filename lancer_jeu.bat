@echo off
cd /d "%~dp0"
echo Grand Theft Roazhon - serveur local sur http://localhost:8000 (fermer cette fenetre pour arreter)
start "" http://localhost:8000
python -m http.server 8000 || py -m http.server 8000
pause
