 // variable global
let preguntas;

let btnDescargarPdf = document.getElementById("btnDescargarPDF");

let estadoRadioButtonSeleccionado = document.getElementById("radioButtonDefault")

let estadoRadioButtonOcultar = document.getElementById("radioButtonOcultar");

async function cargarDatos() {
  try {
    const response = await fetch('datos.json');
    preguntas = await response.json();
    mostrarPreguntas(preguntas);
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
}

function mostrarPreguntas(preguntas){

  const contenidoDiv = document.getElementById('contenidoJson');

  var seleccionCapitulo = document.getElementById('seleccionCapitulo').value;

  // verificar si hay preguntas
  if (preguntas.length === 0) {
    // deshabilitar el botón de descarga
    btnDescargarPdf.disabled = true;
    contenidoDiv.innerHTML = `<div class="alert alert-danger" role="alert">No hay preguntas disponibles para el capítulo ${seleccionCapitulo}</div>`;
    return;
  }

  let contenidoHTML = '<ul>';
  const preguntasVistas = new Set();
  let contadorNumeroPregunta = 0;

  preguntas.forEach((pregunta) => {
   // se verifica que no se repitan las preguntas
  if (!preguntasVistas.has(pregunta.pregunta)) {
    contadorNumeroPregunta++;
    preguntasVistas.add(pregunta.pregunta);
    
    if (estadoRadioButtonSeleccionado.checked) {
      contenidoHTML += `<li id="pregunta-${contadorNumeroPregunta}">
        ${contadorNumeroPregunta}. <strong style="color:black">${pregunta.pregunta}</strong>
        <div class="alert alert-warning" role="alert" style="margin-bottom:2%;margin-top:1%;">
          ${pregunta.respuesta}
        </div>
      </li>`;
      btnDescargarPdf.disabled = false;
    } else {
      contenidoHTML += `<li id="pregunta-${contadorNumeroPregunta}">
      ${contadorNumeroPregunta}. <strong style="color:black">${pregunta.pregunta}</strong><br>
      <button type="button" class="btn btn-primary" onclick="mostrarRespuesta('${pregunta.respuesta}')" style="margin-bottom:3%">  
        Ver respuesta
      </button>
      <br>
    </li>`;
    btnDescargarPdf.disabled = true;
    }
  }
  });
  contenidoHTML += '</ul>';

  contenidoDiv.innerHTML = contenidoHTML;
}

function filtrarPreguntas(){
  const seleccionCapitulo = parseInt(document.getElementById('seleccionCapitulo').value, 10);
  if (seleccionCapitulo === 0) {
    // mostrar todas las preguntas disponibles del archivo json
    mostrarPreguntas(preguntas);
  } else {
    const preguntasFiltradas =preguntas.filter(pregunta => pregunta.capitulo === seleccionCapitulo);
    mostrarPreguntas(preguntasFiltradas);
  }
}

// Eventos de clic a los radio buttons
estadoRadioButtonOcultar.addEventListener('click', function() {
  filtrarPreguntas();
});
estadoRadioButtonSeleccionado.addEventListener('click', function() {
  filtrarPreguntas();
});

function mostrarRespuesta(respuesta) {
  Swal.fire({
    icon: "success",
    title: "Respuesta",
    text: respuesta,
    footer: '<a></a>'
  });
}

cargarDatos();