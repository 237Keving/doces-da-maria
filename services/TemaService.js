export class TemaService {
  constructor() {
    this._STORAGE_KEY = "doces_maria_tema";
  }

  obterTema() {
    return localStorage.getItem(this._STORAGE_KEY) || "claro";
  }

  salvarTema(tema) {
    localStorage.setItem(this._STORAGE_KEY, tema);
  }
}