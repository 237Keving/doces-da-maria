export class NavegacaoView {
  constructor() {
    this._abas = document.querySelectorAll('[data-action="mudar-aba"]');
    this._secoes = document.querySelectorAll('.secao');
    this._btnAncora = document.querySelector('[data-action="ancora-catalogo"]');
  }

  bindMudarAba(handler) {
    this._abas.forEach(aba => {
      aba.addEventListener('click', (e) => {
        const alvoId = e.target.dataset.alvo;
        handler(alvoId, e.target);
      });
    });

    if (this._btnAncora) {
      this._btnAncora.addEventListener('click', () => {
        const abaCatalogo = document.querySelector('[data-alvo="secao-catalogo"]');
        handler('secao-catalogo', abaCatalogo);
      });
    }
  }

  atualizarInterface(alvoId, abaAtiva) {
    this._abas.forEach(a => a.classList.remove('nav-abas__btn--ativo'));
    this._secoes.forEach(s => s.hidden = true);

    abaAtiva.classList.add('nav-abas__btn--ativo');
    document.getElementById(alvoId).hidden = false;
  }
}