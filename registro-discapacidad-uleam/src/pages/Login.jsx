import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-uleam.png";
import usersBase from "../data/users.json";

function Login({ setUser }) {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // 🔁 Inicializar usuarios desde JSON SOLO una vez
    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users"));
        if (!storedUsers || storedUsers.length === 0) {
        localStorage.setItem("users", JSON.stringify(usersBase));
        }
    }, []);

    const handleLogin = () => {
        // 1️⃣ Campos obligatorios
        if (!correo || !password) {
        setError("Todos los campos son obligatorios");
        return;
        }

        // 2️⃣ Correo institucional
        const correoULEAM = /^[a-zA-Z0-9._%+-]+@uleam\.edu\.ec$/;
        if (!correoULEAM.test(correo)) {
        setError("Debe usar su correo institucional @uleam.edu.ec");
        return;
        }

        // 3️⃣ Buscar usuario
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const user = storedUsers.find(
        u => u.correo === correo && u.password === password
        );

        // 4️⃣ Credenciales incorrectas
        if (!user) {
        setError("Correo o contraseña incorrectos");
        return;
        }

        // 5️⃣ Login correcto
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);

        if (user.rol === "admin") navigate("/admin");
        if (user.rol === "tutor") navigate("/tutor");
        if (user.rol === "estudiante") navigate("/estudiante");
    };

    return (
        <div className="login-wrap">
        <div className="login-box">
            <div className="logo-uleam">
            <img src={logo} alt="ULEAM" />
            </div>

            <h2>Inicio de sesión</h2>

            <div className="field">
            <label>Correo:</label>
            <input
                type="email"
                value={correo}
                onChange={e => setCorreo(e.target.value)}
                placeholder="usuario@uleam.edu.ec"
            />
            </div>

            <div className="field">
            <label>Contraseña:</label>
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="********"
            />
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button
            className="btn btn--rojo"
            style={{ width: "100%" }}
            onClick={handleLogin}
            >
            Iniciar sesión
            </button>

            <a className="link" href="/recuperar">
            ¿Olvidó su contraseña?
            </a>
        </div>
        </div>
    );
}

export default Login;
