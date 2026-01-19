import { useState } from "react";
import Header from "../components/Header";

function Restablecer() {
    const [password, setPassword] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();

    const fuerte = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/;

    if (!fuerte.test(password)) {
        setError(
        "La contraseña debe tener 8+ caracteres, una mayúscula, un número y un símbolo."
        );
        return;
    }

    if (password !== confirmar) {
        setError("Las contraseñas no coinciden");
        return;
    }

    // 🔐 obtener usuario logueado
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (!currentUser) {
        setError("Sesión no válida");
        return;
    }

    // 🔐 obtener usuarios
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 🔐 actualizar contraseña
    const updatedUsers = users.map((u) =>
        u.correo === currentUser.correo
        ? { ...u, password: password }
        : u
    );

    // guardar cambios
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // actualizar sesión actual
    localStorage.setItem(
        "user",
        JSON.stringify({ ...currentUser, password })
    );

    setError("");
    alert("Contraseña cambiada exitosamente");

    setPassword("");
    setConfirmar("");
    };


    return (
        <>
        <Header titulo="Restablecer contraseña" />

        <main>
            <section className="card form">
            <div className="badge">
                La contraseña debe tener 8+ caracteres, una mayúscula, un número y un
                símbolo.
            </div>

            <form onSubmit={handleSubmit}>
                <div className="field">
                <label>Nueva contraseña</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>

                <div className="field">
                <label>Confirmar contraseña</label>
                <input
                    type="password"
                    value={confirmar}
                    onChange={(e) => setConfirmar(e.target.value)}
                    required
                />
                </div>

                {/* 🔴 MENSAJE DE ERROR EN PANTALLA */}
                {error && (
                <p style={{ color: "red", marginTop: "8px" }}>{error}</p>
                )}

                <div className="toolbar">
                <button className="btn btn--azul" type="submit">
                    Restablecer contraseña
                </button>
                </div>
            </form>
            </section>
        </main>
        </>
    );
}

export default Restablecer;
