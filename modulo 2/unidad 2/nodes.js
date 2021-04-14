/*formas de acceder a nodos existentes
● getElementsByTagName(nombreEtiqueta)
● getElementsByClassName(nombreAtributo)
● getElementById(id)

*/

// Crear nodo de tipo Element
var parrafo = document.createElement("p");
// Crear nodo de tipo Text
var contenido = document.createTextNode("Hola Mundo!");
// Añadir el nodo Text como hijo del nodo Element
parrafo.appendChild(contenido);
// Añadir el nodo Element como hijo de la página
document.body.appendChild(parrafo);
/*formas de eliminar nodo
 removeChild(nodo)//debe ser invocada desde el elemento padre(hijo.padre.removeChild(hijo))

*/
var enlace=document.getElementById("enlace");
alert (enlace.href);

var imagen=document.getElementById("imagen");
alert(imagen.style.margin);
/*si el atributo tiene un guion como font-weight se accede sin el guion usando la segunda letra mayus ejemplo:
imagen.style.fontWeight
si quiero acceder al atributo class, debo hacerlo mediante className por que class es una palabra reservada de js ejemplo:
imagen.style.className

*/
/* query selector permite recorrer el documento pudiendo utilizar los selectores css ejemplo:
document.querySelector(‘<selector CSS>’);
document.querySelector(‘.menu’);
document.querySelector(‘#id-principal .clase-secundaria’);
document.querySelectorAll(‘<selector CSS>’);//retorna todas las ocurrencias
*/
/* agregar modificar o eliminar clases  luego de ser obtenida por alguno de los metodos previos query, id, etc
emento.className = ‘nueva-clase-css’;
elemento.classList.add(‘nueva-clase-css’);
elemento.classList.remove(‘clase-css-a-borrar’);
*/
function presionoBoton() {
    alert('Presiono botón');
}
function cambioInput() {
    console.log("Cambio el valor");
}
function accedioAlElemento() {
    console.log("Accedió al elemento");
}
function envioFormularioe() {
    console.log('Envio formulario');
}
function cambioValor(e) {
    console.log("Cambio el valor del input y ahora es " + e.target.value);
}
function envioFormulario(e) {
    console.log('Envio formulario');
    e.preventDefault();//evita el envio del formulario sirve por si no cumple algun requerimiento
}