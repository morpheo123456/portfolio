export default class VistaMuebles {
    constructor() {
        this.controlador = null;
        this.id_editando = null;
        this.alerta = document.querySelector(".alerta");
        this.cargando = document.getElementById("loading");
        this.contenedor_productos = document.querySelector(".products-container");
        //===========================================================================
        this.formu_crear = document.getElementById("formu_create");
        this.boton_crear = document.getElementById("create");
        this.titulo = document.getElementById("title");
        this.compania = document.getElementById("company");
        this.precio = document.getElementById("price");
        this.imagen = document.getElementById("image");
        
        this.boton_crear.addEventListener("click",
            async () => {
                if (this.titulo.value.trim() === "" ||
                    this.precio.value.trim() === "" ||
                    this.compania.value.trim() === "" ||
                    this.imagen.value.trim() === "") {
                    this.mostrarMensaje("Faltan datos en el formulario", "danger");
                } else {
                    this.cargando.style.display = "block";
                    this.controlador.crear_mueble(this.formu_crear);
                    this.cargando.style.display = "none";
                    this.formu_crear.reset();
                    this.mostrarMensaje("Mueble creado", "success");
                }
            }
        );

        //==============================================================================
        this.formu_editar = document.getElementById("formu_edit");
        this.boton_editar = document.getElementById("edit");
        this.editar_titulo = document.getElementById("edit_title");
        this.editar_compania = document.getElementById("edit_company");
        this.editar_precio = document.getElementById("edit_price");
        this.editar_imagen = document.getElementById("edit_image");

        this.boton_editar.addEventListener("click",
            async () => {
                if (this.id_editando === null ||
                    this.editar_titulo.value.trim() === "" ||
                    this.editar_precio.value.trim() === "" ||
                    this.editar_compania.value.trim() === "" ||
                    this.editar_imagen.value.trim() === "") {

                        this.mostrarMensaje("Falta información para editar", "danger");
                } else {
                    this.cargando.style.display = "block";
                    this.controlador.editar_mueble(this.formu_editar, this.id_editando);
                    this.id_editando = null;
                    this.cargando.style.display = "none";
                    this.formu_crear.reset();
                    this.mostrarMensaje("Mueble editado", "success");
                    this.editar_modal.classList.remove("show");

                }
            })
        //=============================================================================
        //Gestion del modal emergente de editar
        this.editar_modal = document.querySelector(".edit-overlay");
        this.cerrar_editar = document.querySelector(".edit-close");
        this.cerrar_editar.addEventListener("click",
            () => {
                this.editar_modal.classList.remove("show");
            });
        //===========================================================================
        //Gestion de la paginacion    
        this.pag_sig = document.getElementById("next");
        this.pag_ant = document.getElementById("prev");

        this.pag_sig.addEventListener("click", this.cambiar_pagina);
        this.pag_ant.addEventListener("click", this.cambiar_pagina);

    }

    cambiar_pagina = (evento) => {
        evento.preventDefault();
        this.controlador.actualizar_vistamodelo(evento.target.href);
    }


    setControlador = (controlador) => {
        this.controlador = controlador;
    }

    
    actualizar_enlaces = () => {
        if (this.controlador.getEnlaceSiguiente() !== null) {
            this.pag_sig.setAttribute("href", "http://" + this.controlador.getEnlaceSiguiente());
            this.pag_sig.style.display = "inline";
        } else {
            this.pag_sig.setAttribute("href", "");
            this.pag_sig.style.display = "none";
        }

        if (this.controlador.getEnlaceAnterior() !== null) {
            this.pag_ant.setAttribute("href", "http://" + this.controlador.getEnlaceAnterior());
            this.pag_ant.style.display = "inline";
        } else {
            this.pag_ant.style.display = "none";
            this.pag_ant.setAttribute("href", "");
        }
    }

    renderizarListaMuebles = () => {
        this.contenedor_productos.innerHTML = "";
        this.controlador.getMuebles().forEach(objeto => {
            const producto = this.crearDOMProducto(objeto);
            this.contenedor_productos.appendChild(producto);
        });
    }
    
    crearDOMProducto = (p) => {
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
                this.cargando.style.display = "block";
                const contenedor_padre = evento.currentTarget.parentElement.parentElement;
                const id_producto = contenedor_padre.getAttribute("data-id");
                this.controlador.borrar_mueble(id_producto);
                this.mostrarMensaje("Mueble borrado", "success");
                this.cargando.style.display = "none";
            });


        const editar = producto.querySelector(".product-edit-btn");
        editar.addEventListener('click',
            async (evento) => {
                const contenedor_padre = evento.currentTarget.parentElement.parentElement;
                //clave del mueble despues para que se edite en el otro formulario
                this.id_editando = contenedor_padre.getAttribute("data-id");
                const datos_mueble = this.controlador.obtener_datos_mueble(this.id_editando);
                //Colocar los datos del mueble a editar
                this.editar_titulo.value = datos_mueble["title"];
                this.editar_compania.value = datos_mueble["company"];
                this.editar_imagen.value = datos_mueble["image"];
                this.editar_precio.value = datos_mueble["price"];
                this.editar_modal.classList.add("show");
            });

        return producto;
    }

    mostrarMensaje = (texto, clase) => {
        this.alerta.innerHTML = `<h3>${texto}</h3>`;

        this.alerta.classList.add(clase);
        // remove alert
        setTimeout(() => {
            this.alerta.innerText = "";
            this.alerta.classList.remove(clase);

        }, 2000);
    }
}