import { TemaView } from '../views/TemaView.js';

export class TemaController {
  constructor(temaService) {
    this._temaService = temaService;
    this._view = new TemaView();
    this._temaAtual = this._temaService.obterTema();
  }

  inicializar() {
    this._view.aplicarTema(this._temaAtual === "escuro");
    this._view.bindAlternarTema(() => this._alternarTema());
  }

  _alternarTema() {
    this._temaAtual = this._temaAtual === "escuro" ? "claro" : "escuro";
    this._view.aplicarTema(this._temaAtual === "escuro");
    this._temaService.salvarTema(this._temaAtual);
  }
}