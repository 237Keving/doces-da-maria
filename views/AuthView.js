export class AuthView {
  constructor() {
    this._btnAuth = document.querySelector('[data-action="btn-auth"]');
    this._iconeAuth = this._btnAuth.querySelector('[data-icone="auth"]');
    this._modalLogin = document.getElementById('modal-login');
    this._formLogin = document.getElementById('form-login');
    this._msgErro = document.getElementById('login-erro');
    this._btnFecharLogin = document.querySelector('[data-action="fechar-login"]');
    this._abasRestritas = document.querySelectorAll('[data-restrito="true"]');
  }

  atualizarInterface(isLogado) {
    this._abasRestritas.forEach(aba => aba.hidden = !isLogado);
    
    if (isLogado) {
      this._iconeAuth.classList.replace('ph-user', 'ph-sign-out');
      this._iconeAuth.classList.add('nav-abas__icone--logado');
    } else {
      this._iconeAuth.classList.replace('ph-sign-out', 'ph-user');
      this._iconeAuth.classList.remove('nav-abas__icone--logado');
    }
  }

  abrirModal() {
    this._msgErro.hidden = true;
    this._formLogin.reset();
    this._modalLogin.hidden = false;
  }

  fecharModal() {
    this._modalLogin.hidden = true;
  }

  exibirErro() {
    this._msgErro.hidden = false;
  }

  irParaCatalogo() {
    const abaCatalogo = document.querySelector('[data-alvo="secao-catalogo"]');
    if (abaCatalogo) abaCatalogo.click();
  }

  bindBotaoAuth(handlerClicarBtn) {
    this._btnAuth.addEventListener("click", handlerClicarBtn);
  }

  bindSubmitLogin(handlerLogin) {
    this._formLogin.addEventListener("submit", (evento) => {
      evento.preventDefault();
      const formData = new FormData(this._formLogin);
      handlerLogin(formData.get("usuario"), formData.get("senha"));
    });

    this._btnFecharLogin.addEventListener("click", () => this.fecharModal());
  }
}