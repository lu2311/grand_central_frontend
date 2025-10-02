import { useState } from "react";
import { reservarPlato } from "../utils/reservations";

function Dishes() {
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
  
  
  // Array de platos
  const platos = [
    { nombre: "Lomo Saltado", imagen: "../img/lomo-saltado.jpg", precio: "12.00" },
    { nombre: "Tallarín Saltado", imagen: "../img/tallarin-saltado.webp", precio: "12.00" },
    { nombre: "Bisteck a lo Pobre", imagen: "../img/bistec-a-lo-pobre.jpg", precio: "15.00" },
    { nombre: "Churrasco con Papas Doradas", imagen: "../img/churrasco-papas.png", precio: "17.00" },
    { nombre: "Chuleta con Papas Doradas", imagen: "../img/chuleta-papas.jpeg", precio: "15.00" },
    { nombre: "Chaufa Amazónico", imagen: "../img/chaufa-amazonico", precio: "12.00" },
    { nombre: "Chaufa de Pollo", imagen: "../img/chaufa-pollo.jpg", precio: "12.00" },
    { nombre: "Filete de Pollo con Champiñones", imagen: "../img/pollo-champinones.jpg", precio: "17.00" },
    { nombre: "Spaghetti a la Huancaína con Lomo Saltado", imagen: "../img/spaghetti-huancaina-lomo.jpg", precio: "18.00" },
    { nombre: "Spaghetti en Salsa de Hongos", imagen: "../img/spaghetti-hongos.jpg", precio: "18.00" },
    { nombre: "Spaguetti a lo Alfredo", imagen: "../img/spaghetti-alfredo.jpeg", precio: "12.00" },
    { nombre: "Alitas B.B.Q.", imagen: "../img/alitas-b.b.q..jpg", precio: "15.00" },
    { nombre: "Alitas Búfalo", imagen: "../img/alitas-buffalo.jpg", precio: "15.00" },
    { nombre: "Cordon Bleu en Salsa Bechamel", imagen: "../img/cordon-bleu.webp", precio: "15.00" },
    { nombre: "Arroz a la Cubana", imagen: "../img/arroz-cubana.webp", precio: "10.00" },
  ];
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
