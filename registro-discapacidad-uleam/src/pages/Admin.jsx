import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import icono from "../assets/icono-discapacidad.png";

function Admin() {
    const [users, setUsers] = useState([]);
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
        setUsers(storedUsers);
        setStudents(storedStudents);
    }, []);

    // 🔎 buscar estudiante por correo
    const getNombreCompleto = (correo) => {
        const student = students.find(s => s.correo === correo);
        if (!student) return "—";
        return `${student.nombre} ${student.apellidos}`;
    };

    return (
        <>
        <Header titulo="Bitácora de usuarios" />

        <main className="grid2">
            <section className="card col">
            <div className="toolbar" style={{ marginBottom: "10px" }}>
                <button
                className="btn btn--verde"
                onClick={() => navigate("/usuario")}
                >
                Usuario nuevo
                </button>
            </div>

            <table className="tabla">
                <thead>
                <tr>
                    <th>Nombre y apellidos</th>
                    <th>Correo institucional</th>
                    <th>Usuario</th>
                </tr>
                </thead>

                <tbody>
                {users.map((u, index) => (
                    <tr key={index}>
                    <td>{getNombreCompleto(u.correo)}</td>
                    <td>{u.correo}</td>
                    <td>{u.rol}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </section>

            <aside className="center">
            <img src={icono} alt="Inclusión" style={{ maxWidth: "100%" }} />
            </aside>
        </main>
        </>
    );
    }

export default Admin;
