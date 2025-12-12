import { useState } from "react";
import { fetchVotaciones, crearVotacionBackend } from "../../utils/Votations";
import Swal from 'sweetalert2';

function VotationsHistory({ votaciones, setVotaciones, setVotacionHoy }) {
    const [showModal, setShowModal] = useState(false);
    const [entradas, setEntradas] = useState(["", "", ""]);
    const [fondos, setFondos] = useState(["", "", ""]);

    const handleCrearVotacion = async () => {
        const entradasValidas = entradas.filter(e => e.trim() !== "");
        const fondosValidos = fondos.filter(f => f.trim() !== "");

        if (entradasValidas.length < 3 || fondosValidos.length < 3) {
            Swal.fire("Error", "Debes ingresar al menos 3 entradas y 3 fondos", "error");
            return;
        }

        try {
            const nueva = await crearVotacionBackend(entradasValidas, fondosValidos);

            Swal.fire("Éxito", "Votación creada para hoy", "success");

            const lista = await fetchVotaciones();
            setVotaciones(lista);
            setVotacionHoy(nueva);

            setShowModal(false);
            setEntradas(["", "", ""]);
            setFondos(["", "", ""]);
        } catch (err) {
            Swal.fire("Error", err.friendlyMessage || "No se pudo crear la votación", "error");
        }
    };

    return (
        <div>
            <button className="btn btn-warning mb-3" onClick={() => setShowModal(true)}>
                Crear votación
            </button>

            {/* Tabla historial */}
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Entradas</th>
                            <th>Fondos</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {votaciones.map((v) => {
                            const opciones = Array.isArray(v.opciones) ? v.opciones : [];

                            const entradas = opciones
                                .filter((o) => o.tipo === "ENTRADA")
                                .map((e) => `${e.nombre} (${e.votos})`)
                                .join(", ");

                            const fondos = opciones
                                .filter((o) => o.tipo === "FONDO")
                                .map((f) => `${f.nombre} (${f.votos})`)
                                .join(", ");

                            return (
                                <tr key={v.id}>
                                    <td>{v.fecha}</td>
                                    <td>{entradas || "—"}</td>
                                    <td>{fondos || "—"}</td>
                                    <td>{v.estado}</td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <>
                    <div className="modal d-block" tabIndex="-1">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Crear votación del día</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowModal(false)}
                                    ></button>
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
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
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