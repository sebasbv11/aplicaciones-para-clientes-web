import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Tutor() {
    const navigate = useNavigate();

    const [cedula, setCedula] = useState("");
    const [student, setStudent] = useState(null);
    const [adaptations, setAdaptations] = useState([]);

    const buscarEstudiante = () => {
        if (!cedula) {
        alert("Ingrese una cédula");
        return;
        }

        const students = JSON.parse(localStorage.getItem("students")) || [];
        const adaptationsAll =
        JSON.parse(localStorage.getItem("adaptaciones")) || [];

        const found = students.find(s => s.cedula === cedula);

        if (!found) {
        alert("Estudiante no encontrado");
        setStudent(null);
        setAdaptations([]);
        return;
        }

        setStudent(found);
        setAdaptations(adaptationsAll.filter(a => a.cedula === cedula));
    };

    return (
        <>
        <Header titulo="Gestión de estudiantes" />

        <main>
            {/* 🔎 BUSCAR */}
            <section className="card">
            <h3>🔍 Buscar estudiante</h3>
            <div className="toolbar">
                <input
                placeholder="Cédula"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                />
                <button className="btn btn--azul" onClick={buscarEstudiante}>
                Buscar
                </button>
            </div>
            </section>

            {/* 👤 DATOS DEL ESTUDIANTE */}
            {student && (
            <>
                <section className="card">
                <strong>
                    👤 Estudiante: {student.nombre} {student.apellidos} (Cód.{" "}
                    {student.cedula})
                </strong>
                <p>
                    Carrera: {student.carrera || "—"} | Semestre:{" "}
                    {student.semestre || "—"} | Tutor: {student.tutor || "—"}
                </p>
                </section>

                {/* ♿ INFORMACIÓN DE DISCAPACIDAD */}
                <section className="card">
                <h3>Información de discapacidad</h3>

                <table className="tabla">
                    <thead>
                    <tr>
                        <th>Tipo de discapacidad</th>
                        <th>Permanente / Temporal</th>
                        <th>Porcentaje</th>
                        <th>Descripción</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{student.discapacidad || "—"}</td>
                        <td>{student.tipo || "—"}</td>
                        <td>
                        {student.porcentaje
                            ? `${student.porcentaje}%`
                            : "—"}
                        </td>
                        <td>{student.descripcion || "—"}</td>
                    </tr>
                    </tbody>
                </table>
                </section>

                {/* ♿ ADAPTACIONES */}
                <section className="card">
                <div
                    className="toolbar"
                    style={{ justifyContent: "space-between" }}
                >
                    <h3>Adaptaciones / Apoyos razonables</h3>
                    <button
                    className="btn btn--verde"
                    onClick={() =>
                        navigate(`/adaptacion?cedula=${student.cedula}`)
                    }
                    >
                    Nueva adaptación
                    </button>
                </div>

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
                    {adaptations.length === 0 ? (
                        <tr>
                        <td colSpan="5">No hay adaptaciones</td>
                        </tr>
                    ) : (
                        adaptations.map((a, i) => (
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

            </>
            )}
        </main>
        </>
    );
}

export default Tutor;
