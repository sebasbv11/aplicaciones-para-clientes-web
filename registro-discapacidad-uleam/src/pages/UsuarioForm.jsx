import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function UsuarioForm() {
    const navigate = useNavigate();

    // 🔐 Credenciales
    const [rol, setRol] = useState("Tutor");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    // 🎓 Datos del estudiante
    const [estudiante, setEstudiante] = useState({
        cedula: "",
        nombre: "",
        apellidos: "",
        carrera: "",
        semestre: "",
        tutor: "",
        sexo: "",
        discapacidad: "",
        tipo: "",
        porcentaje: "",
        fechaNacimiento: "",
        descripcion: ""
    });

    const handleEstudianteChange = (e) => {
        setEstudiante({
        ...estudiante,
        [e.target.name]: e.target.value
        });
    };

    // 🟢 GUARDAR
    const handleSubmit = (e) => {
        e.preventDefault();

        // 🔐 Validar credenciales
        if (!correo || !password) {
        alert("Correo y contraseña son obligatorios");
        return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        // ❌ Correo duplicado
        if (users.some(u => u.correo === correo)) {
        alert("El correo ya está registrado");
        return;
        }

        // 🎓 Validaciones SOLO si es estudiante
        if (rol === "Estudiante") {

        // 🔴 Validar campos obligatorios
        const camposObligatorios = [
            "cedula",
            "nombre",
            "apellidos",
            "carrera",
            "semestre",
            "tutor",
            "sexo",
            "discapacidad",
            "tipo",
            "porcentaje",
            "fechaNacimiento",
            "descripcion"
        ];

        for (let campo of camposObligatorios) {
            if (!estudiante[campo]) {
            alert("Debe completar todos los datos del estudiante");
            return;
            }
        }

        // 🔢 Validar cédula
        if (!/^\d{10}$/.test(estudiante.cedula)) {
            alert("La cédula debe tener exactamente 10 dígitos numéricos");
            return;
        }

        const students = JSON.parse(localStorage.getItem("students")) || [];

        // ❌ Cédula duplicada
        if (students.some(s => s.cedula === estudiante.cedula)) {
            alert("La cédula ya está registrada");
            return;
        }

        // ✅ Guardar estudiante
        students.push({
            correo,
            ...estudiante
        });

        localStorage.setItem("students", JSON.stringify(students));
        }

        // 🔐 Guardar credenciales
        users.push({
        correo,
        password,
        rol: rol.toLowerCase()
        });

        localStorage.setItem("users", JSON.stringify(users));

        alert("Usuario creado correctamente");
        navigate("/admin");
    };

    return (
        <>
        <Header titulo="Nuevo Usuario / Editar información" />

        <main>
            <section className="card form">
            <form onSubmit={handleSubmit}>

                {/* ROL */}
                <div className="field">
                <label>Rol</label>
                <select value={rol} onChange={(e) => setRol(e.target.value)}>
                    <option>Administrador</option>
                    <option>Tutor</option>
                    <option>Estudiante</option>
                </select>
                </div>

                {/* CREDENCIALES */}
                <div className="field">
                <label>Correo institucional</label>
                <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                />
                </div>

                <div className="field">
                <label>Contraseña</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>

                {/* CAMPOS SOLO PARA ESTUDIANTE */}
                {rol === "Estudiante" && (
                <>
                    <h4>En caso de ser estudiante llenar lo siguiente:</h4>

                    <div className="field">
                    <label>Cédula</label>
                    <input
                        name="cedula"
                        value={estudiante.cedula}
                        onChange={handleEstudianteChange}
                        maxLength="10"
                        placeholder="13xxxxxxxx"
                        required
                    />
                    </div>

                    <div className="grid2">
                    <div className="field">
                        <label>Nombre</label>
                        <input name="nombre" onChange={handleEstudianteChange} />
                    </div>

                    <div className="field">
                        <label>Apellidos</label>
                        <input name="apellidos" onChange={handleEstudianteChange} />
                    </div>

                    <div className="field">
                        <label>Carrera</label>
                        <input name="carrera" onChange={handleEstudianteChange} />
                    </div>

                    <div className="field">
                        <label>Semestre</label>
                        <input
                        type="number"
                        min="1"
                        max="10"
                        name="semestre"
                        onChange={handleEstudianteChange}
                        />
                    </div>

                    <div className="field">
                        <label>Tutor asignado</label>
                        <input name="tutor" onChange={handleEstudianteChange} />
                    </div>

                    <div className="field">
                        <label>Discapacidad</label>
                        <input name="discapacidad" onChange={handleEstudianteChange} />
                    </div>

                    <div className="field">
                        <label>Permanente o temporal</label>
                        <input name="tipo" onChange={handleEstudianteChange} />
                    </div>

                    <div className="field">
                        <label>Porcentaje de discapacidad</label>
                        <input
                        type="number"
                        min="0"
                        max="100"
                        name="porcentaje"
                        onChange={handleEstudianteChange}
                        />
                    </div>

                    <div className="field">
                        <label>Sexo</label>
                        <input name="sexo" onChange={handleEstudianteChange} />
                    </div>

                    <div className="field">
                        <label>Fecha de nacimiento</label>
                        <input
                        type="date"
                        name="fechaNacimiento"
                        onChange={handleEstudianteChange}
                        />
                    </div>

                    <div className="field">
                        <label>Descripción</label>
                        <textarea
                        name="descripcion"
                        onChange={handleEstudianteChange}
                        />
                    </div>
                    </div>
                </>
                )}

                <button className="btn btn--verde">Guardar</button>
            </form>
            </section>
        </main>
        </>
    );
}

export default UsuarioForm;
