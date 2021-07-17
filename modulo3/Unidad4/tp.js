
const express  = require ('express');
const mysql = require('mysql');
const util = require('util');

const app = express();
const port = 3000;
app.use(express.json());//permite el mapeo de la peticion json a objetos js

app.use(express.static(__dirname));
app.use(express.urlencoded());

const conexion = mysql.createConnection({
    host: 'localhost',//si fuera un server pongo la dir del server
    user:'root',
    password: '',//depende como me logueo en el php my admin
    database: 'fullstack_m3u4tp'
})
conexion.connect((error)=>{
    if(error){
        throw error; //salta al catch con el error
    }
    else
    {
        console.log('conexion con la base de daros mysql establecida');
    }
});
const qy = util.promisify(conexion.query).bind(conexion);//permite el uso de asyn await en la conexion mysql

app.get('', function(req, res){
    res.sendFile('tp.html' , { root : __dirname});
});
app.get('/form', async function(req, res){
    try{
        const query = 'SELECT * FROM personas';

        const respuesta = await qy(query);
        //res.send({"respuesta": respuesta});
        var comilla = '"';

        html = "<!DOCTYPE html><html lang="+"en"+"><head><meta charset="+"UTF-8"+"><meta http-equiv="+"X-UA-Compatible"+" content="+"IE=edge"+
        "><meta name="+"viewport" +"content="+"width=device-width, initial-scale=1.0"+
        "></meta><link rel="+"stylesheet"+ " href="+comilla +"/tp.css"+comilla +
        "><title>formulario</title></head><body><h1>Los datos ingresados fueron:</h1><br/>"
        for(let i = 0; i<respuesta.length;i++)
        {
            html = html.concat("<p class="+comilla+"numero"+comilla +">Persona numero " + respuesta[i].id + "</p></br><p>Tu nombre fue:" +respuesta[i].nombre+"</p><br/><p>Tu apellido fue: " +respuesta[i].apellido+"</p><br/><p>Tu edad fue: " +respuesta[i].edad+
            "</p><br/><p>Tu telefono fue: " +respuesta[i].telefono+"</p><br/><p>Tu pais de nacimiento fue: " +respuesta[i].paisnacimiento+"</p><br/><p>Tu pais de recidencia fue: " +respuesta[i].paisrecidencia+
            "</p><br/>");
            
        }
        html = html.concat("<a href="+comilla+"/tp.html"+comilla +">Volver a llenar el formulario</a></body></html>");
        res.send(html);
    }
    catch(e){
        //si no se pudo hago esto otro
        console.error(e.message);
        res.status(413).send({"Error":e.message});
    }

});
app.post('/form', async function (req, res) {
    try{
        //valido que me manden correctamente la info
        if(!req.body.Nombre &&!req.body.Apellido&&!req.body.edad&&!req.body.Telefono&&!req.body.PaisDeNacimiento&&!req.body.PaisDeRecidencia ){
            throw new Error('Falta enviar el nombre');
        }
        const nombre = req.body.Nombre.toUpperCase();
        const apellido = req.body.Apellido.toUpperCase();
        let query = 'SELECT id FROM personas WHERE nombre = ? AND apellido = ?';
        let respuesta = await qy(query, [nombre, apellido]);
        if(respuesta.length > 0){
            throw new Error('Esa persona ya existe');
        }

        query = 'INSERT INTO personas (nombre, apellido, edad, telefono, paisnacimiento,paisrecidencia) VALUE (?,?,?,?,?,?)';
        respuesta = await qy(query, [nombre, apellido, req.body.edad,req.body.Telefono,req.body.PaisDeNacimiento,req.body.PaisDeRecidencia ]);
        console.log(respuesta);
        var comilla = '"';
        var html = "<!DOCTYPE html><html lang="+"en"+"><head><meta charset="+"UTF-8"+"><meta http-equiv="+"X-UA-Compatible"+" content="+"IE=edge"+
        "><meta name="+"viewport" +"content="+"width=device-width, initial-scale=1.0"+
        "></meta><link rel="+"stylesheet"+ " href="+comilla +"/tp.css"+comilla +
        "><title>formulario</title></head><body><h1>Los datos ingresados fueron: </h1><br/><p>Tu nombre fue:" +req.body.Nombre+"</p><br/><p>Tu apellido fue: " +req.body.Apellido+"</p><br/><p>Tu edad fue: " +req.body.edad+
        "</p><br/><p>Tu telefono fue: " +req.body.Telefono+"</p><br/><p>Tu pais de nacimiento fue: " +req.body.PaisDeNacimiento+"</p><br/><p>Tu pais de recidencia fue: " +req.body.PaisDeRecidencia+
        "</p><br/><a href="+comilla+"/tp.html"+comilla +">Volver a llenar el formulario</a></body></html>";
        res.send(html);
    }
    catch(e){
        //si no se pudo hago esto otro
        console.error(e.message);
        res.status(413).send({"Error":e.message});
    }
});
app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});
