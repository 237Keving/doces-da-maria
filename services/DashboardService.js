export class DashboardService {
  constructor(produtoService) {
    this._produtoService = produtoService;
  }

  obterMetricas() {
    const produtos = this._produtoService.listarTodos();
    
    const totalProdutos = produtos.length;
    const categoriasUnicas = this._produtoService.categorias().length;
    const somaPrecos = produtos.reduce((acc, p) => acc + p.preco, 0);
    const ticketMedio = totalProdutos > 0 ? (somaPrecos / totalProdutos) : 0;

    const contagemPorCategoria = {};
    produtos.forEach(p => {
      contagemPorCategoria[p.categoria] = (contagemPorCategoria[p.categoria] || 0) + 1;
    });

    return {
      totalProdutos,
      categoriasUnicas,
      ticketMedio,
      labels: Object.keys(contagemPorCategoria),
      dados: Object.values(contagemPorCategoria)
    };
  }
}