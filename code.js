// Variable global para rastrear si el texto ha sido copiado
let textoCopiado = false;

// Función para encriptar el texto
function encriptarTexto(texto) {
  return texto
    .replace(/e/g, "enter")
    .replace(/i/g, "imes")
    .replace(/a/g, "ai")
    .replace(/o/g, "ober")
    .replace(/u/g, "ufat");
}

// Función para desencriptar el texto
function desencriptarTexto(texto) {
  return texto
    .replace(/enter/g, "e")
    .replace(/imes/g, "i")
    .replace(/ai/g, "a")
    .replace(/ober/g, "o")
    .replace(/ufat/g, "u");
}

function encriptar() {
  const inputText = document.getElementById("text-input").value.trim();
  const outputArea = document.getElementById("text-area-encriptado");
  const tituloMensaje = document.getElementById("mensaje-result");
  const actualText = tituloMensaje.querySelector(".actual-text");
  const hoverText = tituloMensaje.querySelector(".hover-text");
  const parrafoInstruccion = document.getElementById("parrafo-instruccion");
  const imagenMensaje = document.querySelector(".imagen-mensaje");
  const btnCopiar = document.querySelector(".btn-copiar");

  // Si no se encuentra ningún mensaje
  if (!inputText) {
    tituloMensaje.textContent = "Ningún mensaje fue encontrado";
    actualText.textContent = "";
    hoverText.textContent = "";
    outputArea.style.display = "none"; // Asegúrate de ocultar el área de salida
    imagenMensaje.style.display = "block"; // Mostrar la imagen
    parrafoInstruccion.style.display = "block"; // Mostrar el párrafo de instrucción
    btnCopiar.style.display = "none"; // Ocultar el botón Copiar
    return;
  }

  // Si el input contiene caracteres no permitidos
  if (/[^a-z\s]/.test(inputText)) {
    // Mostrar el mensaje de error
    tituloMensaje.classList.add("error");
    actualText.textContent = "Solo se aceptan letras minúsculas y sin acentos";
    actualText.classList.add("error-message");
    actualText.setAttribute("data-text", actualText.textContent);

    // Activar animación y ajustar el contenedor
    const resultadoEncriptado = document.querySelector(
      ".resultado_del_encriptado"
    );
    resultadoEncriptado.classList.add("error-active");

    // Esconder imagen y párrafo
    imagenMensaje.classList.add("hidden");
    parrafoInstruccion.classList.add("hidden");

    // Activar la animación del mensaje de error
    setTimeout(() => {
      actualText.classList.add("active");
    }, 10);

    // Evitar que continúe el proceso
    return;
  } else {
    // Restablecer el estado en caso de entrada válida
    const resultadoEncriptado = document.querySelector(
      ".resultado_del_encriptado"
    );
    resultadoEncriptado.classList.remove("error-active");
    imagenMensaje.classList.remove("hidden");
    parrafoInstruccion.classList.remove("hidden");
    actualText.classList.remove("error-message", "active");
  }

  // Encriptar el texto si es válido
  const textoEncriptado = encriptarTexto(inputText);
  outputArea.value = textoEncriptado;
  outputArea.style.display = "block"; // Mostrar el textarea

  // Ocultar la imagen y los mensajes de instrucción
  imagenMensaje.style.display = "none";
  tituloMensaje.style.display = "none"; // Asegúrate de mostrar el mensaje
  parrafoInstruccion.style.display = "none";

  // Mostrar el botón Copiar
  btnCopiar.style.display = "block";
}

