export class AuthService {
  constructor() {
    this._STORAGE_KEY = "doces_maria_logado";
  }

  estaLogado() {
    return localStorage.getItem(this._STORAGE_KEY) === "true";
  }

  fazerLogin(usuario, senha) {
    // Altere os valores abaixo para o usuário e senha desejados
    if (usuario === "isaias" && senha === "html#key") {
      localStorage.setItem(this._STORAGE_KEY, "true");
      return true;
    }
    return false;
  }

  fazerLogout() {
    localStorage.removeItem(this._STORAGE_KEY);
  }
}