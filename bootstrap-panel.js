$(document).ready(function() {
  // Este Tutorial ha sido diseñado por exeasoftware - Ramiro Valero
  // Estructura HTML original guardada para la función de restaurar
  var contenidoOriginal = '<h4 id="panel-titulo" class="text-primary fw-bold">Panel de Pruebas</h4>' +
                          '<p id="panel-descripcion" class="text-muted">Utiliza los controles interactivos de la derecha para modificar clases, propiedades y métodos en tiempo real.</p>' +
                          '<div id="panel-extra-badge"><span class="badge bg-success">Estado: Activo</span></div>';

  // Función auxiliar para mostrar notificaciones flotantes de estado
  function mostrarAlerta(mensaje) {
    $('#texto-alerta').html(mensaje);
    $('#alerta-feedback').removeClass('d-none');
  }

  // Cerrar alerta manualmente
  $('#btn-cerrar-alerta').click(function() {
    $('#alerta-feedback').addClass('d-none');
  });

  // 1. Método .text() y propiedad del input con .val()
  $('#btn-cambiar-titulo').click(function() {
    var textoIngresado = $('#input-nuevo-titulo').val().trim();
    if (textoIngresado !== '') {
      $('#panel-titulo').text(textoIngresado);
      mostrarAlerta('Método <strong>.text()</strong> aplicado: Se actualizó el texto del título.');
      $('#input-nuevo-titulo').val(''); // Limpia el input
    } else {
      mostrarAlerta('Por favor, escribe un texto válido en el campo.');
    }
  });

  // 2. Métodos de clases: .toggleClass()
  $('#btn-toggle-borde').click(function() {
    $('#panel-demostrasion').toggleClass('panel-borde-resaltado');
    mostrarAlerta('Método <strong>.toggleClass("panel-borde-resaltado")</strong> ejecutado.');
  });

  $('#btn-toggle-sombra').click(function() {
    $('#panel-demostrasion').toggleClass('panel-sombra-pro');
    mostrarAlerta('Método <strong>.toggleClass("panel-sombra-pro")</strong> ejecutado.');
  });

  // 3. Métodos de animación (.fadeToggle y .slideToggle)
  $('#btn-anim-fade').click(function() {
    $('#panel-demostrasion').fadeToggle(400, function() {
      mostrarAlerta('Animación <strong>.fadeToggle()</strong> finalizada con éxito.');
    });
  });

  $('#btn-anim-slide').click(function() {
    $('#panel-demostrasion').slideToggle(400, function() {
      mostrarAlerta('Animación <strong>.slideToggle()</strong> finalizada con éxito.');
    });
  });

  // 4. Manipulación del DOM (.empty y .html)
  $('#btn-vaciar').click(function() {
    $('#panel-demostrasion').empty();
    mostrarAlerta('Método <strong>.empty()</strong> ejecutado: Se vació por completo el contenido interno.');
  });

  $('#btn-reset').click(function() {
    $('#panel-demostrasion').show();
    $('#panel-demostrasion').removeClass('panel-borde-resaltado panel-sombra-pro');
    $('#panel-demostrasion').html(contenidoOriginal);
    mostrarAlerta('Método <strong>.html()</strong> ejecutado: Panel restaurado a su estado inicial.');
  });

});
