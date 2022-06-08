/*Capturar Etiquetas*/
var bttIniciarJuego = document.querySelector(".btt-iniciar-juego");
var bttVolverJugar = document.querySelector(".btt-Volver-Jugar");
var bttVolverJugarGanador = document.querySelector(".btt-Volver-Jugar-ganador");
var AreaLetrasErradas = document.querySelector(".letras-erroneas");
var AreaLetrasAcertadas = document.querySelector(".letras-guiones");
AreaLetrasAcertadas.value = "";
AreaLetrasErradas.value = "";

/*Capturar Canvas*/
var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");

/*No capturar aun las letras para el juego*/
var activarTeclado = false;

/*Click en Boton Iniciar Juego*/
bttIniciarJuego.addEventListener("click",function(event){
	var AreaJuego = document.querySelector(".area-juego");
	var AreaInicio = document.querySelector(".area-inicio");

	AreaInicio.classList.add("oculto");
	AreaJuego.classList.remove("oculto");
	AreaJuego.classList.add("fondo-juego");

	/*Sortear Palabra*/
	var Palabras = PalabrasJugar();
	var r = sortearPalabra(Palabras.length)

	PalabraEscogida = Palabras[r];
	ColocarLetrasGuiones(PalabraEscogida,0);


	activarTeclado=true;
})

var errores=0;/*A los 6 errores, fin del juego*/
var aciertos=0;
var letrasErradas=[];
var letrasCorrectas=[];	

DibujoAhorcado(0,pincel);

/*Click Boton Volver a Jugar*/
bttVolverJugar.addEventListener("click",function(event){
	var AreaJuego = document.querySelector(".area-juego");
	var AreaInicio = document.querySelector(".area-inicio");

	AreaInicio.classList.add("oculto");
	AreaJuego.classList.remove("oculto");
	AreaGameOver.classList.add("oculto");
	AreaGanador.classList.add("oculto");

	/*Reiniciar*/
	errores=0;
	aciertos=0;
	letrasErradas=[];
	letrasCorrectas=[];
	AreaLetrasAcertadas.value = "";
	AreaLetrasErradas.value = "";
	pincel.clearRect(0, 0, pantalla.width, pantalla.height);	

	/*Sortear Palabra*/
	var Palabras = PalabrasJugar();
	var r = sortearPalabra(Palabras.length)

	PalabraEscogida = Palabras[r];
	ColocarLetrasGuiones(PalabraEscogida,0);


	DibujoAhorcado(0,pincel);

	activarTeclado=true;
})

/*Click Boton Volver a Jugar Vista Ganador*/
bttVolverJugarGanador.addEventListener("click",function(event){
	var AreaJuego = document.querySelector(".area-juego");
	var AreaInicio = document.querySelector(".area-inicio");

	AreaInicio.classList.add("oculto");
	AreaJuego.classList.remove("oculto");
	AreaGameOver.classList.add("oculto");
	AreaGanador.classList.add("oculto");

	/*Reiniciar*/
	errores=0;
	aciertos=0;
	letrasErradas=[];
	letrasCorrectas=[];
	AreaLetrasAcertadas.value = "";
	AreaLetrasErradas.value = "";
	pincel.clearRect(0, 0, pantalla.width, pantalla.height);	

	/*Sortear Palabra*/
	var Palabras = PalabrasJugar();
	var r = sortearPalabra(Palabras.length)

	PalabraEscogida = Palabras[r];
	ColocarLetrasGuiones(PalabraEscogida,0);


	DibujoAhorcado(0,pincel);

	activarTeclado=true;
})

window.onload = function() {document.onkeypress = CapturarLetra;}




function sortearPalabra(tamanio){
	return Math.floor(Math.random()*tamanio);
}

