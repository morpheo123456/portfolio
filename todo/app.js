"use strict"


// Obtener la URL completa
var urlCompleta = window.location.href;

// Obtener el host (nombre del dominio)
var host = window.location.host;

// Obtener la parte del pathname (ruta después del dominio)
var pathname = window.location.pathname;

// Obtener la parte del search (cadena de consulta)
var search = window.location.search;

// Obtener el hash (fragmento de URL después del '#')
var hash = window.location.hash;

// Mostrar la información obtenida en la consola
console.log("URL completa: " + urlCompleta);
console.log("Host: " + host);
console.log("Pathname: " + pathname);
console.log("Search: " + search);
console.log("Hash: " + hash);

let lista_objetos;

const form = document.querySelector(".lista-form");
const alert = document.querySelector(".alert");
const contenido = document.getElementById("contenido");
const btn_enviar = document.querySelector(".submit-btn");
const lista_html = document.querySelector(".lista-list");
const btn_borrar_todo = document.querySelector(".clear-btn");

const nombre_local = "datos";

//FIREBASE DATABASE
const config = {
    apiKey: "AIzaSyAs0RA1QU7I8jpuhi3wPCWxOiCuC00ZK08",
    authDomain: "chat-7d403.firebaseapp.com",
    databaseURL: "https://chat-7d403.firebaseio.com",
    projectId: "chat-7d403",
    storageBucket: "chat-7d403.appspot.com",
    messagingSenderId: "826560982809",
    appId: "1:826560982809:web:00ff5d26fc93e8f4f01f88"
};

firebase.initializeApp(config);
let db = firebase.database();

db.ref("lista_compra").on("value",
    (snapshot) => {
        lista_html.innerHTML="";
        snapshot.forEach((dato) => {
            let objeto = dato.val();
            const nuevo_elemento = crearItem(objeto);
            lista_html.appendChild(nuevo_elemento);
        });

    });

//Inicio(nombre_local);




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

    const titleElement = nuevo.querySelector('.title');
    titleElement.addEventListener('click', () => {
        popupText.textContent = titleElement.textContent;
        popup.style.display = 'flex';
    });


    //EVENTOS PROPIOS DEL ITEM QUE SE AÑADE

    const borrar_item = nuevo.querySelector(".borrar-btn");
    borrar_item.addEventListener("click",
        (evento) => {
            const contenido_item = evento.currentTarget.parentElement.parentElement;
            const clave_elemento = contenido_item.getAttribute("data-key");
            
            db.ref("lista_compra").child(clave_elemento).remove();

            mostrarMensaje("Borrado con éxito", "success");

        });



    const terminar_item = nuevo.querySelector(".terminado-btn");
    terminar_item.addEventListener("click",
        (evento) => {
            const contenido_item = evento.currentTarget.parentElement.parentElement;
            const clave_elemento = contenido_item.getAttribute("data-key");
            const texto = evento.currentTarget.parentElement.previousElementSibling;

            console.log(texto.textContent);
            const modificado = { "clave":clave_elemento,"valor":texto.textContent};
            modificado.terminado = true;
            db.ref("lista_compra").child(clave_elemento).set(modificado);
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
            
            // const nuevo_elemento = crearItem(nuevo_objeto);
            // lista_html.appendChild(nuevo_elemento);
            const nueva_ref=db.ref("lista_compra").push();
            const nuevo_objeto = { clave:nueva_ref.key, valor };
            nueva_ref.set(nuevo_objeto);
            // lista_objetos.push(nuevo_objeto);
            // localStorage.setItem(nombre_local, JSON.stringify(lista_objetos));
            mostrarMensaje("Añadido a la lista", "success");
            form.reset();
        }
    });

btn_borrar_todo.addEventListener("click",
    () => {
        db.ref("lista_compra").set("");
        mostrarMensaje("Lista vaciada con éxito", "success");
    });


//POP PARA LOS PUNTOS SUSPENSIVOS
const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');
const popupClose = document.getElementById('popup-close');



popupClose.addEventListener('click', () => {
    popup.style.display = 'none';
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