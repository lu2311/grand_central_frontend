import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

function Platos() {
  const [platos, setPlatos] = useState([]);
  const [formData, setFormData] = useState({ nombre: "", precio: "", imagen: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  /* -------- Lógica LocalStorage -------- */
  useEffect(() => {
    const data = localStorage.getItem("platos");
    try {
      if (data) {
        setPlatos(JSON.parse(data));
      } else {
        setPlatos([]);
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: ("Error al leer platos del localStorage:", e)
      });
      setPlatos([]);
    }
  }, []);

  const guardarPlatos = (nuevosPlatos) => {
    setPlatos(nuevosPlatos);
    localStorage.setItem("platos", JSON.stringify(nuevosPlatos));
  };

  const onAgregar = (plato) => {
    const nuevosPlatos = [...platos, { ...plato, id: Date.now(), precio: Number(plato.precio) }];
    guardarPlatos(nuevosPlatos);
  };

  const onActualizar = (id, platoActualizado) => {
    const nuevosPlatos = platos.map((p) =>
      p.id === id ? { ...p, ...platoActualizado, precio: Number(platoActualizado.precio) } : p
    );
    guardarPlatos(nuevosPlatos);
  };

  const onEliminar = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este plato?")) {
      const nuevosPlatos = platos.filter((p) => p.id !== id);
      guardarPlatos(nuevosPlatos);
    }
  };

  /* -------- Lógica Formulario -------- */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!formData.nombre || !formData.precio || !formData.imagen) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios"
      });
      return;
    }

    if (editId) {
      onActualizar(editId, formData);
      setEditId(null);
    } else {
      onAgregar(formData);
    }

    setFormData({ nombre: "", precio: "", imagen: "" });
  };

  const handleEdit = (plato) => {
    setEditId(plato.id);
    setFormData(plato);
  };

  const filteredPlatos = platos.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="admin-subtitulo mb-4">Platos</h2>

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
      {/* -------- Formulario -------- */}
      <div className="mb-4 p-3 border rounded bg-light shadow-sm">
        <h3 className="mb-3">{editId ? "Editar Plato" : "Agregar Nuevo Plato"}</h3>
        <div className="row g-2">
          <div className="col-md">
            <input
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md">
            <input
              type="number"
              step="0.01"
              name="precio"
              placeholder="Precio"
              value={formData.precio}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md">
            <input
              name="imagen"
              placeholder="URL Imagen"
              value={formData.imagen}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-auto">
            <button onClick={handleSave} className="btn btn-primary">
              {editId ? "Actualizar" : "Agregar"}
            </button>
          </div>
        </div>
      </div>

      {/* -------- Tabla -------- */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered shadow-sm align-middle">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Imagen</th>
              <th>Precio (S/.)</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlatos.length > 0 ? (
              filteredPlatos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>
                    <img
                      src={p.imagen}
                      alt={p.nombre}
                      width="60"
                      className="rounded shadow-sm"
                    />
                  </td>
                  <td>{Number(p.precio).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(p)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onEliminar(p.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No hay platos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Platos;