import { useState, useEffect } from "react";
import { getUsers } from "../../utils/Users";

function Votaciones() {
  const [votaciones, setVotaciones] = useState([]);

  useEffect(() => {
    const data = getUsers();
    const today = new Date().toLocaleDateString("es-PE");

    const votosData = data
      .filter((u) => u.votacion && (u.votacion.entrada || u.votacion.fondo))
      .map((u, index) => ({
        id: index + 1,
        nombre: u.nombre,
        voto: `${u.votacion.entrada || "N/A"} / ${u.votacion.fondo || "N/A"}`,
        fecha: today,
      }));

    setVotaciones(votosData);
  }, []);

  return (
    <div>
      <h2 className="admin-subtitulo mb-4">Votaciones</h2>

      {/* Tabla */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Voto</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {votaciones.length > 0 ? (
              votaciones.map((v) => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>{v.nombre}</td>
                  <td>{v.voto}</td>
                  <td>{v.fecha}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No hay votaciones registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Votaciones;
