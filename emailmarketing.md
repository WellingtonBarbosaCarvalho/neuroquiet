# Estratégia de Captação de Leads - Affiliate Marketing

## 1. Objetivo do Projeto
Implementar um sistema de captura de leads (e-mails) de baixo custo e alta performance para as páginas de vendas de produtos afiliados (ex: SlimSana, PureMoringa). O foco é construir uma base de dados própria para remarketing via e-mail marketing, aumentando o LTV (Lifetime Value) de cada clique pago.

## 2. Arquitetura Técnica (Serverless & Free)
Para manter a agilidade e custo zero, a solução utiliza:
- **Frontend:** Formulário HTML/JS integrado na Landing Page (hospedada na Vercel).
- **Database:** Google Sheets (Planilha Google) atuando como banco de dados.
- **Backend/API:** Google Apps Script funcionando como ponte (middleware) entre o site e a planilha.

## 3. Fluxo de Dados
1. O usuário preenche o e-mail na Landing Page.
2. O JavaScript do Frontend captura o evento de `submit`.
3. É feito um disparo via `fetch()` (método POST) para a URL do Google Apps Script.
4. O Script processa o JSON, adiciona uma nova linha na planilha com: **Data, E-mail, Produto e Origem**.
5. O Frontend recebe o status (ou assume o sucesso via `no-cors`) e redireciona o usuário imediatamente para o **Link de Afiliado**.

## 4. Configurações Atuais
- **Endpoint API (Google Apps Script):** `https://script.google.com/macros/s/AKfycby3OZreYq8QqAuq5IVJWPn1XwgqBei6U4dTLyjoqKeZ3Y5aB81N34V78F1GgGllRNEZ/exec`
- **Campos de Captura:**
  - `email`: E-mail do usuário.
  - `product`: Identificador do produto (ex: 'SlimSana', 'PureMoringa').
  - `source`: URL ou Hostname de onde o lead veio.

## 5. Instruções para o Agente (Desenvolvedor)
Ao criar novas páginas ou atualizar as existentes:
1. **Não alterar a SCRIPT_URL** a menos que uma nova planilha seja necessária.
2. **Personalizar a variável `AFFILIATE_LINK`** dentro do script da página para garantir que o usuário caia no funil de vendas correto.
3. **Manter o `mode: 'no-cors'`** no fetch para evitar bloqueios de política de segurança, já que o redirecionamento é a prioridade após o envio dos dados.
4. O formulário deve ser simples para não diminuir a taxa de conversão da página (apenas campo de e-mail e botão de ação).

## 6. Próximos Passos (Automação de E-mail)
A lógica de envio de e-mails de boas-vindas deve ser implementada diretamente no Google Apps Script usando o serviço `MailApp` ou `GmailApp`, disparando uma mensagem automática assim que uma nova linha for detectada na planilha.
