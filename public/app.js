import {dados} from './dados.js'

const numeros = document.querySelectorAll('.botao');

function obtendoNumeros(e){
  let elemento = e.target.innerText;
  alert(elemento);
}
numeros.forEach(function(numero){
  numero.addEventListener('click', obtendoNumeros)
})
