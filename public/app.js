import { dados } from './dados-urna/dados.js'

//Variaveis de controle de interface
const botoes = document.querySelectorAll('.botao');
const informacoes = document.querySelector('.informacoes').classList.add('info-oculta')
const seuVoto = document.querySelector('.texto-inicial span').classList.add('info-oculta')
const aviso = document.querySelector('.rodape').classList.add('info-oculta');
const infoLateral = document.querySelector('.cabecalho-direito').classList.add('info-oculta')
const numeros = document.querySelector('.numeros').classList.add('info-normal')

// Variaveis de controle de ambiente

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

eventoDeClick(botoes)



