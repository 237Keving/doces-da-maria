# Doces da Maria

Sistema frontend para divulgação e gerenciamento dos doces da Dona Maria. O projeto foi desenvolvido com HTML, CSS e JavaScript puro, usando módulos ES, JSON e LocalStorage para simular uma aplicação completa sem backend.

## Objetivo do projeto

A aplicação atende dois perfis de uso:

- **Cliente:** visualiza o catálogo, pesquisa doces, filtra por categoria, adiciona itens ao carrinho e monta uma mensagem de pedido para o WhatsApp.
- **Editor:** acessa uma área restrita fictícia para cadastrar, editar, remover, listar e exportar produtos em JSON.

O foco técnico do projeto é demonstrar organização de uma aplicação frontend, manipulação do DOM, uso de JSON, persistência local, responsividade e separação de responsabilidades em um MVC simplificado.

## Como executar

Como o projeto usa `fetch` para carregar o arquivo `data/produtos.json`, ele deve ser aberto por um servidor local. Abrir o `index.html` diretamente pelo navegador pode bloquear o carregamento do JSON.

Opção recomendada:

1. Abra a pasta do projeto no VS Code.
2. Instale a extensão **Live Server**, caso ainda não tenha.
3. Clique com o botão direito em `index.html`.
4. Escolha **Open with Live Server**.
5. Acesse o endereço local aberto pelo navegador.

Também é possível usar outro servidor HTTP local, como:

```bash
python3 -m http.server 5500
```

Depois, acesse:

```text
http://localhost:5500
```

## Acesso ao painel do editor

O painel administrativo usa autenticação fictícia apenas para separar a área pública da área de gerenciamento.

```text
Usuário: isaias
Senha: html#key
```

Após o login, as abas **Dashboard** e **Editor** ficam disponíveis na navegação.

## Funcionalidades principais

### Área pública

- Exibição do catálogo de doces.
- Cards com imagem, nome, descrição, preço e categoria.
- Filtro por categoria.
- Pesquisa por nome, descrição ou categoria.
- Carrinho lateral.
- Alteração de quantidade dos itens do carrinho.
- Remoção de itens.
- Geração de mensagem de pedido para WhatsApp.
- Área de contato com link direto para WhatsApp.
- Alternância entre tema claro e tema escuro.

### Área do editor

- Cadastro de novos doces.
- Edição de produtos existentes.
- Remoção de produtos.
- Listagem dos doces cadastrados.
- Exportação dos produtos em JSON.
- Persistência dos produtos no LocalStorage.
- Dashboard com métricas simples do catálogo.

## Estrutura de pastas

```text
doces-da-maria/
├── index.html
├── app.js
├── README.md
├── assets/
│   └── estilos.css
├── controllers/
│   ├── AuthController.js
│   ├── CarrinhoController.js
│   ├── CatalogoController.js
│   ├── DashboardController.js
│   ├── EditorController.js
│   ├── NavegacaoController.js
│   └── TemaController.js
├── data/
│   └── produtos.json
├── models/
│   ├── Carrinho.js
│   └── Produto.js
├── services/
│   ├── AuthService.js
│   ├── CarrinhoService.js
│   ├── DashboardService.js
│   ├── ProdutoService.js
│   └── TemaService.js
├── utils/
│   ├── EventBus.js
│   └── formatadores.js
└── views/
    ├── AuthView.js
    ├── CarrinhoView.js
    ├── CatalogoView.js
    ├── DashboardView.js
    ├── EditorView.js
    ├── NavegacaoView.js
    └── TemaView.js
```

## Organização arquitetural

O projeto usa um MVC simplificado, separado em Models, Services, Views e Controllers. A intenção é evitar que regra de negócio, manipulação de tela e persistência fiquem misturadas no mesmo arquivo.

### Models

Os Models representam a estrutura dos dados usados pela aplicação.

- `Produto.js`: define os dados de um produto, como id, nome, descrição, preço, categoria, imagem e destaque.
- `Carrinho.js`: define o carrinho e os itens adicionados a ele.

Os Models não manipulam DOM e não executam lógica visual.

### Services

Os Services concentram regras de negócio, validações, tratamento de dados e persistência.

- `ProdutoService.js`: carrega os produtos iniciais, valida dados, normaliza informações, salva no LocalStorage, lista, busca, adiciona, edita, remove e exporta produtos.
- `CarrinhoService.js`: adiciona produtos ao carrinho, altera quantidades, calcula total, salva o carrinho no LocalStorage e gera a mensagem de WhatsApp.
- `AuthService.js`: controla login e logout fictícios.
- `TemaService.js`: salva e recupera a preferência de tema.
- `DashboardService.js`: calcula métricas do catálogo, como total de produtos, categorias e preço médio.

### Views

As Views são responsáveis pela interface e pela manipulação do DOM.

Elas usam recursos como:

