import "../App.css";

function Signin() {
  return (
    <>

      <div className="signin-contenedor container d-flex justify-content-center align-items-center vh-100">
        <div className="card signin shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
          {/* Título */}
          <div className="text-center mb-4">
            <h3 className="fw-bold text-dark">Crear Cuenta</h3>
            <p className="text-muted">Regístrate para continuar</p>
          </div>

          {/* Formulario Registro */}
          <form>
            {/* Nombre */}
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Ingresa tu nombre"
                required
              />
            </div>

            {/* Apellido */}
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">Apellido</label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                placeholder="Ingresa tu apellido"
                required
              />
            </div>

            {/* Correo */}
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                id="correo"
                placeholder="ejemplo@correo.com"
                required
              />
            </div>

            {/* Contraseña */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="********"
                required
              />
            </div>

            {/* Botón */}
            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-primary btn-lg">
                Registrarse
              </button>
            </div>

            {/* Enlace login */}
            <div className="text-center mt-3">
              <p className="text-muted">
                ¿Ya tienes cuenta?{" "}
                <a href="/login" className="text-primary">
                  Inicia sesión
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

    </>
  );
}

export default Signin;
