const KEY_DB = "uleam_discapacidad_db";

// Carga la base de datos desde localStorage
function cargarDB(){
    const raw = localStorage.getItem(KEY_DB);
    if(!raw){
    const inicial = { estudiantes: [] };
    localStorage.setItem(KEY_DB, JSON.stringify(inicial, null, 2));
    return inicial;

    }
    return JSON.parse(raw);
}

// Guarda la base de datos en localStorage
function guardarDB(db){
    localStorage.setItem(KEY_DB, JSON.stringify(db, null, 2));
}
