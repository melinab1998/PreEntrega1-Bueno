//DB

const usuarios = [{
    nombre: "Bruno",
    user: "bruno29",
    pass: "rosario2023"
},
{
    nombre: "Ana",
    user: "anita98",
    pass: "4626251"
},
{
    nombre: "Micaela",
    user: "miqarc",
    pass: "carc1998"
}]

//DOM

const userLogin = document.getElementById("userLogin"),
    passLogin = document.getElementById("passwordLogin"),
    recordar = document.getElementById("recordarme"),
    btnLogin = document.getElementById("login"),
    modalEl = document.getElementById("modalLogin"),
    modal = new bootstrap.Modal(modalEl),
    botones = document.getElementById("botones"),
    toggles = document.querySelectorAll(".toggles");


//GUARDAR DATOS

function guardarDatos(usuarioDB, storage) {
    const usuario = {
        'name': usuarioDB.nombre,
        'user': usuarioDB.user,
        'pass': usuarioDB.pass
    }

    storage.setItem('usuario', JSON.stringify(usuario));
    }

//LIMPIAR DATOS

function limpiarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}

//RECUPARAR DATOS
function recuperarDato(storage) {
    let usuarioEnStorage = JSON.parse(storage.getItem("usuario"));
    return usuarioEnStorage;
}

//SALUDO INICIAL
function saludar(usuario) {
    nombreUsuario.innerHTML = `Bienvenido/a, <span>${usuario.name}</span>`
}

//VISUALIZACIÓN
function presentarInfo(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}

//USUARIO GUARDADO 
function Logueado(usuario) {
    if (usuario) {
        saludar(usuario);
        presentarInfo(toggles, "d-none");
    }
}

//VALIDACIÓN
function validarUser(usersDB, user, pass) {
    let encontrar = usersDB.find((userDB) => userDB.user == user);

    if (typeof encontrar === "undefined") {
        return false; 
    } else {
        if (encontrar.pass != pass) {
            return false;
        } else {
            return encontrar;
        }
    }
}

btnLogin.addEventListener("click", (e) => {
    e.preventDefault();


//VALIDACIÓN CAMPOS COMPLETOS
    if (!userLogin.value || !passLogin.value) {
        alert("Ambos campos son requeridos");
    } else {
        let data = validarUser(usuarios, userLogin.value, passLogin.value);

        if (!data) {
            alert("Usuario y/o contraseña incorrectos");
        } else {
            if (recordar.checked) {
                guardarDatos(data, localStorage);
                saludar(recuperarDato(localStorage));
            } else {
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

//BOTONES

const btn1 = document.querySelector("#btnradio1");
const btnA = document.querySelector("#btnradioA");
const seccionDos = document.querySelector("#seccionDos");
const seccionTres = document.querySelector("#seccionTres");
const seccionCuatro = document.querySelector("#seccionCuatro");
const seccionCinco = document.querySelector("#seccionCinco");
const instancias = document.querySelector("#instancias");
const btnD = document.querySelector("#desem");
const botonOk = document.querySelector("#botonOk");
const calcular = document.querySelector("#botonC");


btn1.addEventListener("click", () => {
   aparecer();
});

btnA.addEventListener("click", () => {
    aparecer1();
});

botonOk.addEventListener("click", () => {
    aparecer2();
    aparecer3();
});


calcular.addEventListener("click", ()=>{
    promedio(prom);
});

function aparecer(){
    seccionDos.classList.remove("hidden");
}

function aparecer1(){
    seccionTres.classList.remove("hidden");
}

function aparecer2(){
    seccionCuatro.classList.remove("hidden");
    notas(prom);
}

function aparecer3(){
    seccionCinco.classList.remove("hidden");
}

const prom = parseFloat(instancias.value);

function notas(prom){
    seccionCuatro.innerHTML = "<span>Indica la nota obtenida en cada instancia:</span><br>";
    for(let i=0; i<prom; i++){
    let html = `<Label>Nota `+(i+1)+`:</label><input type="text" id="notas"`+i+`><br>`;
    seccionCuatro.innerHTML += html;
    }
}

function promedio(prom){
    let suma=0;
    let promedio=0;
    let x=0;

    for(let i=0; i<prom; i++){
        x=document.querySelector("#notas" + i).value; //no funciona
        suma += parseFloat(x);
    }
    promedio = suma/prom;
    alert(promedio); //acá iría otra cosa, el alert es para probar
}  

//hacer función para desempeño
