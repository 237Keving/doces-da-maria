import { AuthView } from '../views/AuthView.js';

export class AuthController {
  constructor(authService) {
    this._authService = authService;
    this._view = new AuthView();
  }

  inicializar() {
    this._view.atualizarInterface(this._authService.estaLogado());

    this._view.bindBotaoAuth(() => {
      if (this._authService.estaLogado()) {
        const confirmar = confirm("Deseja sair do painel administrativo?");
        if (confirmar) {
          this._authService.fazerLogout();
          this._view.atualizarInterface(false);
          this._view.irParaCatalogo();
        }
        return;
      }
      
      this._view.abrirModal();
    });

    this._view.bindSubmitLogin((usuario, senha) => {
      const sucesso = this._authService.fazerLogin(usuario, senha);
      if (sucesso) {
        this._view.fecharModal();
        this._view.atualizarInterface(true);
        return;
      }
      
      this._view.exibirErro();
    });
  }
}