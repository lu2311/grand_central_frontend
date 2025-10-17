import { useState, useEffect } from "react";
import { reservarPlato } from "../utils/Reservations";
import Swal from 'sweetalert2';

function Dishes() {
  const [platos, setPlatos] = useState([]);
  const [platoSeleccionado, setPlatoSeleccionado] = useState(null);
  
  const manejarReserva = (plato) => {
  setPlatoSeleccionado(plato);
  };

  const confirmarReserva = () => {
    if (platoSeleccionado) {
      reservarPlato({
        tipo: "plato",
        nombre: platoSeleccionado.nombre,
        precio: platoSeleccionado.precio,
        imagen: platoSeleccionado.imagen,
      });
    }
  };

  useEffect(() => {
      const data = localStorage.getItem("platos");
      try {
        if (data) {
          setPlatos(JSON.parse(data));
        } else {
          setPlatos([]);
        }
      } catch (e) {
        Swal.fire({
                icon: "error",
                title: "Error",
                text: ("Error al leer platos del localStorage:", e)
              });
        setPlatos([]);
      }
    }, []);
  
  return (
    <section id="platos" className="platos-carta d-flex flex-column">
      <h2 className="seccion-titulo">Platos a la Carta</h2>
      <div className="container text-center platos-contenedor">
        <div className="row">
          {platos.map((plato) => (
            <div key={plato.id} className="col-12 col-md-6 col-lg-4">
              <div className="platos">
                <img src={plato.imagen} alt={plato.nombre} />
                <div className="overlay">
                  <p>{plato.nombre}</p>
                  <div className="iconos-contenedor">
                    <button type="button" className="btn no-clickable btn-primary">
                      S/.{plato.precio}
                    </button>
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#confirmModalPlato"
                      type="button"
                      className="btn btn-success"
                      onClick={() => manejarReserva(plato)}
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal de Confirmación */}
      <div
        className="modal fade"
        id="confirmModalPlato"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {platoSeleccionado ? (
              <>
                <div className="modal-header">
                  <h5 className="modal-title">
                    Confirmar Reserva - {platoSeleccionado.nombre}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body text-center">
                  <img
                    src={platoSeleccionado.imagen}
                    alt={platoSeleccionado.nombre}
                    className="img-fluid rounded mb-3"
                  />
                  <p>
                    Estás a punto de reservar <b>{platoSeleccionado.nombre}</b>{" "}
                    por <b>S/.{platoSeleccionado.precio}</b>.
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancelar
                  </button>
                  <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={confirmarReserva}>
                    Confirmar Reserva
                  </button>
                </div>
              </>
            ) : (
              <div className="p-3">Selecciona un plato primero</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dishes;