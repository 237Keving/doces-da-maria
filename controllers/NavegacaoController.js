import { NavegacaoView } from '../views/NavegacaoView.js';

export class NavegacaoController {
  constructor() {
    this._view = new NavegacaoView();
  }

  inicializar() {
    this._view.bindMudarAba((alvoId, abaAtiva) => {
      this._view.atualizarInterface(alvoId, abaAtiva);
    });
  }
}