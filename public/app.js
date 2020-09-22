import { dados } from './dados-urna/dados.js'

//Variaveis de controle de interface
const botoes = document.querySelectorAll('.botao');
const informacoes = document.querySelector('.informacoes');
const seuVoto = document.querySelector('.texto-inicial span');
const cargo = document.querySelector('.cargo-votado span');
const aviso = document.querySelector('.rodape');
const infoLateral = document.querySelector('.cabecalho-direito');
const caixaDosNumeros = document.querySelector('.numeros');

// Variaveis de controle de ambiente
let etapaAtual = 0;
let numero = '';

function comecarEtapa() {
  let numeroHtml = '';
  const dado = dados[etapaAtual];

  cargo.innerHTML = dado.titulo;
  informacoes.innerHTML = '';
  seuVoto.style.display = 'none';
  aviso.style.display = 'none';
  infoLateral.innerHTML = '';

  caixaDosNumeros.innerHTML = templateNumeros(dado, numeroHtml);
}

function templateNumeros(dado, numeroHtml) {
  for (let i = 0; i < dado.numero; i++) {
    i === 0 ? numeroHtml += '<div class="numero pisca"></div>' : numeroHtml += '<div class="numero"></div>'
  }
  return numeroHtml;
}

function obtendoNumeros(e) {
  let elemento = e.target.innerText;
  let elNumero = document.querySelector('.numero.pisca');

  if (elNumero !== null) {
    elNumero.innerHTML = elemento;
    numero += elemento;
    elNumero.classList.remove('pisca')
    if (elNumero.nextElementSibling === null) {
      atualizaInterface()
    } else {
      elNumero.nextElementSibling.classList.add('pisca')
    }
  }

}

function eventoDeClick(botoes) {
  return botoes.forEach(function (numeroDoBotao) {
    numeroDoBotao.addEventListener('click', obtendoNumeros)
  })
}



function atualizaInterface() {
  const dado = dados[etapaAtual];
  let candidato = dado.candidatos.filter((candidato) => candidato.numero === parseInt(numero))

  if (candidato.length > 0) {
    candidato = candidato[0];
    seuVoto.style.display = 'block'
    aviso.style.display = 'block'
    informacoes.innerHTML = `Nome: ${candidato.nome}</br> Partido: ${candidato.partido}`
    infoLateral.innerHTML = montandoFoto(candidato);
  }
}


function montandoFoto(candidato) {
  let montarFoto = '';
  for (let i in candidato.fotos) {
    montarFoto += `
    <div class="cabecalho-direito"> 
      <div class="image">
      <img src="./img/${candidato.fotos[i].url}" alt=""> 
      ${candidato.fotos[i].legenda} 
      </div>`
  }
  return montarFoto;
}


function confirmar(dados) {

}

function corrigir() {

}

function votoEmBranco() {

}

comecarEtapa();
eventoDeClick(botoes)



