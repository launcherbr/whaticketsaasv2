# WhaTicket Versão Saas com Módulo Kanban, Modo Noturno e as seguintes integrações:</br>

Com novo visual do frontned

Distribuido por Launcher & Co.

🗣️ DialogFlow</br>
🔄 N8N</br>
🌐 WebHooks</br>
🤖 TypeBot</br>
💬 ChatGPT</br>

Sugestão de VPS:

BASIC: 4 vCores, 6 GB de RAM e 100 GB de SSD NVMe $4.99 USD Mensal com taxa de setup de $4.99.

STANDARD: 6 vCores, 12 GB de RAM e 200 GB de SSD NVMe $9.99 USD Mensal com taxa de setup de $5.99.

Utilize o cupom WHATICKET e obtenha 25% de desconto no primeiro pagamento.

```
https://control.peramix.com/?affid=14
```

VPS 1000 G11: 4 vCores, 8 GB de RAM e 256 GB de SSD NVMe €5.75 Mensal.

VPS 2000 G11: 8 vCores, 16 GB de RAM e 512 GB de SSD NVMe €12.60 USD Mensal.

```
https://www.netcup.com/en/?ref=283810
```
Voucher de 5 euros:

```
36nc17542354680
```

📅 16/04/2025 – Versão 6.0.0

🌑 Correções no Darkmode (dentro das mensagens)</br>
🔄 Botão Light/Dark movido (está no perfil)</br>
📊 Estilos dos cards da Dashboard alterados (removido botão de impressão)</br>
🎟️ Estilo de ticket alterado</br>
⚡ Respostas rápidas (layout novo)</br>
📂 Correção no envio de menu (filas) – na 3ª tentativa é enviado automaticamente para a 1ª fila</br>
🌍 Botão de tradução</br>
⚠️ Aviso de contato (caso o ticket esteja aberto, é emitido um aviso)</br>
🔧 Página de conexão reformulada</br>
👑 Adicionada opção de SuperAdmin (dentro do popup do usuário)</br>
📆 Correção no agendamento (agora envia imagem com texto)</br>
♻️ Agendamento reformulado (com suporte a ciclos)</br> 
🔐 Novo layout da tela de login</br>
📝 Novo layout da tela de signup</br>
🛠️ Correção de vazamento no WebSocket</br>

📅 13/12/2024 – Versão 5.5.0

🛠️ Correção ao redimensionar área de ticket</br>
✅ Validação de número no ContactModal</br>
🔄 Regressão OpenAI para versão 3.3.0 e wbotMessageListener.ts</br>
🎧 Áudio no iPhone</br>
📵 Recusando chamadas automaticamente</br>
📲 Filas da conexão ao requisitar novo QR Code</br>
📊 Dashboard reformulado</br>
📈 Página de relatórios</br>
🗂️ Kanban reformulado</br>

📅 07/11/2024 – Versão 5.3.5

📅 Correção da Data de Vencimento no Topo: Data agora permanece fixa. </br>
🔄 Automação em Grupos: Não envia automações para grupos. </br>
🚫 Botão disableBot: Desabilita bots ou automações. </br>
✉️ Correção de Mensagem Citada. </br>
🔗 Permissão para Conexões com Mesmo Nome. </br>
⏳ Expiração de Conexões: Desconexão automática após vencimento da empresa. </br>
🗑️ Seleção para Deletar Contatos: Opção de seleção para exclusão na página “Contatos”. </br>
🎵 Correção no Envio de Áudio OGG em respostas rápidas. </br>
📂 Visualização de Tickets Fechados por Operador: Aba removida do painel de usuários. </br>
📜 Visualização de Grupos por Operador: Aba removida do painel de usuários. </br>
💸 Atualização Financeira após Alteração de Plano: Valor ajustado automaticamente na lista do Financeiro. </br>

📅 24/07/2024 – Versão 5.2.6

✅ Fechar todos os tickets abertos ou em espera. </br>
👍 Reagir a uma mensagem. </br>
🔄 Encaminhar mensagens para outro ticket. </br>
🎨 Aparência do menu aprimorada. </br>
🚪 Botão “Sair” adicionado ao menu. </br>
🗑️ Notificação quando uma mensagem é apagada no WhatsApp, informando no chat. </br>
🔄 API atualizada. </br>
🆕 Novo layout da página de login. </br>
💬 Indicação “Digitando” ou “Gravando” aparece no ticket, no canto inferior direito, ao lado do nome. </br>

📚 Biblioteca Baileys Atualizada:</br>

V 6.7.18

Correção da versão do Whatsapp Web. Alterações feitas com usuário deploy:

Editar o arquivo baileys-version.json localizado na pasta /backend/node_modules/@whiskeysockets/baileys/lib/Defaults

```
su deploy
cd
cd whaticket
```

```
nano /backend/node_modules/@whiskeysockets/baileys/lib/Defaults/baileys-version.json
```

Alterar: "version": [2, 3000, 1023223821] para:

```
"version": [2, 3000, 1025091846]
```

Execute os comandos para reiniciar a aplicação:

```
pm2 flush
pm2 restart all
pm2 log
```

Confira no log se consta a versão atual do Whatsapp Web.

Instalador atualizado, versao NodeJS 20:

```
https://github.com/launcherbr/instalador.git
```
Notas Rápidas: </br>
Requer servidor Ubuntu 20.04 LTS com ao menos 4 vcore e 8gb de ram.</br>
Recomendamos Peramix, Netcup, Contabo, e Hetzner</br>
Evite latencia muito baixa < 10ms e muito alta > 400ms (servidor local e servidores na Europa)</br>

Siga os arquivos de Instruções para instalação, você precisa ter acesso liberado ao Google Drive:</br>
(Acesso liberado somente adquirindo o suporte) </br>
https://loja.infinitepay.io/launcher-tecnologia/aep0253-script-crm-whaticket-gold-com-saas-e-kanba

```
Google Drive> Compartilhados Comigo > Infoprodutos > Whaticket SaaS > Instruções = SEMPRE COMECE POR AQUI
```

Confira no arquivo pdf como gerar um webhook de retorno automático de pagamento da Efi.

Personalizações:</br>
As instruções para alteração de cores, logo, icones e nome da instalação estão nos arquivos de instruções.
