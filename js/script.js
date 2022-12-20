let choice;
let suma = 0;
let desempenio;
let eleccion;

class Alumno{
    constructor(ciudad, escuela, nombre, curso, division, op, pro){
        this.ciudad = ciudad;
        this.escuela = escuela;
        this.nombre = nombre;
        this.curso = curso;
        this.division = division;
        this.op = op;
        this.pro = pro;
    }
}

const alumnos = [
    new Alumno("rosario", 430, "micaela", "5to","a", "b","9"),
    new Alumno("santa fe", 220, "ana", "4to", "2da" , "c", "8.5"),
    new Alumno("mar del plata", 1200, "bruno", "3ero", "b", "a", "6.2"),
    new Alumno("carlos Paz", 130, "luciano", "1ero", "a", "c", "7.5"),
    new Alumno("buenos aires", 2002, "ana", "2ero", "c", "a", "5")
]


do{
    eleccion = prompt("¿Qué vas a hacer? \n1 - Calcular promedios \n2 - Ver lista de alumnos \n3 - Buscar alumno");
    console.log(choice);
}while ((eleccion != "1")&&(eleccion != "2")&&(eleccion != "3"));

if(eleccion=="1"){

    do{
        choice = prompt("¿Qué vas a calcular? \nA - Nota final de un período (ej. trimestre) \nB - Nota final de una materia \nC - Promedio anual");
        console.log(choice);
    }while ((choice.toLowerCase() != "a")&&(choice.toLowerCase() != "b")&&(choice.toLowerCase() != "c"));
    
    if(choice.toLowerCase()=="a"){
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

    
    } else if(choice.toLowerCase()=="b") {
        let instancias = parseInt(prompt("Ingrese la cantidad de periodos evaluados en su materia: "));
        console.log(instancias);
        
        for(let i=1; i<=instancias; i++){
            let nota2 = parseInt(prompt("Ingrese la nota final de cada periodo: "));
            console.log(nota2);
            suma = suma + nota2;
            console.log(suma);
        }
    
        promedio(suma, instancias);
    
    } else if(choice.toLowerCase()=="c"){
        let instancias = parseInt(prompt("¿Cuántas materias cursaste este año?"));
        console.log(instancias);
    
        for(let i=1; i<=instancias; i++){
            let nota3 = parseInt(prompt("Ingrese la nota final de cada materia: "));
            console.log(nota3);
            suma = suma + nota3;
            console.log(suma);
        }
    
        promedio(suma, instancias);
    }

    let datos = prompt("Ingresa tus datos: cuidad, n° de escuela, nombre, curso, división, opcion elegida (A, B o C), promedio obtenido, separados por un guion medio (-) y en mínuscula.")
    let ingreso = datos.split("-");
    const estudiante = new Alumno(ingreso[0], ingreso[1], ingreso[2], ingreso[3], ingreso[4], ingreso[5], ingreso[6]);
    alumnos.push(estudiante);

    alert("Nombre: "+estudiante.nombre+ "\nCiudad: "+estudiante.ciudad +"\nEscuela: "+estudiante.escuela+"\nCurso: "+estudiante.curso+"\nDivisión: "+estudiante.division+"\nOpción: "+estudiante.op+"\nPromedio Obtenido: "+estudiante.pro);

    
    alert(CrearStringDatos(alumnos));


}else if(eleccion=="2"){

let criterio = prompt("Elegí el criterio deseado: \n1-Nombre (A - Z) \n2-Nombre (Z - A)\n3-Mejor a Peor Promedio \n4-Peor a Mejor Promedio");
console.log(criterio);

alert(CrearStringResultado(ordenar(criterio, alumnos)));

}else if(eleccion=="3"){

let keyword = prompt("Ingresa el nombre del alumno");
const filtrado = alumnos.filter(alumnos=>alumnos.nombre.includes(keyword.toLowerCase())); 
console.log(filtrado);

if (filtrado.length==0){
    alert("No se encontró ningún alumno con ese nombre");
}else if(filtrado.length!=0){
    alert(CrearStringFiltro(filtrado));
}
}


function promedio(suma, instancias){
    
    let resultado = suma / instancias;

    if(choice=="A"||choice=="a"){
        alert("La nota final del periodo es en promedio " + resultado);
    }else if(choice=="B"||choice=="b"){
        alert("La nota final de la materia es en promedio " + resultado);
    }else if(choice=="C"||choice=="c"){
        alert("Su promedio anual es "+ resultado);
    }
}

function ordenar(criterio, alumnos){
    let arrayOrdenado = alumnos.slice(0);

    switch(criterio){
        case "1":
            let nombreAscendente = arrayOrdenado.sort((a,b)=>a.nombre.localeCompare(b.nombre));
            return nombreAscendente;
        case "2": 
            let nombreDescendente = arrayOrdenado.sort((a,b)=>b.nombre.localeCompare(a.nombre));
            return nombreDescendente;
        case "3":
            return arrayOrdenado.sort((a,b)=>b.pro-a.pro);
        case "4":
            return arrayOrdenado.sort((a,b)=>a.pro-b.pro);
        default:
            alert("El criterio no es válido");
    }
}

function CrearStringResultado(alumnos){
    let info = ""
    alumnos.forEach(element => {
    info+="Nombre: "+element.nombre+ "\nCiudad: "+element.ciudad +"\nEscuela: "+element.escuela+"\nCurso: "+element.curso+"\nDivisión: "+element.division+"\nOpción: "+element.op+"\nPromedio Obtenido: "+element.pro+"\n\n"    
    });

    return info;
}

function CrearStringDatos(alumnos){
    let info1 = ""
    alumnos.forEach(element => {
    info1+="Nombre: "+element.nombre+ "\nCiudad: "+element.ciudad +"\nEscuela: "+element.escuela+"\nCurso: "+element.curso+"\nDivisión: "+element.division+"\nOpción: "+element.op+"\nPromedio Obtenido: "+element.pro+"\n\n"    
    });

    return info1;
}

function CrearStringFiltro(filtrado){
    let info2 = ""
    filtrado.forEach(element => {
    info2+="Nombre: "+element.nombre+ "\nCiudad: "+element.ciudad +"\nEscuela: "+element.escuela+"\nCurso: "+element.curso+"\nDivisión: "+element.division+"\nOpción: "+element.op+"\nPromedio Obtenido: "+element.pro+"\n\n"    
    });
    return info2;
}