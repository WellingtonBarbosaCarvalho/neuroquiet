# Estratégia de Internacionalização (i18n) - Mercados & Idiomas

## 📍 Visão Geral

Este documento define a estratégia de idiomas para cada mercado-alvo. O objetivo é garantir que **100% dos visitantes** vejam o site no idioma nativo, maximizando conversão e eliminando barreiras linguísticas.

---

## 🌍 Mercados-Alvo e Idiomas

### 1. **DACH (Alemanha, Áustria, Suíça Alemã)**

| País | Idiomas Obrigatórios | Idioma Padrão | Observações |
|------|---------------------|---------------|-------------|
| 🇩🇪 Alemanha | DE, EN | `de` | 99% fala alemão |
| 🇦🇹 Áustria | DE, EN | `de` | 98% fala alemão |
| 🇨🇭 Suíça | **DE, FR, IT, EN** | `de` | Caso especial (ver abaixo) |

**Produtos neste mercado:** ErectogenX, SlimSana, GlucoTrust

---

### 2. **Suíça 🇨🇭 - Caso Especial (4 Idiomas Oficiais)**

A Suíça é um mercado **multilíngue complexo** que exige 4 idiomas:

#### Distribuição Linguística:

| Idioma | Região | % População | Cantões Principais | Código |
|--------|--------|-------------|-------------------|--------|
| **Alemão** | Norte/Centro/Leste | 63% | Zurique, Berna, Basileia, Lucerna | `de-CH` |
| **Francês** | Oeste (Romandy) | 23% | Genebra, Lausanne, Neuchâtel, Friburgo | `fr-CH` |
| **Italiano** | Sul (Ticino) | 8% | Lugano, Bellinzona, Locarno | `it-CH` |
| **Inglês** | Cidades/Turismo | - | Zurique, Genebra (expatriados) | `en-*` |

**Romanche** (0.5%, Grisões): NÃO implementar - falantes usam alemão ou italiano como segunda língua.

#### ⚠️ Regra Crítica:
**SEMPRE** incluir DE, FR, IT e EN em produtos destinados à Suíça. Não fazer isso resulta em perda de 31% do mercado (FR + IT).

---

### 3. **França 🇫🇷**

| País | Idiomas Obrigatórios | Idioma Padrão | Observações |
|------|---------------------|---------------|-------------|
| 🇫🇷 França | FR, EN | `fr` | 97% fala francês |

**Produtos neste mercado:** (A definir)

---

### 4. **Itália 🇮🇹**

| País | Idiomas Obrigatórios | Idioma Padrão | Observações |
|------|---------------------|---------------|-------------|
| 🇮🇹 Itália | IT, EN | `it` | 95% fala italiano |

**Produtos neste mercado:** (A definir)

---

### 5. **EUA 🇺🇸 / Internacional**

| País | Idiomas Obrigatórios | Idioma Padrão | Observações |
|------|---------------------|---------------|-------------|
| 🇺🇸 EUA | EN | `en` | Mercado anglófono |
| 🇬🇧 Reino Unido | EN | `en` | Mercado anglófono |
| 🇨🇦 Canadá | EN, FR | `en` | Considerar FR no futuro |
| 🌐 Outros | EN | `en` | Fallback universal |

**Produtos neste mercado:** PureMoringa

---

## 🎯 Matriz de Decisão: Qual Idioma Implementar?

Use esta tabela para decidir rapidamente quais idiomas incluir:

| Mercado-Alvo | Idiomas Obrigatórios | Idiomas Opcionais | Idioma Padrão (Fallback) |
|--------------|---------------------|-------------------|--------------------------|
| **Alemanha** | DE, EN | - | `de` |
| **Áustria** | DE, EN | - | `de` |
| **Suíça** | **DE, FR, IT, EN** | - | `de` |
| **França** | FR, EN | - | `fr` |
| **Itália** | IT, EN | - | `it` |
| **EUA/Internacional** | EN | - | `en` |
| **DACH Geral** | DE, FR, IT, EN | - | `de` |

