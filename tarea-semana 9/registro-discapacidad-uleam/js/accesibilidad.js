function cambiarTamanioTexto(accion){
    const html = document.documentElement;
    let size = parseFloat(getComputedStyle(html).fontSize);
    if(accion==='aumentar') size += 2;
    if(accion==='disminuir') size -= 2;
    html.style.fontSize = size + 'px';
}
function mostrarContrasena(id){ const el=document.getElementById(id); el.type = el.type==='password'?'text':'password'; }
