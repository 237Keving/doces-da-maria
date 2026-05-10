import { EditorView } from '../views/EditorView.js';

export class EditorController {
  constructor(produtoService, eventBus) {
    this._produtoService = produtoService;
    this._eventBus = eventBus;
    this._view = new EditorView();
  }

  inicializar() {
    this._atualizarTabela();
    this._vincularEventos();
  }

  _atualizarTabela() {
    const produtos = this._produtoService.listarTodos();
    this._view.renderizarTabela(produtos);
  }

  _vincularEventos() {
    this._view.bindNovoDoce(() => {
      this._view.exibirFormulario(null);
    });

    this._view.bindExportarJSON(() => {
      const blob = this._produtoService.gerarBlobExportacao();
      const url = URL.createObjectURL(blob);
      this._view.acionarDownloadJSON(url);
    });

    this._view.bindEditarDoce((id) => {
      const produto = this._produtoService.buscarPorId(id);
      if (produto) {
        this._view.exibirFormulario(produto);
      }
    });

    this._view.bindExcluirDoce((id) => {
      this._produtoService.remover(id);
      this._atualizarTabela();
      
      this._eventBus.publicar("catalogoAtualizado");
    });

    this._view.bindSalvar((dados, idEdicao) => {
      if (idEdicao) {
        this._produtoService.editar(idEdicao, dados);
      } else {
        this._produtoService.adicionar(dados);
      }
      
      this._view.esconderFormulario();
      this._atualizarTabela();
      
      this._eventBus.publicar("catalogoAtualizado");
    });

    this._view.bindCancelar(() => {
      this._view.esconderFormulario();
    });
  }
}