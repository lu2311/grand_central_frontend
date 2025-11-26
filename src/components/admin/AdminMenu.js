import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../utils/Api";

function Menu() {
  const [menu, setMenu] = useState([]);

  // Obtener la fecha actual en formato YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await api.get(`/menus/fecha/${today}`);

        const menuDelDia = res.data;

        // Transformar entradas y fondos en lista legible
        const data = [
          ...menuDelDia.entradas.map((nombre, index) => ({
            id: index + 1,
            nombre,
            tipo: "Entrada",
            precio: menuDelDia.precio,
          })),
          ...menuDelDia.fondos.map((nombre, index) => ({
            id: menuDelDia.entradas.length + index + 1,
            nombre,
            tipo: "Fondo",
            precio: menuDelDia.precio,
          })),
        ];

        setMenu(data);
      } catch (error) {
        console.error("Error al obtener menú del día:", error);
        setMenu([]); // si no hay menú
      }
    };

    fetchMenu();
  }, []);

  const handleDelete = () => {
    Swal.fire({
      icon: "warning",
      title: "No se puede eliminar ítems",
      text: "El backend no permite eliminar entradas/fondos individualmente. Solo editar todo el menú.",
    });
  };

  const handleEdit = () => {
    Swal.fire({
      icon: "info",
      title: "Edición no disponible",
      text: "El backend solo permite reemplazar el menú completo, no editar ítems por separado.",
    });
  };

  return (
    <div>
      <h2 className="admin-subtitulo mb-4">Menú del Día</h2>

      <div className="table-responsive">
        <table className="table table-striped table-bordered shadow-sm align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Precio (S/.)</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {menu.length > 0 ? (
              menu.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>{m.nombre}</td>
                  <td>{m.tipo}</td>
                  <td>{m.precio.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(m.id)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(m.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No hay menú creado para hoy
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Menu;
