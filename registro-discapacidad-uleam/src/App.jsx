import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Tutor from "./pages/Tutor";
import Estudiante from "./pages/Estudiante";
import UsuarioForm from "./pages/UsuarioForm";
import AdaptacionForm from "./pages/AdaptacionForm";
import Recuperar from "./pages/Recuperar";
import Restablecer from "./pages/Restablecer";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />

        <Route
          path="/admin"
          element={user?.rol === "admin" ? <Admin /> : <Navigate to="/" />}
        />

        <Route
          path="/tutor"
          element={user?.rol === "tutor" ? <Tutor /> : <Navigate to="/" />}
        />

        <Route
          path="/estudiante"
          element={
            user?.rol === "estudiante" ? <Estudiante /> : <Navigate to="/" />
          }
        />

        <Route path="/usuario" element={<UsuarioForm />} />

        <Route path="/adaptacion" element={<AdaptacionForm />} />

        <Route path="/recuperar" element={<Recuperar />} />
        <Route path="/restablecer" element={<Restablecer />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
