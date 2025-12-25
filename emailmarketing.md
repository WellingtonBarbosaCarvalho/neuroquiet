# Estratégia de Captação de Leads Multilíngue - Affiliate Marketing

## 1. Objetivo do Projeto
Implementar um sistema de captura de leads (e-mails) de alta conversão para o mercado internacional. O sistema deve detectar o idioma do navegador do usuário para exibir a oferta no idioma nativo (Alemão, Francês ou Inglês) e salvar esses dados para remarketing segmentado.

## 2. Arquitetura Técnica (Versão 3.0)
- **Frontend:** Landing Page (Vercel) com Dicionário JavaScript (Smart Selector).
- **Database:** Google Sheets com 5 colunas: **Data | Email | Produto | Origem | Idioma**.
- **Backend/API:** Google Apps Script (Versão 3).
  - **URL da API:** `https://script.google.com/macros/s/AKfycbwhT89C7AGEnwneBKsh_1rkkCfRAKnjKrgqEpI3C9Zf7LESqh5guymIXn6nEXFyRg4/exec`

## 3. Fluxo de Captura de Leads

### 3.1. Gatilho: Exit Intent
- **Desktop:** Mouse sai da viewport (movimento para fechar aba)
- **Mobile:** Scroll-up repetido após 300px de rolagem (3x)
- **Frequência:** Uma vez por sessão (via `sessionStorage`)

### 3.2. Sequência de Eventos
1. Usuário tenta sair da página → **Exit Intent detectado**
2. Sistema detecta idioma via `navigator.language` (ex: "de-CH", "fr-FR", "en-US")
3. Popup aparece com conteúdo traduzido automaticamente
4. Usuário preenche e-mail → clica no CTA
5. Dados enviados para Google Sheets via `fetch()` (mode: `no-cors`)
6. Redirecionamento imediato para link de afiliado (melhor pacote)

### 3.3. Dados Capturados
```json
{
  "email": "user@example.com",
  "product": "ErectogenX",
  "source": "erectogenx",
  "language": "de-CH"
}
```

## 4. Implementação do Dicionário Inteligente (i18n)

### 4.1. Estrutura HTML com Atributos `data-i18n`

Todos os textos do popup devem usar atributos `data-i18n` para permitir tradução dinâmica:

```html
<div id="exitPopup" class="exit-popup-overlay" style="display: none;">
    <div class="exit-popup-content">
        <button class="exit-popup-close" onclick="closeExitPopup()">&times;</button>
        <div class="exit-popup-header">
            <h2 data-i18n="popup_headline">⏰ Warten Sie!</h2>
            <p>
                <span data-i18n="popup_subheadline_prefix">Erhalten Sie </span>
                <strong data-i18n="popup_discount">10% EXTRA-RABATT</strong>
                <span data-i18n="popup_subheadline_suffix"> direkt in Ihrem Posteingang</span>
            </p>
        </div>
        <form id="exitEmailForm" onsubmit="handleExitEmailSubmit(event)">
            <input
                type="email"
                id="exitEmail"
                placeholder="Ihre E-Mail-Adresse"
                data-i18n-placeholder="popup_placeholder"
                required
            >
            <button type="submit" data-i18n="popup_cta">
                Rabatt sichern
            </button>
        </form>
        <p data-i18n="popup_privacy">🔒 Ihre Daten sind sicher. Kein Spam.</p>
    </div>
</div>
```

### 4.2. Dicionário JavaScript Padrão

Cada produto deve incluir traduções completas para **DE, FR e EN**:

```javascript
const dictionary = {
    "de": {
        "popup_headline": "⏰ Warten Sie!",
        "popup_subheadline_prefix": "Erhalten Sie ",
        "popup_discount": "10% EXTRA-RABATT",
        "popup_subheadline_suffix": " direkt in Ihrem Posteingang",
        "popup_placeholder": "Ihre E-Mail-Adresse",
        "popup_cta": "Rabatt sichern",
        "popup_privacy": "🔒 Ihre Daten sind sicher. Kein Spam.",
        "popup_loading": "Wird gesendet..."
    },
    "fr": {
        "popup_headline": "⏰ Attendez !",
        "popup_subheadline_prefix": "Recevez ",
        "popup_discount": "10% DE RÉDUCTION SUPPLÉMENTAIRE",
        "popup_subheadline_suffix": " directement dans votre boîte mail",
        "popup_placeholder": "Votre adresse e-mail",
        "popup_cta": "Obtenir la réduction",
        "popup_privacy": "🔒 Vos données sont sécurisées. Pas de spam.",
        "popup_loading": "Envoi en cours..."
    },
    "en": {
        "popup_headline": "⏰ Wait!",
        "popup_subheadline_prefix": "Get an ",
        "popup_discount": "EXCLUSIVE 10% DISCOUNT",
        "popup_subheadline_suffix": " sent to your inbox",
        "popup_placeholder": "Enter your email address",
        "popup_cta": "Claim My Discount",
        "popup_privacy": "🔒 Your data is safe. No spam, ever.",
        "popup_loading": "Sending..."
    }
};
```

