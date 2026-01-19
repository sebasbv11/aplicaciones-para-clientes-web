import { useEffect, useState } from "react";
import Header from "../components/Header";

function Estudiante() {
    const [student, setStudent] = useState(null);
    const [adaptaciones, setAdaptaciones] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const students = JSON.parse(localStorage.getItem("students")) || [];
        const adaptacionesAll =
        JSON.parse(localStorage.getItem("adaptaciones")) || [];

        if (!user) return;

        // Buscar estudiante por correo
        const found = students.find(s => s.correo === user.correo);

        if (!found) return;

        setStudent(found);

        // Filtrar adaptaciones del estudiante
        setAdaptaciones(
        adaptacionesAll.filter(a => a.cedula === found.cedula)
        );
    }, []);

    if (!student) {
        return (
        <>
            <Header titulo="Mi perfil" />
            <main>
            <section className="card">
                <p>No se encontró información del estudiante.</p>
            </section>
            </main>
        </>
        );
    }

    return (
        <>
        <Header titulo="Mi perfil" />

        <main className="grid2">
            {/* 📌 DATOS PERSONALES */}
            <section className="card">
            <h3>Bienvenido {student.nombre}</h3>

            <h4>Mis Datos Personales</h4>
            <ul>
                <li><strong>Nombres y Apellidos:</strong> {student.nombre} {student.apellidos}</li>
                <li><strong>Cédula:</strong> {student.cedula}</li>
                <li><strong>Correo institucional:</strong> {student.correo}</li>
                <li><strong>Carrera:</strong> {student.carrera}</li>
                <li><strong>Semestre:</strong> {student.semestre}</li>
                <li><strong>Tipo de discapacidad:</strong> {student.discapacidad}</li>
                <li><strong>Porcentaje:</strong> {student.porcentaje}%</li>
                <li><strong>Tutor:</strong> {student.tutor}</li>
            </ul>
            </section>

            {/* ♿ ADAPTACIONES */}
            <section className="card">
            <h3>Adaptaciones asignadas por el tutor</h3>

            <table className="tabla">
                <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Tipo</th>
                    <th>Descripción</th>
                    <th>Asignatura</th>
                    <th>Estado</th>
                </tr>
                </thead>
                <tbody>
                {adaptaciones.length === 0 ? (
                    <tr>
                    <td colSpan="5">No tiene adaptaciones asignadas</td>
                    </tr>
                ) : (
                    adaptaciones.map((a, i) => (
                    <tr key={i}>
                        <td>{a.fecha}</td>
                        <td>{a.tipo}</td>
                        <td>{a.descripcion}</td>
                        <td>{a.asignatura}</td>
                        <td>{a.estado}</td>
                    </tr>
                    ))
                )}
                </tbody>
            </table>
            </section>
        </main>
        </>
    );
}

export default Estudiante;
