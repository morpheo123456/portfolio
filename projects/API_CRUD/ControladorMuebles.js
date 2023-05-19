export default class ControladorMuebles {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;

    }

    iniciar = () => {
        this.actualizar_vistamodelo();
    }

    getMuebles = () => {
        return this.modelo.lista_muebles;
    }

    getEnlaceSiguiente = () => {
        return this.modelo.siguiente;
    }

    getEnlaceAnterior = () => {
        return this.modelo.anterior;
    }

    obtener_datos_mueble = (id) => {
        return this.modelo.buscar_mueble(id);
    }

    crear_mueble = async (formulario) => {
        const datos_formulario = new URLSearchParams(new FormData(formulario));
        await fetch('mueblesInsertar.php', {
            method: 'POST',
            body: datos_formulario
        });
        this.actualizar_vistamodelo();
    }
    
    editar_mueble = async (formulario, id) => {
        const datos_edicion = new URLSearchParams(new FormData(formulario));
        datos_edicion.append("id", id);

        await fetch('mueblesEditar.php', {
            method: 'POST',
            body: datos_edicion
        });
        this.actualizar_vistamodelo();
    }

    borrar_mueble = async (id) => {
        await fetch(`mueblesDelete.php?id=${id}`, {
            method: 'GET'
        });

        this.actualizar_vistamodelo();
    }

    actualizar_vistamodelo = async (url_api = "mueblesLista.php") => {
        this.vista.cargando.style.display = "block";
        await this.modelo.actualizar_modelo(url_api);
        this.vista.renderizarListaMuebles();
        this.vista.cargando.style.display = "none";
        this.vista.actualizar_enlaces();
    }





}