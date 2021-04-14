//callbacks
function doAsync1(fn){
    console.log("doAsync1");
    fn();
}
function doAsync2(fn){
    console.log("doAsync2");
    fn();
}
function doAsync3(fn){
    console.log("doAsync3");
    fn();
}
function doAsync4(fn){
    console.log("doAsync4");
    fn();
}
console.log("Iniciado");
doAsync1(function(){
    doAsync2(function(){
        doAsync3(function(){
            doAsync4(function(){});
            });
        });
    });

console.log("Finalizando");
//promise
console.log("paso 1");

procesoAsincronicoConPromise()
    .then(funcionQueProcesaLaFinalRespuesaOk)
    .then(funcionQueProcesaLaRespuestaOk)
    .catch(funcionQueProcesaElError);

console.log("Paso 2");
//async/awayt
async function realizarPeticionAServidoExterno(){
    var respuesta = await hhtp.get('http://unServer.com');
    return respuesta;
}