function CapturarLetra(evObject){
	var Caract = String.fromCharCode(evObject.which);

	if (activarTeclado){
		/*Verificar que sea un caracter disponible*/
		if(!(/[A-ZÑ]/i.test(Caract))){
			return;
		} else {
			Caract = Caract.toUpperCase();

			if(letrasCorrectas.includes(Caract)){
				return;/*Verificar que no se acerto previamente*/
			} else if ( letrasErradas.includes(Caract)){
				return;/*Verificar que no se fallo previamente con la misma letra*/
			} else {
				var contador = 0;

				/*Verificar si le letra esta en la palabra*/
				for(var i = 0; i < PalabraEscogida.length; i++){
					var letra = PalabraEscogida.charAt(i);
					if (Caract == letra){
						contador++;
						aciertos++;
					}
				}

				if(contador == 0){
					letrasErradas.push(Caract);
					errores++;
				} else {
					letrasCorrectas.push(Caract);
				}
			}

			colocarLetrasErradas(letrasErradas);
			ColocarLetrasGuiones(PalabraEscogida,aciertos);
			DibujoAhorcado(errores,pincel);
			finalDeLaPartida(aciertos,errores,PalabraEscogida);
		}
	} else {
		return;
	}
}
	


function colocarLetrasErradas(erradas){
	var conjunto = "";
	for (var i = 0; i<erradas.length; i++) {
		conjunto=conjunto+erradas[i];
	}
	AreaLetrasErradas.value=conjunto;
}

function finalDeLaPartida(aciertos,errores,palabra){
	var x = palabra.length;/*Capturar la cantidad de letras*/

	var AreaGameOver = document.querySelector(".game-over");
	var AreaGanador = document.querySelector(".ganador"); 
	var AreaPalabraSecreta = document.querySelector(".palabra-secreta");

	if (errores == 6){
		activarTeclado=false;
		AreaJuego.classList.add("oculto");
		AreaGameOver.classList.remove("oculto");
		AreaPalabraSecreta.value=PalabraEscogida;
	} else if (aciertos == x){
		activarTeclado=false;
		AreaJuego.classList.add("oculto");
		AreaGanador.classList.remove("oculto");
	} else {
		return;
	}
}


function DibujoAhorcado(errores,pincel){
	pincel.fillStyle = "black";
	pincel.lineWidth = 2;	
	
	/*Dibujar Poste*/
	pincel.beginPath();
	pincel.moveTo(95,115);
	pincel.lineTo(105,115);
	pincel.moveTo(100,115);
	pincel.lineTo(100,10);
	pincel.lineTo(150,10);
	pincel.lineTo(150,15);
	pincel.stroke();

	if(errores>0){
		pincel.beginPath();
		pincel.arc(150,25,9,0,2*Math.PI);
		pincel.fill();
		pincel.stroke();
	}

	if(errores>1){
		pincel.beginPath();
		pincel.moveTo(150,15);
		pincel.lineTo(150,75);
		pincel.stroke();
	}

	if(errores>2){
		pincel.beginPath();
		pincel.moveTo(150,75);
		pincel.lineTo(135,100);
		pincel.stroke();
	}

	if(errores>3){
		pincel.beginPath();
		pincel.moveTo(150,75);
		pincel.lineTo(165,100);
		pincel.stroke();
	}

	if(errores>4){
		pincel.beginPath();
		pincel.lineWidth = 3;
		pincel.moveTo(150,50);
		pincel.lineTo(130,50);
		pincel.stroke();
	}

	if(errores>5){
		pincel.beginPath();
		pincel.lineWidth = 3;
		pincel.moveTo(150,50);
		pincel.lineTo(170,50);
		pincel.stroke();
	}


}


	
function ColocarLetrasGuiones(palabra, aciertos){
	var palabraFinal = "";/*String que mostrara guiones y letras*/
	var x = palabra.length;/*Capturar la cantidad de letras*/

	for (var i = 0; i < x; i++) {
		if(letrasCorrectas.includes(palabra.substring(i,i+1))){
			palabraFinal=palabraFinal+palabra.substring(i,i+1);
		} else {
			palabraFinal=palabraFinal+"_ ";
		}

		AreaLetrasAcertadas.value = palabraFinal;
}
}


