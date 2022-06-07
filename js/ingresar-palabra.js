/*Capturar Etiquetas*/
var bttAgregarPalabras = document.querySelector(".btt-agregar-palabras");
var AreaErrorIngresarPalabra = document.querySelector("#error-alguardar-palabra");
var Areapalabra = document.querySelector(".palabra-a-agregar");
Areapalabra.value = "";
AreaErrorIngresarPalabra.classList.add("oculto");

var Palabras = ["MATEMATICAS","CARACOL","BANANA"
,"DELFIN","ABEJA","ARGENTINA","GATO","DINOSAURIO","JAZZ"]/*Array con palabras por defecto*/

/*Click en Boton Agregar Palabras*/
bttAgregarPalabras.addEventListener("click",function(event){

	/*Capturar Etiquetas*/
	var AreaInicio = document.querySelector(".area-inicio");
	var AreaAgregarPalabra = document.querySelector(".area-ingresar-palabra");

	/*Cambiar la vista*/
	AreaInicio.classList.add("oculto");
	AreaAgregarPalabra.classList.remove("oculto");

	var bttGuardar = document.querySelector(".btt-guardar-palabra");
	var bttCancelar = document.querySelector(".btt-cancelar");

	/*Click en Boton Guardar*/
	bttGuardar.addEventListener("click",function(event){
		var palabra = Areapalabra.value;
		palabra=palabra.toUpperCase();
		ValidarPalabra(palabra);
		Palabras.push(palabra);
		Areapalabra.value = "";

	})

	/*Click en Boton Cancelar*/
	bttCancelar.addEventListener("click",function(event){
		AreaInicio.classList.remove("oculto");
		AreaAgregarPalabra.classList.add("oculto");
	})

})
/**/
function ValidarPalabra(texto){
	var x = texto.length;/*Capturar la cantidad de letras*/
	var cont = 0;

	for (var i = 0; i < x; i++) {
		if(!(/[A-ZÑ]/i.test(texto.substring(i,i+1)))){
			cont++;
		}
	}
	if (cont == 0) {
		AreaErrorIngresarPalabra.classList.add("oculto");
		return;
	} else {
		AreaErrorIngresarPalabra.classList.remove("oculto");
	}
}

function PalabrasJugar(){
	return this.Palabras;
}