- `querySelector`;
- `addEventListener`;
- `innerHTML`;
- alteração de classes CSS;
- abertura e fechamento de modais;
- renderização de listas, cards, tabelas e mensagens.

Exemplos:

- `CatalogoView.js`: renderiza cards do catálogo, filtros e notificações.
- `EditorView.js`: renderiza tabela e formulário de cadastro/edição.
- `CarrinhoView.js`: renderiza itens do carrinho, total, modal de nota fictícia e mensagens de erro.
- `AuthView.js`: controla modal de login e visibilidade das áreas restritas.

### Controllers

Os Controllers coordenam o fluxo da aplicação. Eles recebem eventos das Views, chamam os Services e pedem para as Views atualizarem a interface.

Exemplos:

- `CatalogoController.js`: busca produtos no `ProdutoService`, envia os dados para a `CatalogoView` e adiciona produtos ao carrinho.
- `EditorController.js`: coordena cadastro, edição, remoção e atualização da tabela do editor.
- `CarrinhoController.js`: coordena alterações no carrinho, checkout fictício e pedido por WhatsApp.
- `AuthController.js`: coordena login, logout e atualização da interface restrita.

## Fluxo dos dados

O fluxo principal do catálogo funciona assim:

1. `app.js` inicializa os Services e Controllers.
2. `ProdutoService` tenta carregar produtos salvos no LocalStorage.
3. Se não houver produtos salvos, `ProdutoService` carrega `data/produtos.json` com `fetch`.
4. `CatalogoController` solicita a lista de produtos ao `ProdutoService`.
5. `CatalogoController` envia os produtos para `CatalogoView`.
6. `CatalogoView` renderiza os cards no HTML.

No editor, o fluxo é parecido:

1. O usuário preenche o formulário.
2. `EditorView` captura os dados da tela.
3. `EditorController` recebe os dados e chama `ProdutoService`.
4. `ProdutoService` valida, normaliza, cadastra ou edita o produto.
5. Os dados são persistidos no LocalStorage com `JSON.stringify`.
6. O catálogo e o dashboard são atualizados por eventos.

## Uso de JSON e LocalStorage

O projeto usa JSON em três pontos principais:

1. **Arquivo inicial de produtos:** `data/produtos.json` contém os doces exibidos quando ainda não existem dados salvos no navegador.
2. **Persistência local:** os produtos e o carrinho são serializados com `JSON.stringify` e salvos no LocalStorage.
3. **Leitura dos dados salvos:** os dados são recuperados com `JSON.parse` e remontados na aplicação.

Isso permite simular uma base de dados local sem necessidade de backend.

## EventBus

O arquivo `utils/EventBus.js` implementa um mecanismo simples de publicação e inscrição de eventos.

Ele é usado para reduzir o acoplamento direto entre Controllers. Por exemplo, quando o carrinho é atualizado, o catálogo pode atualizar os badges dos produtos sem que o `CarrinhoController` chame diretamente o `CatalogoController`.

Eventos usados no projeto incluem:

- `carrinhoAtualizado`;
- `catalogoAtualizado`;
- `carrinho:abrir`.

## Responsividade

O CSS foi escrito para funcionar em desktop, tablet e celular.

A aplicação usa:

- grid responsivo no catálogo;
- layout flexível no cabeçalho;
- tabela administrativa adaptada para formato de cards no mobile;
- carrinho lateral ajustado para telas menores;
- media queries para larguras de 900px, 680px e 420px.

## Decisões técnicas

- O projeto usa JavaScript Vanilla para manter o foco nos fundamentos de frontend.
- O padrão MVC foi aplicado de forma simplificada para manter o código organizado sem adicionar complexidade desnecessária.
- O LocalStorage foi usado como persistência simulada, porque a atividade não exige backend.
- O arquivo JSON inicial garante que o catálogo tenha produtos na primeira execução.
- O EventBus foi usado para sincronizar módulos sem criar dependência direta entre todos os Controllers.
- A autenticação é fictícia e serve apenas para separar visualmente a área pública da área do editor.
- O dashboard e o carrinho foram adicionados como funcionalidades extras para enriquecer a aplicação.

## Observações importantes

- Os dados ficam salvos no navegador usado durante o teste. Para restaurar os produtos iniciais, limpe o LocalStorage do site.
- Como o projeto utiliza CDNs para ícones e gráfico, é recomendado testar com conexão à internet.
- O login não é seguro para produção, pois é apenas uma simulação frontend.
- O projeto não possui backend, banco de dados real ou sistema de pagamento.

## Critérios da atividade atendidos

- Catálogo público de doces.
- CRUD completo na área do editor.
- Uso de JSON.
- Persistência simulada com LocalStorage.
- Separação de responsabilidades.
- Organização por pastas.
- MVC simplificado.
- Manipulação do DOM em Views.
- Contato por WhatsApp.
- Responsividade com media queries.
- README técnico explicando o projeto.
