// src/components/Votation.jsx
import React, { useState } from "react";
import { getUsuarioActual, setUsuarioActual } from "../utils/reservations";

const Votation = () => {
  // Array con las opciones de entradas
  const entradas = [
    { id: 1, nombre: "Causa", porcentaje: 17 },
    { id: 2, nombre: "Ensalada Blanca", porcentaje: 17 },
    { id: 3, nombre: "Papa a la Huancaína", porcentaje: 17 },
  ];

  // Array con las opciones de fondos
  const fondos = [
    { id: 1, nombre: "Seco de Carne", porcentaje: 17 },
    { id: 2, nombre: "Carapulcra", porcentaje: 17 },
    { id: 3, nombre: "Cau Cau", porcentaje: 17 },
  ];

  // Estados para guardar las selecciones
  const [entradaSeleccionada, setEntradaSeleccionada] = useState(null);
  const [fondoSeleccionado, setFondoSeleccionado] = useState(null);

  // Buscar nombres de los seleccionados
  const entradaNombre = entradas.find((e) => e.id === entradaSeleccionada)?.nombre;
  const fondoNombre = fondos.find((f) => f.id === fondoSeleccionado)?.nombre;

  // Guardar voto en usuarioActual (localStorage)
  const handleVotar = () => {
    const usuario = getUsuarioActual();
    if (!usuario) {
      alert("Debes iniciar sesión para votar");
      return;
    }

    if (!entradaNombre || !fondoNombre) {
      alert("Debes seleccionar una entrada y un fondo");
      return;
    }

    usuario.votacion = {
      entrada: entradaNombre,
      fondo: fondoNombre,
    };

    setUsuarioActual(usuario);
    alert(`Tu voto se guardó: ${entradaNombre} y ${fondoNombre}`);
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
                  elección del menú que se servirá al día siguiente. Revisa las
                  imágenes de los platos disponibles y selecciona tus opciones
                  favoritas en las categorías de entradas y fondos.
                  <br />
                  Tu voto es importante para que podamos ofrecer los platos más
                  deseados por todos. Las votaciones están abiertas hasta las
                  6:00 pm cada día, y los resultados definirán el menú del día
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

          {/* Votaciones */}
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">
                  Votación de Entradas
                </h2>
                <div className="votacion-entrada">
                  {entradas.map((entrada) => (
                    <label className="entrada" key={entrada.id}>
                      <div className="nombre-entrada">{entrada.nombre}</div>
                      <div className="barra-resultado">
                        <div
                          className="relleno"
                          style={{ width: `${entrada.porcentaje}%` }}
                        ></div>
                      </div>
                      <div className="porcentaje">
                        {entrada.porcentaje}%
                      </div>
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
                  {fondos.map((fondo) => (
                    <label className="fondo" key={fondo.id}>
                      <div className="nombre-fondo">{fondo.nombre}</div>
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
              {entradaNombre && fondoNombre ? (
                <>
                  Vas a votar por <strong>{entradaNombre}</strong> como entrada y{" "}
                  <strong>{fondoNombre}</strong> como fondo.
                </>
              ) : (
                "Debes seleccionar una entrada y un fondo antes de votar."
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
