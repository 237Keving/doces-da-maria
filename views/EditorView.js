import { formatarMoeda } from '../utils/formatadores.js';

export class EditorView {
  constructor() {
    this._containerTabela = document.querySelector('[data-container="editor-tabela"]');
    this._containerForm = document.querySelector('[data-container="editor-form"]');
    this._btnNovo = document.querySelector('[data-action="novo-doce"]');
    this._btnExportar = document.querySelector('[data-action="exportar-json"]');
    this._handlerSalvar = null;
    this._handlerCancelar = null;
  }

  acionarDownloadJSON(jsonString) {
    // Implementação de exportação client-side via Blob para evitar dependência de endpoints de backend.
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = "produtos-doces-maria.json";
    
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  exibirFormulario(produto = null) {
    const v = produto ?? { id: "", nome: "", descricao: "", preco: "", categoria: "brigadeiros", imagem: "", destaque: false };
    const categorias = ["brigadeiros", "bolos", "tortas", "outros"];

    const opcoesCategoria = categorias
      .map((c) => `<option value="${c}" ${v.categoria === c ? "selected" : ""}>${c.charAt(0).toUpperCase() + c.slice(1)}</option>`)
      .join("");

    // Injeção dinâmica para resetar o estado do formulário e listeners entre diferentes operações de edição/criação.
    this._containerForm.innerHTML = `
      <form class="editor__form" id="form-produto">
        <input type="hidden" name="id" value="${v.id}" />
        
        <div class="form-grupo">
          <label class="form-label" for="campo-nome">Nome</label>
          <input id="campo-nome" class="form-input" type="text" name="nome" value="${v.nome}" required />
        </div>
        
        <div class="form-grupo">
          <label class="form-label" for="campo-descricao">Descrição</label>
          <textarea id="campo-descricao" class="form-input form-textarea" name="descricao" required>${v.descricao}</textarea>
        </div>
        
        <div class="form-grupo">
          <label class="form-label" for="campo-preco">Preço (R$)</label>
          <input id="campo-preco" class="form-input" type="number" name="preco" value="${v.preco}" step="0.01" min="0" required />
        </div>
        
        <div class="form-grupo">
          <label class="form-label" for="campo-categoria">Categoria</label>
          <select id="campo-categoria" class="form-input" name="categoria" required>
            ${opcoesCategoria}
          </select>
        </div>
        
        <div class="form-grupo">
          <label class="form-label" for="campo-imagem">URL da Imagem</label>
          <input id="campo-imagem" class="form-input" type="url" name="imagem" value="${v.imagem}" required />
        </div>
        
        <div class="form-grupo form-grupo--inline">
          <input id="campo-destaque" type="checkbox" name="destaque" ${v.destaque ? "checked" : ""} />
          <label class="form-label" for="campo-destaque">Produto em destaque</label>
        </div>
        
        <div class="editor__form-acoes">
          <button type="submit" class="btn btn--rosa">${produto ? "Salvar alterações" : "Cadastrar novo doce"}</button>
          <button type="button" class="btn btn--creme" data-action="cancelar-form">Cancelar</button>
        </div>
      </form>
    `;

    this._containerForm.hidden = false;
    this._containerForm.scrollIntoView({ behavior: "smooth" });

    const form = this._containerForm.querySelector('#form-produto');

    form.addEventListener("submit", (evento) => {
      evento.preventDefault();
      
      const btnSubmit = form.querySelector('button[type="submit"]');
      const textoOriginal = btnSubmit.innerHTML;
      
      btnSubmit.innerHTML = `<i class="ph ph-spinner-gap ph-spin"></i> Processando...`;
      btnSubmit.disabled = true;

      const formData = new FormData(form);
      const dados = Object.fromEntries(formData.entries());
      dados.destaque = form.querySelector('[name="destaque"]').checked;

      const idRaw = formData.get("id");
      const idEdicao = (idRaw && idRaw.trim() !== "") ? idRaw : null;

      if (this._handlerSalvar) {
        try {
          this._handlerSalvar(dados, idEdicao);
        } catch (erro) {
          console.error("Erro ao salvar:", erro);
          alert("Erro no cadastro. Verifique o console.");
          btnSubmit.innerHTML = textoOriginal;
          btnSubmit.disabled = false;
        }
      }
    });

    const btnCancelar = form.querySelector('[data-action="cancelar-form"]');
    btnCancelar.addEventListener("click", () => {
      if (this._handlerCancelar) this._handlerCancelar();
    });
  }

  esconderFormulario() {
    this._containerForm.innerHTML = "";
    this._containerForm.hidden = true;
  }

  renderizarTabela(produtos) {
    if (produtos.length === 0) {
      this._containerTabela.innerHTML = `
        <div class="editor__vazio">
          <i class="ph ph-archive-box"></i>
          <p>Nenhum doce cadastrado no sistema.</p>
        </div>
      `;
      return;
    }

   const html = produtos.map((p) => `
  <tr>
    <td data-label="Imagem"><img src="${p.imagem}" alt="${p.nome}" class="tabela__thumb" loading="lazy" /></td>
    <td data-label="Nome"><strong>${p.nome}</strong></td>
    <td data-label="Categoria"><span class="card-produto__categoria card-produto__categoria--tabela">${p.categoria}</span></td>
    <td data-label="Preço">${formatarMoeda(p.preco)}</td>
    <td data-label="Destaque">${p.destaque ? '<i class="ph ph-star tabela__icone-destaque"></i> Sim' : 'Não'}</td>
    <td data-label="Ações">
      <div class="tabela__acoes">
        <button type="button" class="btn btn--creme" data-action="editar-doce" data-id="${p.id}" title="Editar">
          <i class="ph ph-pencil-simple"></i>
        </button>
        <button type="button" class="btn btn--creme btn--perigo" data-action="excluir-doce" data-id="${p.id}" title="Excluir">
          <i class="ph ph-trash"></i>
        </button>
      </div>
    </td>
  </tr>
`).join("");

    this._containerTabela.innerHTML = `
      <div class="tabela-responsiva">
        <table class="tabela-editor">
          <thead>
            <tr>
              <th>Imagem</th><th>Nome</th><th>Categoria</th><th>Preço</th><th>Destaque</th><th>Ações</th>
            </tr>
          </thead>
          <tbody>${html}</tbody>
        </table>
      </div>
    `;
  }

  bindNovoDoce(handler) {
    this._btnNovo.addEventListener("click", handler);
  }

  bindExportarJSON(handler) {
    this._btnExportar.addEventListener("click", handler);
  }

  bindEditarDoce(handler) {
    this._containerTabela.addEventListener("click", (evento) => {
      // Delegação de evento utilizada para suportar a re-renderização frequente da tabela sem perda de bindings.
      const btn = evento.target.closest('[data-action="editar-doce"]');
      if (btn) handler(btn.dataset.id);
    });
  }

  bindExcluirDoce(handler) {
    this._containerTabela.addEventListener("click", (evento) => {
      const btn = evento.target.closest('[data-action="excluir-doce"]');
      if (btn) {
        const confirmado = confirm("Tem certeza que deseja excluir este doce permanentemente?");
        if (confirmado) handler(btn.dataset.id);
      }
    });
  }

  bindSalvar(handler) {
    this._handlerSalvar = handler;
  }

  bindCancelar(handler) {
    this._handlerCancelar = handler;
  }
}