### 📌 Regra Geral:
- **Mercado único** (Alemanha, França): 2 idiomas (nativo + EN)
- **Mercado DACH completo**: 4 idiomas (DE, FR, IT, EN)
- **Mercado internacional**: 1 idioma (EN)

---

## 🔧 Como Funciona a Detecção de Idioma

### 1. **Código de Idioma do Navegador**

O sistema detecta o idioma via `navigator.language`:

```javascript
navigator.language // Exemplos: "de-CH", "fr-FR", "it-IT", "en-US"
```

### 2. **Extração do Código de Idioma**

```javascript
const userLang = navigator.language.split('-')[0];
// "de-CH" → "de"
// "fr-FR" → "fr"
// "it-CH" → "it"
```

### 3. **Seleção com Fallback**

```javascript
const lang = dictionary[userLang] ? userLang : "de"; // Fallback para alemão
```

### 4. **Aplicação das Traduções**

```javascript
document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = dictionary[lang][key];
});
```

---

## 📊 Códigos de Idioma por Região

### Suíça 🇨🇭 (Casos Reais)

| navigator.language | Região Suíça | Idioma Selecionado | Texto Exibido |
|-------------------|--------------|-------------------|---------------|
| `de-CH` | Zurique, Berna | 🇩🇪 Alemão | "IN DEN WARENKORB" |
| `fr-CH` | Genebra, Lausanne | 🇫🇷 Francês | "AJOUTER AU PANIER" |
| `it-CH` | Lugano, Ticino | 🇮🇹 Italiano | "AGGIUNGI AL CARRELLO" |
| `en-US` | Expatriados | 🇬🇧 Inglês | "ADD TO CART" |

### Alemanha 🇩🇪

| navigator.language | Idioma Selecionado | Texto Exibido |
|-------------------|--------------------|---------------|
| `de-DE` | 🇩🇪 Alemão | "IN DEN WARENKORB" |
| `en-US` | 🇬🇧 Inglês | "ADD TO CART" |

### França 🇫🇷

| navigator.language | Idioma Selecionado | Texto Exibido |
|-------------------|--------------------|---------------|
| `fr-FR` | 🇫🇷 Francês | "AJOUTER AU PANIER" |
| `en-US` | 🇬🇧 Inglês | "ADD TO CART" |

---

## 🛠️ Template de Implementação

### Passo 1: Estrutura HTML

Adicionar `data-i18n` em todos os textos:

```html
<h2>
    <span data-i18n="pricing_step">Schritt 1: Wählen Sie Ihr</span>
    <span data-i18n="pricing_discount_pack">Rabattpaket</span>
    <span data-i18n="pricing_out">aus</span>
</h2>

<button data-i18n="card_add_to_cart">IN DEN WARENKORB</button>

<p data-i18n="card_guarantee">60-Tage-Garantie</p>
```

### Passo 2: Dicionário JavaScript

**Mercado DACH (4 idiomas):**

```javascript
const dictionary = {
    "de": {
        "pricing_step": "Schritt 1: Wählen Sie Ihr",
        "card_add_to_cart": "IN DEN WARENKORB",
        "card_guarantee": "60-Tage-Garantie"
    },
    "fr": {
        "pricing_step": "Étape 1 : Choisissez votre",
        "card_add_to_cart": "AJOUTER AU PANIER",
        "card_guarantee": "Garantie 60 jours"
    },
    "it": {
        "pricing_step": "Passo 1: Scegli il tuo",
        "card_add_to_cart": "AGGIUNGI AL CARRELLO",
        "card_guarantee": "Garanzia 60 giorni"
    },
    "en": {
        "pricing_step": "Step 1: Choose Your",
        "card_add_to_cart": "ADD TO CART",
        "card_guarantee": "60-Day Guarantee"
    }
};
```

