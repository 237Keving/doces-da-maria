import { CarrinhoView } from '../views/CarrinhoView.js';

export class CarrinhoController {
  constructor(carrinhoService, eventBus) {
    this._carrinhoService = carrinhoService;
    this._eventBus = eventBus;
    this._view = new CarrinhoView();
  }

  inicializar() {
    this._vincularEventos();
    this._atualizarTela();
  }

  _atualizarTela() {
    const itens = this._carrinhoService.obterItens();
    const total = this._carrinhoService.obterTotal();
    const qtdTotal = this._carrinhoService.obterQuantidadeTotal();
    const vazio = this._carrinhoService.estaVazio();

    this._view.atualizarResumo(total, qtdTotal);
    this._view.renderizarItens(itens);
  }

  _vincularEventos() {
    this._view.bindWhatsApp(() => {
      if (this._carrinhoService.estaVazio()) {
        this._view.exibirErro("Adicione itens ao carrinho primeiro!");
        return;
      }
      window.open(this._carrinhoService.gerarMensagemWhatsApp(), "_blank");
    });

    this._view.bindCheckout(() => {
      if (this._carrinhoService.estaVazio()) {
        this._view.exibirErro("Adicione itens ao carrinho primeiro!");
        return;
      }
      const nf = this._carrinhoService.gerarNotaFiscal();
      this._carrinhoService.limpar();
      this._atualizarTela();
      this._view.fecharCarrinho();
      this._view.exibirModalNotaFiscal(nf);

      this._eventBus.publicar("carrinhoAtualizado");
    });

    this._view.bindRemoverItem((id) => {
      this._carrinhoService.removerProduto(id);
      this._atualizarTela();
      this._eventBus.publicar("carrinhoAtualizado");
    });

    this._view.bindAlterarQuantidade((id, acao) => {
      const item = this._carrinhoService.obterItens().find((i) => i.produto.id === id);
      if (!item) return;
      
      const novaQtd = acao === "aumentar" ? item.quantidade + 1 : item.quantidade - 1;
      this._carrinhoService.alterarQuantidade(id, novaQtd);
      this._atualizarTela();
      this._eventBus.publicar("carrinhoAtualizado");
    });

    this._view.bindFecharModal(() => {
      this._view.fecharModalNf();
    });

    this._eventBus.inscrever("carrinhoAtualizado", () => {
      // Mantém catálogo, resumo e carrinho sincronizados sem acoplamento direto entre controllers.
      this._atualizarTela();
    });

    this._eventBus.inscrever("carrinho:abrir", () => {
      this._view.abrirCarrinho();
    });
  }
}