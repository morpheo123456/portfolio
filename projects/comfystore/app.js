"use strict"
let lista=[];

const alerta=document.querySelector(".alerta");
const busqueda = document.querySelector(".search-input");
const contenedor_productos = document.querySelector(".products-container");
const compañias = document.querySelector(".companies");
const precio = document.querySelector(".price-filter");
const limite_maximo = document.querySelector(".price-value");
const cargando=document.getElementById("loading");

const modal = document.querySelector(".modal");
const cerrar_modal = document.querySelector(".close-btn");
const contenido_modal = document.querySelector(".modal-content");

const carrito = document.querySelector(".cart-overlay");
const cerrar_carrito = document.querySelector(".cart-close");
const carrito_productos = document.querySelector(".cart-items");
const abrir_carrito = document.querySelector(".toggle-cart");


const pag_sig = document.getElementById("next");
const pag_ant = document.getElementById("prev");

pag_sig.addEventListener("click",
(evento)=>{
  evento.preventDefault();
  Inicio(evento.target.href);
})


pag_ant.addEventListener("click",
(evento)=>{
  evento.preventDefault();
  Inicio(evento.target.href);
})


abrir_carrito.addEventListener("click",
  () => {
    carrito.classList.add("show");
  });


cerrar_modal.addEventListener("click",
  () => {
    modal.classList.remove("open");
  });

cerrar_carrito.addEventListener("click",
  () => {
    carrito.classList.remove("show");
  });

const lista_carrito = localStorage.getItem("carrito") ?
  JSON.parse(localStorage.getItem("carrito")) : [];

renderizar(lista_carrito, carrito_productos, crearItemCarrito);




//CUANDO CAMBIEN EL VALOR DEL RANGE
precio.addEventListener("change",
  () => {
    let filtro;
    let limite = precio.value;
    limite_maximo.innerText = "Price max limit " + limite + "€";
    filtro = lista.filter(p => p.price <= limite);
    console.log(filtro)
    if (filtro.length > 0) {
      renderizar(filtro, contenedor_productos, crearProducto);
    } else {
      contenedor_productos.innerHTML = "<h3 class='filter-error'>Your filter doesn´t match with any item</h3>"
    }


  });

//FILTRO DE BUSQUEDA
busqueda.addEventListener("keyup",
  () => {
    let filtro;
    let texto_busqueda = busqueda.value.trim();
    if (texto_busqueda === "") {
      filtro = [...lista];
    } else {
      filtro = lista.filter(p => p.title.toLowerCase().includes(texto_busqueda.toLowerCase()));

    }
    if (filtro.length > 0) {
      renderizar(filtro, contenedor_productos, crearProducto);
    } else {
      contenedor_productos.innerHTML = "<h3 class='filter-error'>Your filter doesn´t match with any item</h3>"
    }

  });


//COMO SON MAS SIMPLES, SOLO BOTONES LO PODEMOS HACER CON TARGET Y EXPANDIENDO
compañias.addEventListener("click",
  (evento) => {
    const activado = evento.target;

    if (activado.matches(".company-btn")) {

      let filtro;
      if (activado.innerText.toLowerCase() === "all") {
        filtro = [...lista];
      } else {
        filtro = lista.filter(p => p.company.toLowerCase() === activado.innerText.toLowerCase());

      }
      renderizar(filtro, contenedor_productos, crearProducto);
    }
  })

//Inicializamos todo 
Inicio();

//==================FUNCIONES AUXILIARES=====================================================

