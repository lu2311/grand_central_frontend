import { useState } from "react";
import { crearVotacion, getVotacionesHistorial, getVotacionDelDia } from "../../utils/Votations";
import Swal from "sweetalert2";

function VotationsHistory({ votaciones, setVotaciones, setVotacionHoy }) {
  const [showModal, setShowModal] = useState(false);
  const [entradas, setEntradas] = useState(["", "", ""]);
  const [fondos, setFondos] = useState(["", "", ""]);

  const handleCrearVotacion = async () => {
    const entradasValidas = entradas.filter(e => e.trim() !== "");
    const fondosValidos = fondos.filter(f => f.trim() !== "");

    if (entradasValidas.length < 3 || fondosValidos.length < 3) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes ingresar al menos 3 entradas y 3 fondos"
      });
      return;
    }

    try {
      const nueva = await crearVotacion(
        entradasValidas.map(e => ({ nombre: e })),
        fondosValidos.map(f => ({ nombre: f }))
      );

      Swal.fire({
        title: "Éxito",
        text: "Votación creada para hoy",
        icon: "success"
      });

      const historial = await getVotacionesHistorial();
      const hoy = await getVotacionDelDia();

      setVotaciones(historial);
      setVotacionHoy(hoy);

      setShowModal(false);
      setEntradas(["", "", ""]);
      setFondos(["", "", ""]);

    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: e.response?.data?.message || "Error creando votación"
      });
    }
  };

  return (
    <div>
      <button className="btn btn-warning mb-3" onClick={() => setShowModal(true)}>
        Crear votación
      </button>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Entradas</th>
              <th>Fondos</th>
            </tr>
          </thead>
          <tbody>
            {votaciones.map((v) => (
              <tr key={v.id}>
                <td>{v.fecha}</td>
                <td>{v.entradas.join(", ")}</td>
                <td>{v.fondos.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <>
          <div className="modal d-block">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Crear votación del día</h5>
                  <button className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>

                <div className="modal-body">

                  {/* Entradas */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Entradas</label>
                    {entradas.map((e, i) => (
                      <input
                        key={i}
                        type="text"
                        className="form-control mb-2"
                        placeholder={`Entrada ${i + 1}`}
                        value={e}
                        onChange={(ev) => {
                          const copia = [...entradas];
                          copia[i] = ev.target.value;
                          setEntradas(copia);
                        }}
                      />
                    ))}
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => setEntradas([...entradas, ""])}
                    >
                      + Agregar otra entrada
                    </button>
                  </div>

                  {/* Fondos */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Fondos</label>
                    {fondos.map((f, i) => (
                      <input
                        key={i}
                        type="text"
                        className="form-control mb-2"
                        placeholder={`Fondo ${i + 1}`}
                        value={f}
                        onChange={(ev) => {
                          const copia = [...fondos];
                          copia[i] = ev.target.value;
                          setFondos(copia);
                        }}
                      />
                    ))}
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => setFondos([...fondos, ""])}
                    >
                      + Agregar otro fondo
                    </button>
                  </div>

                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button className="btn btn-success" onClick={handleCrearVotacion}>
                    Guardar votación
                  </button>
                </div>

              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}

export default VotationsHistory;
