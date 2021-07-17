/*
    DML
    select
    insert
    update
    delete

    ejmplo
    SELECT<listado de columnas separadas por coma o *>
        FROM<nombre de la tabla>
        WHERE<listado de condiciones>
    

    id  nombre  turno
    1   pro web noche
    2   exp uni tarde
    3   pro web tarde

    SELECT id, nombre, turno
        FROM curso

    SELCT *
        FROM curso
        WHERE id=3

    SELECT count(*)
        FROM curso
    SELECT nombre, turno
        FROM curso
        WHERE nombre like '%Professional$'AND id>1

    
    
    
    INSERT INTO <nombre dela tabla>
    (<listado de columnas, separadas por coma>)
    VALUES (listado de valores, separados por coma>)

    INSERT INTO curso (nombre, turno) VALUES('webmaster 1', 'Noche');

    UPDATE <nombre de la tabla>
        SET <nombre de campo>=<nuevo valor>, <nombre de campo>=<nuevo valor>, ...
        WHERE <listado de condiciones>

    UPDATE curso
        SET nombre='webmaster introductorio'
        WHERE nombre='webmaster 1';

    DELETE FROM <nombre de la tabla>
        WHERE <listado de condiciones>

    DELETE FROM curso
        WHERE nombre like '%introductorio%'
*/

var express = require('express');
var app = express();
var mysql = require('mysql');
var conexion = mysql.createConnection({ 
    host: 'localhost',
    user: 'root',
    password: '',
    databaste: 'prueba'
});
conexion.connect();