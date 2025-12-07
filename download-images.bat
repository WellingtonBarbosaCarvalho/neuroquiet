@echo off
REM NeuroQuiet - Script para baixar imagens do servidor externo
REM Execute este arquivo para baixar as imagens necessarias

echo ========================================
echo NeuroQuiet - Download de Imagens
echo ========================================
echo.
echo Baixando imagens do servidor externo...
echo.

REM Criar diretorio se nao existir
if not exist "assets\img\" mkdir "assets\img\"

REM Baixar as 3 imagens de produtos usando PowerShell
echo [1/3] Baixando PRODx2-500px.webp...
powershell -Command "Invoke-WebRequest -Uri 'https://neuroquiethq.com/assets/img/PRODx2-500px.webp' -OutFile 'assets\img\PRODx2-500px.webp'"

echo [2/3] Baixando PRODx3-500px.webp...
powershell -Command "Invoke-WebRequest -Uri 'https://neuroquiethq.com/assets/img/PRODx3-500px.webp' -OutFile 'assets\img\PRODx3-500px.webp'"

echo [3/3] Baixando PRODx6-500px.webp...
powershell -Command "Invoke-WebRequest -Uri 'https://neuroquiethq.com/assets/img/PRODx6-500px.webp' -OutFile 'assets\img\PRODx6-500px.webp'"

echo.
echo ========================================
echo Download concluido!
echo ========================================
echo.
echo Imagens salvas em: assets\img\
echo.
echo Proximos passos:
echo 1. Verifique se as 3 imagens foram baixadas corretamente
echo 2. Faca upload de todos os arquivos para seu servidor
echo 3. Certifique-se de que o arquivo .htaccess esta no diretorio raiz
echo 4. Teste o site no PageSpeed Insights
echo.
echo O aviso de cache deve desaparecer!
echo.
pause
