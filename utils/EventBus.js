export class EventBus {
  constructor() {
    this._subscritores = {};
  }
  inscrever(evento, callback) {
    if (!this._subscritores[evento]) this._subscritores[evento] = [];
    this._subscritores[evento].push(callback);
  }
  publicar(evento, dados = null) {
    if (!this._subscritores[evento]) return;
    this._subscritores[evento].forEach(callback => callback(dados));
    console.log(`[EventBus] ${evento}`, dados);
  }
}