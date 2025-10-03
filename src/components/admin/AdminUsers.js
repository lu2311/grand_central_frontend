import { useState, useEffect } from "react";
import { getUsers } from "../../utils/Users";

function Usuarios() {
  const [search, setSearch] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const data = getUsers();
    setUsuarios(data);
  }, []);

  const filtered = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(search.toLowerCase()) ||
      u.correo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="admin-subtitulo mb-4">Usuarios</h2>

      {/* Buscador */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por nombre o correo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Tabla */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Reserva</th>
              <th>Voto</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((u, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{u.nombre}</td>
                  <td>{u.correo}</td>
                  <td>{u.platoReservado?.nombre || u.platoReservado?.fondo || "N/A"}</td>
                  <td>{u.votacion?.entrada || "N/A"} y {u.votacion?.fondo || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No se encontraron usuarios
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Usuarios;
