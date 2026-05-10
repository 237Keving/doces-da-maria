import { EventBus } from './utils/EventBus.js'; 

import { ProdutoService } from './services/ProdutoService.js';
import { CarrinhoService } from './services/CarrinhoService.js';
import { AuthService } from './services/AuthService.js';
import { DashboardService } from './services/DashboardService.js';
import { TemaService } from './services/TemaService.js';

import { CatalogoController } from './controllers/CatalogoController.js';
import { CarrinhoController } from './controllers/CarrinhoController.js';
import { EditorController } from './controllers/EditorController.js';
import { NavegacaoController } from './controllers/NavegacaoController.js';
import { TemaController } from './controllers/TemaController.js';
import { DashboardController } from './controllers/DashboardController.js';
import { AuthController } from './controllers/AuthController.js';

const inicializarApp = async () => {
  try {
    const eventBus = new EventBus();
    
    const configCarrinho = {
      storageKey: "doces_maria_carrinho",
      whatsappNumero: "5551997108044"
    };

    const produtoService = new ProdutoService();
    const carrinhoService = new CarrinhoService(configCarrinho);
    const authService = new AuthService();
    const dashboardService = new DashboardService(produtoService);
    const temaService = new TemaService();

    await produtoService.inicializar();

    const navegacao = new NavegacaoController();
    navegacao.inicializar();

    const tema = new TemaController(temaService);
    tema.inicializar();

    const auth = new AuthController(authService);
    auth.inicializar();

    const catalogo = new CatalogoController(produtoService, carrinhoService, eventBus);
    catalogo.inicializar();

    const carrinho = new CarrinhoController(carrinhoService, eventBus);
    carrinho.inicializar();

    const editor = new EditorController(produtoService, eventBus);
    editor.inicializar();

    const dashboard = new DashboardController(dashboardService, eventBus);
    dashboard.inicializar();

  } catch (erro) {
    console.error("Falha crítica na inicialização do sistema:", erro);
  }
};

document.addEventListener("DOMContentLoaded", inicializarApp);