### 4.3. Função de Detecção e Aplicação

```javascript
// Detecta idioma do navegador e aplica traduções
function applyTranslations() {
    const userLang = navigator.language.split('-')[0];
    const lang = dictionary[userLang] ? userLang : "de"; // Fallback para idioma padrão

    // Aplica tradução em elementos com data-i18n
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dictionary[lang][key]) {
            el.textContent = dictionary[lang][key];
        }
    });

    // Aplica tradução em placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (dictionary[lang][key]) {
            el.placeholder = dictionary[lang][key];
        }
    });

    return lang; // Retorna o idioma detectado
}
```

### 4.4. Integração com Exit Intent

```javascript
function showExitPopup() {
    if (!exitPopupShown) {
        detectedLang = applyTranslations(); // Aplica traduções ANTES de mostrar popup
        document.getElementById('exitPopup').style.display = 'flex';
        exitPopupShown = true;
        sessionStorage.setItem('exitPopupShown', 'true');
    }
}
```

## 5. Configuração por Produto

### 5.1. Produtos Implementados

| Produto | Arquivo | Idioma Padrão | Idiomas | Link Afiliado (6 garrafas) | Status |
|---------|---------|---------------|---------|---------------------------|--------|
| **ErectogenX** | erectogenx.html | `de` | DE, FR, EN | 637527 | ✅ Implementado |
| **SlimSana** | slimsana.html | `de` | DE, FR, EN | 638018 | ✅ Implementado |
| **PureMoringa** | puremoringa.html | `en` | EN, DE, FR | 626413 | ✅ Implementado |

### 5.2. Regras de Idioma Padrão (Fallback)

- **Produtos Alemães** (ErectogenX, SlimSana, GlucoTrust): `"de"`
- **Produtos Ingleses** (PureMoringa): `"en"`
- **Produtos Franceses**: `"fr"`

**Importante:** O idioma padrão é usado quando `navigator.language` não corresponde a nenhum dos idiomas do dicionário.

## 6. Envio de Dados para Google Sheets

### 6.1. Código de Envio (Frontend)

```javascript
function handleExitEmailSubmit(event) {
    event.preventDefault();

    const emailInput = document.getElementById('exitEmail');
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const paginaOrigem = window.location.pathname.split("/").pop().replace(".html", "") || "home";

    // Mostra loading traduzido
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = dictionary[detectedLang]["popup_loading"];
    }

    // Envia dados para Google Sheets
    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: emailInput.value,
            product: PRODUCT_NAME,
            source: paginaOrigem,
            language: navigator.language // Ex: "de-CH", "fr-FR", "en-US"
        })
    })
    .then(() => {
        window.location.href = AFFILIATE_LINK;
    })
    .catch(() => {
        window.location.href = AFFILIATE_LINK; // Redireciona mesmo se falhar
    });
}
```

### 6.2. Google Apps Script (Backend - Versão 3)

