import "../App.css";

function Login() {
  return (
    <>
    
      <div className="login-contenedor container d-flex justify-content-center align-items-center vh-100">
        <div className="card login shadow-lg p-4" style={{ maxWidth: "450px", width: "100%" }}>
          {/* Título */}
          <div className="text-center mb-4">
            <h3 className="fw-bold text-dark">Iniciar Sesión</h3>
            <p className="text-muted">Accede con tu cuenta</p>
          </div>

          {/* Formulario Login */}
          <form>
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
                Entrar
              </button>
            </div>

            {/* Enlace registro */}
            <div className="text-center mt-3">
              <p className="text-muted">
                ¿No tienes cuenta?{" "}
                <a href="/signin" className="text-primary">
                  Regístrate
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

    </>
  );
}

export default Login;
