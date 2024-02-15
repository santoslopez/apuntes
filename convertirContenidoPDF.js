function convertirAPDF() {
    
    if (!estadoRadioButtonSeleccionado.checked){
      estadoRadioButtonSeleccionado.checked = true;
      estadoRadioButtonOcultar.checked = false;
      filtrarPreguntas();
    }

    var accederDivJson = document.getElementById('contenidoJson');

    // Crear un nuevo objeto html2pdf
    var pdf = new html2pdf(accederDivJson);

    // dependiendo que opción de capitulo se selecciono, se le asigna un nombre al archivo
    var nombreArchivo = document.getElementById("seleccionCapitulo").value;
    if (nombreArchivo == 0) {
      nombreArchivo = "AllCapitulos";
    } else {
      nombreArchivo = "Capitulo-"+nombreArchivo;
    }

    // Descargar el PDF
    pdf.save(nombreArchivo + '.pdf',{filename:nombreArchivo+".pdf",extension:'.pdf'});
}