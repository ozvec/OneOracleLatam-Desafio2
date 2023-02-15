import { pintarFondoBlanco, dibujarMuneco } from "./canvas.js";
const contenedor = document.querySelector(".contenedor");
const inicio = document.querySelector(".inicio");
const nuevoJuego = document.querySelector(".nuevo-juego");
const btnNuevoJuego = document.querySelector("#btn-nuevo-juego");
const btnDesistir = document.querySelector("#btn-desistir");
const divPalabra = document.querySelector(".palabra");
const divFinal = document.querySelector(".final");
const btnJugarDeNuevo = document.querySelector("#btn-jugar-de-nuevo");
const letrasNoAdivinadas = document.querySelector(".no-adivinadas");
//guardar valor original para el reinicio;
const espacio = letrasNoAdivinadas.textContent; 
const btnAgregarPalabra = document.querySelector("#btn-agregar-palabra");
const agregaPalabra = document.querySelector(".agrega-palabra");
const formulario = document.querySelector("form");
const btnCancelar = document.querySelector("#btn-cancelar");
const nuevaPalabra = document.querySelector("#nueva-palabra");
const entradaInvisible = document.querySelector(".entrada-invisible");

nuevoJuego.style.display = "none";
agregaPalabra.style.display = "none"
entradaInvisible.style.display = "none";
let intentos = 0;
let coincidencias = 0;
let letrasAdivinadas = "";

const palabras = ["ALURA","ORACLE","HTML","JAVASCRIPT","PROGRAMACION","REACT","ALGORITMO","BIBLIOTECA","CLIENTES","COMPILAR","INFORMATICA","CONSOLA","GIT","HARDWARE","LENGUAJE"];
let indice = Math.round(Math.random()*(palabras.length-1));
let palabra = palabras[indice];

const finalizar = (texto, color) => {
    divFinal.textContent = texto;
    divFinal.style.display = "inline";
    divFinal.style.color = color;
    entradaInvisible.removeEventListener("keyup", comparaLetra);
    entradaInvisible.value = "";
}

const reset = () => {
    while (divPalabra.firstChild) {
        divPalabra.removeChild(divPalabra.firstChild);
    }
    letrasNoAdivinadas.textContent = espacio;
    pintarFondoBlanco();
    indice = Math.round(Math.random()*(palabras.length-1));
    palabra = palabras[indice];
    intentos = 0;
    coincidencias = 0;
    letrasAdivinadas = "";
    entradaInvisible.removeEventListener("keyup", comparaLetra)
    entradaInvisible.value = "";
}

const comparaLetra = () => {
    const letras = entradaInvisible.value;
    const letra = letras.substring(letras.length-1).toUpperCase();
    if (!letrasNoAdivinadas.textContent.includes(letra)){
        if (!letrasAdivinadas.includes(letra)){
            for (let i=0; i<palabra.length; i++){
                if (letra === palabra[i]){
                    let div = document.querySelector(`.palabra > div:nth-child(${i+1})`);
                    div.insertAdjacentHTML("beforeend",`<h1>${letra}</h1>`)
                    div.style.color = "#0A3871";
                    letrasAdivinadas += letra;
                    coincidencias++
                }
            }
            if (!letrasAdivinadas.includes(letra)){
                letrasNoAdivinadas.textContent += letra
                intentos++
                dibujarMuneco(intentos);
            }
        }
    }  
    if (coincidencias === palabra.length){
        finalizar("Ganaste, felicidades!", "green");
    }
    if (intentos === 9){
        finalizar("Fin del juego, la palabra era " + palabra, "red");
    }
}

const jugar = () => {
    inicio.style.display = "none";
    nuevoJuego.style.display = "flex";
    divFinal.style.display = "none";
    entradaInvisible.style.display = "inline";
    entradaInvisible.focus();
    for (let i=0; i<palabra.length; i++){
        divPalabra.insertAdjacentHTML("beforeend", `<div></div>`)
    }
    entradaInvisible.addEventListener("keyup", comparaLetra);
}

btnNuevoJuego.addEventListener("click", () => {
    jugar();
})

btnDesistir.addEventListener("click", () => {
    entradaInvisible.removeEventListener("keyup", comparaLetra)
    entradaInvisible.value = "";
    entradaInvisible.style.display = "none";
    nuevoJuego.style.display = "none";
    inicio.style.display = "flex";
    reset();
})

btnJugarDeNuevo.addEventListener("click", () => {
    reset();
    jugar();
})

btnAgregarPalabra.addEventListener("click", () => {
    inicio.style.display = "none";
    agregaPalabra.style.display = "flex";
    nuevaPalabra.value = "";
    nuevaPalabra.focus();
})

formulario.addEventListener("submit", event => {
    event.preventDefault();
    const palabraNueva = nuevaPalabra.value.toUpperCase();
    palabras.push(palabraNueva);
    agregaPalabra.style.display = "none"
    jugar();
})

btnCancelar.addEventListener("click", () => {
    nuevoJuego.style.display = "none";
    agregaPalabra.style.display = "none";
    inicio.style.display = "flex";
    reset();
})

contenedor.addEventListener("click", () => {
    if (entradaInvisible.style.display === "inline"){
        entradaInvisible.focus();
    }
})