```javascript
function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Leads") || ss.getSheets()[0];

  try {
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter;
    }

    // Registra os dados: Data/Hora | Email | Produto | Origem | Idioma
    sheet.appendRow([
      new Date(),
      data.email || "E-mail vazio",
      data.product || "Produto não identificado",
      data.source || "Origem desconhecida",
      data.language || "Idioma desconhecido"
    ]);

    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 6.3. Estrutura da Planilha Google

A aba "Leads" deve ter os seguintes cabeçalhos na primeira linha:

| Data/Hora | Email | Produto | Origem | Idioma |
|-----------|-------|---------|--------|--------|
| 2025-01-15 10:30:45 | user@example.com | ErectogenX | erectogenx | de-CH |
| 2025-01-15 11:05:12 | autre@example.fr | SlimSana | slimsana | fr-FR |

## 7. Regras Críticas de Implementação

### 7.1. Mercados Multilingues (Suíça, Bélgica)

**⚠️ OBRIGATÓRIO:** Para produtos que atuam em mercados multilingues:
- **SEMPRE** incluir DE, FR e EN no dicionário
- Evita perda de leads por barreira linguística
- Exemplo: Usuário suíço francófono (fr-CH) NÃO deve ver popup em alemão

### 7.2. Customização por Produto

Ao adicionar um novo produto, o agente deve:

1. **Verificar mercado-alvo:**
   - DACH (Alemanha, Áustria, Suíça) → Priorizar `de`, incluir `fr` e `en`
   - EUA/Internacional → Priorizar `en`, incluir `de` e `fr`
   - França/Suíça Francesa → Priorizar `fr`, incluir `de` e `en`

2. **Configurar variáveis:**
```javascript
const SCRIPT_URL = 'https://script.google.com/.../exec';
const PRODUCT_NAME = 'NomeDoProduto';
const AFFILIATE_LINK = 'https://www.checkout-ds24.com/product/XXXXX?aff=sentinela&cam=EXITPOPUP';
let detectedLang = 'de'; // Idioma padrão do produto
```

3. **Criar dicionário completo** com DE, FR e EN

4. **Testar** com diferentes idiomas:
```javascript
// Console do navegador
sessionStorage.removeItem('exitPopupShown');
Object.defineProperty(navigator, 'language', { value: 'de-CH', configurable: true });
showExitPopup();
```

## 8. Segmentação de E-mail Marketing

### 8.1. Uso do Campo `language`

O campo `language` permite campanhas de e-mail segmentadas:

- **de-CH, de-AT, de-DE** → E-mails em Alemão
- **fr-CH, fr-FR, fr-BE** → E-mails em Francês
- **en-US, en-GB, en-CA** → E-mails em Inglês

### 8.2. Próximos Passos (Automação)

Implementar no Google Apps Script usando `MailApp` ou `GmailApp`:

```javascript
function sendWelcomeEmail(email, product, language) {
  const lang = language.split('-')[0]; // "de-CH" → "de"

  const templates = {
    "de": {
      subject: "Willkommen! Ihr exklusiver Rabatt wartet",
      body: "Hallo,\n\nVielen Dank für Ihr Interesse an " + product + "..."
    },
    "fr": {
      subject: "Bienvenue ! Votre réduction exclusive vous attend",
      body: "Bonjour,\n\nMerci pour votre intérêt pour " + product + "..."
    },
    "en": {
      subject: "Welcome! Your exclusive discount awaits",
      body: "Hello,\n\nThank you for your interest in " + product + "..."
    }
  };

  const template = templates[lang] || templates["en"];

  MailApp.sendEmail({
    to: email,
    subject: template.subject,
    body: template.body
  });
}
```

## 9. Checklist de Implementação

Ao adicionar um novo produto:

- [ ] Criar estrutura HTML com atributos `data-i18n`
- [ ] Implementar dicionário com DE, FR e EN
- [ ] Configurar `PRODUCT_NAME` e `AFFILIATE_LINK`
- [ ] Definir idioma padrão correto (fallback)
- [ ] Implementar `applyTranslations()` no `showExitPopup()`
- [ ] Adicionar campo `language` no `fetch()` body
- [ ] Testar com 3 idiomas diferentes
- [ ] Verificar logs no console do navegador
- [ ] Confirmar dados na planilha Google Sheets
- [ ] Testar redirecionamento para link de afiliado

## 10. Troubleshooting

### Popup não aparece traduzido?
- Verificar se `applyTranslations()` é chamado ANTES de `display: flex`
- Checar se os atributos `data-i18n` estão corretos
- Confirmar que o idioma existe no dicionário

### Dados não chegam na planilha?
- Verificar URL do `SCRIPT_URL`
- Confirmar que o script está implantado como "Qualquer pessoa"
- Checar logs de execução no Apps Script (ícone de relógio ⏱️)

### Idioma errado detectado?
- Usar console: `console.log(navigator.language)`
- Verificar fallback no código: `dictionary[userLang] ? userLang : "de"`

---

**Versão:** 3.0
**Última Atualização:** 2025-01-15
**Produtos Ativos:** ErectogenX, SlimSana, PureMoringa
