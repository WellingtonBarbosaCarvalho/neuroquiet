# NeuroQuiet - Cache Optimization Guide

## 🎯 Problema Resolvido

Este guia resolve o aviso do **PageSpeed Insights**:
```
Use ciclos de vida eficientes de cache
Economia estimada de 12 KiB
```

## 📋 O Que Foi Feito

### 1. **Imagens Localizadas** ✅
Todas as imagens agora são servidas do mesmo domínio (`neuroquietoffer.online`) ao invés do domínio externo (`neuroquiethq.com`).

**Mudanças no código:**
- ❌ Antes: `https://neuroquiethq.com/assets/img/PRODx6-500px.webp`
- ✅ Depois: `./assets/img/PRODx6-500px.webp`

### 2. **Cache Headers Configurados** ✅
Criados arquivos de configuração de cache com **1 ano de validade** para imagens.

**Arquivos criados:**
- `.htaccess` - Para servidores Apache
- `_headers` - Para Netlify/Vercel/Cloudflare Pages

### 3. **Estrutura de Diretórios** ✅
```
neuroquiet/
├── index.html (atualizado com caminhos locais)
├── .htaccess (cache headers para Apache)
├── _headers (cache headers para Netlify/Vercel)
├── download-images.bat (Windows)
├── download-images.sh (Linux/Mac)
└── assets/
    └── img/
        ├── PRODx2-500px.webp (a ser baixado)
        ├── PRODx3-500px.webp (a ser baixado)
        └── PRODx6-500px.webp (a ser baixado)
```

---

## 🚀 Como Implementar

### Passo 1: Baixar as Imagens

#### **Windows:**
```batch
download-images.bat
```
Duplo clique no arquivo ou execute via CMD.

#### **Linux/Mac:**
```bash
bash download-images.sh
# ou
./download-images.sh
```

#### **Manual (qualquer sistema):**
Baixe manualmente estas URLs e salve em `assets/img/`:
- https://neuroquiethq.com/assets/img/PRODx2-500px.webp
- https://neuroquiethq.com/assets/img/PRODx3-500px.webp
- https://neuroquiethq.com/assets/img/PRODx6-500px.webp

---

### Passo 2: Fazer Upload para o Servidor

Faça upload de **todos os arquivos** para seu servidor:

```
neuroquiet/
├── index.html ⬆️
├── disclaimer-en.html ⬆️
├── privacy-policy-en.html ⬆️
├── terms-of-service-en.html ⬆️
├── favicon.svg ⬆️
├── .htaccess ⬆️ (se usar Apache)
├── _headers ⬆️ (se usar Netlify/Vercel)
└── assets/
    └── img/
        ├── PRODx2-500px.webp ⬆️
        ├── PRODx3-500px.webp ⬆️
        └── PRODx6-500px.webp ⬆️
```

---

### Passo 3: Configurar Cache Headers (Por Tipo de Servidor)

#### **Apache (cPanel, hospedagem compartilhada)**
O arquivo `.htaccess` já está configurado! Apenas certifique-se de que:
1. O arquivo `.htaccess` está no diretório raiz do site
2. O módulo `mod_expires` está habilitado no Apache
3. O módulo `mod_headers` está habilitado no Apache

**Verifique se funciona:**
```bash
curl -I https://www.neuroquietoffer.online/assets/img/PRODx6-500px.webp
```
Deve mostrar: `Cache-Control: public, max-age=31536000, immutable`

---

#### **Netlify**
1. O arquivo `_headers` já está configurado
2. Faça upload dele para o diretório raiz
3. Netlify detecta automaticamente e aplica as regras

