export class ItemCarrinho {
  constructor(produto, quantidade = 1) {
    this.produto = produto;
    this.quantidade = quantidade;
  }
}

export class Carrinho {
  constructor(itens = []) {
    this.itens = itens;
  }
}