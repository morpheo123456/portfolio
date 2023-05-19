export default class ModeloMuebles {
    constructor() {
        this.lista_muebles = [];
        this.siguiente=null;
        this.anterior=null;
    }

    buscar_mueble=(id)=>{
        return this.lista_muebles.find(item => item.id === id);
    }

    actualizar_modelo = async (url_api="mueblesLista.php") => {
        const respuesta = await fetch(url_api);
        const datos = await respuesta.json();
        this.lista_muebles = datos["datos"];
        this.anterior=datos["anterior"];
        this.siguiente=datos["siguiente"];
    }
}

