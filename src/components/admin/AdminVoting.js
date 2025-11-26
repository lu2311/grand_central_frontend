import { useEffect, useState } from "react";
import {
  apiGetVotaciones,
  apiGetVotacionDelDia,
  apiCrearVotacion,
} from "../../utils/VotationsService";

function AdminVoting() {
  const [votaciones, setVotaciones] = useState([]);
  const [votacionHoy, setVotacionHoy] = useState(null);
  const [entradas, setEntradas] = useState(["", "", "", ""]);
  const [fondos, setFondos] = useState(["", "", "", ""]);

  async function load() {
    const list = await apiGetVotaciones();
    const hoy = await apiGetVotacionDelDia();
    setVotaciones(list);
    setVotacionHoy(hoy);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCrearVotacion() {
    await apiCrearVotacion(
      entradas.filter((x) => x !== ""),
      fondos.filter((x) => x !== "")
    );

    await load();
  }

  return (
    <div>
      <h2>Administrar Votaciones</h2>

      <h3>Votación de Hoy</h3>
      {votacionHoy ? (
        <p>YA existe votación activa hoy.</p>
      ) : (
        <div>
          <h4>Crear nueva votación</h4>
          <label>Entradas:</label>
          {entradas.map((v, i) => (
            <input
              key={i}
              value={v}
              onChange={(e) =>
                setEntradas(
                  entradas.map((x, j) => (i === j ? e.target.value : x))
                )
              }
            />
          ))}
          <br />

          <label>Fondos:</label>
          {fondos.map((v, i) => (
            <input
              key={i}
              value={v}
              onChange={(e) =>
                setFondos(
                  fondos.map((x, j) => (i === j ? e.target.value : x))
                )
              }
            />
          ))}

          <br />
          <button onClick={handleCrearVotacion}>Crear</button>
        </div>
      )}

      <hr />
      <h3>Historial</h3>

      {votaciones.length === 0 && <p>No hay votaciones.</p>}

      {votaciones.map((v) => (
        <div key={v.id}>
          <p>{v.fecha}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminVoting;
