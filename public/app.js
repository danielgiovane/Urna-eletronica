import { dados } from './dados-urna/dados.js'

//Variaveis de controle de interface
const botoes = document.querySelectorAll('.botao');
const informacoes = document.querySelector('.informacoes');
const seuVoto = document.querySelector('.texto-inicial span');
const cargo = document.querySelector('.cargo-votado span');
const aviso = document.querySelector('.rodape');
const infoLateral = document.querySelector('.cabecalho-direito');
const caixaDosNumeros = document.querySelector('.numeros');
const botaoBranco = document.querySelector('.botao-branco');
const botaoCorrigir = document.querySelector('.botao-corrigir');
const botaoConfirmar = document.querySelector('.botao-confirmar');

// Variaveis de controle de ambiente
let etapaAtual = 0;
let numero = '';
let emBranco = false;
let votos = [];

function comecarEtapa() {
  let dado = dados[etapaAtual]
  let numeroHtml = '';
  cargo.innerHTML = dado.titulo;
  informacoes.innerHTML = '';
  seuVoto.style.display = 'none';
  aviso.style.display = 'none';
  infoLateral.innerHTML = '';
  numero = '';
  emBranco = false;

  caixaDosNumeros.innerHTML = templateNumeros(dado, numeroHtml);
};
comecarEtapa();


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
eventoDeClick(botoes);



function atualizaInterface() {
  let dado = dados[etapaAtual]
  let candidato = dado.candidatos.filter((candidato) => candidato.numero === parseInt(numero))

  if (candidato.length > 0) {
    candidato = candidato[0];
    seuVoto.style.display = 'block'
    aviso.style.display = 'block'
    informacoes.innerHTML = `Nome: ${candidato.nome}</br> Partido: ${candidato.partido}`
    infoLateral.innerHTML = montandoFoto(candidato);
  }

  else {
    seuVoto.style.display = 'block'
    aviso.style.display = 'block'
    informacoes.innerHTML = `<div class='aviso pisca'>VOTO NULO</div>`
  }
}

// adicionado o evento de click 
botaoCorrigir.addEventListener('click', corrigir)
botaoConfirmar.addEventListener('click', confirmar)
botaoBranco.addEventListener('click', votoEmBranco)


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

// confirmando dados do candidato
function confirmar() {
  let dado = dados[etapaAtual]
  let votoConfirmado = false;

  if (emBranco === true) {
    votoConfirmado = true;

    votos.push({
      etapa: dados[etapaAtual].titulo,
      voto: 'voto em branco'
    });

  } else if (numero.length === dado.numero) {
    votoConfirmado = true;

    votos.push({
      etapa: dados[etapaAtual].titulo,
      voto: numero
    })

  } else {
    alert('Digite o numero do canditado/voto em branco/voto nulo')
  }


  if (votoConfirmado) {
    etapaAtual++

    if (dados[etapaAtual] !== undefined) {
      comecarEtapa();
    } else {
      seuVoto.style.display = 'none';
      aviso.style.display = 'none';
      infoLateral.innerHTML = '';
      caixaDosNumeros.innerHTML = '';
      cargo.innerHTML = '';
      informacoes.innerHTML = `<div class='fim pisca'>FIM</div>`;
      guardandoDadosNoLocalStorage(votos);
    }
  }
}

function guardandoDadosNoLocalStorage(array){
  let myJson = JSON.stringify(array)
  return localStorage.setItem('meusDados', myJson)
}

function obtendoDadosNoLocalStorage(nomeDaChave){
  let valorDaChave = localStorage.getItem(nomeDaChave);
  return JSON.parse(valorDaChave);
}


function votoEmBranco() {
  if (numero === '') {
    emBranco = true;
    seuVoto.style.display = 'block';
    aviso.style.display = 'block';
    caixaDosNumeros.innerHTML = ' ';
    informacoes.innerHTML = `<div class='voto-em-branco pisca'>VOTO EM BRANCO</div>`
  }
  else {
    alert('Para votar em BRANCO não pode ter nenhum numero preenchido')
  }

}


function corrigir() {
  comecarEtapa();
}






