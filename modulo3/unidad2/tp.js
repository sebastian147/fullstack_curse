var express = require('express');
var app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded());
app.get('', function(req, res){
    res.sendFile('tp.html' , { root : __dirname});
});
app.post('/form', function (req, res) {
    var comilla = '"';
    var html = "<!DOCTYPE html><html lang="+"en"+"><head><meta charset="+"UTF-8"+"><meta http-equiv="+"X-UA-Compatible"+" content="+"IE=edge"+
    "><meta name="+"viewport" +"content="+"width=device-width, initial-scale=1.0"+
    "></meta><link rel="+"stylesheet"+ " href="+comilla +"/tp.css"+comilla +
    "><title>formulario</title></head><body><h1>Los datos ingresados fueron: </h1><br/><p>Tu nombre fue:" +req.body.Nombre+"</p><br/><p>Tu apellido fue: " +req.body.Apellido+"</p><br/><p>Tu edad fue: " +req.body.edad+
    "</p><br/><p>Tu telefono fue: " +req.body.Telefono+"</p><br/><p>Tu pais de nacimiento fue: " +req.body.PaisDeNacimiento+"</p><br/><p>Tu pais de recidencia fue: " +req.body.PaisDeRecidencia+
    "</p><br/><a href="+comilla+"/tp.html"+comilla +">Volver a llenar el formulario</a></body></html>";
     res.send(html);
    
});
app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});
