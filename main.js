/**
 * Simulador de Autómata Finito Determinista (AFD) - Solo graficación
 *
 * Muestra nodos, transiciones, estado inicial y finales.
 * Permite cambiar de estado mediante botones en el panel de acciones.
 */

// -----------------------------
// Definición de Estados y Transiciones
// -----------------------------
/** Estado inicial del AFD */
const initialState = "inicio";
/** Estado activo actual */
let currentState = initialState;

/** Coordenadas (x, y) de cada estado para el diagrama SVG */
const afdStates = {
  inicio: { x: 100, y: 350 },
  elaborando_propuesta: { x: 500, y: 350 },
  enviando_propuesta: { x: 100, y: 100 },
  revisando_tutor: { x: 500, y: 100 },
  revisando_comité: { x: 850, y: 100 },
  asignando_jurado: { x: 1170, y: 100 },
  revisando_jurado: { x: 1170, y: 350 },
  generando_carta: { x: 1170, y: 570 },
  cancelando_propuesta: { x: 500, y: 570 },
};

/** Lista de transiciones con actor, acción y descripción */
const afdTransitions = [
  {
    from: "inicio",
    to: "elaborando_propuesta",
    actor: "estudiante",
    descripcion: "[El estudiante decide iniciar el proceso]",
  },
  {
    from: "elaborando_propuesta",
    to: "enviando_propuesta",
    actor: "estudiante",
    descripcion: "[El estudiante envía la propuesta]",
  },
  {
    from: "elaborando_propuesta",
    to: "cancelando_propuesta",
    actor: "estudiante",
    descripcion: "[El estudiante cancela la propuesta]",
  },
  {
    from: "enviando_propuesta",
    to: "revisando_tutor",
    actor: "tutor",
    descripcion: "[El tutor recibe la propuesta para revisión]",
  },
  {
    from: "revisando_tutor",
    to: "revisando_comité",
    actor: "tutor",
    descripcion: "[El tutor aprueba la propuesta]",
  },
  {
    from: "revisando_tutor",
    to: "elaborando_propuesta",
    actor: "tutor",
    descripcion: "[El tutor rechaza y pide reformular]",
  },
  {
    from: "revisando_comite",
    to: "asignando_jurado",
    actor: "comité",
    descripcion: "[El comité asigna jurado]",
  },
  {
    from: "asignando_jurado",
    to: "revisando_jurado",
    actor: "comité",
    descripcion: "[El jurado es asignado y recibe la propuesta]",
  },
  {
    from: "revisando_jurado",
    to: "generando_carta",
    actor: "jurado",
    descripcion: "[El jurado aprueba la propuesta final]",
  },
  {
    from: "revisando_jurado",
    to: "elaborando_propuesta",
    actor: "jurado",
    descripcion: "[El jurado rechaza y solicita reformulación]",
  },
];

/** Nombres de los estados finales para doble círculo */
const finalStates = [
  "flujo_terminado",
  "cancelando_propuesta",
  "generando_carta",
];

// -----------------------------
// Variables y Configuración de SVG
// -----------------------------
const NODE_RADIUS = 75;
const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * Dibuja el diagrama del AFD en el elemento SVG.
 * @param {string} activeState - Estado actualmente activo.
 */
