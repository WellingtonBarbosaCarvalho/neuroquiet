@echo off
REM NeuroQuiet - Download Poppins Fonts (Self-hosted)
REM Este script baixa as fontes Poppins do Google Fonts para hospedar localmente

echo ========================================
echo NeuroQuiet - Download de Fontes
echo ========================================
echo.
echo Baixando fontes Poppins (woff2)...
echo.

REM Criar diretorio se nao existir
if not exist "assets\fonts\" mkdir "assets\fonts\"

echo [1/6] Baixando Poppins Regular (400)...
powershell -Command "Invoke-WebRequest -Uri 'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2' -OutFile 'assets\fonts\poppins-400.woff2'"

echo [2/6] Baixando Poppins Medium (500)...
powershell -Command "Invoke-WebRequest -Uri 'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1xlFd2JQEk.woff2' -OutFile 'assets\fonts\poppins-500.woff2'"

echo [3/6] Baixando Poppins SemiBold (600)...
powershell -Command "Invoke-WebRequest -Uri 'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6Z1xlFd2JQEk.woff2' -OutFile 'assets\fonts\poppins-600.woff2'"

echo [4/6] Baixando Poppins Bold (700)...
powershell -Command "Invoke-WebRequest -Uri 'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1xlFd2JQEk.woff2' -OutFile 'assets\fonts\poppins-700.woff2'"

echo [5/6] Baixando Poppins ExtraBold (800)...
powershell -Command "Invoke-WebRequest -Uri 'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDD4Z1xlFd2JQEk.woff2' -OutFile 'assets\fonts\poppins-800.woff2'"

echo [6/6] Baixando Poppins Black (900)...
powershell -Command "Invoke-WebRequest -Uri 'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLBT5Z1xlFd2JQEk.woff2' -OutFile 'assets\fonts\poppins-900.woff2'"

echo.
echo ========================================
echo Download de fontes concluido!
echo ========================================
echo.
echo Fontes salvas em: assets\fonts\
echo Total: 6 arquivos (aproximadamente 50 KB)
echo.
echo Proximos passos:
echo 1. As fontes foram baixadas localmente
echo 2. O HTML sera atualizado para usar fontes locais
echo 3. Isso elimina o bloqueio de renderizacao do Google Fonts
echo 4. Economia esperada: ~750ms (renderizacao bloqueada)
echo.
pause
