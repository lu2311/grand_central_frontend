import axios from "axios";

const api = axios.create({
  baseURL: "https://grand-central-backend.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: agrega token JWT si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor global para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let friendlyMessage = "Error en la solicitud";

    if (error.response?.data) {
      const { message, details } = error.response.data;

      // Mensaje general si existe
      if (message) friendlyMessage = message;

      // Si hay detalles, formateamos bien
      if (details) {
        if (typeof details === "string") {
          friendlyMessage += `: ${details}`;
        } else if (typeof details === "object") {
          // Ejemplo: { precio: "El precio no puede exceder 30" }
          const list = Object.values(details).join("\n");
          friendlyMessage += `:\n${list}`;
        }
      }
    }

    // Agregar mensaje amigable al error
    error.friendlyMessage = friendlyMessage;

    return Promise.reject(error);
  }
);

export default api;