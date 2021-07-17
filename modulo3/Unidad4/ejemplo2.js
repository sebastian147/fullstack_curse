const { json } = require('express');
const express  = require ('express');
const mysql = require('mysql');
const util = require('util');

const app = express();
const port = 3000;
app.use(express.json());//permite el mapeo de la peticion json a objetos js

const conexion = mysql.createConnection({
    host: 'localhost',//si fuera un server pongo la dir del server
    user:'root',
    password: '',//depende como me logueo en el php my admin
    database: 'fullstack_m3u4ejemplo2'
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
/** 
* Categoria de productos
* GET para devolver todas las categorias
* GET id para devolver uno solo
* POST guarda una categoria nueva
* PUT para modificar una categoria existente
* DELETE para borrar una categoria existente
*  Definir ruta-> /categoria
*/
app.get('/categoria',async (req,res)=>{
    try{
        //intento hacer esto
        const query = 'SELECT * FROM categoria';
        const respuesta = await qy(query);

        res.send({"respuesta": respuesta});
    }
    catch(e){
        //si no se pudo hago esto otro
        console.error(e.message);
        res.status(413).send({"Error":e.message});
    }
});
app.get('/categoria/:id', async(req,res) =>{
    try{
        const query = 'SELECT * FROM categoria WHERE id = ?';

        const respuesta = await qy(query, [req.params.id]);
        res.send({"respuesta": respuesta});
    }
    catch(e){
        //si no se pudo hago esto otro
        console.error(e.message);
        res.status(413).send({"Error":e.message});
    }
});
app.post('/categoria', async(req,res) =>{
    try{
        //valido que me manden correctamente la info
        if(!req.body.nombre){
            throw new Error('Falta enviar el nombre');
        }
        const nombre = req.body.nombre.toUpperCase();
        let query = 'SELECT id FROM categoria WHERE nombre = ?';
        let respuesta = await qy(query, [nombre]);
        if(respuesta.length > 0){
            throw new Error('Esa categoria ya existe');
        }
        //guardo la nueva categoria

        query = 'INSERT INTO categoria (nombre) VALUE (?)';
        respuesta = await qy(query, [nombre]);
        console.log(respuesta);
        res.send({'respuesta':respuesta});//afected row avisa si se pudo hacer la modificacion

    }
    catch(e){
        //si no se pudo hago esto otro
        console.error(e.message);
        res.status(413).send({"Error":e.message});
    }
});
app.put('/categoria/:id', async(req,res) =>{
    try{
        if(!req.body.nombre){
            throw new Error("No enviaste el nombre");
        }
        let query = 'SELECT * FROM categoria WHERE nombre = ? AND id <> ?';
        let respuesta = qy(query, [req.body.nombre, req.params.id]);

        if(respuesta.length > 0){
            throw new Error("El nombre de la categoria que queres poner ahora ya existe");
        }
        query = 'UPDATE categoria SET nombre = ? WHERE id = ?';

        respuesta = qy(query, [req.body.nombre, req.params.id]);

        res.send({"respuesta":respuesta});
    }
    catch(e){
        //si no se pudo hago esto otro
        console.error(e.message);
        res.status(413).send({"Error":e.message});
    }
});
app.delete('/categoria/:id',async (req, res)=>{
    //no puedo borrar categoria si hay productos relacionados con la misma
    // esto se resuelve haciendo un borrado logico, poniendo un campo extra dentro de la tabla para decir si estan borrados o no.
    // o asegurarse con no tengan ningun tipo de relacion
    try{
        let query = 'SELECT * FROM producto WHERE categoria_id = ?';
        let respuesta = await qy(query, [ req.params.id]);
        if(respuesta.length>0){
            throw new Error("Esta categoria tiene productos asociados, no se puede borrar");
        }
        query = 'DELETE FROM categoria WHERE id = ?';//cuidado con el delete, si no le pongo el where borro toda la tabla
        respuesta = await qy(query, [req.params.id]);
        res.send({'respuesta': respuesta});
    }
    catch(e){
        //si no se pudo hago esto otro
        console.error(e.message);
        res.status(413).send({"Error":e.message});
    }
});
/*
* Productos
*  Definir ruta-> /producto
*/
app.post('/producto', async (req, res)=>{
    try{
        if(!req.body.nombre || !req.body.categoria_id){
            throw new Error("No enviaste los datos obligatorios que son nombre y categoria");
        }
        let query = 'SELECT * FROM categoria WHERE id = ?';
        let respuesta = await qy(query, [req.body.categoria_id]);

        if(respuesta.length == 0){
            throw new Error("Esa categoria no existe");
        }
        query = 'SELECT * FROM producto WHERE nombre = ?';
        respuesta = await qy(query, [req.body.nombre]);
        if(respuesta.length > 0 ){
             throw new Error("Ese nombre de producto ya existe");
        }
        let descripcion = '';
        if(req.body.descripcion.length > 0){
            descripcion = req.body.descripcion;
        }
        query = 'INSERT INTO producto (nombre, descripcion, categoria_id) VALUES (?, ?, ?)';
        respuesta = await qy(query, [req.body.nombre, descripcion, req.body.categoria_id]);
        res.send({'respuesta':respuesta.insertId});
    }
    catch(e){
        //si no se pudo hago esto otro
        console.error(e.message);
        res.status(413).send({"Error":e.message});
    } 
});



/*
* Listas de compras
*  Definir ruta-> /lista
*/





app.listen(port, ()=>{
    console.log('servidor escuchando en el puerto', port);
});