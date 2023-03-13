let divs = Array.from(document.querySelectorAll(".canvas div"));

const canvas = document.querySelector(".canvas");   

/* Botones de limpiar y de craer un nuevo lienzo*/

function limpiar(){
    divs.forEach( (div)=> {div.style.backgroundColor= "white"});
    divs.forEach((div)=> {div.removeEventListener('mouseover', changeColor)})
    divs.forEach( (div)=>{div.addEventListener("click", addHoverListeners)});
};

function crearLienzo() {
    limpiar();
}

/* Funcionalidad de los colores*/

let selectedOption = document.querySelector('input[name="color"]:checked').value;

function handleOptionChange() {
    selectedOption = document.querySelector('input[name="color"]:checked').value;
}

const fieldset = document.querySelector('fieldset[name="color-options"]');

fieldset.addEventListener('change', handleOptionChange);

/* Funcionalidad de hacer click hover*/

function addHoverListeners() {
    divs.forEach((div) => {div.addEventListener("mouseover", changeColor);});
    divs.forEach( (div)=>{div.removeEventListener("click", addHoverListeners)});
}  

divs.forEach( (div)=>{div.addEventListener("click", addHoverListeners)});
  
function changeColor() {
    this.style.backgroundColor = selectedOption; 
}
  