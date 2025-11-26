import { useState, useEffect } from "react";
import { getVotacionesHistorial, getVotacionDelDia } from "../../utils/Votations";
import VotationsHistory from "./VotationsHistory";
import VotationsResults from "./VotationsResults";

function AdminVoting() {
  const [activeTab, setActiveTab] = useState("historial");
  const [votaciones, setVotaciones] = useState([]);
  const [votacionHoy, setVotacionHoy] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      const historial = await getVotacionesHistorial();
      const hoy = await getVotacionDelDia();

      setVotaciones(historial);
      setVotacionHoy(hoy);
    };

    cargar();
  }, []);

  return (
    <div>
      <h2 className="admin-subtitulo mb-4">Administrar Votaciones</h2>

      <div className="d-flex mb-3">
        <button
          className={`flex-fill btn ${activeTab === "historial" ? "btn-dark" : "btn-outline-dark"}`}
          onClick={() => setActiveTab("historial")}
        >
          Historial
        </button>
        <button
          className={`flex-fill btn ${activeTab === "resultados" ? "btn-dark" : "btn-outline-dark"}`}
          onClick={() => setActiveTab("resultados")}
        >
          Resultados
        </button>
      </div>

      {activeTab === "historial" && (
        <VotationsHistory
          votaciones={votaciones}
          setVotaciones={setVotaciones}
          setVotacionHoy={setVotacionHoy}
        />
      )}

      {activeTab === "resultados" && votacionHoy && (
        <VotationsResults votacionHoy={votacionHoy} />
      )}
    </div>
  );
}

export default AdminVoting;
