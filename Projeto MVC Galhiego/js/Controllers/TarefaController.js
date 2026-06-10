export class TarefaController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.filtroAtual = 'todas';

    this.atualizarTela();
  }

  adicionarTarefa(texto) {
    this.model.adicionar(texto);
    this.view.limparInput();
    this.atualizarTela();
  }

  alternarTarefa(id) {
    this.model.alternarConcluida(id);
    this.atualizarTela();
  }

  removerTarefa(id) {
    this.model.remover(id);
    this.atualizarTela();
  }

  limparConcluidas() {
    this.model.limparConcluidas();
    this.atualizarTela();
  }

  mudarFiltro(filtro) {
    this.filtroAtual = filtro;
    this.atualizarTela();
  }

  atualizarTela() {
    this.view.renderizar(this.model.tarefas, this.filtroAtual);
  }
}
