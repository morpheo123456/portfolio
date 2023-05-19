"use strict"

let lista_objetos;

const form = document.querySelector(".lista-form");
const alert = document.querySelector(".alert");
const contenido = document.getElementById("contenido");
const btn_enviar = document.querySelector(".submit-btn");
const lista_html = document.querySelector(".lista-list");
const btn_borrar_todo = document.querySelector(".clear-btn");

const nombre_local="datos";

Inicio(nombre_local);

function Inicio(nombre) {
    lista_objetos = JSON.parse(localStorage.getItem(nombre) ?? "[]");
    lista_objetos.forEach(
        (objeto) => {
            const nuevo_elemento = crearItem(objeto);
            lista_html.appendChild(nuevo_elemento);
        }
    )
}



function mostrarMensaje(texto, clase) {
    alert.innerText = texto;
    alert.classList.add(clase);
    // remove alert
    setTimeout(() => {
        alert.innerText = "";
        alert.classList.remove(clase);
    }, 2000);
}

function crearItem(objeto) {

    const nuevo = document.createElement("article");
    nuevo.classList.add("lista-item");
    nuevo.setAttribute("data-key", objeto.clave);
    const tachado = objeto.terminado ? "tachado" : "";
    nuevo.innerHTML = `<p class="title ${tachado}">${objeto.valor}</p>
                                <div class="btn-container">
                                    <button type="button" class="terminado-btn">
                                        <i class="fas fa-chevron-down"></i>
                                    </button>
                                    <button type="button" class="borrar-btn">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>`;



    //EVENTOS PROPIOS DEL ITEM QUE SE AÑADE

    const borrar_item = nuevo.querySelector(".borrar-btn");
    borrar_item.addEventListener("click",
        (evento) => {
            const contenido_item = evento.currentTarget.parentElement.parentElement;
            const clave_elemento = contenido_item.getAttribute("data-key");
            lista_objetos.findIndex(item => item.clave === clave_elemento);
            lista_objetos.splice(1, 0);
            localStorage.setItem("datos", JSON.stringify(lista_objetos));
            contenido_item.remove();
            mostrarMensaje("Borrado con éxito", "success");

        });



    const terminar_item = nuevo.querySelector(".terminado-btn");
    terminar_item.addEventListener("click",
        (evento) => {
            const contenido_item = evento.currentTarget.parentElement.parentElement;
            const texto = evento.currentTarget.parentElement.previousElementSibling;

            const clave_elemento = contenido_item.getAttribute("data-key");
            const buscado = lista_objetos.find(item => item.clave === clave_elemento);
            buscado.terminado = true;
            localStorage.setItem("datos", JSON.stringify(lista_objetos));

            texto.classList.add("tachado");
            mostrarMensaje("Completado con éxito", "success");

        });

    return nuevo;
}


form.addEventListener("submit",
    (evento) => {
        evento.preventDefault();
        const valor = contenido.value.trim();
        if (valor === "") {
            mostrarMensaje("Escriba algo", "danger");
        } else {
            const clave = new Date().getTime().toString();
            const nuevo_objeto = { clave, valor };
            const nuevo_elemento = crearItem(nuevo_objeto);
            lista_html.appendChild(nuevo_elemento);

            lista_objetos.push(nuevo_objeto);
            localStorage.setItem(nombre_local, JSON.stringify(lista_objetos));
            mostrarMensaje("Añadido a la lista", "success");
            form.reset();
        }
    });

btn_borrar_todo.addEventListener("click",
    () => {
        lista_html.innerHTML = "";
        lista_objetos.length = 0;
        localStorage.setItem(nombre_local, []);
        mostrarMensaje("Lista vaciada con éxito", "success");
    });




/*
`<p class="title">${valor}</p>
                                <div class="btn-container">
                                    <button type="button" class="done-btn">
                                        <i class="fas fa-chevron-down"></i>
                                    </button>
                                    <button type="button" class="delete-btn">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>`
*/