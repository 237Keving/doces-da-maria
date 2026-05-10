import { formatarMoeda } from '../utils/formatadores.js';

export class CarrinhoView {
  constructor() {
    this._aside = document.getElementById("carrinho-lateral");
    this._containerItens = document.querySelector('[data-container="carrinho-itens"]');
    this._spanTotal = document.querySelector('[data-container="carrinho-total"]');
    this._spanContador = document.querySelector('[data-container="carrinho-contador"]');
    this._btnAbrir = document.querySelector('[data-action="abrir-carrinho"]');
    this._btnFechar = document.querySelector('[data-action="fechar-carrinho"]');
    this._btnWhatsApp = document.querySelector('[data-action="pedir-whatsapp-carrinho"]');
    this._btnCheckout = document.querySelector('[data-action="gerar-nf"]');

    this._modalNf = document.getElementById("modal-nf");
    this._containerNf = document.querySelector('[data-container="modal-nf-conteudo"]');
    this._btnFecharModal = document.querySelector('[data-action="fechar-modal-nf"]');

    this._vincularEventosInternos();
  }

  _formatarData(isoString) {
    return new Date(isoString).toLocaleString("pt-BR");
  }

  abrirCarrinho() {
    this._aside.hidden = false;
  }

  fecharCarrinho() {
    this._aside.hidden = true;
  }

  exibirErro(mensagem) {
    alert(mensagem);
  }

  renderizarItens(itens) {
    if (itens.length === 0) {
      this._containerItens.innerHTML = `
        <div class="carrinho__vazio">
          <i class="ph ph-shopping-bag"></i>
          <p>Sua cesta está vazia.</p>
        </div>
      `;
      return;
    }

    const html = itens.map((item) => `
      <li class="carrinho__item">
        <img src="${item.produto.imagem}" alt="${item.produto.nome}" class="carrinho__item-img" loading="lazy" />
        <div class="carrinho__item-info">
          <span class="carrinho__item-nome">${item.produto.nome}</span>
          <span class="carrinho__item-preco">${formatarMoeda(item.produto.preco)}</span>
        </div>
        <div class="carrinho__item-controles">
          <button type="button" class="btn-qtd" data-acao="diminuir" data-id="${item.produto.id}">-</button>
          <span class="carrinho__item-qtd">${item.quantidade}</span>
          <button type="button" class="btn-qtd" data-acao="aumentar" data-id="${item.produto.id}">+</button>
        </div>
        <button type="button" class="btn-remover-item" data-acao="remover" data-id="${item.produto.id}" title="Remover item">
          <i class="ph ph-trash"></i>
        </button>
      </li>
    `).join("");

    this._containerItens.innerHTML = `<ul class="carrinho__lista">${html}</ul>`;
  }

  atualizarResumo(total, quantidade) {
    this._spanTotal.textContent = formatarMoeda(total);
    this._spanContador.textContent = quantidade;
    this._spanContador.hidden = quantidade === 0;
  }

  fecharModalNf() {
    this._modalNf.hidden = true;
    this._containerNf.innerHTML = "";
  }

  exibirModalNotaFiscal(nf) {
    const linhas = nf.itens.map(i => `
      <tr>
        <td>${i.nome}</td>
        <td>${i.quantidade}</td>
        <td>${formatarMoeda(i.precoUnitario)}</td>
        <td>${formatarMoeda(i.subtotal)}</td>
      </tr>
    `).join("");

    this._containerNf.innerHTML = `
      <div class="nota-fiscal">
        <h2 class="nota-fiscal__titulo">Nota Fiscal Eletrônica</h2>
        <p class="nota-fiscal__data">Emissão: ${this._formatarData(nf.data)} | Nº: ${nf.numero}</p>
        <table class="nota-fiscal__tabela">
          <thead>
            <tr><th>Produto</th><th>Qtd.</th><th>Unitário</th><th>Subtotal</th></tr>
          </thead>
          <tbody>${linhas}</tbody>
        </table>
        <p class="nota-fiscal__total">Total: <strong>${formatarMoeda(nf.total)}</strong></p>
        <p class="nota-fiscal__aviso">Esta nota é meramente ilustrativa. Obrigada pela preferência!</p>
      </div>
    `;
    
    this._modalNf.hidden = false;
  }

  _vincularEventosInternos() {
    this._btnAbrir.addEventListener("click", () => this.abrirCarrinho());
    this._btnFechar.addEventListener("click", () => this.fecharCarrinho());
  }

  bindFecharModal(handler) {
    this._btnFecharModal.addEventListener("click", handler);
    this._modalNf.addEventListener("click", (evento) => {
      if (evento.target === this._modalNf) handler();
    });
  }

  bindWhatsApp(handler) {
    this._btnWhatsApp.addEventListener("click", handler);
  }

  bindCheckout(handler) {
    this._btnCheckout.addEventListener("click", handler);
  }

  bindRemoverItem(handler) {
    this._containerItens.addEventListener("click", (evento) => {
      const botao = evento.target.closest('[data-acao="remover"]');
      if (botao) handler(botao.dataset.id);
    });
  }

  bindAlterarQuantidade(handler) {
    this._containerItens.addEventListener("click", (evento) => {
      const btn = evento.target.closest('.btn-qtd');
      if (!btn) return;
      handler(btn.dataset.id, btn.dataset.acao);
    });
  }
}