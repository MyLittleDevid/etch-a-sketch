/* Elementos del DOM a modificar*/
let divs = Array.from(document.querySelectorAll(".canvas div"));
const cantidadCuadrados = document.querySelector(".buttons > span");
const cuadradosSelector = document.querySelector("input[type='range']");
const canvas = document.querySelector(".canvas")
const fieldset = document.querySelector('fieldset[name="color-options"]');

/* Botones de limpiar y de craer un nuevo lienzo*/
cantidadCuadrados.textContent = cuadradosSelector.value + " x " + cuadradosSelector.value;

cuadradosSelector.addEventListener('input', () => { cantidadCuadrados.textContent = cuadradosSelector.value + " x " + cuadradosSelector.value; });

function limpiar() {
    divs = Array.from(document.querySelectorAll(".canvas div"));
    divs.forEach((div)=> {div.style.backgroundColor= ""})
    divs.forEach((div) => { div.removeEventListener('mouseover', changeColor) })
    divs.forEach((div) => { div.addEventListener("click", addHoverListeners) });
};

function eliminarTodosHijos(elemento) {
    while (elemento.firstChild) {
      elemento.removeChild(elemento.firstChild);
    }
}
  
let cuadrados = parseInt(cuadradosSelector.value);

function crearLienzo () { 
    eliminarTodosHijos(canvas);
    cuadrados = parseInt(cuadradosSelector.value);
    
    let lienzoArea = cuadrados * cuadrados;
    for (let i = 1; i <= lienzoArea; i++) {
        let div = document.createElement('div');
        div.classList.add("grid-item")
        canvas.insertAdjacentElement('beforeend', div);
    } 
    canvas.style.gridTemplateColumns = `repeat(${cuadrados}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${cuadrados}, 1fr)`;
    limpiar()
}

crearLienzo();

/* Funcionalidad de los colores*/
function masNegro(div) {
    const backgroundColor = window.getComputedStyle(div).backgroundColor;
    const rgbValues = backgroundColor.match(/\d+/g);
    if (rgbValues) {
      const r = Math.floor(parseInt(rgbValues[0]) * 0.9);
      const g = Math.floor(parseInt(rgbValues[1]) * 0.9);
      const b = Math.floor(parseInt(rgbValues[2]) * 0.9);
      div.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    } else {
      div.style.backgroundColor = 'rgb(25, 25, 25)';
    }
}
  

function colorAleatorio() {
    var letras = '0123456789ABCDEF';
    var randomColor = '#';
    for (var i = 0; i < 6; i++) {
        randomColor += letras[Math.floor(Math.random() * 16)];
    }
    return randomColor;
}

let selectedOption = document.querySelector('input[name="color"]:checked').value;
let color = "";

/* Funcionalidad de hacer click y hover*/

function changeColor() {
    selectedOption = document.querySelector('input[name="color"]:checked').value;
    switch (selectedOption){
        case "red": color= "red" ;break;
        case "colorAleatorio": color=colorAleatorio(); break;
        case "negro": color =masNegro(this); break;
    }
    this.style.backgroundColor = color;
}

function addHoverListeners() {
    divs = Array.from(document.querySelectorAll(".canvas div"));
    divs.forEach((div) => { div.addEventListener("mouseover", changeColor); });
    divs.forEach((div) => { div.removeEventListener("click", addHoverListeners) });
}

divs.forEach((div) => { div.addEventListener("click", addHoverListeners) });
