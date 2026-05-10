import { CatalogoView } from '../views/CatalogoView.js';

export class CatalogoController {
  constructor(produtoService, carrinhoService, eventBus) {
    this._produtoService = produtoService;
    this._carrinhoService = carrinhoService;
    this._eventBus = eventBus;
    this._view = new CatalogoView();
    this._categoriaAtiva = "todas";
  }

  inicializar() {
    this._atualizarTela();
    this._vincularEventos();
  }

  _atualizarTela() {
    this._view.renderizarFiltros(this._produtoService.categorias(), this._categoriaAtiva);
    this._atualizarListaProdutos();
  }

  _atualizarListaProdutos(produtosFiltrados = null) {
    let lista = produtosFiltrados;
    
    if (!lista) {
      lista = this._categoriaAtiva === "todas"
        ? this._produtoService.listarTodos()
        : this._produtoService.listarPorCategoria(this._categoriaAtiva);
    }
    
    const itensNoCarrinho = this._carrinhoService.obterItens();
    this._view.renderizarProdutos(lista, itensNoCarrinho);
  }

  _vincularEventos() {
    this._view.bindFiltrarCategoria((categoria) => {
      this._categoriaAtiva = categoria;
      this._atualizarTela();
    });

    this._view.bindBuscarProduto((termo) => {
      if (!termo) {
        this._atualizarListaProdutos();
        return;
      }
      const resultados = this._produtoService.buscar(termo);
      this._atualizarListaProdutos(resultados);
    });

    this._view.bindAdicionarCarrinho((produtoId) => {
      const produto = this._produtoService.buscarPorId(produtoId);
      if (produto) {
        this._carrinhoService.adicionarProduto(produto);
        this._eventBus.publicar("carrinhoAtualizado");
        this._view.exibirNotificacao(produto.nome, () => {
          this._eventBus.publicar("carrinho:abrir");
        });
      }
    });

    this._eventBus.inscrever("carrinhoAtualizado", () => {
      // Re-renderização completa evita sincronização manual dos badges entre catálogo e carrinho.
      this._atualizarListaProdutos();
    });

    this._eventBus.inscrever("catalogoAtualizado", () => {
      this._atualizarTela();
    });
  }
}