import { useState, useEffect } from "react";
import { getUsuarioActual, cancelarReserva } from "../utils/reservations";
import "../App.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [pedido, setPedido] = useState(null);
  const [platosConsumidos] = useState([
    "Lomo Saltado",
    "Ají de Gallina",
    "Arroz con Pollo",
  ]);

  const [codigo, setCodigo] = useState("");
  const [sugerencia, setSugerencia] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("usuarioActual");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSorteo = (e) => {
    e.preventDefault();
    if (codigo.trim() === "") {
      alert("Debes ingresar un código.");
      return;
    }
    alert(`Código enviado: ${codigo}`);
    setCodigo("");
  };

  const handleSugerencia = (e) => {
    e.preventDefault();
    if (sugerencia.trim() === "") {
      alert("Por favor escribe una sugerencia.");
      return;
    }
    alert(`Gracias por tu sugerencia: ${sugerencia}`);
    setSugerencia("");
  };

  const handleCancelarPedido = () => {
    setPedido(null);
    localStorage.removeItem("pedidoDelDia");
    cancelarReserva();
    const usuarioActualizado = getUsuarioActual();
    setUser(usuarioActualizado);
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem("usuarioActual");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <div className="container my-5">
      <h1 className="text-center seccion-titulo">Mi Perfil</h1>
      <div className="row g-4">
        {/* COLUMNA IZQUIERDA */}
        <div className="col-lg-6 d-flex flex-column gap-4">
          {/* Información Personal */}
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h4 className="perfil card-title">Información Personal</h4>
              {user ? (
                <>
                  <p>
                    <strong>Nombre:</strong> {user.nombre}
                  </p>
                  <p>
                    <strong>Apellido:</strong> {user.apellido}
                  </p>
                  <p>
                    <strong>Correo:</strong> {user.correo}
                  </p>

                  {/* Botón Cerrar Sesión */}
                  <button
                    className="btn btn-warning mt-3"
                    onClick={handleCerrarSesion}
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <p className="text-muted">No hay usuario logueado.</p>
              )}
            </div>
          </div>

          {/* Participa en el sorteo */}
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h4 className="card-title">Participa en el sorteo</h4>
              <form
                className="d-flex flex-column align-items-center"
                onSubmit={handleSorteo}
              >
                <input
                  type="text"
                  className="form-control mb-2 w-75"
                  placeholder="Ingresa tu código"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="col-lg-6 d-flex flex-column gap-4">
          {/* Pedido del día */}
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h4 className="card-title">Pedido del día</h4>
              {pedido || user?.platoReservado ? (
                <>
                  <ul className="list-group list-group-flush">
                    {pedido && <li className="list-group-item">{pedido}</li>}
                    {user?.platoReservado ? (
                      <li className="list-group-item">
                        <strong>Plato reservado:</strong> {typeof user.platoReservado === "string"
                          ? user.platoReservado
                          : user.platoReservado.nombre || user.platoReservado.fondo}
                      </li>
                    ) : (
                      <p className="text-muted">No tienes pedidos activos.</p>
                    )}
                  </ul>
                  <div className="boton-cancelar-pedido d-flex justify-content-center">
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#confirmModal"
                      type="button"
                      className="btn btn-danger mt-2"
                    >
                      Cancelar Pedido
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-muted">No tienes pedidos activos.</p>
              )}
            </div>
          </div>

          {/* Platos más consumidos */}
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h4 className="card-title">Platos más consumidos</h4>
              <ul className="list-group list-group-flush">
                {platosConsumidos.map((plato, idx) => (
                  <li key={idx} className="list-group-item">
                    {plato}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Caja de sugerencias */}
      <div className="row my-4">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h4 className="card-title">Caja de Sugerencias</h4>
              <form onSubmit={handleSugerencia}>
                <textarea
                  className="form-control mb-3"
                  rows="4"
                  placeholder="Escribe tu sugerencia..."
                  value={sugerencia}
                  onChange={(e) => setSugerencia(e.target.value)}
                ></textarea>
                <button type="submit" className="btn btn-warning">
                  Enviar sugerencia
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Cancelar Pedido */}
      <div
        className="modal fade"
        id="confirmModal"
        tabIndex="-1"
        aria-labelledby="confirmModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmModalLabel">
                Confirmar acción
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              ¿Estás seguro de que deseas cancelar el pedido?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleCancelarPedido}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
