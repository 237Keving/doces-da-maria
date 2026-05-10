import { Produto } from "../models/Produto.js";

const STORAGE_KEY = "doces_maria_produtos";

export class ProdutoService {
  constructor() {
    this._produtos = [];
  }

  async inicializar() {
    try {
      const salvo = localStorage.getItem(STORAGE_KEY);
      if (salvo) {
        // Re-instanciação necessária para recuperar métodos do Model Produto após desserialização.
        const dados = JSON.parse(salvo);
        this._produtos = dados.map((d) => new Produto(this._normalizarDados(d, d.id)));
        return;
      }

      const resposta = await fetch("./data/produtos.json");
      if (!resposta.ok) throw new Error("Não foi possível carregar os doces no momento.");
      
      const dados = await resposta.json();
      this._produtos = dados.map((d) => new Produto(this._normalizarDados(d, d.id)));
      this._persistir();
    } catch (erro) {
      console.error("[ProdutoService] Erro na inicialização:", erro);
      this._produtos = [];
    }
  }

  _persistir() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._produtos));
  }

  _gerarId() {
    // Fallback manual para garantir geração de IDs em contextos de desenvolvimento sem suporte a HTTPS/Crypto.
    return (typeof crypto !== "undefined" && crypto.randomUUID)
      ? crypto.randomUUID()
      : `doce_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  }

  _normalizarDados(dados, id = null) {
    // Centralização do tratamento de tipos para mitigar inconsistências vindas de entradas de formulário ou JSON externo.
    const dadosTratados = {
      id: id ?? this._gerarId(),
      nome: dados.nome ? String(dados.nome).trim() : "",
      descricao: dados.descricao ? String(dados.descricao).trim() : "",
      preco: Number(dados.preco),
      categoria: dados.categoria ? String(dados.categoria).trim() : "outros",
      imagem: dados.imagem ? String(dados.imagem).trim() : "",
      destaque: String(dados.destaque) === "true" || dados.destaque === true
    };

    this._validarDados(dadosTratados);
    return dadosTratados;
  }

  _validarDados(dados) {
    if (!dados.nome) throw new Error("O nome do produto é obrigatório.");
    if (!dados.descricao) throw new Error("A descrição do produto é obrigatória.");
    if (!dados.imagem) throw new Error("A imagem do produto é obrigatória.");
    if (Number.isNaN(dados.preco) || dados.preco < 0) throw new Error("O preço informado é inválido.");
  }

  listarTodos() {
    return [...this._produtos];
  }

  listarPorCategoria(categoria) {
    return this._produtos.filter((p) => p.categoria === categoria);
  }

  buscar(termo) {
    if (!termo) return this.listarTodos();
    
    const termoNormalizado = termo.toLowerCase().trim();
    return this._produtos.filter(
      (p) =>
        p.nome.toLowerCase().includes(termoNormalizado) ||
        p.descricao.toLowerCase().includes(termoNormalizado) ||
        p.categoria.toLowerCase().includes(termoNormalizado)
    );
  }

  buscarPorId(id) {
    return this._produtos.find((p) => p.id === id) ?? null;
  }

  categorias() {
    const unicas = new Set(this._produtos.map((p) => p.categoria));
    return [...unicas];
  }

  adicionar(dados) {
    const produto = new Produto(this._normalizarDados(dados));
    this._produtos.push(produto);
    this._persistir();
    return produto;
  }

  editar(id, dados) {
    const indice = this._produtos.findIndex((p) => p.id === id);
    if (indice === -1) throw new Error(`Produto com id "${id}" não encontrado.`);
    
    this._produtos[indice] = new Produto(this._normalizarDados(dados, id));
    this._persistir();
    
    return this._produtos[indice];
  }

  remover(id) {
    const tamanhoOriginal = this._produtos.length;
    this._produtos = this._produtos.filter((p) => p.id !== id);
    
    if (this._produtos.length === tamanhoOriginal) {
      throw new Error(`Produto com id "${id}" não encontrado para exclusão.`);
    }
    
    this._persistir();
  }

  gerarBlobExportacao() {
    const json = JSON.stringify(this._produtos, null, 2);
    return new Blob([json], { type: "application/json" });
  }
}