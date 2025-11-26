import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  apiGetVotacionDelDia,
  apiRegistrarVoto,
} from "../utils/VotationsService";

const Votation = () => {
  const [votacion, setVotacion] = useState(null);
  const [entradaSeleccionada, setEntradaSeleccionada] = useState(null);
  const [fondoSeleccionado, setFondoSeleccionado] = useState(null);

  useEffect(() => {
    loadVotacion();
  }, []);

  async function loadVotacion() {
    try {
      const data = await apiGetVotacionDelDia();
      setVotacion(data);
    } catch (error) {
      setVotacion(null);
    }
  }

  // NUEVO: vota en backend
  const handleVotar = async () => {
    if (!entradaSeleccionada || !fondoSeleccionado) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes seleccionar una entrada y un fondo",
      });
      return;
    }

    try {
      await apiRegistrarVoto(entradaSeleccionada, fondoSeleccionado);

      Swal.fire({
        icon: "success",
        title: "¡Voto registrado!",
        text: "Tu voto fue exitoso 🎉",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "No se pudo votar",
      });
    }
  };

  if (!votacion) {
    return (
      <h2 className="text-center mt-5">No hay votación creada para hoy</h2>
    );
  }

  return (
    <>
      {/* Sección Votación */}
      <div id="votacion" className="votacion-explicacion container my-5">
        <div className="row g-4">
          {/* Explicación */}
          <div className="col-lg-6 p-50">
            <div className="votacion-explicacion-container card shadow-sm border-0 h-100">
              <div className="card-body">
                <h2 className="titulo-votacion card-title mb-3">
                  Votación para el Menú del Día
                </h2>
                <p className="card-text">
                  En esta nueva sección puedes participar activamente en la
                  elección del menú que se servirá al día siguiente...
                </p>
                <div className="text-center mt-2">
                  <img
                    src="../img/comidas_criollas_peruanas.png"
                    alt="Imagen explicativa"
                    className="comida-criolla img-fluid rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Votaciones */}
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">
                  Votación de Entradas
                </h2>
                <div className="votacion-entrada">
                  {votacion.entradas.map((entrada) => (
                    <label className="entrada" key={entrada.id}>
                      <div className="nombre-entrada">{entrada.nombre}</div>
                      <div className="imagen-entrada text-center my-2">
                        <img
                          src={
                            entrada.imagen ||
                            "https://imgs.search.brave.com/L35xuY9rLpgS4Fh-6AD4abs8X9S_AKzxuMeG3ccOkrE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzkxLzIyLzU5/LzM2MF9GXzc5MTIy/NTkyNl9NVUVQdWtv/MHhnakt2V2VBSEdQ/ZEVyUUhZNlgyWkox/bS5qcGc"
                          }
                          alt={entrada.nombre}
                          className="img-fluid rounded img-votacion"
                        />
                      </div>
                      <div className="barra-resultado">
                        <div
                          className="relleno"
                          style={{ width: `${entrada.porcentaje}%` }}
                        ></div>
                      </div>
                      <div className="porcentaje">{entrada.porcentaje}%</div>
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

                <h2 className="card-title text-center my-4">
                  Votación de Fondos
                </h2>

                <div className="votacion-fondo">
                  {votacion.fondos.map((fondo) => (
                    <label className="fondo" key={fondo.id}>
                      <div className="nombre-fondo">{fondo.nombre}</div>
                      <div className="imagen-fondo text-center my-2">
                        <img
                          src={
                            fondo.imagen ||
                            "https://imgs.search.brave.com/L35xuY9rLpgS4Fh-6AD4abs8X9S_AKzxuMeG3ccOkrE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzkxLzIyLzU5/LzM2MF9GXzc5MTIy/NTkyNl9NVUVQdWtv/MHhnakt2V2VBSEdQ/ZEVyUUhZNlgyWkox/bS5qcGc"
                          }
                          alt={fondo.nombre}
                          className="img-fluid rounded img-votacion"
                        />
                      </div>
                      <div className="barra-resultado">
                        <div
                          className="relleno"
                          style={{ width: `${fondo.porcentaje}%` }}
                        ></div>
                      </div>
                      <div className="porcentaje">{fondo.porcentaje}%</div>
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

                <div className="boton-votacion d-flex justify-content-center">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#confirmModalVotacion"
                    type="button"
                    className="btn btn-success"
                  >
                    Votar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Modal Confirmación */}
      <div
        className="modal fade"
        id="confirmModalVotacion"
        tabIndex="-1"
        aria-labelledby="confirmModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmar acción</h5>
            </div>
            <div className="modal-body">
              {entradaSeleccionada && fondoSeleccionado
                ? "¿Confirmas tu voto?"
                : "Selecciona entrada y fondo primero"}
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
    </>
  );
};

export default Votation;
