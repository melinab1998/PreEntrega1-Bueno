
let choice;
let suma = 0;
let desempenio;

do{
    choice = prompt("¿Qué vas a calcular? A - Nota final de un período (ej. trimestre) B - Nota final de una materia C - Promedio anual");
    console.log(choice);
}while ((choice != "a")&&(choice != "A")&&(choice != "b")&&(choice != "B")&&(choice != "c")&&(choice != "C"));

if(choice=="A"||choice=="a"){
    let instancias = parseInt(prompt("¿Cuántas instancias evaluativas tuviste?"));
    console.log(instancias);
    
    for(let i=1; i<=instancias; i++){
        let nota1 = parseInt(prompt("Ingrese la nota obtenida en cada instancia: "));
        console.log(nota1);
        suma = suma + nota1;
        console.log(suma);
    }

    do{
        desempenio = parseInt(prompt("Califica tu desempeño en clases del 1 al 10: "));
        console.log(desempenio);
    }while((desempenio<=0)||(desempenio>10));

    promedio(suma, instancias);

    if (desempenio<=5){
        alert("Debido a tu desempeño la nota puede ser menor");
    }else if((desempenio>=6)&&(desempenio<=10)){
      alert("Debido a tu desempeño la nota puede ser mayor");  
    }

} else if(choice=="B"||choice=="b") {
    let periodo = parseInt(prompt("Ingrese la cantidad de periodos evaluados en su materia: "));
    console.log(periodo);
    
    for(let i=1; i<=periodo; i++){
        let nota2 = parseInt(prompt("Ingrese la nota final de cada periodo: "));
        console.log(nota2);
        suma = suma + nota2;
        console.log(suma);
    }

    promedio1(suma, periodo);

} else if(choice=="C"||choice=="c"){
    let materias = parseInt(prompt("¿Cuántas materias cursaste este año?"));
    console.log(materias);

    for(let i=1; i<=materias; i++){
        let nota3 = parseInt(prompt("Ingrese la nota final de cada materia: "));
        console.log(nota3);
        suma = suma + nota3;
        console.log(suma);
    }

    promedio2(suma, materias);
}


function promedio(suma, instancias){
    let resultado = suma/instancias;
    alert("La nota final del periodo es en promedio " + resultado);
}

function promedio1(suma, periodo){
    let resultado = suma/periodo;
    alert("La nota final de la materia es en promedio " + resultado);
}

function promedio2(suma, materias){
    let resultado = suma/materias;
    alert("Su promedio anual es " + resultado);
}
