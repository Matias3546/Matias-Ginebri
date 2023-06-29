var preguntas = [];
var indicePreguntaActual = 0;
var respuestasIncorrectas = [];

var preguntaTexto = document.getElementById("pregunta-texto");
var opcionesLista = document.getElementById("opciones-lista");
var responderBtn = document.getElementById("responder-btn");
var finalizarBtn = document.getElementById("finalizar-btn");
var reiniciarBtn = document.getElementById("reiniciar-btn");

function cargarPreguntas() {
  fetch("preguntas.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      preguntas = data;
      iniciarJuego();
    })
    .catch(function(error) {
      console.log("Error al cargar las preguntas:", error);
    });
}

function iniciarJuego() {
  mostrarPregunta(indicePreguntaActual);
}

function mostrarPregunta(indice) {
  var pregunta = preguntas[indice];
  preguntaTexto.textContent = pregunta.pregunta;

  opcionesLista.innerHTML = "";

  pregunta.opciones.forEach(function(opcion) {
    var boton = document.createElement("button");
    boton.textContent = opcion;
    boton.addEventListener("click", function() {
      if (!this.classList.contains("selected")) {
        var botones = opcionesLista.querySelectorAll("button");
        botones.forEach(function(b) {
          b.classList.remove("selected");
        });
        this.classList.add("selected");
        responderBtn.disabled = false;
      }
    });
    opcionesLista.appendChild(boton);
  });
}

function responder() {
  var respuestaSeleccionada = opcionesLista.querySelector("button.selected");
  if (respuestaSeleccionada) {
    var respuestaJugador = respuestaSeleccionada.textContent;
    var preguntaActual = preguntas[indicePreguntaActual];
    verificarRespuesta(respuestaJugador, preguntaActual.respuesta);
    indicePreguntaActual++;

    if (indicePreguntaActual < preguntas.length) {
      mostrarPregunta(indicePreguntaActual);
    } else {
      finalizarJuego();
    }
  }
}

function verificarRespuesta(respuestaJugador, respuestaCorrecta) {
  var opciones = opcionesLista.querySelectorAll("button");
  opciones.forEach(function(opcion) {
    opcion.disabled = true;
    if (opcion.textContent === respuestaCorrecta) {
      opcion.classList.add("correcta");
      if (opcion.textContent !== respuestaJugador) {
        respuestasIncorrectas.push(preguntaTexto.textContent);
      }
    } else if (opcion.textContent === respuestaJugador) {
      opcion.classList.add("incorrecta");
      respuestasIncorrectas.push(preguntaTexto.textContent);
    }
  });

  responderBtn.disabled = true;
  finalizarBtn.disabled = true;
  finalizarBtn.style.display = "inline-block";
  reiniciarBtn.style.display = "inline-block";
}

function finalizarJuego() {
  preguntaTexto.textContent = "Juego finalizado";
  opcionesLista.innerHTML = "";

  var mensajeRespuestasIncorrectas = "Preguntas incorrectas:\n";
  for (var i = 0; i < respuestasIncorrectas.length; i++) {
    mensajeRespuestasIncorrectas += "- " + respuestasIncorrectas[i] + "\n";
  }
  responderBtn.style.display = "none";
  finalizarBtn.style.display = "none";
  reiniciarBtn.style.display = "inline-block";
}

function reiniciarJuego() {
  indicePreguntaActual = 0;
  respuestasIncorrectas = [];

  mostrarPregunta(indicePreguntaActual);

  preguntaTexto.textContent = "";
  reiniciarBtn.style.display = "none";
  responderBtn.style.display = "inline-block";
  finalizarBtn.style.display = "inline-block";
}

cargarPreguntas();

responderBtn.addEventListener("click", responder);
finalizarBtn.addEventListener("click", finalizarJuego);
reiniciarBtn.addEventListener("click", reiniciarJuego);


var preguntas = [];
var indicePreguntaActual = 0;
var respuestasIncorrectas = [];
var respuestasTablaBody = document.getElementById("respuestas-tabla-body");
var respuestasTabla = document.getElementById("respuestas-tabla");
var reiniciarBtn = document.getElementById("reiniciar-btn");
var contadorJuegos = 0;

function cargarPreguntas() {
  fetch("preguntas.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      preguntas = data;
      iniciarJuego();
    })
    .catch(function(error) {
      console.log("Error al cargar las preguntas:", error);
    });
}

function iniciarJuego() {
  mostrarPregunta(indicePreguntaActual);
}

function mostrarPregunta(indice) {
  var pregunta = preguntas[indice];
  preguntaTexto.textContent = pregunta.pregunta;

  opcionesLista.innerHTML = "";

  pregunta.opciones.forEach(function(opcion) {
    var boton = document.createElement("button");
    boton.textContent = opcion;
    boton.addEventListener("click", function() {
      if (!this.classList.contains("selected")) {
        var botones = opcionesLista.querySelectorAll("button");
        botones.forEach(function(b) {
          b.classList.remove("selected");
        });
        this.classList.add("selected");
        responderBtn.disabled = false;
      }
    });
    opcionesLista.appendChild(boton);
  });
}

