import Header from "../components/Header";

function Recuperar() {
    return (
        <>
        <Header titulo="¿Olvidaste tu contraseña?" />

        <main>
            <section className="card form">
            <p>
                Ingresa tu correo institucional para enviarte instrucciones de
                restablecimiento.
            </p>

            <form
                onSubmit={(e) => {
                e.preventDefault();
                alert("Se envió un enlace de recuperación (simulado)");
                }}
            >
                <div className="field">
                <label>Correo institucional</label>
                <input
                    type="email"
                    placeholder="usuario@uleam.edu.ec"
                    required
                />
                </div>

                <div className="toolbar">
                <button className="btn btn--rojo" type="submit">
                    Enviar enlace
                </button>
                </div>
            </form>
            </section>
        </main>
        </>
    );
}

export default Recuperar;
