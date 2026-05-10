import { Carrinho, ItemCarrinho } from "../models/Carrinho.js";
import { formatarMoeda } from "../utils/formatadores.js";

export class CarrinhoService {
  constructor(config = {}) {
    this._storageKey = config.storageKey || "doces_maria_carrinho";
    this._whatsappNumero = config.whatsappNumero || "";
    this.carrinho = new Carrinho();
    this._inicializar();
  }

  _inicializar() {
    try {
      const salvo = localStorage.getItem(this._storageKey);
      if (salvo) {
        const dados = JSON.parse(salvo);
        
        this.carrinho.itens = (dados.itens || [])
          .filter(i => i.produto?.id && typeof i.quantidade === 'number')
          .map(i => new ItemCarrinho(i.produto, i.quantidade));
      }
    } catch (erro) {
      console.error("[CarrinhoService] Erro ao carregar carrinho:", erro);
      localStorage.removeItem(this._storageKey);
      this.limpar();
    }
  }

  _persistir() {
    localStorage.setItem(this._storageKey, JSON.stringify(this.carrinho));
  }

  adicionarProduto(produto) {
    const existente = this.carrinho.itens.find((i) => i.produto.id === produto.id);
    
    if (existente) {
      this.alterarQuantidade(produto.id, existente.quantidade + 1);
      return;
    }
    this.carrinho.itens.push(new ItemCarrinho(produto, 1));
    
    this._persistir();
  }

  removerProduto(produtoId) {
    this.carrinho.itens = this.carrinho.itens.filter((i) => i.produto.id !== produtoId);
    this._persistir();
  }

  alterarQuantidade(produtoId, quantidade) {
    if (quantidade <= 0) {
      this.removerProduto(produtoId);
      return;
    }

    const item = this.carrinho.itens.find((i) => i.produto.id === produtoId);
    if (item) {
      item.quantidade = quantidade;
      this._persistir();
    }
  }

  limpar() {
    this.carrinho.itens = [];
    this._persistir();
  }

  obterItens() {
    return Object.freeze([...this.carrinho.itens]);
  }

  obterTotal() {
    return this.carrinho.itens.reduce((total, item) => total + (item.produto.preco * item.quantidade), 0);
  }

  obterQuantidadeTotal() {
    return this.carrinho.itens.reduce((total, item) => total + item.quantidade, 0);
  }

  estaVazio() {
    return this.carrinho.itens.length === 0;
  }

  gerarMensagemWhatsApp() {
    if (this.estaVazio()) {
      throw new Error("Não é possível gerar mensagem para um carrinho vazio.");
    }

    const itensFormatados = this.carrinho.itens
      .map(i => `• ${i.quantidade}x ${i.produto.nome} (${formatarMoeda(i.produto.preco * i.quantidade)})`)
      .join("\n");

    const mensagemCorpo = encodeURIComponent(
      `Olá, Dona Maria! Gostaria de fazer o seguinte pedido:\n\n` +
      `${itensFormatados}\n\n` +
      `*Total: ${formatarMoeda(this.obterTotal())}*\n\n` +
      `Aguardando confirmação!`
    );

    return `https://wa.me/${this._whatsappNumero}?text=${mensagemCorpo}`;
  }

  gerarNotaFiscal() {
    if (this.estaVazio()) throw new Error("O carrinho está vazio.");

    const numero = Math.floor(Math.random() * 90000) + 10000;
    const agora = new Date().toISOString();

    const itens = this.carrinho.itens.map(i => ({
      nome: i.produto.nome,
      quantidade: i.quantidade,
      precoUnitario: i.produto.preco,
      subtotal: i.produto.preco * i.quantidade
    }));

    return {
      numero,
      data: agora,
      itens,
      total: this.obterTotal()
    };
  }
}