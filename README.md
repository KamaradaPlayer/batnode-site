# BatNode

Base do site institucional da BatNode em **HTML, CSS e JavaScript**, para evolução colaborativa.

## Estrutura da página

1. Hero
2. Sobre nós
3. Nossos serviços e experiências
4. Nossa equipe: cinco espaços
5. Footer

## Arquivos

- `index.html`: estrutura e textos provisórios.
- `styles.css`: cores, fontes, layout e responsividade.
- `script.js`: interação do menu para celular e validação do formulário de contato.
- `.nojekyll`: permite ao GitHub Pages servir diretamente os arquivos estáticos.

Não há dependências, instalação de pacotes ou etapa de compilação. Para visualizar o layout, basta abrir `index.html` no navegador. Para testar o formulário, use o site publicado ou um servidor local: o FormSubmit não aceita páginas abertas via `file://`. Se Python estiver instalado:

```sh
python3 -m http.server 8000
```

Depois, abra `http://localhost:8000`.

## Identidade visual

A paleta usa tons de preto e amarelo de destaque (`#FFD400`). As cores podem ser alteradas nas variáveis `:root` do CSS.

Títulos estão configurados para **Akira Expanded**, com Arial como alternativa. A fonte ainda não foi fornecida e não está incluída no repositório. Os textos usam Arial/Helvetica.

Para carregar Akira Expanded, adicione um arquivo autorizado para uso na web em `assets/fonts/` e configure `@font-face` com o caminho e o formato corretos. A propriedade `--font-title` já referencia o nome da fonte.

## Como colaborar

1. O responsável adiciona os colegas em **Settings → Collaborators**.
2. Cada pessoa clona o repositório e cria uma branch para sua alteração.
3. Edite os arquivos, confira no navegador e envie a branch.
4. Abra um pull request para revisão antes de integrar em `main`.

Exemplo de branch: `feature/cores-e-fontes`.

## Hospedagem no GitHub Pages

Configuração prevista: **Settings → Pages → Deploy from a branch → main → /(root)**.

Após ativado, os arquivos da branch `main` serão publicados pelo GitHub Pages. A disponibilidade depende da visibilidade do repositório e do plano da conta. A URL deve ser confirmada após a primeira publicação.

## Hospedagem na Netlify

Importe o repositório `KamaradaPlayer/batnode-site` e selecione a branch `main`. Não é necessário comando de build: o site usa HTML, CSS e JavaScript diretamente. O arquivo `netlify.toml` define a raiz (`.`) como diretório de publicação. Depois de vincular o repositório, novos pushes na `main` serão publicados automaticamente.

## Conteúdo a completar

- Título e apresentação inicial.
- Texto sobre a empresa.
- Serviços e experiências reais.
- Nomes, funções e fotos dos cinco integrantes.
- Contatos e redes sociais no footer.

## Formulário de contato

O formulário solicita nome, email e mensagem e usa o FormSubmit para encaminhar os contatos a `batnode.services@gmail.com`. O envio usa o POST nativo do navegador e segue para a página do serviço, onde podem ser feitas a verificação anti-spam e a confirmação do resultado, com ou sem JavaScript. O site não mostra uma confirmação de sucesso antes da resposta do serviço. Não há servidor próprio ou chave secreta no site.

Antes de disponibilizar o formulário, faça um primeiro envio e confirme o email de ativação enviado pelo FormSubmit à caixa da BatNode (confira também o spam). Depois da ativação, faça outro envio para verificar o recebimento e a resposta ao email do remetente. A confirmação na tela indica que o serviço aceitou a solicitação, não comprova a entrega na caixa de entrada.

O formulário possui validação de campos, um campo invisível contra bots e bloqueio de cliques repetidos. Com JavaScript, os espaços nas extremidades dos campos são removidos e o envio via `file://` é bloqueado com uma orientação. Ao voltar da página do serviço, o botão é reabilitado. Não há reenvio automático após falhas de rede, para evitar duplicatas. Os dados são processados pelo FormSubmit para encaminhamento por email.

Documentação: https://formsubmit.co/ e https://formsubmit.co/ajax-documentation
