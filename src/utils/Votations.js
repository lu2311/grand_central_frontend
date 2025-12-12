import api from "./Api";

// ADMIN – Listar votaciones históricas
export async function fetchVotaciones() {
  const res = await api.get("/votaciones");
  return res.data;
}

// ADMIN – Crear votación del día
export async function crearVotacionBackend(entradas, fondos) {
  const body = { entradas, fondos };
  const res = await api.post("/votaciones", body);
  return res.data;
}

// ADMIN – Eliminar votación del día
export async function eliminarVotacion() {
  const res = await api.delete("/votaciones");
  return res.data;
}

// USUARIO – Obtener opciones del día
export async function fetchOpcionesHoy() {
  const res = await api.get("/votaciones/opciones");
  return res.data;
}

// USUARIO – Registrar un voto
export async function registrarVotoBackend(entradaId, fondoId) {
  const body = { entradaId, fondoId };
  const res = await api.post("/votaciones/votar", body);
  return res.data;
}