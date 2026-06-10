export class TarefaView {
  constructor() {
    this.container = document.querySelector('#lista-container');
    this.input = document.querySelector('#tarefa-input');
    this.total = document.querySelector('#total-tarefas');
    this.pendentes = document.querySelector('#pendentes-tarefas');
    this.concluidas = document.querySelector('#concluidas-tarefas');
  }

  escaparHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
  }

  renderizar(tarefas, filtroAtual = 'todas') {
    const tarefasFiltradas = tarefas.filter((tarefa) => {
      if (filtroAtual === 'pendentes') return !tarefa.concluida;
      if (filtroAtual === 'concluidas') return tarefa.concluida;
      return true;
    });

    this.atualizarResumo(tarefas);

    if (tarefasFiltradas.length === 0) {
      this.container.innerHTML = '<li class="vazio">Nenhuma tarefa por aqui ✨</li>';
      return;
    }

    this.container.innerHTML = tarefasFiltradas.map((tarefa) => `
      <li class="tarefa ${tarefa.concluida ? 'concluida' : ''}">
        <input class="check" type="checkbox" data-acao="alternar" data-id="${tarefa.id}" ${tarefa.concluida ? 'checked' : ''}>
        <span>${this.escaparHTML(tarefa.texto)}</span>
        <button class="excluir" data-acao="remover" data-id="${tarefa.id}" title="Excluir tarefa">×</button>
      </li>
    `).join('');
  }

  atualizarResumo(tarefas) {
    const total = tarefas.length;
    const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
    const pendentes = total - concluidas;

    this.total.textContent = total;
    this.pendentes.textContent = pendentes;
    this.concluidas.textContent = concluidas;
  }

  limparInput() {
    this.input.value = '';
    this.input.focus();
  }
}
