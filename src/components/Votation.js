import React, { useState, useEffect } from "react";
import { getUsuarioActual, setUsuarioActual } from "../utils/Reservations";
import { getVotacionDelDia, registrarVoto } from "../utils/Votations";
import Swal from "sweetalert2";

const Votation = () => {
  const [votacion, setVotacion] = useState(null);
  const [entradaSeleccionada, setEntradaSeleccionada] = useState(null);
  const [fondoSeleccionado, setFondoSeleccionado] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      const data = await getVotacionDelDia();
      setVotacion(data);
    };
    cargar();
  }, []);

  if (!votacion) {
    return <h2 className="text-center mt-5">No hay votación creada para hoy</h2>;
  }

  const handleVotar = async () => {
    const usuario = getUsuarioActual();
    if (!usuario) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes iniciar sesión para votar",
      });
      return;
    }

    if (!entradaSeleccionada || !fondoSeleccionado) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes seleccionar una entrada y un fondo",
      });
      return;
    }

    try {
      await registrarVoto(entradaSeleccionada, fondoSeleccionado);

      Swal.fire({
        icon: "success",
        title: "Voto registrado",
        text: "Tu voto fue registrado correctamente",
      });

      usuario.votacion = {
        fecha: new Date().toLocaleDateString("es-PE"),
        entrada: votacion.entradas.find(e => e.id === entradaSeleccionada)?.nombre,
        fondo: votacion.fondos.find(f => f.id === fondoSeleccionado)?.nombre,
      };

      setUsuarioActual(usuario);

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "No se pudo registrar tu voto",
      });
    }
  };

  return (
    <>
      <div id="votacion" className="container my-5">
        <div className="row g-4">

          {/* ENTRADAS */}
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Votación de Entradas</h2>
                <div className="votacion-entrada">
                  {votacion.entradas.map((entrada) => (
                    <label className="entrada" key={entrada.id}>
                      <div className="nombre-entrada">{entrada.nombre}</div>
                      <img
                        src="https://via.placeholder.com/200"
                        alt={entrada.nombre}
                        className="img-fluid rounded img-votacion"
                      />
                      <div className="checkbox-container">
                        <input
                          type="radio"
                          name="entrada-voto"
                          value={entrada.id}
                          onChange={() => setEntradaSeleccionada(entrada.id)}
                        />
                      </div>
                    </label>
                  ))}
                </div>

                {/* FONDOS */}
                <h2 className="card-title text-center my-4">Votación de Fondos</h2>
                <div className="votacion-fondo">
                  {votacion.fondos.map((fondo) => (
                    <label className="fondo" key={fondo.id}>
                      <div className="nombre-fondo">{fondo.nombre}</div>
                      <img
                        src="https://via.placeholder.com/200"
                        alt={fondo.nombre}
                        className="img-fluid rounded img-votacion"
                      />
                      <div className="checkbox-container">
                        <input
                          type="radio"
                          name="fondo-voto"
                          value={fondo.id}
                          onChange={() => setFondoSeleccionado(fondo.id)}
                        />
                      </div>
                    </label>
                  ))}
                </div>

                <div className="d-flex justify-content-center mt-4">
                  <button
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#confirmModalVotacion"
                  >
                    Votar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MODAL */}
          <div
            className="modal fade"
            id="confirmModalVotacion"
            tabIndex="-1"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmar acción</h5>
                  <button className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                  {entradaSeleccionada && fondoSeleccionado ? (
                    <>
                      Vas a votar por{" "}
                      <strong>
                        {votacion.entradas.find(e => e.id === entradaSeleccionada)?.nombre}
                      </strong>{" "}
                      y{" "}
                      <strong>
                        {votacion.fondos.find(f => f.id === fondoSeleccionado)?.nombre}
                      </strong>
                    </>
                  ) : (
                    "Debes seleccionar una entrada y un fondo antes de votar."
                  )}
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" data-bs-dismiss="modal">
                    Cancelar
                  </button>
                  <button
                    className="btn btn-success"
                    data-bs-dismiss="modal"
                    onClick={handleVotar}
                  >
                    Votar
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Votation;
