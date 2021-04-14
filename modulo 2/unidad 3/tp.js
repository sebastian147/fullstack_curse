var Nombremeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto","Septiembre", "Octubre", "Noviembre", "Diciembre"];
var diasDelMes= [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var table = document.querySelector("table");
let data = new Array();
class meses
{
    constructor(meses,diasMeses){
        this.meses=meses;
        this.diasMeses=diasMeses;
    }
}
function modoDiurno()
{
    var table = document.getElementsByTagName("tr");
    document.body.style.backgroundColor = "lightslategrey";

    for(let i = 1; i<table.length; i++)
    {
        table[i].style.color = "black";
        if(i%2 == 0)
        {
            table[i].style.backgroundColor = "palevioletred";
        }
        else
        {
            table[i].style.backgroundColor = "pink";
        }
    }
}
function modoNocturno()
{
    var table = document.getElementsByTagName("tr");
    document.body.style.backgroundColor = "darkslategrey";

    for(let i = 1; i<table.length; i++)
    {
        table[i].style.color = "white";
        if(i%2 == 0)
        {
            table[i].style.backgroundColor = "grey";
        }
        else
        {
            table[i].style.backgroundColor = "black";
        }
    }
}
function sleep(ms)
{
    return new Promise(resolver=>setTimeout(resolver,ms));
}
async function generateTable(table, data) 
{
    for (let element of data) 
    {
      await sleep(100);
      var row = table.insertRow();
      for (key in element)
      {
        var cell = row.insertCell();
        var text = document.createTextNode(element[key]);
        cell.appendChild(text);//arreglar appends y acceder al padre para la funcion
      }
      //var cell = row.insertCell();
      //var input = document.createElement("input");
      //input.type = "number"
      //cell.appendChild(input);
    }
}

/*flag = false;
element = data[0];
i=0;
function generartabla(table,data)
{
    if(flag==false)
    {
      var row = table.insertRow();
      for (key in element)
      {
        var cell = row.insertCell();
        var text = document.createTextNode(element[key]);
        cell.appendChild(text);//arreglar appends y acceder al padre para la funcion
      }
      if(i != data.length)
      {

        element = data[i];
        i++;
      }
      else
      {
        console.log("flag");
        flag = true;
      }
    }
}
setInterval(function()
{
    generartabla(table,data)
},1000);*/

for(let i=0; i<Nombremeses.length; i++)
{
    data.push(new meses(Nombremeses[i], diasDelMes[i]));
}
generateTable(table, data);
