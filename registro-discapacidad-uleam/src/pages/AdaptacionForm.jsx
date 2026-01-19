import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";

function AdaptacionForm() {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    // cédula del estudiante (viene desde tutor)
    const cedula = params.get("cedula");

    const user = JSON.parse(localStorage.getItem("user"));

    const [adaptacion, setAdaptacion] = useState({
        fecha: "",
        tipo: "",
        descripcion: "",
        asignatura: "",
        estado: "Activo"
    });

    const handleChange = (e) => {
        setAdaptacion({
        ...adaptacion,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validaciones
        if (
        !adaptacion.fecha ||
        !adaptacion.tipo ||
        !adaptacion.descripcion ||
        !adaptacion.asignatura
        ) {
        alert("Todos los campos son obligatorios");
        return;
        }

        const adaptaciones =
        JSON.parse(localStorage.getItem("adaptaciones")) || [];

        adaptaciones.push({
        cedula,
        ...adaptacion,
        tutor: user.correo
        });

        localStorage.setItem("adaptaciones", JSON.stringify(adaptaciones));

        alert("Adaptación registrada correctamente");
        navigate("/tutor");
    };

    return (
        <>
        <Header titulo="Nueva adaptación" />

        <main>
            <section className="card form">
            <form onSubmit={handleSubmit}>
                <div className="grid2">

                <div className="field">
                    <label>Fecha</label>
                    <input
                    type="date"
                    name="fecha"
                    onChange={handleChange}
                    />
                </div>

                <div className="field">
                    <label>Tipo de ajuste</label>
                    <input
                    name="tipo"
                    placeholder="Tiempo extra / Material accesible"
                    onChange={handleChange}
                    />
                </div>

                <div className="field">
                    <label>Asignatura</label>
                    <input
                    name="asignatura"
                    placeholder="Procesal"
                    onChange={handleChange}
                    />
                </div>

                <div className="field">
                    <label>Estado</label>
                    <select
                    name="estado"
                    onChange={handleChange}
                    >
                    <option>Activo</option>
                    <option>Inactivo</option>
                    </select>
                </div>

                </div>

                <div className="field">
                <label>Descripción</label>
                <textarea
                    name="descripcion"
                    placeholder="+30 min en examen"
                    onChange={handleChange}
                />
                </div>

                <button className="btn btn--verde">
                Guardar adaptación
                </button>
            </form>
            </section>
        </main>
        </>
    );
}

export default AdaptacionForm;