async function Inicio(url_api="MueblesLista.php") {

  cargando.style.display = "block";

  const respuesta = await fetch(url_api);
  const datos = await respuesta.json();
  
  console.log(datos);
  //Asignamos la lista
  lista=datos["datos"];

  //Establecemos los enlaces si procede
  if(datos["siguiente"]!=="null"){
    pag_sig.setAttribute("href","http://"+datos["siguiente"]);
    pag_sig.style.display="inline";
  }else{
    pag_sig.setAttribute("href","");
    pag_sig.style.display="none";
  }

  if(datos["anterior"]!=="null"){
    pag_ant.setAttribute("href","http://"+datos["anterior"]);
    pag_ant.style.display="inline";
  }else{
    pag_ant.style.display="none";
    pag_ant.setAttribute("href","");
  }

  //FILTRO POR COMPAÑIAS
  const nombre_compañias = lista.map(p => p.company).filter((c, i, array) => array.indexOf(c) === i);
  compañias.innerHTML=`<button class="company-btn">all</button>`;
  nombre_compañias.forEach(c => {
    compañias.innerHTML+= `<button class="company-btn">${c}</button>`;
  });
  //TODOS LOS PRODUCTOS INICIALMENTE
  renderizar(lista, contenedor_productos, crearProducto);

  //FILTRO DE PRECIO
  //PRIMERO ESTABLECER EL PRECIO MAXIMO PARA EL FILTRO
  const mayor_precio = Math.ceil(lista.map(p => p.price).sort((a, b) => b - a)[0]);
  precio.setAttribute("max", mayor_precio);
  precio.value = mayor_precio
  limite_maximo.innerText = "Price max limit " + precio.value + "€";
  cargando.style.display = "none";
}

function renderizar(lista_objetos, contenedor_dom, crear_dom) {
  contenedor_productos.innerHTML = "";
  lista_objetos.forEach(objeto => {
    const producto = crear_dom(objeto);
    contenedor_dom.appendChild(producto);
  });
}

function crearItemCarrito(datos_item) {
  const nuevo_item = document.createElement('article');
  nuevo_item.classList.add('cart-item');
  nuevo_item.setAttribute('data-id', datos_item.id);
  nuevo_item.innerHTML = `
  <img src="${datos_item.image}"
            class="cart-item-img"
            alt="${datos_item.title}"
          />  
          <div>
            <h4 class="cart-item-name">${datos_item.title}</h4>
            <p class="cart-item-price">${datos_item.price}</p>
            <button class="cart-item-remove-btn" data-id="${datos_item.id}">Delete <i class="fas fa-times"></i></button>
          </div>`;

  return nuevo_item;
}



function crearProducto(p) {
  const producto = document.createElement("article");
  producto.innerHTML = ` <article class="product">
    <div class="product-container" data-id="${p.id}">
      <img src="${p.image}" class="product-img img" alt="${p.title}" />
      <div class="product-icons">
        <button class="product-modal-btn product-icon" ">
          <i class="fas fa-search"></i>
        </button>
        <button class="product-cart-btn product-icon" >
          <i class="fas fa-shopping-cart"></i>
        </button>
      </div>
    </div>
    <footer>
      <p class="product-name">${p.title}</p>
      <h4 class="product-price">${p.price} €</h4>
      <h4 class=".single-product-company">${p.company}</h4>
    </footer>
  </article> `;

  const lupa = producto.querySelector(".product-modal-btn");
  lupa.addEventListener('click',
    (evento) => {
      const contenedor_padre = evento.currentTarget.parentElement.parentElement;
      const id = contenedor_padre.getAttribute("data-id");
      const mueble = lista.find(p => p.id === id);
      contenido_modal.children[0].src = mueble.image;
      contenido_modal.children[1].innerText = mueble.title;
      contenido_modal.children[2].innerText = mueble.company;
      modal.classList.add("open");
    });


  const carrito = producto.querySelector(".product-cart-btn");
  carrito.addEventListener('click',
    (evento) => {
      const contenedor_padre = evento.currentTarget.parentElement.parentElement;
      const id_producto = contenedor_padre.getAttribute("data-id");

      const buscado = lista.find(p => p.id === id_producto);

      lista_carrito.push(buscado);
      const nuevo_elemento = crearItemCarrito(buscado);
      carrito_productos.appendChild(nuevo_elemento);
      localStorage.setItem("carrito", JSON.stringify(lista_carrito));
      mostrarMensaje("Producto añadido al carrito","danger");
    });

  return producto;
}

function mostrarMensaje(texto, clase) {
  alerta.innerHTML = `<h3>${texto}</h3>`;
  
  alerta.classList.add(clase);
  // remove alert
  setTimeout(() => {
    alerta.innerText = "";
    alerta.classList.remove(clase);
  }, 4000);
}