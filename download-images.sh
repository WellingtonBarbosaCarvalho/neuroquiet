#!/bin/bash
# NeuroQuiet - Script para baixar imagens do servidor externo
# Execute este arquivo para baixar as imagens necessárias
# Uso: bash download-images.sh ou ./download-images.sh

echo "========================================"
echo "NeuroQuiet - Download de Imagens"
echo "========================================"
echo ""
echo "Baixando imagens do servidor externo..."
echo ""

# Criar diretório se não existir
mkdir -p assets/img

# Baixar as 3 imagens de produtos usando curl ou wget
if command -v curl &> /dev/null; then
    DOWNLOAD_CMD="curl -o"
    echo "Usando curl para download..."
elif command -v wget &> /dev/null; then
    DOWNLOAD_CMD="wget -O"
    echo "Usando wget para download..."
else
    echo "ERRO: curl ou wget não encontrado!"
    echo "Por favor, instale curl ou wget e tente novamente."
    exit 1
fi

echo "[1/3] Baixando PRODx2-500px.webp..."
$DOWNLOAD_CMD assets/img/PRODx2-500px.webp https://neuroquiethq.com/assets/img/PRODx2-500px.webp

echo "[2/3] Baixando PRODx3-500px.webp..."
$DOWNLOAD_CMD assets/img/PRODx3-500px.webp https://neuroquiethq.com/assets/img/PRODx3-500px.webp

echo "[3/3] Baixando PRODx6-500px.webp..."
$DOWNLOAD_CMD assets/img/PRODx6-500px.webp https://neuroquiethq.com/assets/img/PRODx6-500px.webp

echo ""
echo "========================================"
echo "Download concluído!"
echo "========================================"
echo ""
echo "Imagens salvas em: assets/img/"
echo ""
echo "Próximos passos:"
echo "1. Verifique se as 3 imagens foram baixadas corretamente"
echo "2. Faça upload de todos os arquivos para seu servidor"
echo "3. Certifique-se de que o arquivo .htaccess está no diretório raiz"
echo "4. Teste o site no PageSpeed Insights"
echo ""
echo "O aviso de cache deve desaparecer!"
echo ""
