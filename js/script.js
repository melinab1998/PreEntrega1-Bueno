//HERRAMIENTA ORIENTADA A DOCENTES/ESTUDIANTES

//VARIABLES  
//BOTONES
const btn1 = document.querySelector("#btnradio1"),  
    btn2 = document.querySelector("#btnradio2"),
    btn3 = document.querySelector("#btnradio3"),
    btnA = document.querySelector("#btnradioA"),
    btnB = document.querySelector("#btnradioB"),
    btnC = document.querySelector("#btnradioC"),
    botonValidarA = document.querySelector("#botonValidarA"),
    botonValidarB = document.querySelector("#botonValidarB"),
    botonValidarC = document.querySelector("#botonValidarC"),
    botonCalcularA = document.querySelector("#botonCalcularA"),
    botonCalcularB = document.querySelector("#botonCalcularB"),
    botonCalcularC = document.querySelector("#botonCalcularC"),
    botonBuscar = document.querySelector("#botonBuscar"),
    refresh = document.querySelector("#refresh"),
    radios = document.querySelectorAll(".radio1"),
    radios1 = document.querySelectorAll(".radio2"),  
    bi = document.querySelector("#bimestre"),  
    tri = document.querySelector("#trimestre"),
    cua = document.querySelector("#cuatrimestre"),
//SECCIONES
    seccionInicial = document.querySelector("#seccionInicial"),  
    seccionUno = document.querySelector("#seccionUno"),
    seccionDos = document.querySelector("#seccionDos"),
    seccionTres = document.querySelector("#seccionTres"),
    seccionCuatro = document.querySelector("#seccionCuatro"),
    seccionCinco = document.querySelector("#seccionCinco"),
    seccionSeis = document.querySelector("#seccionSeis"),
    seccionSiete = document.querySelector("#seccionSiete"),
    seccionOcho = document.querySelector("#seccionOcho"),
    seccionNueve = document.querySelector("#seccionNueve"),
    seccionDiez = document.querySelector("#seccionDiez"),
    seccionOnce = document.querySelector("#seccionOnce"),
//LOGIN
    userLogin = document.getElementById("userLogin"), 
    passLogin = document.getElementById("passwordLogin"),
    recordar = document.getElementById("recordarme"),
    btnLogin = document.getElementById("login"),
    modalEl = document.getElementById("modalLogin"),
    modal = new bootstrap.Modal(modalEl),
    botones = document.getElementById("botones"),
    toggles = document.querySelectorAll(".toggles"),
//OTROS
    materia  = document.querySelector("#materia"),
    asignaturas = document.querySelector("#asignaturas"),
    lista = document.querySelector("#listado"),
    busqueda = document.querySelector("#busqueda"),
    padre = document.querySelector("#logged"),
    preguntaInicial = document.querySelector("#preguntaInicial"),
    instancias = document.querySelector("#instancias"),
    prom = parseFloat(instancias.value), 
    mate = materia.value,
    asig = parseInt(asignaturas.value),
    nombreAlumno = document.querySelector("#nombreAlumno"),
    valorAlumno = nombreAlumno.value,
    alumnos = [],
    usuarios = [];
//

//BASE DE DATOS

//ALUMNOS
class Alumno{
    constructor(nombre, escuela, curso, division, opcionElegida, promedioObtenido){
        this.nombre = nombre;
        this.escuela = escuela;
        this.curso = curso;
        this.division = division;
        this.opcionElegida = opcionElegida;
        this.promedioObtenido = promedioObtenido;
    }
}

fetch("/data.json")
.then(res=>res.json())
.then(data=>data.forEach(al =>{
let newAlumno = new Alumno (al.nombre, al.escuela, al.curso, al.division, al.opcionElegida, al.promedioObtenido)
alumnos.push(newAlumno)
}));

//USUARIOS REGISTRADOS
class usuario{
    constructor(nombre, user, pass){
        this.nombre = nombre;
        this.user = user;
        this.pass = pass;
    }
}

