var titulo = document.querySelector("h1");
var texto = document.querySelector("p");
var tbody = document.querySelector("tbody");
var imagen = document.querySelector("img");
var imagenes = ["img1.jpg","img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"];
var i = 0;
console.log("hola");
setInterval(()=>{
    
    console.log("pase");
    imagen.src = imagenes[i];
    i = i+1;
    if(i == 5){
        i = 0;
    }
}, 1000);
