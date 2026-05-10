PT-BR;

Doces da Maria — Catálogo e Gestão de Produtos
Sobre o projeto

O projeto simula o sistema frontend de uma doceria fictícia chamada Doces da Maria, permitindo tanto a navegação pública dos produtos quanto o gerenciamento administrativo do catálogo.

A aplicação foi desenvolvida utilizando apenas tecnologias nativas do frontend:

HTML
CSS
JavaScript Vanilla

Sem utilização de frameworks como React, Vue ou Angular.

O foco principal da atividade foi demonstrar domínio em:

manipulação de DOM
arquitetura frontend
separação de responsabilidades
persistência de dados
modularização
responsividade
organização profissional de código
uso de JSON
estruturação SPA
Objetivo da atividade

A proposta consistia em desenvolver uma aplicação frontend completa para gerenciamento e divulgação de doces, contendo:

catálogo público
CRUD administrativo
persistência com LocalStorage
carregamento inicial via JSON
responsividade
separação arquitetural
manipulação dinâmica de interface

Além do funcionamento visual, a avaliação também considerava:

qualidade arquitetural
clareza lógica
desacoplamento
manutenção
escalabilidade
organização modular
boas práticas de JavaScript
Tecnologias utilizadas
HTML5
CSS3
JavaScript Vanilla (ES Modules)
Chart.js
Phosphor Icons
LocalStorage API
Fetch API
Estrutura do projeto
doces-da-maria/
├── index.html
├── app.js
├── data/
│   └── produtos.json
├── assets/
│   └── css/
│       └── estilos.css
├── utils/
│   ├── EventBus.js
│   └── formatadores.js
├── models/
│   ├── Produto.js
│   └── Carrinho.js
├── services/
│   ├── AuthService.js
│   ├── ProdutoService.js
│   ├── CarrinhoService.js
│   ├── DashboardService.js
│   └── TemaService.js
├── controllers/
│   ├── AuthController.js
│   ├── CarrinhoController.js
│   ├── CatalogoController.js
│   ├── DashboardController.js
│   ├── EditorController.js
│   ├── NavegacaoController.js
│   └── TemaController.js
└── views/
    ├── AuthView.js
    ├── CarrinhoView.js
    ├── CatalogoView.js
    ├── DashboardView.js
    ├── EditorView.js
    ├── NavegacaoView.js
    └── TemaView.js
Arquitetura utilizada
MVC Simplificado + Service Layer

A aplicação foi estruturada utilizando uma adaptação do padrão MVC em conjunto com uma camada de Services, visando desacoplamento, previsibilidade e manutenção facilitada.

Models

Os Models representam exclusivamente a estrutura dos dados da aplicação.

Não possuem:

manipulação de DOM
persistência
acesso ao navegador
regras visuais

Responsabilidades:

padronização dos objetos
consistência estrutural dos dados

Exemplos:

Produto.js
Carrinho.js
Services

Os Services concentram as regras de negócio da aplicação.

Responsabilidades:

validações
persistência
serialização
desserialização
hidratação de dados
cálculos
regras financeiras
autenticação
integração com LocalStorage
tratamento defensivo de dados

Exemplos:

ProdutoService.js
CarrinhoService.js
DashboardService.js

Essa separação evita Controllers inchados e reduz acoplamento entre interface e lógica de negócio.

Views

As Views são a única camada autorizada a manipular o DOM.

Responsabilidades:

renderização visual
captura de eventos
atualização de interface
gerenciamento de estados visuais

Utilizações:

querySelector
innerHTML
classList
addEventListener

A comunicação com Controllers ocorre via callbacks (bind...).

Também foi utilizada Event Delegation para evitar múltiplos listeners desnecessários em elementos dinâmicos.

Controllers

Os Controllers atuam apenas como intermediadores de fluxo.

Responsabilidades:

receber eventos da View
solicitar processamento ao Service
enviar dados processados para a View

Os Controllers:

não manipulam HTML
não acessam LocalStorage
não executam regras complexas

Isso reduz acoplamento e melhora testabilidade.

App.js (Bootstrap)

O app.js atua como Composition Root da aplicação.

Responsabilidades:

instanciar Services
centralizar inicialização
realizar injeção de dependências
iniciar Controllers

Essa abordagem garante compartilhamento consistente de estado em memória entre módulos.

