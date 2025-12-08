// ---------- Utilidades ----------
function vacio(el, msg){ if(el.value.trim()===""){ alert(msg); el.focus(); return true;} return false; }
function correoValido(el){
    const ok = /^[a-zA-Z0-9._%+-]+@uleam\.edu\.ec$/.test(el.value.trim());
    if(!ok){ alert("Use su correo institucional @uleam.edu.ec"); el.focus(); }
    return ok;
}
function passFuerte(el){
    const ok = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).{8,}$/.test(el.value);
    if(!ok){ alert("La contraseña necesita 8+ caracteres, 1 mayúscula, 1 número y 1 símbolo."); el.focus(); }
    return ok;
}
function numero0a100(el){
    const n = Number(el.value); if(Number.isNaN(n)||n<0||n>100){ alert("Ingrese un porcentaje entre 0 y 100."); el.focus(); return false;} return true;
}

// ---------- Formularios ----------
function validarLogin(){
    const correo = document.getElementById("correo");
    const clave  = document.getElementById("clave");
    if(vacio(correo,"Ingrese su correo")) return false;
    if(!correoValido(correo)) return false;
    if(vacio(clave,"Ingrese su contraseña")) return false;
    alert("Inicio de sesión correcto (simulado)");
    return true;
}

function validarRestablecer(){
    const n = document.getElementById("nueva");
    const c = document.getElementById("confirmar");
    if(!passFuerte(n)) return false;
    if(n.value!==c.value){ alert("Las contraseñas no coinciden."); c.focus(); return false; }
    alert("Contraseña restablecida (simulado)");
    return true;
}

function validarUsuario(){
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const fecha = document.getElementById("fecha");
    const discapacidad = document.getElementById("discapacidad");
    const porcentaje = document.getElementById("porcentaje");
    if(vacio(nombre,"Ingrese el nombre")) return false;
    if(vacio(apellido,"Ingrese los apellidos")) return false;
    if(vacio(fecha,"Seleccione fecha de nacimiento")) return false;
    if(vacio(discapacidad,"Indique la discapacidad")) return false;
    if(!numero0a100(porcentaje)) return false;
    alert("Usuario guardado (simulado)");
    return true;
}
