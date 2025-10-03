import { useState, useEffect } from "react";
import { getUsers } from "../../utils/Users";

function Reservas() {
  const [search, setSearch] = useState("");
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const data = getUsers();

    // Usamos un Map para agrupar más eficientemente
    const mapa = new Map();

    data
      .filter((u) => u.platoReservado && (u.platoReservado.nombre || u.platoReservado.fondo))
      .forEach((u) => {
        const nombrePlato = (u.platoReservado.nombre || u.platoReservado.fondo || "").trim();
        const precio = Number(u.platoReservado.precio) || 0;

        if (mapa.has(nombrePlato)) {
          // Si ya existe, incrementamos la cantidad
          const existente = mapa.get(nombrePlato);
          existente.cantidad += 1;
        } else {
          // Si no existe, creamos una nueva entrada
          mapa.set(nombrePlato, {
            id: mapa.size + 1, // genera ID secuencial
            nombre: nombrePlato,
            precio: precio,
            cantidad: 1,
          });
        }
      });

    setReservas(Array.from(mapa.values()));
  }, []);
  
  const filtered = reservas.filter(
    (u) =>
      u.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="admin-subtitulo mb-4">Reservas</h2>

      {/* -------- Buscador -------- */}
      <div className="input-group mb-3">
        <span className="btn btn-primary">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre"
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
              <th>Precio</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((r, index) => (
                <tr key={r.id}>
                  <td>{index + 1}</td>
                  <td>{r.nombre}</td>
                  <td>{r.precio.toFixed(2)}</td>
                  <td>{r.cantidad}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No se encontraron reservas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reservas;