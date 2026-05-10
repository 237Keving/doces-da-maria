===============================================================================
               DOCES DA MARIA - EXECUTIVE SUMMARY / RESUMO TÉCNICO
===============================================================================

[PT-BR] SOBRE O PROJETO
Este projeto é uma aplicação frontend Single Page Application (SPA) desenvolvida para 
gerenciar o catálogo de produtos de uma doceria. O sistema abrange tanto a área pública, 
onde os clientes podem visualizar produtos e montar pedidos, quanto uma área administrativa 
restrita para a gestão do estoque e análise de métricas.

[ENG] ABOUT THE PROJECT
This project is a Single Page Application (SPA) frontend developed to manage the 
product catalog of a sweet shop. The system covers both a public area, where 
customers can view products and assemble orders, and a restricted administrative 
area for inventory management and metrics analysis.

-------------------------------------------------------------------------------

[PT-BR] ARQUITETURA TÉCNICA
- MODELS: Estruturas de dados puras.
- SERVICES: Concentram regras de negócio, validações e persistência (LocalStorage).
- VIEWS: - VIEWS: Camada responsável pela manipulação exclusiva do DOM..
- CONTROLLERS: Orquestradores de fluxo e comunicação entre camadas.
- EVENT BUS: Desacoplamento de módulos via padrão Publish-Subscribe.

[ENG] TECHNICAL ARCHITECTURE
- MODELS: Pure data structures (Anemic).
- SERVICES: Centralize business rules, validations, and persistence (LocalStorage).
- VIEWS: Exclusive layer for DOM manipulation and interface.
- CONTROLLERS: Flow orchestrators and communication between layers.
- EVENT BUS: Module decoupling via Publish-Subscribe pattern.

-------------------------------------------------------------------------------

[PT-BR] TECNOLOGIAS / [ENG] TECHNOLOGIES
- HTML5, CSS3, JavaScript Vanilla (ES Modules)
- Chart.js, Phosphor Icons, LocalStorage API, Fetch API

-------------------------------------------------------------------------------

[PT-BR] EXECUÇÃO / [ENG] EXECUTION
- Required: Local HTTP Server (Live Server)
- Admin User: isaias
- Admin Pass: html#key