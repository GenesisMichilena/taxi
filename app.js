// app.js - guarda reservas en Realtime Database y las muestra
const DB_BASE = "https://taxisafe-35616-default-rtdb.firebaseio.com";
const RESERVAS_URL = `${DB_BASE}/reservas.json`; // endpoint .json para push

// Función para POST (crear nueva reserva)
async function guardarReserva(reserva) {
  try {
    const resp = await fetch(RESERVAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reserva)
    });
    const data = await resp.json();
    console.log("Reserva guardada con ID:", data.name);
    return data.name; // id generado por firebase
  } catch (err) {
    console.error("Error guardando reserva:", err);
    throw err;
  }
}

// Función para GET (obtener todas las reservas)
async function obtenerReservas() {
  try {
    const resp = await fetch(RESERVAS_URL, { method: "GET" });
    const data = await resp.json();
    return data; // objeto con IDs => objetos
  } catch (err) {
    console.error("Error obteniendo reservas:", err);
    return null;
  }
}

// Mostrar reservas en el DOM (contenedor: #reservationsList)
function mostrarReservasEnDOM(reservasObj) {
  const container = document.getElementById("reservationsList");
  container.innerHTML = ""; // limpiar

  if (!reservasObj) {
    container.innerHTML = `<div class="text-center py-8"><p class="text-gray-500">No hay reservas.</p></div>`;
    return;
  }

  // convertir a array para mantener orden
  const entries = Object.entries(reservasObj);
  entries.reverse(); // opcional: mostrar las más recientes primero

  for (const [id, r] of entries) {
    const card = document.createElement("div");
    card.className = "p-6 bg-white border border-gray-300 rounded-lg shadow-lg";
    card.innerHTML = `
      <h3 class="text-xl font-bold text-yellow-600 mb-3">Reserva</h3>
      <p><strong>Origen:</strong> ${escapeHtml(r.origin || "")}</p>
      <p><strong>Destino:</strong> ${escapeHtml(r.destination || "")}</p>
      <p><strong>Fecha y Hora:</strong> ${escapeHtml(r.datetime || "")}</p>
      <p><strong>Pasajeros:</strong> ${escapeHtml(r.passengers || "")}</p>
      <p><strong>Tipo:</strong> ${escapeHtml(r.serviceType || "")}</p>
      <p class="text-sm text-gray-400 mt-2">ID: ${id}</p>
    `;
    container.appendChild(card);
  }
}

// Helper: escapar HTML para seguridad mínima
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// --- Conectar formulario ---
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservationForm");
  const loadBtn = document.getElementById("loadReservations");

  // submit -> guardar reserva
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const reserva = {
      origin: document.getElementById("origin").value.trim(),
      destination: document.getElementById("destination").value.trim(),
      datetime: document.getElementById("datetime").value,
      passengers: document.getElementById("passengers").value,
      serviceType: document.getElementById("serviceType").value,
      fechaGuardado: new Date().toISOString()
    };

    // validar mínimo
    if (!reserva.origin || !reserva.destination || !reserva.datetime) {
      alert("Por favor completa origen, destino y fecha/hora.");
      return;
    }

    try {
      await guardarReserva(reserva);
      alert("Reserva guardada correctamente ✔");
      form.reset();
      // opcional: recargar la lista automáticamente
      await cargarYMostrarReservas();
    } catch {
      alert("No fue posible guardar la reserva. Revisa la consola.");
    }
  });

  // botón mostrar reservas
  loadBtn.addEventListener("click", async () => {
    await cargarYMostrarReservas();
  });

  // cargar automáticamente al inicio
  cargarYMostrarReservas();
});

// función que obtiene y muestra
async function cargarYMostrarReservas() {
  const datos = await obtenerReservas();
  mostrarReservasEnDOM(datos);
}
