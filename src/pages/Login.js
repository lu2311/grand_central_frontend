  import { useState } from "react";
  import "../App.css";
  import { getUsers, addUser } from "../utils/Users";

  function Login() {
    const [isLogin, setIsLogin] = useState(true);

    const handleLogin = (e) => {
      e.preventDefault();
      const correo = e.target.correo.value;
      const password = e.target.password.value;

      const users = getUsers();
      const user = users.find((u) => u.correo === correo && u.password === password);

      if (user) {
        alert(`Bienvenido ${user.nombre}`);
        localStorage.setItem("usuarioActual", JSON.stringify(user));
        window.location.href = "/profile";
      } else {
        alert("Correo o contraseña incorrectos");
      }
    };

    const handleSignup = (e) => {
      e.preventDefault();
      const nombre = e.target.nombre.value;
      const apellido = e.target.apellido.value;
      const correo = e.target.correo.value;
      const password = e.target.password.value;
      const repeatPassword = e.target.repeatPassword.value;

      if (password !== repeatPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      const newUser = { nombre, apellido, correo, password };
      addUser(newUser);

      alert("Usuario registrado con éxito");
      setIsLogin(true);
      e.target.reset();
    };

    return (
      <div className="auth-container container d-flex justify-content-center align-items-center mt-5 mb-5">
        <div className="card shadow-lg p-4">
          <div className="text-center mb-4">
            <h3 className="fw-bold text-dark">
              {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
            </h3>
            <p className="text-muted">
              {isLogin ? "Accede con tu cuenta" : "Regístrate para continuar"}
            </p>
          </div>

          {/* Formulario dinámico */}
          {isLogin ? (
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="correo" className="form-label">Correo electrónico</label>
                <input type="email" className="form-control" id="correo" required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="password" required />
              </div>
              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-primary btn-lg">Entrar</button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignup}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" required />
              </div>
              <div className="mb-3">
                <label htmlFor="apellido" className="form-label">Apellido</label>
                <input type="text" className="form-control" id="apellido" required />
              </div>
              <div className="mb-3">
                <label htmlFor="correo" className="form-label">Correo electrónico</label>
                <input type="email" className="form-control" id="correo" required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Nueva Contraseña</label>
                <input type="password" className="form-control" id="password" required />
              </div>
              <div className="mb-3">
                <label htmlFor="repeatPassword" className="form-label">Repetir Contraseña</label>
                <input type="password" className="form-control" id="repeatPassword" required />
              </div>
              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-primary btn-lg">Registrarse</button>
              </div>
            </form>
          )}

          {/* Enlace dinámico */}
          <div className="text-center mt-3">
            <p className="text-muted">
              {isLogin ? (
                <>
                  ¿No tienes cuenta?{" "}
                  <button
                    className="btn btn-link p-0"
                    onClick={() => setIsLogin(false)}
                  >
                    Regístrate
                  </button>
                </>
              ) : (
                <>
                  ¿Ya tienes cuenta?{" "}
                  <button
                    className="btn btn-link p-0"
                    onClick={() => setIsLogin(true)}
                  >
                    Inicia sesión
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  export default Login;
