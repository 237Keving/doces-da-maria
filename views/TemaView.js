export class TemaView {
  constructor() {
    this._btnTema = document.querySelector('[data-action="alternar-tema"]');
    this._iconeTema = this._btnTema.querySelector('i');
  }

  aplicarTema(escuro) {
    if (escuro) {
      document.body.classList.add("tema-escuro");
      this._iconeTema.classList.replace("ph-moon", "ph-sun");
    } else {
      document.body.classList.remove("tema-escuro");
      this._iconeTema.classList.replace("ph-sun", "ph-moon");
    }
  }

  bindAlternarTema(handler) {
    this._btnTema.addEventListener("click", handler);
  }
}