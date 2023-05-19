"use strict"
let lista = [];
let id_editando = null;

const alerta = document.querySelector(".alerta");
const formu_crear = document.getElementById("formu_create");
const formu_editar = document.getElementById("formu_edit");
const boton_crear = document.getElementById("create");
const boton_editar = document.getElementById("edit");
const titulo = document.getElementById("title");
const compania = document.getElementById("company");
const precio = document.getElementById("price");
const imagen = document.getElementById("image");

const editar_titulo = document.getElementById("edit_title");
const editar_compania = document.getElementById("edit_company");
const editar_precio = document.getElementById("edit_price");
const editar_imagen = document.getElementById("edit_image");

const contenedor_productos = document.querySelector(".products-container");
const cargando = document.getElementById("loading");

const editar_modal = document.querySelector(".edit-overlay");
const cerrar_editar = document.querySelector(".edit-close");


cerrar_editar.addEventListener("click",
  () => {
    editar_modal.classList.remove("show");
  });

const pag_sig = document.getElementById("next");
const pag_ant = document.getElementById("prev");

pag_sig.addEventListener("click",
  (evento) => {
    evento.preventDefault();
    Inicio(evento.target.href);
  })


pag_ant.addEventListener("click",
  (evento) => {
    evento.preventDefault();
    Inicio(evento.target.href);
  })


boton_crear.addEventListener("click",
  async () => {
    if (titulo.value.trim() === "" || precio.value.trim() === "" || compania.value.trim() === "" || imagen.value.trim() === "") {
      mostrarMensaje("Faltan datos en el formulario", "danger");
    } else {
      cargando.style.display = "block";
      const datos_formulario = new URLSearchParams(new FormData(formu_crear));
      await fetch('mueblesInsertar.php', {
        method: 'POST',
        body: datos_formulario
      });
      console.log(datos_formulario.toString());
      
      cargando.style.display = "none";
      formu_crear.reset();
      mostrarMensaje("Mueble insertado con exito", "success","mueblesLista.php");
      
    }
  })

  boton_editar.addEventListener("click",
  async () => {
    if (id_editando===null || editar_titulo.value.trim() === "" || editar_precio.value.trim() === "" || editar_compania.value.trim() === "" || editar_imagen.value.trim() === "") {
      mostrarMensaje("Falta información para editar", "danger");
    } else {
      cargando.style.display = "block";
      const datos_edicion = new URLSearchParams(new FormData(formu_editar));
      datos_edicion.append("id",id_editando);

      console.log(datos_edicion.toString());
      
      await fetch('mueblesEditar.php', {
        method: 'POST',
        body: datos_edicion
      });
      id_editando=null;
      cargando.style.display = "none";
      formu_crear.reset();
      mostrarMensaje("Mueble editado con exito", "success","mueblesLista.php");
      editar_modal.classList.remove("show");
      
    }
  })


//Inicializamos todo 
Inicio("mueblesLista.php");

//==================FUNCIONES AUXILIARES=====================================================

async function Inicio(url_api) {

  cargando.style.display = "block";

  const respuesta = await fetch(url_api);
  const datos = await respuesta.json();

  console.log(datos);
  //Asignamos la lista
  lista = datos["datos"];

  //Establecemos los enlaces si procede
  if (datos["siguiente"] != "null") {
    pag_sig.setAttribute("href", "http://" + datos["siguiente"]);
    pag_sig.style.display = "inline";
  } else {
    pag_sig.setAttribute("href", "");
    pag_sig.style.display = "none";
  }

  if (datos["anterior"] != "null") {
    pag_ant.setAttribute("href", "http://" + datos["anterior"]);
    pag_ant.style.display = "inline";
  } else {
    pag_ant.style.display = "none";
    pag_ant.setAttribute("href", "");
  }

  //TODOS LOS PRODUCTOS INICIALMENTE
  renderizar(lista, contenedor_productos, crearProducto);

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
        <button class="product-remove-btn product-icon" ">
          <i class="fas fa-times"></i>
        </button>
        <button class="product-edit-btn product-icon" >
          <i class="fas fa-edit"></i>
        </button>
      </div>
    </div>
    <footer>
      <p class="product-name">${p.title}</p>
      <h4 class="product-price">${p.price} €</h4>
      <h4 class=".single-product-company">${p.company}</h4>
    </footer>
  </article> `;

  const eliminar = producto.querySelector(".product-remove-btn");
  eliminar.addEventListener('click',
    async (evento) => {
      cargando.style.display="block";
      const contenedor_padre = evento.currentTarget.parentElement.parentElement;
      const id_producto = contenedor_padre.getAttribute("data-id");
      await fetch(`mueblesDelete.php?id=${id_producto}`, {
        method: 'GET'       
      });
      cargando.style.display="none";
      mostrarMensaje("Producto eliminado con exito", "danger","mueblesLista.php");
      
    });


  const editar = producto.querySelector(".product-edit-btn");
  editar.addEventListener('click',
    async(evento) => {
      const contenedor_padre = evento.currentTarget.parentElement.parentElement;
      id_editando = contenedor_padre.getAttribute("data-id");
      const datos_mueble=lista.find(item=>item.id===id_editando);
      
      editar_titulo.value=datos_mueble["title"];
      editar_compania.value=datos_mueble["company"];
      editar_imagen.value=datos_mueble["image"];
      editar_precio.value=datos_mueble["price"];
      editar_modal.classList.add("show");

    });

  return producto;
}

function mostrarMensaje(texto, clase,accion) {
  alerta.innerHTML = `<h3>${texto}</h3>`;

  alerta.classList.add(clase);
  // remove alert
  setTimeout(() => {
    alerta.innerText = "";
    alerta.classList.remove(clase);
    if(accion!=undefined){
      Inicio(accion);
    }
  }, 2000);
}