**Mercado França (2 idiomas):**

```javascript
const dictionary = {
    "fr": { /* traduções francesas */ },
    "en": { /* traduções inglesas */ }
};
```

### Passo 3: Função de Tradução

```javascript
function applyTranslations() {
    const userLang = navigator.language.split('-')[0];
    const lang = dictionary[userLang] ? userLang : "de"; // Ajustar fallback por mercado

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dictionary[lang][key]) {
            el.textContent = dictionary[lang][key];
        }
    });

    // Placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (dictionary[lang][key]) {
            el.placeholder = dictionary[lang][key];
        }
    });

    return lang;
}
```

### Passo 4: Aplicar no Carregamento

```javascript
// Traduz a página inteira ao carregar
window.addEventListener('DOMContentLoaded', function() {
    detectedLang = applyTranslations();
    console.log('Página traduzida para:', detectedLang);
});
```

### Passo 5: Enviar Idioma para Google Sheets

```javascript
fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: emailInput.value,
        product: PRODUCT_NAME,
        source: paginaOrigem,
        language: navigator.language // "de-CH", "fr-FR", "it-IT"
    })
});
```

---

## ✅ Checklist de Implementação

Ao adicionar um novo produto, seguir esta checklist:

### **1. Identificar Mercado-Alvo**
- [ ] Qual país/região? (Alemanha, Suíça, França, etc.)
- [ ] Consultar matriz de decisão acima
- [ ] Definir idiomas obrigatórios

### **2. Implementar HTML**
- [ ] Adicionar `data-i18n` em TODOS os textos visíveis
- [ ] Adicionar `data-i18n-placeholder` em inputs
- [ ] Verificar que nenhum texto ficou sem tradução

### **3. Criar Dicionário**
- [ ] Criar objeto `dictionary` com idiomas obrigatórios
- [ ] Garantir que TODAS as chaves existem em TODOS os idiomas
- [ ] Testar ausência de chaves (console.log para debug)

### **4. Configurar Fallback**
- [ ] Definir idioma padrão correto para o mercado:
  - DACH → `"de"`
  - França → `"fr"`
  - Itália → `"it"`
  - EUA/Internacional → `"en"`

### **5. Testar Todos os Idiomas**
- [ ] Testar com `navigator.language` alterado (console)
- [ ] Verificar que textos mudam corretamente
- [ ] Confirmar que placeholders também mudam
- [ ] Testar idioma não suportado (deve usar fallback)

### **6. Verificar Dados no Google Sheets**
- [ ] Confirmar que campo `language` está sendo enviado
- [ ] Validar formato: "de-CH", "fr-FR", "it-IT", etc.
- [ ] Testar com diferentes idiomas

---

## 🚨 Erros Comuns e Soluções

### ❌ Erro 1: Textos não mudam de idioma

**Causa:** Falta de `data-i18n` no HTML

**Solução:**
```html
<!-- ERRADO -->
<button>IN DEN WARENKORB</button>

<!-- CORRETO -->
<button data-i18n="card_add_to_cart">IN DEN WARENKORB</button>
```

---

### ❌ Erro 2: Console mostra "undefined"

**Causa:** Chave não existe em um dos idiomas

**Solução:** Garantir que TODAS as chaves existem em TODOS os idiomas:

```javascript
// ERRADO - falta "card_cta" em francês
"de": { "card_cta": "JETZT KAUFEN" },
"fr": { /* FALTA card_cta */ },
"en": { "card_cta": "BUY NOW" }

// CORRETO
"de": { "card_cta": "JETZT KAUFEN" },
"fr": { "card_cta": "ACHETER MAINTENANT" },
"en": { "card_cta": "BUY NOW" }
```

---

### ❌ Erro 3: Sempre mostra mesmo idioma

**Causa:** Fallback configurado errado ou idioma não existe no dicionário

