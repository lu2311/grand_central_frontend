import { useState, useEffect } from "react";
import { fetchVotaciones, fetchOpcionesHoy } from "../../utils/Votations";
import VotationsHistory from "./VotationsHistory";
import VotationsResults from "./VotationsResults";
import Swal from "sweetalert2";

function AdminVoting() {
  const [activeTab, setActiveTab] = useState("historial");
  const [votaciones, setVotaciones] = useState([]);
  const [votacionHoy, setVotacionHoy] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const lista = await fetchVotaciones();
        setVotaciones(lista);

        const opcionesHoy = await fetchOpcionesHoy().catch(() => null);
        setVotacionHoy(opcionesHoy);
      } catch (error) {
        Swal.fire("Error", error.friendlyMessage || "No se pudieron cargar las votaciones", "error");
      }
    };

    cargar();
  }, []);

  return (
    <div>
      <h2 className="admin-subtitulo mb-4">Administrar Votaciones</h2>

      {/* Tabs */}
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
        <VotationsHistory votaciones={votaciones} setVotaciones={setVotaciones} setVotacionHoy={setVotacionHoy} />
      )}
      {activeTab === "resultados" && votacionHoy && <VotationsResults
        votacionHoy={{
          fecha: votacionHoy.fecha,
          entradas: votacionHoy.filter((o) => o.tipo === "ENTRADA"),
          fondos: votacionHoy.filter((o) => o.tipo === "FONDO"),
        }}
      />}
    </div>
  );
}

export default AdminVoting;