fetch("/users.json")
.then(res=>res.json())
.then(data=>data.forEach(us=>{
    let newUser = new usuario(us.nombre, us.user, us.pass)
    usuarios.push(newUser)
}));


//GUARDAR DATOS STORAGE
function guardarDatos(usuarios, storage) {
    const usuario = {
        "name": usuarios.nombre,
        "user": usuarios.user,
        "pass": usuarios.pass
    }

    storage.setItem("usuario", JSON.stringify(usuario));
}

//LIMPIAR DATOS STORAGE

function limpiarDatos(){
    localStorage.clear();
    sessionStorage.clear();
}

//RECUPARAR DATOS STORAGE
function recuperarDato(storage){
    let usuarioEnStorage = JSON.parse(storage.getItem("usuario"));
    return usuarioEnStorage;
}

//SALUDO INICIAL
function saludar(usuario){
    nombreUsuario.innerHTML = `Bienvenido/a, <span>${usuario.name}</span>`
}

//VISUALIZACIÓN(INGRESO)
function presentarInfo(array, clase){
    array.forEach(element =>{
        element.classList.toggle(clase);
    });
}

//USUARIO GUARDADO 
function Logueado(usuario) {
    usuario&&saludar(usuario),presentarInfo(toggles, "d-none");
}

//VALIDACIÓN DE USUARIO 
function validarUser(usuarios, user, pass) {
    let encontrar = usuarios.find((usuarios) => usuarios.user == user);

    if (typeof encontrar === "undefined"){
        return false; 
    }else{
        if (encontrar.pass != pass){
            return false;
        }else{
            return encontrar;
        }
    }
}

//EVENTOS CLICK

//VALIDACIÓN CAMPOS COMPLETOS

btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    if (!userLogin.value || !passLogin.value){
        Swal.fire({title: 'Error!',text: 'Ambos campos son requeridos',icon: 'error',confirmButtonText: 'Seguir Intentando'});
    }else{
    let data = validarUser(usuarios, userLogin.value, passLogin.value);

        if (!data) {
            Swal.fire({title: 'Error!',text: 'Usuario y/o Contraseña Incorrectos',icon: 'error',confirmButtonText: 'Seguir Intentando'});
        }else{
            if(recordar.checked){
                Swal.fire({position: 'top-center',icon: 'success',title: 'Bienvenido/a',showConfirmButton: false,timer: 1500});
                guardarDatos(data, localStorage);
                saludar(recuperarDato(localStorage));
            } else {
                Swal.fire({position: 'top-center',icon: 'success',title: 'Bienvenido/a',showConfirmButton: false,timer: 1500});
                guardarDatos(data, sessionStorage);
                saludar(recuperarDato(sessionStorage));
            }
            modal.hide();
            presentarInfo(toggles, "d-none");
        }
    }
});

btnLogout.addEventListener("click", () => {
    limpiarDatos();
    presentarInfo(toggles, "d-none");
});

Logueado(recuperarDato(localStorage));

//BOTONES 1,2,3

btn1.addEventListener("click", () =>{
    Desaparecer();
    aparecerS11();
    Limpar1();
    Limpar2();
    aparecerS3();
});

btn2.addEventListener("click", ()=>{
    Limpar1();
    Limpar2();
    aparecerS11();
    Desaparecer();
    pedirAlumnos();
});


btn3.addEventListener("click", ()=>{
    aparecerS11();
    Limpar1();
    Limpar2();
    Desaparecer();
    aparecerO3();
});

//BOTONES A,B,C

btnA.addEventListener("click", () => {
    Limpar();
    aparecerS6();
});

btnB.addEventListener("click", () => {
    Limpar();
    aparecerS4();
});

btnC.addEventListener("click", () => {
    Limpar();
   aparecerS5(); 
});

//BOTONES VALIDAR OPCIÓN A,B,C

botonValidarA.addEventListener("click", () => {
    aparecerS7();
    aparecerS9();
});

