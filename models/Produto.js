export class Produto {
  constructor({ id, nome, descricao, preco, categoria, imagem, destaque }) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.categoria = categoria;
    this.imagem = imagem;
    this.destaque = destaque;
  }
}