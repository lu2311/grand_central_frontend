import React, { useState, useEffect } from "react";
import { fetchOpcionesHoy, registrarVotoBackend } from "../utils/Votations";
import Swal from "sweetalert2";

const Votation = () => {
  const [opciones, setOpciones] = useState(null);
  const [entradaSeleccionada, setEntradaSeleccionada] = useState(null);
  const [fondoSeleccionado, setFondoSeleccionado] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await fetchOpcionesHoy();
        setOpciones({
          entradas: data.filter((o) => o.tipo === "ENTRADA"),
          fondos: data.filter((o) => o.tipo === "FONDO"),
        });
      } catch (error) {
        setOpciones(null);
      }
    };
    cargar();
  }, []);

  if (!opciones) {
    return <h2 className="text-center mt-5">No hay votación creada para hoy</h2>;
  }

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
      await registrarVotoBackend(entradaSeleccionada, fondoSeleccionado);
      Swal.fire({
        icon: "success",
        title: "Voto registrado",
        text: "Tu voto fue guardado correctamente",
      });
    } catch (err) {
      Swal.fire({
      icon: "warning",
      title: "Error",
      text: err.friendlyMessage || "Ocurrió un error al registrar tu voto",
    });
    }
  };

  const entradaNombre = opciones.entradas.find((e) => e.id === entradaSeleccionada)?.nombre;
  const fondoNombre = opciones.fondos.find((f) => f.id === fondoSeleccionado)?.nombre;

  const calcularPorcentaje = (votos, lista) => {
    const total = lista.reduce((sum, o) => sum + o.votos, 0);
    if (total === 0) return 0;
    return Math.round((votos / total) * 100);
  };

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
                  elección del menú que se servirá al día siguiente. Selecciona tus opciones
                  favoritas en las categorías de entradas y fondos.
                  <br />
                  Las votaciones están abiertas hasta las
                  8:00 am cada día, y los resultados definirán el menú del día
                  siguiente.
                  <br />
                  ¡No pierdas la oportunidad de elegir lo que más te gusta!
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

          {/* VOTACIÓN */}
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">

                {/* ENTRADAS */}
                <h2 className="card-title text-center mb-4">Votación de Entradas</h2>
                <div className="votacion-entrada">
                  {opciones.entradas.map((entrada) => {
                    const porcentaje = calcularPorcentaje(entrada.votos, opciones.entradas);

                    return (
                      <label className="entrada" key={entrada.id}>
                        <div className="nombre-entrada">{entrada.nombre}</div>

                        {/* Barra de progreso */}
                        <div className="progress mb-2" style={{ height: "8px" }}>
                          <div
                            className="progress-bar bg-success"
                            style={{ width: `${porcentaje}%` }}
                          ></div>
                        </div>

                        {/* Radio */}
                        <div className="checkbox-container">
                          <input
                            type="radio"
                            name="entrada-voto"
                            value={entrada.id}
                            onChange={() => setEntradaSeleccionada(entrada.id)}
                          />
                        </div>
                      </label>
                    );
                  })}

                </div>

                {/* FONDOS */}
                <h2 className="card-title text-center my-4">Votación de Fondos</h2>
                <div className="votacion-fondo">
                  {opciones.fondos.map((fondo) => {
                    const porcentaje = calcularPorcentaje(fondo.votos, opciones.fondos);

                    return (
                      <label className="fondo" key={fondo.id}>
                        <div className="nombre-fondo">{fondo.nombre}</div>

                        {/* Barra de progreso */}
                        <div className="progress mb-2" style={{ height: "8px" }}>
                          <div
                            className="progress-bar bg-info"
                            style={{ width: `${porcentaje}%` }}
                          ></div>
                        </div>

                        {/* Radio */}
                        <div className="checkbox-container">
                          <input
                            type="radio"
                            name="fondo-voto"
                            value={fondo.id}
                            onChange={() => setFondoSeleccionado(fondo.id)}
                          />
                        </div>
                      </label>
                    );
                  })}

                </div>

                {/* Botón */}
                <div className="d-flex justify-content-center">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#confirmModalVotacion"
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

      {/* Modal de Votación */}
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
              {entradaSeleccionada && fondoSeleccionado ? (
                <>
                  Vas a votar por <strong>{entradaNombre}</strong> como entrada y{" "}
                  <strong>{fondoNombre}</strong> como fondo.
                </>
              ) : (
                "Debes seleccionar una entrada y un fondo."
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
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