function drawAFD(activeState) {
  const svg = document.getElementById("afdSvg");
  svg.innerHTML = "";

  // Definición del marcador de flecha
  const defs = document.createElementNS(SVG_NS, "defs");
  defs.innerHTML = `
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
    </marker>`;
  svg.appendChild(defs);

  // Dibujar transiciones con flechas punteadas
  afdTransitions.forEach(({ from, to, actor, descripcion }) => {
    const start = afdStates[from];
    const end = afdStates[to];
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    const startX = start.x + NODE_RADIUS * Math.cos(angle);
    const startY = start.y + NODE_RADIUS * Math.sin(angle);
    const endX = end.x - NODE_RADIUS * Math.cos(angle);
    const endY = end.y - NODE_RADIUS * Math.sin(angle);

    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", `M${startX},${startY} L${endX},${endY}`);
    path.setAttribute("stroke", "#2c3e50");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-dasharray", "5,5");
    path.setAttribute("marker-end", "url(#arrowhead)");
    svg.appendChild(path);

    // Dibujar etiqueta de transición
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    const label = document.createElementNS(SVG_NS, "text");
    label.setAttribute("x", midX);
    label.setAttribute("y", midY - 10);
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("font-size", "12px");
    label.setAttribute("fill", "#555");
    label.textContent = `${descripcion}`;
    svg.appendChild(label);
  });

  // Dibujar nodos
  Object.entries(afdStates).forEach(([name, { x, y }]) => {
    // Círculo principal
    const circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", NODE_RADIUS);
    circle.setAttribute("fill", name === activeState ? "#dfe6e9" : "#ffffff");
    circle.setAttribute("stroke", "#333");
    circle.setAttribute("stroke-width", "2");
    svg.appendChild(circle);

    // Segundo círculo si es estado final
    if (finalStates.includes(name)) {
      const outer = document.createElementNS(SVG_NS, "circle");
      outer.setAttribute("cx", x);
      outer.setAttribute("cy", y);
      outer.setAttribute("r", NODE_RADIUS + 6);
      outer.setAttribute("fill", "none");
      outer.setAttribute("stroke", "#333");
      outer.setAttribute("stroke-width", "2");
      svg.appendChild(outer);
    }

    // Etiqueta del estado
    const label = document.createElementNS(SVG_NS, "text");
    label.setAttribute("x", x);
    label.setAttribute("y", y + 5);
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("font-size", "13px");
    label.textContent = name;
    svg.appendChild(label);
  });

  // Flecha que indica el estado inicial
  const startPointX = afdStates[initialState].x - NODE_RADIUS * 2;
  const startPointY = afdStates[initialState].y;
  const arrow = document.createElementNS(SVG_NS, "path");
  arrow.setAttribute(
    "d",
    `M${startPointX},${startPointY} L${
      afdStates[initialState].x - NODE_RADIUS
    },${startPointY}`
  );
  arrow.setAttribute("stroke", "#000");
  arrow.setAttribute("stroke-width", "2");
  arrow.setAttribute("fill", "none");
  arrow.setAttribute("marker-end", "url(#arrowhead)");
  svg.appendChild(arrow);
}

// -----------------------------
// Renderizado de Interfaz y Panel de Acciones
// -----------------------------

/**
 * Actualiza la interfaz completa: diagrama, estado actual y lista de transiciones.
 */
function updateInterface() {
  document.getElementById("currentState").textContent = currentState;
  drawAFD(currentState);
  renderActionsPanel();
  renderTransitionList();
}

/**
 * Muestra el panel de botones con las acciones disponibles para el estado actual.
 */
function renderActionsPanel() {
  const panel = document.getElementById("actionsPanel");
  panel.innerHTML = "";

  const available = afdTransitions.filter((t) => t.from === currentState);
  if (!available.length) return;

  // Se asume que todas las transiciones comparten el mismo actor
  const actor = available[0].actor || "sistema";
  const title = document.createElement("h2");
  title.textContent = actor.charAt(0).toUpperCase() + actor.slice(1);
  panel.appendChild(title);

  available.forEach((transition) => {
    const btn = document.createElement("button");
    btn.textContent = transition.descripcion;
    btn.addEventListener("click", () => {
      currentState = transition.to;
      updateInterface();
      addToHistory(`(${transition.actor}) ${transition.descripcion}`);
    });
    panel.appendChild(btn);
  });
}

/**
 * Rellena la lista de transiciones posibles desde el estado actual.
 */
function renderTransitionList() {
  const list = document.getElementById("transitionList");
  list.innerHTML = "";

  const available = afdTransitions.filter((t) => t.from === currentState);
  if (!available.length) {
    const li = document.createElement("li");
    li.textContent = "Sin transiciones posibles (estado final)";
    list.appendChild(li);
    return;
  }

  available.forEach(({ to, descripcion }) => {
    const li = document.createElement("li");
    li.textContent = `→ ${to} (${descripcion})`;
    list.appendChild(li);
  });
}

// -----------------------------
// Historial de Acciones
// -----------------------------

/**
 * Añade una entrada al historial de transiciones ejecutadas.
 * @param {string} entry - Texto de la transición realizada.
 */
function addToHistory(entry) {
  const list = document.getElementById("historyList");
  const li = document.createElement("li");
  li.textContent = entry;
  list.appendChild(li);
}

// -----------------------------
// Inicialización
// -----------------------------
window.addEventListener("DOMContentLoaded", updateInterface);
