import { formatarMoeda } from '../utils/formatadores.js';

export class DashboardView {
  constructor() {
    this._containerMetricas = document.querySelector('[data-container="dashboard-metricas"]');
    this._canvasGrafico = document.getElementById("grafico-categorias");
    this._grafico = null;
  }

  renderizarMetricas(totalProdutos, totalCategorias, ticketMedio) {
    this._containerMetricas.innerHTML = `
      <div class="dashboard__card">
        <h3><i class="ph ph-package"></i> Total de Produtos</h3>
        <p class="dashboard__valor">${totalProdutos}</p>
      </div>
      <div class="dashboard__card">
        <h3><i class="ph ph-tag"></i> Categorias</h3>
        <p class="dashboard__valor">${totalCategorias}</p>
      </div>
      <div class="dashboard__card">
        <h3><i class="ph ph-coin"></i> Preço Médio</h3>
        <p class="dashboard__valor">${formatarMoeda(ticketMedio)}</p>
      </div>
    `;
  }

  renderizarGrafico(labels, dados) {
    if (typeof Chart === 'undefined') {
      console.error("[DashboardView] Chart.js não carregado.");
      return;
    }

    if (this._grafico) {
      // Destruição obrigatória da instância anterior para prevenir vazamento de memória e conflitos de hover no Canvas.
      this._grafico.destroy();
    }

    this._grafico = new Chart(this._canvasGrafico, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Produtos por Categoria',
          data: dados,
          backgroundColor: ['#e8647a', '#3b2314', '#f5b041', '#58d68d', '#5dade2'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }
}