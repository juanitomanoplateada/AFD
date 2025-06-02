# 📘 Simulación AFD de Propuesta de Grado

Este proyecto es una simulación interactiva y visual de un **Autómata Finito Determinista (AFD)**, utilizada para representar el flujo de estados que atraviesa un estudiante durante el proceso de presentación de una propuesta de grado. El sistema fue diseñado como una herramienta didáctica para comprender procesos académicos de manera visual.

🔗 **Versión desplegada en línea:** [https://afd-eta-six.vercel.app/](https://afd-eta-six.vercel.app/)

---

## 🧩 Funcionalidades Principales

- Visualización del autómata con nodos y transiciones animadas mediante SVG.
- Estados inicial, intermedios y finales diferenciados visualmente.
- Panel de acciones que muestra dinámicamente las opciones disponibles en cada estado.
- Registro histórico de las transiciones realizadas por el usuario.
- Completamente responsive y compatible con navegadores modernos.

---

## 🗂️ Estructura del Proyecto

- **`index.html`**: Define la estructura HTML del simulador, incluyendo encabezados, contenedores de paneles, y el SVG donde se renderiza el AFD.
- **`style.css`**: Contiene los estilos visuales, organización del diseño en columnas, esquema de colores, y animaciones para nodos activos.
- **`main.js`**: Maneja la lógica funcional, incluyendo el dibujo del AFD, gestión de transiciones, renderizado del panel de acciones, y actualización de interfaz.

---

## 🧠 Estados del AFD

Cada nodo representa un estado del proceso de propuesta de grado, con posiciones predefinidas para su ubicación en pantalla.

### Lista de estados:

- `inicio`: Punto de partida del proceso.
- `elaborando_propuesta`: El estudiante redacta su propuesta.
- `enviando_propuesta`: El estudiante envía la propuesta al tutor.
- `revisando_tutor`: El tutor evalúa la propuesta.
- `revisando_comite`: El comité académico analiza la propuesta.
- `asignando_jurado`: Se asigna un jurado evaluador.
- `revisando_jurado`: El jurado revisa la propuesta.
- `generando_carta`: Se emite la carta de aprobación.
- `cancelando_propuesta`: El proceso es cancelado por el estudiante.

### Estados Finales:

- `cancelando_propuesta`
- `generando_carta`

Estos estados se representan con un doble círculo.

---

## 🔁 Transiciones

Las transiciones están definidas por:

- `from`: Estado de origen.
- `to`: Estado destino.
- `actor`: Quien realiza la acción (estudiante, tutor, comité, jurado).
- `descripcion`: Acción específica que provoca el cambio.

Ejemplo:

```json
{
  "from": "revisando_jurado",
  "to": "generando_carta",
  "actor": "jurado",
  "descripcion": "El jurado aprueba la propuesta final"
}
```

Las transiciones se dibujan como flechas punteadas, cada una etiquetada con su descripción.

---

## ▶️ Uso Local

1. Clona este repositorio o descarga los archivos.
2. Abre `index.html` en cualquier navegador moderno.
3. Explora los estados disponibles y ejecuta transiciones mediante el panel de acciones.

---

## 🌐 Despliegue en Línea

El proyecto se encuentra disponible públicamente en:

🔗 **https://afd-eta-six.vercel.app/**

Puedes abrirlo directamente sin necesidad de instalación.

---

## 📄 Licencia

Este proyecto está disponible para fines académicos y educativos. Puedes modificarlo y reutilizarlo libremente con atribución adecuada.

---

## 👨‍💻 Autoría

Desarrollado como parte de una propuesta de grado para ilustrar procesos administrativos mediante simulación computacional interactiva.

---