botonValidarB.addEventListener("click", ()=>{
    notasB();
});

botonValidarC.addEventListener("click", ()=>{
    notasC(asignaturas.value);
    aparecerS7B();
})

//BOTONES CALCULAR A,B,C

botonCalcularA.addEventListener("click", ()=>{
    promedioA(parseFloat(instancias.value));
});

botonCalcularB.addEventListener("click", ()=>{
    promedioB(materia.value);
});       

botonCalcularC.addEventListener("click", ()=>{
    promedioC(asignaturas.value);
});  

//RADIOS

radios.forEach(item=>{
    item.addEventListener("click",()=>{
        desempenioBajo();
        aparecerS9();
        aparecerS10();
    })
})

radios1.forEach(item=>{
    item.addEventListener("click",()=>{
        desempenioAlto();
        aparecerS9();
        aparecerS10();
    })
})

//BOTÓN BUSCAR OPCIÓN 3

botonBuscar.addEventListener("click", ()=>{
    filtrado(nombreAlumno.value);
});

//BOTÓN VOLVER 

refresh.addEventListener('click', () => {
    location.reload();
});

//FUNCIONES
//FUNCIÓN ASINCRONA OPCIÓN 2

const pedirAlumnos = async() =>{
    const resp = await fetch("/data.json");
    const data = await resp.json();
    data.forEach((alumno)=>{
        const li = document.createElement("li")
        li.innerHTML = `
        <h5 class="list-group-item list-group-item-primary">Nombre: ${alumno.nombre}</h5>
        <h5 class="list-group-item list-group-item-info">Escuela: ${alumno.escuela}</h5>
        <h5 class="list-group-item list-group-item-danger">Curso: ${alumno.curso}</h5>
        <h5 class="list-group-item list-group-item-warning">División: ${alumno.division}</h5>
        <h5 class="list-group-item list-group-item-success">Opción Elegida: ${alumno.opcionElegida}</h5>
        <h5 class="list-group-item list-group-item-primary">Promedio Obtenido: ${alumno.promedioObtenido}</h5>
        `;
        lista.append(li);
    });
};
    
//FUNCIONES PARA MOSTRAR SECCIONES

function aparecerS3(){
    seccionTres.classList.remove("hidden");
}

function aparecerS4(){
    seccionCuatro.classList.remove("hidden");
}

function aparecerS5(){
    seccionCinco.classList.remove("hidden");
}

function aparecerS6(){
    seccionSeis.classList.remove("hidden");
}

function aparecerS7(){
    seccionSiete.classList.remove("hidden");
    notasA(parseFloat(instancias.value));
}

function aparecerS7B(){
    seccionSiete.classList.remove("hidden");
}

function aparecerS8(){
    seccionOcho.classList.remove("hidden");
}

function aparecerS9(){
    seccionNueve.classList.remove("hidden");
}

function aparecerS10(){
    seccionDiez.classList.remove("hidden");
}


function aparecerS11(){
    seccionOnce.classList.remove("hidden");
}

function aparecerO3(){
    busqueda.classList.remove("hidden");
}

//BORRAR SALUDO INICIAL

function Desaparecer(){
    preguntaInicial.classList.add("hidden");
}

//INGRESO DE NOTAS(MATERIAS,INSTANCIAS EVALUATIVAS,PERIODOS)

function notasA(prom){
    seccionSiete.innerHTML = "";
    seccionSiete.innerHTML += `<span>Indica la nota obtenida en cada instancia:</span><br>`;
    for(let i=0; i<prom; i++){
    seccionSiete.innerHTML += `<label>Nota `+ (i+1) +`:</label><input type="text" id="notas` + i +`"><br>`;
    }
}

