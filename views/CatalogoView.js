import { formatarMoeda } from '../utils/formatadores.js';

export class CatalogoView {
  constructor() {
    this._containerGrade = document.querySelector('[data-container="grade-produtos"]');
    this._containerFiltros = document.querySelector('[data-container="filtros"]');
    this._campoBusca = document.querySelector('[data-input="busca-produtos"]');
  }

  exibirErroCarregamento(mensagem) {
    this._containerGrade.innerHTML = `
      <div class="catalogo__vazio">
        <i class="ph ph-warning-circle catalogo__erro-icone"></i>
        <p><strong>Ops! Algo deu errado.</strong></p>
        <p>${mensagem}</p>
      </div>
    `;
  }

  renderizarProdutos(produtos, itensCarrinho = []) {
    if (produtos.length === 0) {
      this._containerGrade.innerHTML = `
        <div class="catalogo__vazio">
          <i class="ph ph-smiley-sad"></i>
          <p>Nenhum doce encontrado com estes critérios.</p>
        </div>
      `;
      return;
    }

    const html = produtos.map((produto) => {
      const itemNoCarrinho = itensCarrinho.find(i => i.produto.id === produto.id);
      const qtdNoCarrinho = itemNoCarrinho ? itemNoCarrinho.quantidade : 0;

      const badgeHtml = qtdNoCarrinho > 0 
        ? `<div class="card-produto__badge-carrinho"><i class="ph ph-check-circle"></i> Na cesta (${qtdNoCarrinho})</div>` 
        : '';
        
      const btnClasse = qtdNoCarrinho > 0 ? "btn--creme" : "btn--rosa";
      const btnTexto = qtdNoCarrinho > 0 ? "+ Adicionar mais" : "Adicionar";

      return `
        <article class="card-produto" data-id="${produto.id}">
          <div class="card-produto__imagem-wrapper">
            ${badgeHtml}
            <img
              src="${produto.imagem}"
              alt="${produto.nome}"
              class="card-produto__imagem"
              loading="lazy"
            />
            <span class="card-produto__categoria">${produto.categoria}</span>
          </div>
          <div class="card-produto__corpo">
            <h3 class="card-produto__nome">${produto.nome}</h3>
            <p class="card-produto__descricao">${produto.descricao}</p>
            <div class="card-produto__rodape">
              <span class="card-produto__preco">${formatarMoeda(produto.preco)}</span>
              <button 
                type="button" 
                class="btn ${btnClasse} btn-adicionar-carrinho" 
                data-action="adicionar-carrinho" 
                data-id="${produto.id}"
              >
                ${btnTexto}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");

    this._containerGrade.innerHTML = html;
  }

  renderizarFiltros(categorias, categoriaAtiva) {
    const btnTodas = `
      <button 
        type="button" 
        class="btn-filtro ${categoriaAtiva === 'todas' ? 'btn-filtro--ativo' : ''}" 
        data-action="filtrar" 
        data-categoria="todas"
      >
        Todas
      </button>
    `;
    
    const botoes = categorias.map((c) => `
      <button 
        type="button" 
        class="btn-filtro ${categoriaAtiva === c ? 'btn-filtro--ativo' : ''}" 
        data-action="filtrar" 
        data-categoria="${c}"
      >
        ${c}
      </button>
    `).join("");
    
    this._containerFiltros.innerHTML = btnTodas + botoes;
  }

  bindAdicionarCarrinho(handler) {
    this._containerGrade.addEventListener("click", (evento) => {
      const botao = evento.target.closest('[data-action="adicionar-carrinho"]');
      if (botao) {
        handler(botao.dataset.id);
      }
    });
  }

  bindFiltrarCategoria(handler) {
    this._containerFiltros.addEventListener("click", (evento) => {
      const botao = evento.target.closest('[data-action="filtrar"]');
      if (botao) {
        handler(botao.dataset.categoria);
      }
    });
  }

  bindBuscarProduto(handler) {
    this._campoBusca.addEventListener("input", (evento) => {
      handler(evento.target.value);
    });
  }

  exibirNotificacao(nomeProduto, callbackAbrirCarrinho) {
    const container = document.getElementById('toast-container') || this._criarContainerToast();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="ph ph-check-circle" style="color: #25d366; font-size: 1.6rem;"></i>
      <div style="flex: 1;">
        <p style="margin: 0; font-size: 0.9rem;"><strong>${nomeProduto}</strong> no carrinho!</p>
        <small style="opacity: 0.8; font-size: 0.75rem;">Acesse pelo ícone <i class="ph ph-shopping-cart"></i> no topo.</small>
      </div>
      <button type="button" class="toast__btn">Ver Cesta</button>
    `;

    toast.querySelector('.toast__btn').onclick = () => {
      callbackAbrirCarrinho();
      toast.remove();
    };

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('toast--ocultar');
        toast.addEventListener('animationend', () => toast.remove());
      }
    }, 4000);
  }

  _criarContainerToast() {
    const div = document.createElement('div');
    div.id = 'toast-container';
    div.className = 'toast-container';
    document.body.appendChild(div);
    return div;
  }
}