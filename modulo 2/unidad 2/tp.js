var productos = [
    {
        nombre: "harina",
        precio: 35
    },
    {
        nombre: "pan",
        precio: 25
    },
    {
        nombre: "papa",
        precio: 52
    },
    {
        nombre: "palta",
        precio: 55
    },
    {
        nombre: "fideos",
        precio: 85
    },
    {
        nombre: "aceite",
        precio: 350
    },
    {
        nombre: "sopa",
        precio: 86
    },
    {
        nombre: "mermelada",
        precio: 108
    },
    {
        nombre: "porotos",
        precio: 69
    },
    {
        nombre: "lentejas",
        precio: 85
    },
    {
        nombre: "mandarina",
        precio: 43
    },
    {
        nombre: "banana",
        precio: 79
    },
    {
        nombre: "leche de almendras",
        precio: 145
    },
    {
        nombre: "papel higiénico",
        precio: 147
    },
    {
        nombre: "lavandina",
        precio: 55
    },
    {
        nombre: "alcohol en gel",
        precio: 123
    },
    {
        nombre: "shampoo",
        precio: 400
    },
    {
        nombre: "arroz",
        precio: 66
    },
    {
        nombre: "harina",
        precio: 35
    },
    {
        nombre: "salsa de tomate",
        precio: 35
    },
];
var carrito = [];
var coste = 0;
function agregarItem(e)
{
    bakgroundColor = "lightgreen"
    var targ;
    if (!e) var e = window.event;
    if (e.target) targ = e.target;
    else if (e.srcElement) targ = e.srcElement;

    if(!carrito.includes(e.target.firstChild.data) && coste != -1)
    {
        carrito.push(e.target.firstChild.data);
        coste += Number(e.target.parentNode.children[1].firstChild.data);
        e.target.style.backgroundColor = bakgroundColor;
        e.target.parentNode.children[1].style.backgroundColor = bakgroundColor;
    }
}
function generateTable(table, data, funcion) 
{
    for (let element of data) 
    {
      var row = table.insertRow();
      for (key in element)
      {
        var cell = row.insertCell();
        var text = document.createTextNode(element[key]);
        if(key=="nombre")
        {
            cell.onclick = funcion;
        }
        cell.appendChild(text);//arreglar appends y acceder al padre para la funcion
      }
      /*var cell = row.insertCell();
      var input = document.createElement("input");
      input.type = "number"
      cell.appendChild(input);*/
    }
}
function importeFinal()
{
    if(coste != -1)
    {
        coma = ", "
        parrafo = document.createElement("p");
        var product = document.createTextNode("Los productos comprados fueron: " );
        parrafo.appendChild(product);
        for(let i = 0; i<carrito.length; i++)
        {
            if(i==carrito.length-1)
                coma =".";
            var product = document.createTextNode(carrito[i]+coma);
            parrafo.appendChild(product);
        }
        document.body.appendChild(parrafo);

        parrafo = document.createElement("p");
        var product = document.createTextNode("El costo total es: " + coste);
        parrafo.appendChild(product);
        document.body.appendChild(parrafo);
        coste = -1;
    }
}
let table = document.querySelector("table");
generateTable(table,productos,agregarItem);

function carrito(event)
{
    PrecioFinal += parseInt(event.target.parentNode.childNodes[1].childNodes[0].data);//.data accede al valor del node "precio"

   console.log(PrecioFinal);
}