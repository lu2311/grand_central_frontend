import axios from "axios";

const API = "https://grand-central-backend.onrender.com/api/votaciones";

// -----------------------
// Obtener historial completo
// -----------------------
export const getVotacionesHistorial = async () => {
  try {
    const res = await axios.get(API);
    return res.data; // lista de votaciones
  } catch (e) {
    console.error("Error obteniendo historial:", e);
    return [];
  }
};

// -----------------------
// Obtener votación del día
// -----------------------
export const getVotacionDelDia = async () => {
  try {
    const res = await axios.get(`${API}/opciones`);
    const opciones = res.data;

    return {
      fecha: new Date().toLocaleDateString("es-PE"),
      entradas: opciones.filter(o => o.tipo === "ENTRADA"),
      fondos: opciones.filter(o => o.tipo === "FONDO"),
    };

  } catch (error) {
    return null;
  }
};

// -----------------------
// Crear votación del día
// -----------------------
export const crearVotacion = async (entradas, fondos) => {
  try {
    const token = localStorage.getItem("token");

    const body = {
      entradas: entradas.map(e => e.nombre),
      fondos: fondos.map(f => f.nombre)
    };

    const res = await axios.post(API, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data;

  } catch (error) {
    console.error("Error creando votación:", error);
    throw error;
  }
};
