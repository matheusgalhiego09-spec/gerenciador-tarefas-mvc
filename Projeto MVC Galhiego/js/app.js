import { TarefaModel } from './Models/TarefaModel.js';
import { TarefaView } from './Views/TarefaView.js';
import { TarefaController } from './Controllers/TarefaController.js';

const model = new TarefaModel();
const view = new TarefaView();
const controller = new TarefaController(model, view);

const form = document.querySelector('#form-tarefa');
const lista = document.querySelector('#lista-container');
const filtros = document.querySelectorAll('.filtro');
const btnTema = document.querySelector('#toggle-tema');
const btnLimparConcluidas = document.querySelector('#limpar-concluidas');

form.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const input = document.querySelector('#tarefa-input');
  controller.adicionarTarefa(input.value);
});

lista.addEventListener('click', (evento) => {
  const elemento = evento.target;
  const acao = elemento.dataset.acao;
  const id = elemento.dataset.id;

  if (acao === 'alternar') controller.alternarTarefa(id);
  if (acao === 'remover') controller.removerTarefa(id);
});

filtros.forEach((botao) => {
  botao.addEventListener('click', () => {
    filtros.forEach((filtro) => filtro.classList.remove('ativo'));
    botao.classList.add('ativo');
    controller.mudarFiltro(botao.dataset.filtro);
  });
});

btnLimparConcluidas.addEventListener('click', () => {
  controller.limparConcluidas();
});

btnTema.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  const escuro = document.body.classList.contains('dark');
  btnTema.textContent = escuro ? '☀️' : '🌙';

  localStorage.setItem('tema-mvc-plus', escuro ? 'dark' : 'light');
});

const temaSalvo = localStorage.getItem('tema-mvc-plus');

if (temaSalvo === 'dark') {
  document.body.classList.add('dark');
  btnTema.textContent = '☀️';
}