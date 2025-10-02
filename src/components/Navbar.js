// src/components/Navbar.js
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {

  const [usuarioActivo, setUsuarioActivo] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuarioActual");
    if (storedUser) {
      setUsuarioActivo(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-toggler"
          aria-controls="navbar-toggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar-toggler">
          <Link className="navbar-brand" to="/">
            <img
              src="../img/logo-removebg.png"
              href="/   "
              width="50"
              alt="Logo de la página web"
            />
          </Link>

          <ul className="navbar-nav d-flex justify-content-center align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#platos">Menú</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#votacion">Votación</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#contacto">Contacto</a>
            </li>
            {usuarioActivo ? (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Mi Perfil <i className="bi bi-person-circle"></i>
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Iniciar Sesión <i className="bi bi-box-arrow-in-right"></i>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
