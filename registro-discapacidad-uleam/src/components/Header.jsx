import { useNavigate } from "react-router-dom";

function Header({ titulo }) {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const resetPassword = () => {
        navigate("/restablecer");
    };

    return (
        <header className="uleam">
        <strong>{titulo}</strong>

        <div className="menu">
            <button
            className="btn btn--gris"
            onClick={resetPassword}
            >
            Restablecer contraseña
            </button>

            <button
            className="btn btn--gris"
            onClick={logout}
            >
            Cerrar sesión
            </button>
        </div>
        </header>
    );
}

export default Header;
