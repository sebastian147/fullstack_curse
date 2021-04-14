var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto","Septiembre", "Octubre", "Noviembre", "Diciembre"];
var diasDelMes= [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function devolverMesesDeDiasN(n, meses, diasDelMes)
{
    console.log("estos meses tienen "+n+" dias")
    for(var i = 0; i<12;i++)
    {
        if(diasDelMes[i]==n)
        {
            console.log(meses[i]);
        }
    }
}
devolverMesesDeDiasN(31,meses,diasDelMes)
devolverMesesDeDiasN(30,meses,diasDelMes)