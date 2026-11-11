$(document).ready(function() {
       // FORMULARIO DISEÑADO POR EXEASOFTWARE - RAMIRO VALERO 
      // Base de datos de definiciones, sintaxis y vistas previas
  var diccionarioClases = {
    "container": {
      titulo: ".container / .container-fluid",
      tipo: "Estructura y Contenedores",
      definicion: "Limitan el ancho máximo de tu contenido de acuerdo al tamaño de la pantalla (breakpoints), o expanden el contenedor al 100% de la ventana con la variante -fluid.",
      sintaxis: '<div class="container bg-white p-3 border">Contenido centrado</div>',
      demo: '<div class="p-2 bg-primary text-white text-center rounded">Contenedor Adaptable</div>'
    },
    "row-col": {
      titulo: ".row y .col-* (Grid System)",
      tipo: "Sistema de Cuadrícula",
      definicion: "Permiten estructurar filas (row) y columnas (col) responsivas basadas en un sistema de 12 unidades por línea para ordenar la interfaz fluidamente.",
      sintaxis: '<div class="row"><div class="col-md-6">Columna 1</div><div class="col-md-6">Columna 2</div></div>',
      demo: '<div class="row g-2"><div class="col-6"><div class="bg-secondary text-white p-2 text-center rounded">Col 6</div></div><div class="col-6"><div class="bg-success text-white p-2 text-center rounded">Col 6</div></div></div>'
    },
    "card": {
      titulo: ".card, .card-header, .card-body",
      tipo: "Componentes UI",
      definicion: "Tarjetas flexibles y extensibles que sirven como contenedores modulares con opciones para encabezados, cuerpos, imágenes y pies de página integrados.",
      sintaxis: '<div class="card"><div class="card-header">Título</div><div class="card-body">Texto interno</div></div>',
      demo: '<div class="card shadow-sm"><div class="card-header bg-dark text-white py-1">Ejemplo Card</div><div class="card-body py-2"><p class="mb-0 text-muted">Contenido interno de la tarjeta.</p></div></div>'
    },
    "btn": {
      titulo: ".btn, .btn-primary, .btn-sm",
      tipo: "Botones Interactivos",
      definicion: "Estilos base para transformar elementos interactivos en botones con estados predefinidos de color, bordes redondeados y efectos hover automáticos.",
      sintaxis: '<button class="btn btn-primary btn-sm">Botón Primario</button>',
      demo: '<button class="btn btn-primary btn-sm shadow-sm">¡Haz Clic Aquí!</button>'
    },
    "badge": {
      titulo: ".badge, .bg-primary, .bg-success",
      tipo: "Etiquetas e Indicadores",
      definicion: "Pequeños componentes de conteo, estado o etiquetado que resaltan información clave junto a textos o títulos de la aplicación.",
      sintaxis: '<span class="badge bg-success">Nuevo</span>',
      demo: '<h5>Estado del sistema <span class="badge bg-success">Activo</span></h5>'
    },
    "alert": {
      titulo: ".alert, .alert-success, .alert-dismissible",
      tipo: "Retroalimentación Visual",
      definicion: "Proporcionan mensajes de retroalimentación contextuales para acciones típicas de usuario con opciones de cierre automático o manual.",
      sintaxis: '<div class="alert alert-success" role="alert">¡Operación exitosa!</div>',
      demo: '<div class="alert alert-success py-2 mb-0" role="alert"><strong>¡Correcto!</strong> Alerta informativa de prueba.</div>'
    },
    "flex": {
      titulo: ".d-flex, .justify-content-between, .align-items-center",
      tipo: "Utilidades Flexbox",
      definicion: "Clases utilitarias directas de CSS Flexbox para alinear elementos, distribuir espacios horizontales/verticales y controlar flujos responsivos sin escribir CSS personalizado.",
      sintaxis: '<div class="d-flex justify-content-between align-items-center">...</div>',
      demo: '<div class="d-flex justify-content-between align-items-center bg-light p-2 border rounded"><span>Izquierda</span><span class="badge bg-primary">Derecha</span></div>'
    },
    "spacing": {
      titulo: ".m-* (Margin) y .p-* (Padding)",
      tipo: "Utilidades de Espaciado",
      definicion: "Controlan de forma rápida y estandarizada los márgenes (margin) y rellenos (padding) utilizando escalas del 0 al 5 combinadas con direcciones (t, b, s, e, x, y).",
      sintaxis: '<div class="p-4 m-3 bg-light">Caja con padding y margin</div>',
      demo: '<div class="p-3 bg-warning text-dark text-center fw-bold rounded">Caja con padding interno .p-3</div>'
    },
    "table": {
      titulo: ".table, .table-bordered, .table-hover",
      tipo: "Tablas de Datos",
      definicion: "Dan formato limpio, líneas divisorias y efectos de resaltado al pasar el cursor sobre filas tabulares de manera automática.",
      sintaxis: '<table class="table table-bordered table-hover">...</table>',
      demo: '<table class="table table-bordered table-sm mb-0"><thead><tr class="table-light"><th>Item</th><th>Valor</th></tr></thead><tbody><tr><td>Ejemplo</td><td>100%</td></tr></tbody></table>'
    },
    "visibility": {
      titulo: ".d-none, .d-block, .fade, .show",
      tipo: "Visibilidad y Animaciones",
      definicion: "Controlan la visualización inmediata de los componentes en el DOM o activan transiciones suaves de opacidad (fade) combinadas con JavaScript.",
      sintaxis: '<div class="d-none d-md-block">Oculto en móvil, visible en escritorio</div>',
      demo: '<div class="p-2 bg-info text-white text-center rounded">Elemento visible y activo (.d-block)</div>'
    }
  };

  // Evento al hacer clic en cualquier opción de la lista izquierda
  $('.codigo-selector').click(function(e) {
    e.preventDefault();

    // Remover clase activa de todos y asignarla al seleccionado
    $('.codigo-selector').removeClass('activo');
    $(this).addClass('activo');

    // Obtener la clave de la clase seleccionada
    var clave = $(this).data('key');
    var info = diccionarioClases[clave];

    if (info) {
      // Construir la plantilla dinámica para la ventana derecha
      var htmlDefinicion = `
        <div>
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h4 class="text-primary font-monospace mb-0">${info.titulo}</h4>
            <span class="badge bg-secondary">${info.tipo}</span>
          </div>
          <p class="text-muted small mb-3">${info.definicion}</p>
          
          <div class="mb-3">
            <label class="form-label fw-bold small text-dark">Sintaxis de Código HTML:</label>
            <div class="bg-dark text-light p-2 rounded font-monospace small">
              <code>${escapeHtml(info.sintaxis)}</code>
            </div>
          </div>

          <div>
            <label class="form-label fw-bold small text-dark">Resultado Dinámico en Vivo:</label>
            <div class="p-3 bg-white border rounded shadow-sm">
              ${info.demo}
            </div>
          </div>
        </div>
      `;

      // Inyectar con animación sutil de desvanecimiento
      $('#contenido-dinamico').hide().html(htmlDefinicion).fadeIn(300);
    }
  });

  // Función auxiliar para escapar caracteres HTML en el bloque de código
  function escapeHtml(text) {
    return text
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
  }

});
