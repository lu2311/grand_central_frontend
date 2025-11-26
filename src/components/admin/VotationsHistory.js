import { useEffect, useState } from "react";
import {
  apiGetVotaciones,
  apiGetVotacionDelDia,
  apiCrearVotacion,
} from "../../utils/VotationsService";

function VotationsHistory() {
  const [votaciones, setVotaciones] = useState([]);
  const [votacionHoy, setVotacionHoy] = useState(null);

  async function load() {
    setVotaciones(await apiGetVotaciones());
    setVotacionHoy(await apiGetVotacionDelDia());
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>Historial de Votaciones</h2>

      {votacionHoy && (
        <>
          <h3>Hoy</h3>
          <div>
            <strong>Entradas:</strong>
            {votacionHoy.entradas?.join(", ")}
          </div>
          <div>
            <strong>Fondos:</strong>
            {votacionHoy.fondos?.join(", ")}
          </div>
        </>
      )}

      <hr />
      <h3>Pasadas</h3>
      {votaciones.length === 0 && <p>No hay votaciones.</p>}

      {votaciones.map((v) => (
        <div key={v.id}>
          <strong>{v.fecha}</strong>
        </div>
      ))}
    </div>
  );
}

export default VotationsHistory;