EventBus e desacoplamento

Para evitar dependência direta entre Controllers e remover acoplamento ao objeto global window, foi implementado um sistema Pub/Sub através de um EventBus.

Fluxo:

Controllers publicam eventos
Outros Controllers se inscrevem nesses eventos
A comunicação ocorre sem dependência direta entre módulos

Benefícios:

desacoplamento
escalabilidade
manutenção facilitada
menor dependência global
Utilitários

O arquivo formatadores.js centraliza funções puras reutilizáveis.

Exemplo:

formatação monetária

Objetivo:

evitar duplicação
aplicar DRY
manter consistência visual entre Views
Persistência de dados

A persistência da aplicação ocorre integralmente no navegador através do LocalStorage.

Fluxo da persistência
Hidratação inicial

Na primeira execução:

O sistema verifica dados salvos
Caso não existam, realiza fetch() em produtos.json
Os dados são carregados para memória
Serialização

Os dados são persistidos utilizando:

JSON.stringify()
Desserialização

Os dados recuperados via:

JSON.parse()

são re-instanciados como Models para preservar consistência estrutural.

Responsividade

A interface foi construída utilizando:

CSS Grid
Flexbox
Media Queries

A aplicação adapta:

grids
formulários
navegação
dashboard
listagens

para diferentes resoluções de tela sem utilização de frameworks CSS.

