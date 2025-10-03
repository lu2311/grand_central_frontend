import { useState, useEffect } from "react";

function Menu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
 
    const menuDelDia = {
      fecha: "02/08",
      precio: 6.0,
      entradas: ["Caldo de Pollo", "Yuquitas con Tártara"],
      fondos: ["Ají de Gallina", "Pollo a la Mostaza"],
    };

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
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este plato del menú?")) {
      const updated = menu.filter((m) => m.id !== id);
      setMenu(updated);
    }
  };

  const handleEdit = (id) => {
    alert(`Editar ítem de menú con id: ${id}`);
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
                  No hay elementos en el menú
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
