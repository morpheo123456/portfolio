
const piezas_desordenadas = ["3.jpg", "9.jpg", "1.jpg", "8.jpg", "7.jpg", "6.jpg", "5.jpg", "4.jpg", "2.jpg"];

//Este array marca la manera correcta para que la tortuga sea visible
const piezas_ordenadas = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"];


//Casillas tablero desordenado
const casillas = document.querySelectorAll("#desordenadas img");

//Casillas tablero a solucionar
const solucion = document.querySelectorAll("#solucion img");
//piezas colocadas correctamente
let correctas = 0;
//INICIALIZAR EL JUEGO
Iniciar();
function Iniciar() {
	//Con esto cada vez que se juegan están desordenadas de distinta manera
	piezas_desordenadas.sort(
		() => {
			return Math.random() - 0.5
		});

	casillas.forEach((casilla,posicion) => {
		casilla.src = piezas_desordenadas[posicion];
	});

	solucion.forEach(casilla=>{
		casilla.src="error.png"
	});


	//VACIAMOS
	correctas=0;
	

}


//EVENTOS PARA EL TABLERO DESORDENADO
casillas.forEach((casilla) => {

	casilla.addEventListener("dragstart",
		(evento) => {
			let trozos = casilla.src.split("/");
			let img_url = trozos[trozos.length - 1];
			evento.dataTransfer.setData('imagen', img_url);
			casilla.classList.add("agarrado");
		});

	casilla.addEventListener("dragend",
		() => {
			casilla.classList.remove("agarrado");
		});
});




//EVENTO PARA EL TABLERO SOLUCION
solucion.forEach((casilla,posicion) => {
	
	casilla.addEventListener("dragstart",
		(evento) => {
			evento.preventDefault();
		});

	casilla.addEventListener("dragenter",
		(eventos) => {
			eventos.stopPropagation();
			casilla.classList.add("encima");
		});

	casilla.addEventListener("dragleave",
		(evento) => {
			evento.stopPropagation();
			casilla.classList.remove("encima");
		});

	casilla.addEventListener("dragover",
		(evento) => {
			evento.preventDefault();
			evento.dataTransfer.dropEffect = "copy";
		});

	casilla.addEventListener("drop",
		(evento) => {
			casilla.classList.remove("encima");
			casilla.src = evento.dataTransfer.getData("imagen");

			let trozos = casilla.src.split("/");
			let img_url = trozos[trozos.length - 1];

			if (piezas_ordenadas[posicion] == img_url) {
				correctas++

				if (correctas == piezas_ordenadas.length) {
					alert("LO CONSEGUISTE");

					Iniciar();
				} else {
					alert("PIEZA SITUADA CORRECTAMENTE");
					//casilla.children[0].src="correcto.jpg";
				}
			}


		});


});







