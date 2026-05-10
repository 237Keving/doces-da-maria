import { DashboardView } from '../views/DashboardView.js';

export class DashboardController {
  constructor(dashboardService, eventBus) {
    this._dashboardService = dashboardService;
    this._eventBus = eventBus;
    this._view = new DashboardView();
  }

  inicializar() {
    this._atualizarDashboard();

    this._eventBus.inscrever("catalogoAtualizado", () => {
      this._atualizarDashboard();
    });
  }

  _atualizarDashboard() {
    const metricas = this._dashboardService.obterMetricas();

    this._view.renderizarMetricas(
      metricas.totalProdutos, 
      metricas.categoriasUnicas, 
      metricas.ticketMedio
    );

    this._view.renderizarGrafico(metricas.labels, metricas.dados);
  }
}