**Solução:**
```javascript
// Verificar se o idioma está no dicionário
const lang = dictionary[userLang] ? userLang : "de";

// Debug no console
console.log('navigator.language:', navigator.language);
console.log('userLang:', userLang);
console.log('Idioma selecionado:', lang);
```

---

### ❌ Erro 4: Suíça sempre mostra alemão para francófonos

**Causa:** Falta idioma francês (FR) ou italiano (IT) no dicionário

**Solução:** Para Suíça, SEMPRE incluir 4 idiomas:
```javascript
const dictionary = {
    "de": { /* ... */ },
    "fr": { /* ... */ }, // OBRIGATÓRIO
    "it": { /* ... */ }, // OBRIGATÓRIO
    "en": { /* ... */ }
};
```

---

## 📈 Segmentação de E-mail Marketing

Usar o campo `language` para campanhas segmentadas:

### Exemplo de Segmentação:

```javascript
// Google Apps Script - Automação de E-mail
function sendWelcomeEmail(email, product, language) {
  const lang = language.split('-')[0]; // "de-CH" → "de"

  const templates = {
    "de": {
      subject: "Willkommen bei " + product,
      body: "Hallo,\n\nVielen Dank für Ihr Interesse..."
    },
    "fr": {
      subject: "Bienvenue chez " + product,
      body: "Bonjour,\n\nMerci pour votre intérêt..."
    },
    "it": {
      subject: "Benvenuto in " + product,
      body: "Ciao,\n\nGrazie per il tuo interesse..."
    },
    "en": {
      subject: "Welcome to " + product,
      body: "Hello,\n\nThank you for your interest..."
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

---

## 📚 Produtos Implementados

| Produto | Mercado | Idiomas | Fallback | Status | Arquivo |
|---------|---------|---------|----------|--------|---------|
| **ErectogenX** | DACH + Suíça | DE, FR, IT, EN | `de` | ✅ Completo | erectogenx.html |
| **SlimSana** | DACH | DE, FR, EN | `de` | ⚠️ Atualizar (adicionar IT) | slimsana.html |
| **PureMoringa** | Internacional | EN, DE, FR | `en` | ⚠️ Atualizar (adicionar IT) | puremoringa.html |
| **GlucoTrust** | DACH | - | - | ❌ Não implementado | glucotrust.html |

### Ações Necessárias:
- [ ] **SlimSana:** Adicionar tradução italiana (IT)
- [ ] **PureMoringa:** Adicionar tradução italiana (IT)
- [ ] **GlucoTrust:** Implementar i18n completo (DE, FR, IT, EN)

---

## 🎓 Glossário de Termos

| Termo | Significado |
|-------|-------------|
| **i18n** | Internacionalização (i + 18 letras + n) |
| **Fallback** | Idioma padrão usado quando o idioma do usuário não está disponível |
| **DACH** | Alemanha (D), Áustria (A), Suíça (CH) - mercado germanófono |
| **Romandy** | Região francófona da Suíça (oeste) |
| **Ticino** | Região italófona da Suíça (sul) |
| **navigator.language** | API do navegador que retorna o idioma do usuário |
| **data-i18n** | Atributo HTML usado para marcar textos traduzíveis |

---

## 🔗 Referências

- **ErectogenX (Referência Completa):** `erectogenx.html` (linhas 1029-1760)
- **Documentação de E-mail Marketing:** `emailmarketing.md`
- **Códigos de idioma ISO 639-1:** https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes

---

**Versão:** 1.0
**Última Atualização:** 2025-01-15
**Idiomas Suportados:** DE, FR, IT, EN
**Produtos com i18n Completo:** ErectogenX

---

## 🚀 Próximos Passos

1. Implementar IT em SlimSana e PureMoringa
2. Implementar i18n completo em GlucoTrust
3. Adicionar novos idiomas conforme expansão de mercados (ES, PT, etc.)
4. Automatizar testes de i18n (validar que todas as chaves existem)