function responder() {
  var respuestaSeleccionada = opcionesLista.querySelector("button.selected");
  if (respuestaSeleccionada) {
    var respuestaJugador = respuestaSeleccionada.textContent;
    var preguntaActual = preguntas[indicePreguntaActual];
    verificarRespuesta(respuestaJugador, preguntaActual.respuesta);
    indicePreguntaActual++;

    if (indicePreguntaActual < preguntas.length) {
      mostrarPregunta(indicePreguntaActual);
    } else {
      finalizarJuego();
    }
  }
}

function verificarRespuesta(respuestaJugador, respuestaCorrecta) {
  var opciones = opcionesLista.querySelectorAll("button");
  opciones.forEach(function(opcion) {
    opcion.disabled = true;
    if (opcion.textContent === respuestaCorrecta) {
      opcion.classList.add("correcta");
      if (opcion.textContent !== respuestaJugador) {
        respuestasIncorrectas.push({
          pregunta: preguntaTexto.textContent,
          respuesta: respuestaJugador,
          correcta: false,
          respuestaCorrecta: respuestaCorrecta,
        });
      } else {
        respuestasIncorrectas.push({
          pregunta: preguntaTexto.textContent,
          respuesta: respuestaJugador,
          correcta: true,
          respuestaCorrecta: respuestaCorrecta,
        });
      }
    } else if (opcion.textContent === respuestaJugador) {
      opcion.classList.add("incorrecta");
      respuestasIncorrectas.push({
        pregunta: preguntaTexto.textContent,
        respuesta: respuestaJugador,
        correcta: false,
        respuestaCorrecta: respuestaCorrecta,
      });
    }
  });

  var respuestaTabla = document.createElement("tr");
  var preguntaCelda = document.createElement("td");
  var respuestaCelda = document.createElement("td");
  var resultadoCelda = document.createElement("td");
  var respuestaCorrectaCelda = document.createElement("td");

  preguntaCelda.textContent = preguntaTexto.textContent;
  respuestaCelda.textContent = respuestaJugador;

  if (respuestaJugador === respuestaCorrecta) {
    respuestaCelda.classList.add("correcta");
    resultadoCelda.textContent = "Correcta";
    resultadoCelda.classList.add("resultado-correcto");
  } else {
    respuestaCelda.classList.add("incorrecta");
    resultadoCelda.textContent = "Incorrecta";
    resultadoCelda.classList.add("resultado-incorrecto");
    respuestaCorrectaCelda.textContent = respuestaCorrecta;
  }

  respuestaTabla.appendChild(preguntaCelda);
  respuestaTabla.appendChild(respuestaCelda);
  respuestaTabla.appendChild(resultadoCelda);
  respuestaTabla.appendChild(respuestaCorrectaCelda);
  respuestasTablaBody.appendChild(respuestaTabla);

  responderBtn.disabled = true;
  finalizarBtn.disabled = true;
  finalizarBtn.style.display = "inline-block";
  respuestasTabla.style.display = "table";
  reiniciarBtn.style.display = "inline-block";
}

function finalizarJuego() {
  preguntaTexto.textContent = "Juego finalizado";
  opcionesLista.innerHTML = "";

  var mensajeRespuestasIncorrectas = "Preguntas incorrectas:\n";
  for (var i = 0; i < respuestasIncorrectas.length; i++) {
    var respuesta = respuestasIncorrectas[i];
    mensajeRespuestasIncorrectas += "- Pregunta: " + respuesta.pregunta + " | Respuesta: " + respuesta.respuesta + " | Resultado: " + (respuesta.correcta ? "Correcta" : "Incorrecta") + " | Respuesta correcta: " + respuesta.respuestaCorrecta + "\n";
  }

  contadorJuegos++;
  localStorage.setItem("contadorJuegos", contadorJuegos);

  responderBtn.style.display = "none";
  finalizarBtn.style.display = "none";
  reiniciarBtn.style.display = "inline-block";
}

function reiniciarJuego() {
  indicePreguntaActual = 0;
  respuestasIncorrectas = [];
  respuestasTablaBody.innerHTML = "";

  mostrarPregunta(indicePreguntaActual);

  preguntaTexto.textContent = "";
  respuestasTabla.style.display = "none";
  reiniciarBtn.style.display = "none";
  responderBtn.style.display = "inline-block";
  finalizarBtn.style.display = "inline-block";
}

cargarPreguntas();

responderBtn.addEventListener("click", responder);
finalizarBtn.addEventListener("click", finalizarJuego);
reiniciarBtn.addEventListener("click", reiniciarJuego);
