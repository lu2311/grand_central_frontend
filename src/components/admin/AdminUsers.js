import { useEffect, useState } from "react";
import API from "../../utils/Api";

function Usuarios() {
  const [search, setSearch] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await API.get("/usuarios");
        const usuarios = res.data;

        // Filtramos las reservas para mostrar solo las de hoy
        const fechaHoy = new Date().toISOString().split("T")[0]; // Fecha de hoy en formato yyyy-MM-dd
        
        // Filtramos las reservas de cada usuario
        usuarios.forEach((u) => {
          // Filtrar solo las reservas que son del día de hoy
          u.reservas = u.reservas.filter((r) => r.fechaReserva === fechaHoy);
        });

        setUsuarios(usuarios);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };
    fetchUsuarios();
  }, []);

  // Filtrado por nombre o correo
  const filtered = usuarios.filter(
    (u) =>
      u.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      u.correo?.toLowerCase().includes(search.toLowerCase())
  );

  // Función para mostrar la reserva (nombre del plato o "Menú del día")
  const mostrarReserva = (reserva) => {
    if (reserva.plato) {
      return reserva.plato.nombre; // Si es plato, mostrar el nombre
    } else if (reserva.menu) {
      return "Menú del día"; // Si es menú, mostrar "Menú del día"
    }
    return <span className="badge bg-warning">Sin reserva</span>; // Mostrar etiqueta de advertencia si no hay reserva
  };

  return (
    <div>
      <h2 className="admin-subtitulo mb-4">Usuarios</h2>

      {/* Buscador */}
      <div className="input-group mb-3">
        <span className="btn btn-primary">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre o correo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tabla */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Reserva</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((u, index) => (
                <tr key={u.id || index}>
                  <td>{u.id}</td>
                  <td>{u.nombre}</td>
                  <td>{u.correo}</td>
                  <td>
                    {/* Solo mostrar la reserva si es de hoy */}
                    {u.reservas && u.reservas.length > 0
                      ? u.reservas.map((r, idx) => (
                          <div key={idx}>{mostrarReserva(r)}</div>
                        ))
                      : <span className="badge bg-warning">Sin reserva</span>}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
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