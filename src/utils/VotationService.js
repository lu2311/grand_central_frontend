import api from "./Api";

export async function apiGetVotaciones() {
  const res = await api.get("/votaciones");
  return res.data;
}

export async function apiGetVotacionDelDia() {
  const res = await api.get("/votaciones/hoy");
  return res.data;
}

export async function apiCrearVotacion(entradas, fondos) {
  const res = await api.post("/votaciones", { entradas, fondos });
  return res.data;
}

export async function apiRegistrarVoto(entradaId, fondoId) {
  const res = await api.post("/votaciones/votar", {
    entradaId,
    fondoId,
  });

  return res.data;
}
