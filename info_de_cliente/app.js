// Utilidades DOM
const $  = (sel, ctx = document) => ctx.querySelector(sel);

// Mostrar/ocultar mensajes de error sin alerts/confirm
function setError(idError, msg = "") {
  const el = $(idError);
  if (!el) return;
  if (msg) {
    el.textContent = msg;
    el.style.display = "block";
  } else {
    el.textContent = "";
    el.style.display = "none";
  }
}

function validarNombre() {
  const input = $("#nombre");
  const ok = input.value && input.value.trim().length >= 3;
  setError("#err-nombre", ok ? "" : "Ingresa al menos 3 caracteres.");
  return ok;
}

function validarEmail() {
  const input = $("#email");
  const ok = input.value.trim() !== "" && input.checkValidity();
  setError("#err-email", ok ? "" : "Ingresa un correo válido.");
  return ok;
}

function validarTelefono() {
  const input = $("#telefono");
  if (input.value.trim() === "") {
    setError("#err-telefono", ""); // opcional
    return true; // teléfono es opcional
  }
  const ok = input.checkValidity(); // respeta el pattern del HTML
  setError("#err-telefono", ok ? "" : "Formato no válido. Usa dígitos, espacios y + ( ) - (mín. 7).");
  return ok;
}

function validarCasilla() {
  const chk = $("#acepto");
  const ok = chk.checked;
  setError("#err-acepto", ok ? "" : "Debes aceptar la confirmación.");
  return ok;
}

function limpiarMensajes() {
  ["#err-nombre","#err-email","#err-telefono","#err-acepto"].forEach(id => setError(id, ""));
  const exito = $("#mensajeExito");
  if (exito) exito.textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const form = $("#clientForm");
  const exito = $("#mensajeExito");

  // Validación en tiempo real
  $("#nombre").addEventListener("input", validarNombre);
  $("#email").addEventListener("input", validarEmail);
  $("#telefono").addEventListener("input", validarTelefono);
  $("#acepto").addEventListener("change", validarCasilla);

  // En blur refuerza mensajes
  ["#nombre","#email","#telefono"].forEach(sel => {
    $(sel).addEventListener("blur", () => {
      if (sel === "#nombre") validarNombre();
      if (sel === "#email") validarEmail();
      if (sel === "#telefono") validarTelefono();
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const okNombre   = validarNombre();
    const okEmail    = validarEmail();
    const okTelefono = validarTelefono();
    const okCasilla  = validarCasilla();

    const allOk = okNombre && okEmail && okTelefono && okCasilla;

    if (!allOk) {
      exito.textContent = "";
      // Enfoca el primer campo inválido
      if (!okNombre)   return $("#nombre").focus();
      if (!okEmail)    return $("#email").focus();
      if (!okTelefono) return $("#telefono").focus();
      if (!okCasilla)  return $("#acepto").focus();
      return;
    }

    exito.textContent = "Validación correcta.";
    form.reset();
    limpiarMensajes();
  });

  $("#btnLimpiar").addEventListener("click", () => {
    form.reset();
    limpiarMensajes();
  });
});