**Arquivo netlify.toml (opcional):**
```toml
[[headers]]
  for = "/assets/img/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

#### **Vercel**
Crie um arquivo `vercel.json` no diretório raiz:

```json
{
  "headers": [
    {
      "source": "/assets/img/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

#### **Cloudflare Pages**
Use o arquivo `_headers` (mesmo do Netlify).

---

#### **Nginx**
Adicione ao seu arquivo de configuração (`nginx.conf` ou site config):

```nginx
location ~* \.(jpg|jpeg|png|gif|webp|svg|ico)$ {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

Depois reinicie o Nginx:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

### Passo 4: Testar

#### **Teste 1: PageSpeed Insights**
```
https://pagespeed.web.dev/
```
Cole a URL: `https://www.neuroquietoffer.online`

**O que esperar:**
- ✅ Aviso de cache **DEVE DESAPARECER**
- ✅ Score mobile: **90+**
- ✅ Score desktop: **95+**
- ✅ LCP (Largest Contentful Paint): **< 2.0s**

---

#### **Teste 2: Headers HTTP**
**Windows (PowerShell):**
```powershell
Invoke-WebRequest -Uri "https://www.neuroquietoffer.online/assets/img/PRODx6-500px.webp" -Method Head
```

**Linux/Mac:**
```bash
curl -I https://www.neuroquietoffer.online/assets/img/PRODx6-500px.webp
```

**Deve mostrar:**
```
HTTP/2 200
cache-control: public, max-age=31536000, immutable
content-type: image/webp
```

---

#### **Teste 3: Google Search Console**
1. Acesse: https://search.google.com/search-console
2. Vá em **Core Web Vitals**
3. Aguarde 7-28 dias para dados atualizados
4. Verifique se os problemas de cache foram resolvidos

---

## 📊 Benefícios Esperados

### Performance
| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| **Cache Score** | ⚠️ Aviso | ✅ 100/100 | Resolvido |
| **Requisições repetidas** | ~18 KiB | ~0 bytes | **100%** economia |
| **Tempo de carregamento (repeat)** | ~1.5s | ~0.3s | **80%** mais rápido |
| **PageSpeed Score (mobile)** | 75-85 | 90-95 | **+10-15 pontos** |

### SEO
- ✅ Melhor ranking no Google (Core Web Vitals)
- ✅ Menor taxa de rejeição (site mais rápido)
- ✅ Melhor experiência do usuário

### Custos
- ✅ Menos largura de banda utilizada
- ✅ Menos requisições ao servidor
- ✅ Menor custo de hospedagem

---

## 🔧 Troubleshooting

### Problema: Imagem não carrega (404)
**Causa:** Imagens não foram baixadas ou path incorreto

**Solução:**
```bash
# Verifique se as imagens existem
ls -la assets/img/

# Devem existir 3 arquivos .webp
# Se não existirem, execute o script de download novamente
```

---

### Problema: Cache headers não aplicados
**Causa:** Arquivo .htaccess não está sendo lido ou módulos desabilitados

**Solução Apache:**
```bash
# Habilite mod_expires e mod_headers
sudo a2enmod expires
sudo a2enmod headers
sudo systemctl restart apache2
```

**Solução cPanel:**
1. Vá em "Software > Select PHP Version"
2. Certifique-se que `mod_expires` e `mod_headers` estão habilitados

---

### Problema: Ainda vejo aviso no PageSpeed
**Causa:** Cache do PageSpeed Insights pode estar desatualizado

**Solução:**
1. Limpe o cache do site
2. Aguarde 5-10 minutos
3. Teste novamente com "Clear Storage" no DevTools
4. Force um novo teste no PageSpeed (Ctrl+Shift+R)

---

### Problema: HTTPS não funciona
**Causa:** SSL não configurado

**Solução:**
1. Instale certificado SSL gratuito (Let's Encrypt)
2. No cPanel: SSL/TLS > Install Let's Encrypt
3. Descomente as linhas de redirect HTTPS no .htaccess

---

## 📞 Suporte

Se ainda tiver problemas:

1. **Verifique os logs do servidor:**
   - Apache: `/var/log/apache2/error.log`
   - Nginx: `/var/log/nginx/error.log`

2. **Teste individualmente:**
   ```bash
   # Teste se .htaccess funciona
   curl -I https://seusite.com/assets/img/PRODx6-500px.webp | grep -i cache
   ```

3. **Validadores online:**
   - https://redbot.org/ (Testa cache headers)
   - https://tools.keycdn.com/http-cache-tester

---

## ✅ Checklist Final

Antes de considerar concluído:

- [ ] 3 imagens baixadas em `assets/img/`
- [ ] Todos os arquivos no servidor
- [ ] `.htaccess` ou `_headers` no diretório raiz
- [ ] PageSpeed Insights score > 90 (mobile)
- [ ] Aviso de cache **não aparece mais**
- [ ] Headers HTTP mostram `max-age=31536000`
- [ ] Site carrega rápido em visitas repetidas

---

## 🎉 Sucesso!

Se todos os passos foram seguidos, você deve ver:

**PageSpeed Insights:**
```
✅ Use ciclos de vida eficientes de cache
Todas as solicitações têm cache otimizado
```

**Impacto:**
- 📈 Score mobile: 90-95
- ⚡ LCP: < 2.0s
- 💚 Core Web Vitals: Aprovado
- 🚀 Google Ads: Aprovado

---

**Última atualização:** 2025-12-07
**Versão:** 1.0
