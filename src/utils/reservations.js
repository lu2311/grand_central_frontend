import { updateUser } from "./Users";

// Obtener usuario activo desde localStorage
export function getUsuarioActual() {
  const usuario = localStorage.getItem("usuarioActual");
  return usuario ? JSON.parse(usuario) : null;
}

// Guardar usuario en localStorage
export function setUsuarioActual(usuario) {
  localStorage.setItem("usuarioActual", JSON.stringify(usuario));
  updateUser(usuario);
}

// Cancelar la reserva de plato
export function cancelarReserva() {
  const usuario = getUsuarioActual();
  if (!usuario) return;

  usuario.platoReservado = null;
  setUsuarioActual(usuario);
}

// Reservar un plato
export function reservarPlato(plato) {
  const usuario = getUsuarioActual();
  if (!usuario) {
    alert("Debes iniciar sesión para reservar un plato");
    return;
  }

  if (usuario.platoReservado) {
    alert("Ya tienes un plato reservado. Solo puedes elegir uno.");
    return;
  }

  usuario.platoReservado = plato;
  setUsuarioActual(usuario);
  alert(`Has reservado: ${plato.nombre || plato.fondo || plato}`);
}

// Guardar votación del usuario
export function guardarVotacion(valor) {
  const usuario = getUsuarioActual();
  if (!usuario) {
    alert("Debes iniciar sesión para votar");
    return;
  }

  usuario.votacion = valor;
  setUsuarioActual(usuario);
}
