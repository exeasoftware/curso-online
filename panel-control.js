$(document).ready(function() {

  // Contenido por defecto para restaurar el panel
  var htmlOriginal = '<h4 id="panel-titulo" class="text-primary">¡Hola! Soy el Panel</h4>' +
                     '<p id="panel-texto" class="text-muted mb-0">Interactúa con los controles de la derecha para modificar mis clases y ver métodos de jQuery en acción.</p>';

  // Helper para mostrar notificaciones informativas
  function notificar(mensaje) {
    $('#alert-msg').html(mensaje);
    $('#alert-box').removeClass('d-none');
  }

  // Ocultar alerta al presionar botón de cerrar
  $('#btn-cerrar-alerta').click(function() {
    $('#alert-box').addClass('d-none');
  });

  // 1. MÉTODO .text() y .val()
  $('#btn-cambiar-texto').click(function() {
    var nuevoTexto = $('#input-titulo').val().trim();

    if (nuevoTexto !== '') {
      // Modifica el texto plano del encabezado
      $('#panel-titulo').text(nuevoTexto);
      notificar('Método <strong>.text()</strong> aplicado con éxito al título.');
      $('#input-titulo').val(''); // Limpia el input
    } else {
      notificar('Por favor escribe algún texto en el campo antes de aplicar.');
    }
  });

  // 2. MÉTODOS DE CLASES: .toggleClass()
  $('#btn-destacar').click(function() {
    // Agrega/Quita la clase custom panel-destacado
    $('#mi-panel').toggleClass('panel-destacado');
    notificar('Método <strong>.toggleClass("panel-destacado")</strong> ejecutado.');
  });

  $('#btn-agrandar').click(function() {
    // Agrega/Quita la clase custom texto-gigante al párrafo del panel
    $('#panel-texto').toggleClass('texto-gigante');
    notificar('Método <strong>.toggleClass("texto-gigante")</strong> ejecutado.');
  });

  // 3. EFECTOS Y ANIMACIONES
  $('#btn-fade').click(function() {
    // Aplica efecto desvanecer
    $('#mi-panel').fadeToggle(400, function() {
      notificar('Animación <strong>.fadeToggle()</strong> completada.');
    });
  });

  $('#btn-slide').click(function() {
    // Aplica efecto persiana/deslizamiento
    $('#mi-panel').slideToggle(400, function() {
      notificar('Animación <strong>.slideToggle()</strong> completada.');
    });
  });

  $('#btn-hide-show').click(function() {
    // Verifica si el panel está visible para ocultarlo o mostrarlo directamente
    if ($('#mi-panel').is(':visible')) {
      $('#mi-panel').hide();
      notificar('Método <strong>.hide()</strong> ejecutado.');
    } else {
      $('#mi-panel').show();
      notificar('Método <strong>.show()</strong> ejecutado.');
    }
  });

  // 4. MANIPULACIÓN DE CONTENIDO: .html() y .empty()
  $('#btn-limpiar-panel').click(function() {
    // Vacía el contenido interno del elemento (remueve los h4 y p)
    $('#mi-panel').empty();
    notificar('Método <strong>.empty()</strong> ejecutado: Se ha borrado todo el contenido interno del panel.');
  });

  $('#btn-reset-panel').click(function() {
    // Asegura que el panel esté visible
    $('#mi-panel').show();
    // Remueve clases agregadas por toggle
    $('#mi-panel').removeClass('panel-destacado');
    // Inserta nuevamente la estructura HTML limpia
    $('#mi-panel').html(htmlOriginal);
    notificar('Método <strong>.html()</strong> ejecutado para restaurar el contenido inicial.');
  });

});