// Función para desencriptar texto
function desencriptar() {
  const inputText = document.getElementById("text-input").value.trim();
  const outputArea = document.getElementById("text-area-encriptado");
  const tituloMensaje = document.getElementById("mensaje-result");
  const parrafoInstruccion = document.getElementById("parrafo-instruccion");
  const imagenMensaje = document.querySelector(".imagen-mensaje");
  const btnCopiar = document.querySelector(".btn-copiar");
  const btnDesencriptar = document.querySelector(".btn_acciones_desencriptar"); // Asegúrate de que esta clase es correcta

  // Verifica si el texto ha sido copiado
  if (!textoCopiado) {
    alert("Primero debes copiar el texto encriptado antes de desencriptar.");
    return;
  }

  if (!inputText) {
    tituloMensaje.textContent = "Ningún mensaje fue encontrado";
    return;
  }

  if (/[^a-z\s]/.test(inputText)) {
    tituloMensaje.textContent =
      "Solo se aceptan letras minúsculas y sin acentos";
    return;
  }

  const textoDesencriptado = desencriptarTexto(inputText);
  outputArea.value = textoDesencriptado;
  outputArea.style.display = "block"; // Mostrar el textarea

  // Ocultar la imagen y los mensajes de instrucción
  imagenMensaje.style.display = "none";
  tituloMensaje.style.display = "none";
  parrafoInstruccion.style.display = "none";

  // Mostrar el botón Copiar
  btnCopiar.style.display = "block";

  /// Deshabilitar el botón Desencriptar después de desencriptar
  btnDesencriptar.disabled = true;

  // Reiniciar el programa después de 30 segundos
  setTimeout(() => {
    reiniciarPrograma();
  }, 15000);
}



// Función para copiar el texto encriptado
function copiarTexto() {
  const outputArea = document.getElementById("text-area-encriptado");
  const inputTextArea = document.getElementById("text-input");
  const btnDesencriptar = document.querySelector(".btn_acciones_desencriptar");

  if (outputArea.value) {
    navigator.clipboard
      .writeText(outputArea.value)
      .then(() => {
        // Actualiza el textarea de entrada con el texto copiado
        inputTextArea.value = outputArea.value;

        // Limpia el textarea de resultado
        outputArea.value = "";
        outputArea.style.display = "none"; // Oculta el textarea

        // Oculta el botón Copiar
        document.querySelector(".btn-copiar").style.display = "none";

        // Mostrar el mensaje inicial y la imagen
        document.getElementById("mensaje-result").textContent =
          "Ningún mensaje fue encontrado";
        document.getElementById("parrafo-instruccion").textContent =
          "Ingresa el texto que deseas encriptar o desencriptar";
        document.querySelector(".imagen-mensaje").style.display = "block";

        // Marcar que el texto ha sido copiado y habilitar el botón Desencriptar
        textoCopiado = true;
        btnDesencriptar.disabled = false;
      })
      .catch((err) => console.error("Error al copiar: ", err));
  }
}

//Efecto Matrix//
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("matrixCanvas");
  const ctx = canvas.getContext("2d");

  // Ajusta el tamaño del canvas al tamaño de la ventana
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Define los caracteres y el tamaño de la fuente
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const fontSize = 20; // Ajusta el tamaño de la fuente para más visibilidad
  const columns = Math.floor(canvas.width / fontSize); // Número de columnas
  const drops = Array(columns).fill(0); // Array para rastrear la posición de cada gota

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0a3871"; // El color primario para las gotas
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((drop, index) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, index * fontSize, drop * fontSize);

      // Reinicia la gota si ha llegado al final del canvas
      if (drop * fontSize > canvas.height && Math.random() > 0.975) {
        drops[index] = 0;
      } else {
        drops[index] += 1;
      }
    });
  }

  const interval = setInterval(draw, 100);

  // Apagar el efecto después de 10 segundos
  setTimeout(() => {
    clearInterval(interval);
    canvas.style.animation = "matrix 1s forwards"; // Aplica la animación de desvanecimiento
    setTimeout(() => {
      canvas.style.display = "none"; // Oculta el canvas después de la animación
    }, 1000); // Debe coincidir con la duración de la animación
  }, 1000000);

  // Ajustar el tamaño del canvas cuando se cambia el tamaño de la ventana
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});


function reiniciarPrograma() {
  location.reload();
}

