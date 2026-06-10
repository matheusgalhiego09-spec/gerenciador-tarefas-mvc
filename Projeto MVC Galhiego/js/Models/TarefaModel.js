export class TarefaModel {
  constructor() {
    this.chaveStorage = 'tarefas-mvc-plus';
    this.tarefas = this.carregar();
  }

  carregar() {
    const tarefasSalvas = localStorage.getItem(this.chaveStorage);

    if (tarefasSalvas) {
      return JSON.parse(tarefasSalvas);
    }

    return [
      { id: crypto.randomUUID(), texto: 'Estudar HTML', concluida: false },
      { id: crypto.randomUUID(), texto: 'Aprender CSS', concluida: false },
      { id: crypto.randomUUID(), texto: 'Programar em JavaScript', concluida: true }
    ];
  }

  salvar() {
    localStorage.setItem(this.chaveStorage, JSON.stringify(this.tarefas));
  }

  adicionar(texto) {
    const tarefa = texto.trim();

    if (!tarefa) return;

    this.tarefas.unshift({
      id: crypto.randomUUID(),
      texto: tarefa,
      concluida: false
    });

    this.salvar();
  }

  alternarConcluida(id) {
    this.tarefas = this.tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    );

    this.salvar();
  }

  remover(id) {
    this.tarefas = this.tarefas.filter((tarefa) => tarefa.id !== id);
    this.salvar();
  }

  limparConcluidas() {
    this.tarefas = this.tarefas.filter((tarefa) => !tarefa.concluida);
    this.salvar();
  }
}
