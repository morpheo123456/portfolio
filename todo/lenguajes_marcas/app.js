"use strict"


// Obtener la parte del pathname (ruta después del dominio)
const pathname = window.location.pathname;



let lista_objetos;

const form = document.querySelector(".lista-form");
const alert = document.querySelector(".alert");
const contenido = document.getElementById("contenido");
const btn_enviar = document.querySelector(".submit-btn");
const lista_html = document.querySelector(".lista-list");
const btn_borrar_todo = document.querySelector(".clear-btn");
const banner=document.querySelector(".lista-form h3");
const trocear_pathname=pathname.split("/");
const raiz = trocear_pathname[trocear_pathname.length-2];

banner.textContent=raiz.split("_").join(" ");
document.title=raiz.split("_").join(" ").toUpperCase();


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

db.ref(raiz).on("value",
    (snapshot) => {
        lista_html.innerHTML="";
        snapshot.forEach((dato) => {
            let objeto = dato.val();
            const nuevo_elemento = crearItem(objeto);
            lista_html.appendChild(nuevo_elemento);
        });

    });


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
            
            db.ref(raiz).child(clave_elemento).remove();

            mostrarMensaje("Borrado con éxito", "success");

        });



    const terminar_item = nuevo.querySelector(".terminado-btn");
    terminar_item.addEventListener("click",
        (evento) => {
            const contenido_item = evento.currentTarget.parentElement.parentElement;
            const clave_elemento = contenido_item.getAttribute("data-key");
            const texto = evento.currentTarget.parentElement.previousElementSibling;

            const modificado=db.ref(raiz).child(clave_elemento);
            modificado.once("value")
            .then((snapshot)=>{
                const datos=snapshot.val();
                datos.terminado=!datos.terminado;
                modificado.set(datos);
                mostrarMensaje("Completado con éxito", "success");
            })
            

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
            const nueva_ref=db.ref(raiz).push();
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
        db.ref(raiz).set("");
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