function notasB(){
    let s=0;
    if(bi.checked){
    s=4;
    }if(tri.checked){
    s=3;
    }else if(cua.checked){
    s=2;
    }
    aparecerS6();
    aparecerS8();
    seccionSeis.innerHTML = "";
    seccionSeis.innerHTML += "<span>Ingresa la nota final de cada periodo:</span><br>";
    for(let i=0; i<s; i++){
    seccionSeis.innerHTML += `<label>Periodo `+ (i+1) +`:</label><input type="text" id="periodo` + i +`">
    <br>`;
}}

function notasC(asig){
    aparecerS6();
    seccionSeis.innerHTML = "";
    seccionSeis.innerHTML += "<span>Indica la nota obtenida en cada materia:</span><br>";
    for(let i=0; i<asig; i++){
    seccionSeis.innerHTML += `<label>Materia `+ (i+1) +`:</label><input type="text" id="asignaturas` + i +`"><br>`;
    }
}

//CALCULAR PROMEDIOS(A,B,C)

function promedioA(prom){
    let suma=0;
    let promedio=0;
    let x=0;

    for(let i=0; i<prom; i++){
        x=document.querySelector("#notas" + i).value; 
        suma += parseFloat(x);
    }
    promedio = suma/prom;
    aparecerS10();    
    seccionDiez.innerHTML += `<div class="alert alert-info" role="alert">La nota final del periodo es en promedio: `+promedio+`</div>`;
}  

function promedioB(mate){
    let suma=0;
    let promedio=0;
    let x=0;
    let s=0;
    if(bi.checked){
    s=4;
    }if(tri.checked){
    s=3;
    }else if(cua.checked){
    s=2;
    }
    for(let i=0; i<s; i++){
        x=document.querySelector("#periodo" + i).value; 
        suma += parseFloat(x);
    }
    promedio = suma/s;
    aparecerS9();
    seccionNueve.innerHTML ="";
    seccionNueve.innerHTML += `<div class="alert alert-info" role="alert">La nota final de `+mate+` es en promedio: `+promedio+`</div>`
}

function promedioC(asig){
    let suma=0;
    let promedio=0;
    let x=0;

    for(let i=0; i<asig; i++){
        x=document.querySelector("#asignaturas" + i).value; 
        suma += parseFloat(x);
    }
    promedio = suma/asig;
    aparecerS9();  
    seccionNueve.innerHTML = "";
    seccionNueve.innerHTML += `<div class="alert alert-info" role="alert">Tu promedio anual es: `+promedio+`</div>`;
}

//FUNCIÓN DESEMPEÑO BAJO Y ALTO

function desempenioBajo(){
    seccionNueve.innerHTML += `<div class="alert alert-primary" role="alert">Debido al desempeño en clases la nota puede ser menor.</div>`
}

function desempenioAlto(){
    seccionNueve.innerHTML += `<div class="alert alert-primary" role="alert">Debido al desempeño en clases la nota puede ser mayor.</div>`
}

//FUNCIÓN FILTRADO OPCIÓN 3

function filtrado(valorAlumno){
    const filtrado = alumnos.filter(al=>al.nombre.includes(valorAlumno.toLowerCase()));
    filtrado==0?Swal.fire("Estudiante no encontrado"):aparecerS3(),seccionTres.innerHTML="",filtrado.forEach(element =>{seccionTres.innerHTML+= `<div class="list-group-item list-group-item-primary">Nombre: `+element.nombre+`</div><div class="list-group-item list-group-item-info">Escuela: `+element.escuela+`</div></div><div class="list-group-item list-group-item-danger">Curso: `+element.curso+`</div><div class="list-group-item list-group-item-warning">División: `+element.division+`</div><div class="list-group-item list-group-item-success">Opción Elegida: `+element.opcionElegida+`</div><div class="list-group-item list-group-item-primary">Promedio Obtenido: `+element.promedioObtenido+`</div>`});
}

//FUNCIONES PARA LIMPIAR PANTALLA

function Limpar(){
    padre.removeChild(seccionTres);
}

function Limpar1(){
    padre.removeChild(seccionUno);
}

function Limpar2(){
    padre.removeChild(seccionInicial);
}