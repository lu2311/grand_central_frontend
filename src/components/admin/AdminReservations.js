import { useState, useEffect } from "react";
import { getUsers } from "../../utils/Users";

function Reservas() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const data = getUsers();
    const reservasData = data
      .filter((u) => u.platoReservado && u.platoReservado.nombre)
      .map((u, index) => ({
        id: index + 1,
        nombre: u.platoReservado.nombre,
        precio:u.platoReservado.precio,        
        cantidad: 1,
      }));
    setReservas(reservasData);
  }, []);

  return (
    <div>
      <h2 className="admin-subtitulo mb-4">Reservas</h2>

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
            {reservas.length > 0 ? (
              reservas.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.nombre}</td>
                  <td>{r.precio}</td>
                  <td>{r.cantidad}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No hay reservas registradas
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
