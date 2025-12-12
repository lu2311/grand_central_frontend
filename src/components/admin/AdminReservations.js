import { useState, useEffect } from "react";
import API from "../../utils/Api";

function Reservas() {
  const [search, setSearch] = useState("");
  const [reservas, setReservas] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState("hoy"); // Filtro por hoy por defecto
  const [fechaSeleccionada, setFechaSeleccionada] = useState(""); // Para seleccionar una fecha específica

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        // Traemos todas las reservas
        const res = await API.get("/reservas");
        const reservas = res.data;

        // Filtramos las reservas según la fecha (hoy por defecto)
        const fechaHoy = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD
        let reservasFiltradas = [];

        if (fechaFiltro === "hoy") {
          reservasFiltradas = reservas.filter(
            (r) => r.fechaReserva === fechaHoy
          );
        } else if (fechaFiltro === "todas") {
          reservasFiltradas = reservas;
        } else if (fechaFiltro === "especifica" && fechaSeleccionada) {
          reservasFiltradas = reservas.filter(
            (r) => r.fechaReserva === fechaSeleccionada
          );
        } else {
          reservasFiltradas = reservas;
        }

        // Procesamos las reservas para mostrar información del plato o menú
        const reservasConDetalles = reservasFiltradas.map((r) => {
          const menu = r.menu ? { ...r.menu, entrada: r.entradaElegida, fondo: r.fondoElegido } : null;
          return {
            ...r,
            menu, // Incluimos el menú si existe
            plato: r.plato ? { ...r.plato } : null,
          };
        });

        setReservas(reservasConDetalles);
      } catch (error) {
        console.error("Error al cargar reservas:", error);
      }
    };

    fetchReservas();
  }, [fechaFiltro, fechaSeleccionada]); // Refrescar cuando cambie el filtro de fecha o la fecha seleccionada

  // 🔹 Filtrado de nombre
  const filtered = reservas.filter((r) =>
    (r.plato ? r.plato.nombre : `${r.menu?.entrada} / ${r.menu?.fondo}`).toLowerCase().includes(search.toLowerCase())
  );

  // Dividir las reservas en platos y menús
  const platosReservados = filtered.filter(r => r.plato);
  const menusReservados = filtered.filter(r => r.menu);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-"); // Dividir la fecha en año, mes y día
    return `${day}/${month}/${year}`; // Reorganizar en formato dd/MM/yyyy
  };

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
          placeholder="Buscar por nombre del plato o menú"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* -------- Filtro de fechas -------- */}
      <div className="mb-3">
        <label htmlFor="filtroFecha" className="form-label">Filtrar por fecha:</label>
        <select
          id="filtroFecha"
          className="form-select"
          value={fechaFiltro}
          onChange={(e) => setFechaFiltro(e.target.value)}
        >
          <option value="hoy">Hoy</option>
          <option value="todas">Todas</option>
          <option value="especifica">Fecha específica</option>
        </select>

        {fechaFiltro === "especifica" && (
          <input
            type="date"
            className="form-control mt-2"
            value={fechaSeleccionada}
            onChange={(e) => setFechaSeleccionada(e.target.value)}
          />
        )}
      </div>

      {/* -------- Tabla de Platos Reservados y Menús Reservados - Mostrar una al lado de la otra -------- */}
      <div className="table-container">
        {/* Tabla de Platos Reservados */}
        <div className="table-responsive dishes-table">
          <h4>Platos Reservados</h4>
          <table className="table table-striped table-bordered shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Plato</th>
                <th>Precio</th>
                <th>Fecha de Reserva</th>
              </tr>
            </thead>
            <tbody>
              {platosReservados.length > 0 ? (
                platosReservados.map((r, index) => (
                  <tr key={r.id || index}>
                    <td>{index + 1}</td>
                    <td>{r.plato.nombre}</td>
                    <td>{r.plato.precio?.toFixed(2)}</td>
                    <td>{formatDate(r.fechaReserva)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No se encontraron reservas de platos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Tabla de Menús Reservados */}
        <div className="table-responsive menu-table">
          <h4>Menús Reservados</h4>
          <table className="table table-striped table-bordered shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Menú</th>
                <th>Entrada</th>
                <th>Fondo</th>
                <th>Precio</th>
                <th>Fecha de Reserva</th>
              </tr>
            </thead>
            <tbody>
              {menusReservados.length > 0 ? (
                menusReservados.map((r, index) => (
                  <tr key={r.id || index}>
                    <td>{index + 1}</td>
                    <td>{`Menú del día (ID: ${r.menu.id})`}</td>
                    <td>{r.menu.entrada}</td>
                    <td>{r.menu.fondo}</td>
                    <td>{r.menu.precio?.toFixed(2)}</td>
                    <td>{formatDate(r.fechaReserva)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No se encontraron reservas de menús
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reservas;