"use strict"

const cargando = document.getElementById("cargando");
const menu = document.querySelector(".cardmenu");
const imagen = document.getElementById("imagen");
const nombre = document.getElementById("nombre");
const exp = document.getElementById("exp");
const atributos = document.querySelectorAll(".atributos");

const anteriores = document.getElementById("ant");
const siguientes = document.getElementById("sig");

let pagina_actual = "https://pokeapi.co/api/v2/pokemon?limit=6";


Inicio(pagina_actual);

anteriores.addEventListener("click", cambiarPagina);
siguientes.addEventListener("click", cambiarPagina);

function cambiarPagina(evento) {
    evento.preventDefault();
    Inicio(evento.target.href);
}

async function Inicio(pagina) {
    menu.innerHTML = "";
    cargando.style.display = "block";
    let respuesta = await fetch(pagina);
    const datos = await respuesta.json();
    const lista_pokemon = datos["results"];
    lista_pokemon.forEach(
        (pokemon) => {
            menu.appendChild(crearEnlace(pokemon));
        });

    if (datos["previous"] === null) {
        anteriores.style.pointerEvents = "none";
        anteriores.setAttribute("href", "#");
    } else {
        anteriores.style.pointerEvents = "auto";
        anteriores.setAttribute("href", datos["previous"]);
    }

    if (datos["next"] === null) {
        siguientes.style.pointerEvents = "none";
        siguientes.setAttribute("href", "#");

    } else {
        siguientes.style.pointerEvents = "auto";
        siguientes.setAttribute("href", datos["next"]);
    }

    respuesta = await fetch(lista_pokemon[0].url);
    const pokemon = await respuesta.json();
    mostrarPokemon(pokemon);
    
    cargando.style.display = "none";
}


function mostrarPokemon(pokemon) {
    imagen.setAttribute("src", pokemon.sprites.other.dream_world.front_default);
    nombre.innerHTML = `${pokemon.name} <span>${pokemon.stats[0].base_stat}</span>`;
    exp.textContent = `${pokemon.base_experience} Exp`;
    atributos[0].innerHTML = `<h3> ${pokemon.stats[1].base_stat} K </h3><p>Ataque</p>`;
    atributos[1].innerHTML = `<h3>${pokemon.stats[3].base_stat} K </h3><p>Especial</p> `;
    atributos[2].innerHTML = `<h3>${pokemon.stats[2].base_stat} K</h3><p>Defensa</p>`;
}

function crearEnlace(pokemon) {
    const res = document.createElement("div");
    res.classList.add("card-body");
    res.innerHTML = `<p class="card-body-text"><a href="${pokemon.url}">${pokemon.name}</a></p>`

    const enlace = res.querySelector("a");
    enlace.addEventListener("click",
        async (evento) => {
            evento.preventDefault();
            cargando.style.display = "block";
            const respuesta = await fetch(enlace.href);
            const pokemon = await respuesta.json();
            mostrarPokemon(pokemon);
            cargando.style.display = "none";
        })

    return res;
}