Funcionalidades implementadas
Catálogo
listagem dinâmica
filtros por categoria
busca textual
renderização dinâmica
Carrinho
adição de produtos
alteração de quantidade
cálculo automático de totais
integração com WhatsApp
geração de nota fiscal fictícia
Painel Administrativo
autenticação simulada
proteção visual de áreas restritas
Dashboard
métricas do catálogo
gráficos dinâmicos
CRUD
cadastro
edição
exclusão
exportação JSON
Preferências
tema claro/escuro
persistência de tema
Boas práticas aplicadas
MVC simplificado
Service Layer
Separation of Concerns
DRY (Don't Repeat Yourself)
Event Delegation
Publish-Subscribe
Composition Root
Defensive Programming
Fail Fast
ES Modules
Responsividade Mobile First
Desacoplamento entre camadas
Como executar o projeto

Como o projeto utiliza:

type="module"
fetch()
ES Modules

o navegador bloqueará a execução direta via file:// por políticas de CORS.

É necessário executar em um servidor HTTP local.

Executando com VS Code
1. Abrir o projeto

Abra a pasta doces-da-maria no VS Code.

2. Instalar extensão

Instale a extensão:

Live Server
3. Executar

Clique com o botão direito no index.html:

Open with Live Server

ou utilize:

Go Live

no canto inferior direito do VS Code.

Credenciais administrativas
Usuário: isaias
Senha: html#key

===========================================================================================

ENG:

Doces da Maria — Product Catalog and Management
About the project

This project simulates the frontend system of a fictional sweet shop called Doces da Maria, allowing both public product browsing and administrative catalog management.

The application was developed using only native frontend technologies:

HTML
CSS
Vanilla JavaScript

No frameworks such as React, Vue or Angular were used.

The main objective of the project was to demonstrate proficiency in:

DOM manipulation
frontend architecture
separation of concerns
data persistence
modularization
responsiveness
professional code organization
JSON handling
SPA structuring
Project objective

The goal of the activity was to build a complete frontend application for candy catalog management, including:

public catalog
administrative CRUD
LocalStorage persistence
initial JSON loading
responsive interface
architectural separation
dynamic UI manipulation

Besides visual functionality, the evaluation also focused on:

architectural quality
logical clarity
decoupling
maintainability
scalability
modular organization
JavaScript best practices
Technologies used
HTML5
CSS3
Vanilla JavaScript (ES Modules)
Chart.js
Phosphor Icons
LocalStorage API
Fetch API
Project structure
doces-da-maria/
├── index.html
├── app.js
├── data/
│   └── produtos.json
├── assets/
│   └── css/
│       └── estilos.css
├── utils/
│   ├── EventBus.js
│   └── formatadores.js
├── models/
│   ├── Produto.js
│   └── Carrinho.js
├── services/
│   ├── AuthService.js
│   ├── ProdutoService.js
│   ├── CarrinhoService.js
│   ├── DashboardService.js
│   └── TemaService.js
├── controllers/
│   ├── AuthController.js
│   ├── CarrinhoController.js
│   ├── CatalogoController.js
│   ├── DashboardController.js
│   ├── EditorController.js
│   ├── NavegacaoController.js
│   └── TemaController.js
└── views/
    ├── AuthView.js
    ├── CarrinhoView.js
    ├── CatalogoView.js
    ├── DashboardView.js
    ├── EditorView.js
    ├── NavegacaoView.js
    └── TemaView.js
Architecture
Simplified MVC + Service Layer

The application was structured using a simplified MVC approach combined with a Service Layer to improve decoupling, predictability, and maintainability.

Models

Models are responsible only for representing application data.

They do not contain:

DOM manipulation
persistence logic
browser access
visual rules

Responsibilities:

object standardization
structural consistency

Examples:

Produto.js
Carrinho.js
Services

Services centralize all business rules.

Responsibilities:

validations
persistence
serialization
deserialization
data hydration
calculations
financial rules
authentication
LocalStorage integration
defensive data handling

Examples:

ProdutoService.js
CarrinhoService.js
DashboardService.js

This separation prevents Controllers from becoming bloated and reduces coupling between interface and business logic.

Views

Views are the only layer allowed to manipulate the DOM.

Responsibilities:

rendering
event handling
UI updates
visual state management

Used APIs:

querySelector
innerHTML
classList
addEventListener

Communication with Controllers occurs through callbacks (bind... methods).

Event Delegation was also implemented to optimize event handling on dynamic elements.

Controllers

Controllers act strictly as flow orchestrators.

Responsibilities:

receiving events from Views
requesting processing from Services
sending processed data back to Views

Controllers:

do not manipulate HTML
do not access LocalStorage
do not contain heavy business logic

This improves maintainability and testability.

App.js (Bootstrap)

app.js acts as the application's Composition Root.

Responsibilities:

instantiate Services
centralize initialization
perform dependency injection
initialize Controllers

This guarantees consistent in-memory state sharing across modules.

EventBus and decoupling

To avoid direct dependencies between Controllers and remove reliance on the global window object, a Pub/Sub architecture was implemented through an EventBus.

Flow:

Controllers publish events
Other Controllers subscribe to them
Communication occurs without direct module dependency

Benefits:

decoupling
scalability
easier maintenance
reduced global pollution
Utilities

The formatadores.js file centralizes reusable pure functions.

Example:

currency formatting

Goal:

avoid duplication
apply DRY principles
maintain visual consistency across Views
Data persistence

Application persistence occurs entirely in the browser using LocalStorage.

Persistence flow
Initial hydration

On first execution:

The system checks LocalStorage
If empty, performs a fetch() on produtos.json
Loads data into memory
Serialization

Data persistence is handled using:

JSON.stringify()
Deserialization

Data recovered with:

JSON.parse()

is re-instantiated into Models to preserve structural consistency.

Responsiveness

The interface was developed using:

CSS Grid
Flexbox
Media Queries

The application dynamically adapts:

grids
forms
navigation
dashboard
listings

for different screen sizes without relying on CSS frameworks.

Implemented features
Catalog
dynamic product listing
category filtering
text search
dynamic rendering
Shopping cart
product addition
quantity control
automatic total calculation
WhatsApp integration
dummy invoice generation
Administrative panel
simulated authentication
restricted area protection
Dashboard
catalog metrics
dynamic charts
CRUD
create
edit
delete
JSON export
Preferences
light/dark theme
theme persistence
Applied best practices
Simplified MVC
Service Layer
Separation of Concerns
DRY (Don't Repeat Yourself)
Event Delegation
Publish-Subscribe
Composition Root
Defensive Programming
Fail Fast
ES Modules
Mobile First Responsiveness
Layer decoupling
Running the project

Since the project uses:

type="module"
fetch()
ES Modules

the browser will block direct execution through file:// due to CORS policies.

A local HTTP server is required.

Running with VS Code
1. Open the project

Open the doces-da-maria folder in VS Code.

2. Install extension

Install:

Live Server
3. Run the project

Right click index.html and select:

Open with Live Server

or click:

Go Live

at the bottom-right corner of VS Code.

Admin credentials
User: isaias
Password: html#key