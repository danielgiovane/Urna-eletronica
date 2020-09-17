import { dados } from './dados-urna/dados.js'

//Variaveis de controle de interface
let botoes = document.querySelectorAll('.botao');
let informacoes = document.querySelector('.informacoes');
let seuVoto = document.querySelector('.texto-inicial span');
let cargo = document.querySelector('.cargo-votado span');
let aviso = document.querySelector('.rodape');
let infoLateral = document.querySelector('.cabecalho-direito');
let caixaDosNumeros = document.querySelector('.numeros');

// Variaveis de controle de ambiente

let etapaAtual = 0;

function comecarEtapa() {
  let numeroHtml = '';
  const dado = dados[etapaAtual];
  cargo.innerHTML = dado.titulo;
  informacoes.innerHTML = '';
  seuVoto.innerHTML = '';
  aviso.style.display = 'none'
  infoLateral.innerHTML = '';
  caixaDosNumeros.innerHTML = templateNumeros(dado, numeroHtml);
}

function templateNumeros(dado, numeroHtml) {
  for (let i = 0; i < dado.numero; i++) {
    numeroHtml += '<div class="numero"></div>'
  }
  return numeroHtml;
}



function confirmar(dados) {

}

function corrigir() {

}

function votoEmBranco() {

}

function obtendoNumeros(e) {
  let elemento = e.target.innerText;
  console.log(elemento)
  return elemento;
}

function eventoDeClick(botoes) {
  return botoes.forEach(function (numeroDoBotao) {
    numeroDoBotao.addEventListener('click', obtendoNumeros)
  })
}

comecarEtapa();
eventoDeClick(botoes)



