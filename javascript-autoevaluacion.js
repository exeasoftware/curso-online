$(document).ready(function() {

  const preguntas = [
    {
      id: "p1",
      tema: "1.- Parámetros y Variables",
      enunciado: "¿Cuál es la palabra clave recomendada por defecto para declarar una variable cuyo valor NO debe reasignarse?",
      opciones: ["var", "const", "let", "function"],
      correcta: 1,
      explicacion: "<code>const</code> define una constante cuyo enlace no puede reasignarse; <code>let</code> se usa cuando el valor sí cambiará."
    },
    {
      id: "p2",
      tema: "2.- Condiciones y Casos",
      enunciado: "¿Qué operador realiza una comparación estricta (evalúa tanto el valor como el tipo de dato)?",
      opciones: ["=", "==", "===", "!="],
      correcta: 2,
      explicacion: "<code>===</code> evita conversiones implícitas de tipo (por ejemplo, <code>'5' === 5</code> es <code>false</code>)."
    },
    {
      id: "p3",
      tema: "3.- Estructuras de Repetición",
      enunciado: "¿Qué estructura es ideal cuando conoces de antemano cuántas iteraciones deseas realizar?",
      opciones: ["for", "switch", "try / catch", "return"],
      correcta: 0,
      explicacion: "El bucle <code>for (let i = 0; i < n; i++)</code> controla inicialización, condición y avance en una sola cabecera."
    },
    {
      id: "p4",
      tema: "4.- Arreglos y Matrices",
      enunciado: "Dada la matriz <code>const m = [[10, 20], [30, 40]];</code>, ¿qué devuelve <code>m[1][0]</code>?",
      opciones: ["10", "20", "30", "40"],
      correcta: 2,
      explicacion: "Los índices comienzan en 0: <code>m[1]</code> selecciona la segunda fila <code>[30, 40]</code>, y <code>[0]</code> su primer elemento (<code>30</code>)."
    },
    {
      id: "p5",
      tema: "5.- Funciones y Objetos",
      enunciado: "¿Cómo se accede a la propiedad <code>telefono</code> dentro de un objeto llamado <code>usuario</code>?",
      opciones: ["usuario->telefono", "usuario.telefono o usuario['telefono']", "usuario(telefono)", "$usuario.telefono"],
      correcta: 1,
      explicacion: "En JavaScript se usa notación de punto (<code>objeto.propiedad</code>) o corchetes (<code>objeto['propiedad']</code>)."
    },
    {
      id: "p6",
      tema: "6.- Clases y Métodos",
      enunciado: "¿Qué método especial se ejecuta automáticamente al crear una nueva instancia con <code>new</code>?",
      opciones: ["iniciar()", "constructor()", "prototype()", "main()"],
      correcta: 1,
      explicacion: "<code>constructor()</code> inicializa las propiedades de la instancia recién creada mediante <code>this</code>."
    },
    {
      id: "p7",
      tema: "7.- Enviar Parámetros de HTML a JS",
      enunciado: "¿Cómo obtienes con jQuery el valor escrito dentro de un input con <code>id=\"nombre\"</code>?",
      opciones: ["$('#nombre').val()", "$('#nombre').html()", "$('#nombre').attr()", "$('#nombre').data()"],
      correcta: 0,
      explicacion: "<code>.val()</code> lee o asigna el valor actual de controles de formulario como <code>&lt;input&gt;</code>, <code>&lt;select&gt;</code> y <code>&lt;textarea&gt;</code>."
    },
    {
      id: "p8",
      tema: "8.- Ejecutar Función JS desde HTML",
      enunciado: "¿Cuál es una ventaja de vincular eventos desde el archivo <code>.js</code> (ej. <code>.on('click', ...)</code>) frente a escribir <code>onclick</code> en el HTML?",
      opciones: [
        "No requiere cargar JavaScript",
        "Separa la estructura HTML de la lógica y mantiene el código más limpio y mantenible",
        "Hace que las variables globales sean obligatorias",
        "Evita que funcione CSS"
      ],
      correcta: 1,
      explicacion: "Separar el marcado HTML del comportamiento JS facilita el mantenimiento y evita mezclar responsabilidades."
    },
    {
      id: "p9",
      tema: "10.- Lectura JSON y Asincronía",
      enunciado: "¿Qué método de jQuery permite cargar un archivo JSON externo de forma asíncrona?",
      opciones: ["$.parseJSON()", "$.getJSON()", "$.toString()", "$.ajaxStop()"],
      correcta: 1,
      explicacion: "<code>$.getJSON(url, callback)</code> realiza una petición asíncrona y parsea automáticamente la respuesta JSON."
    },
    {
      id: "p10",
      tema: "11.- Almacenamiento y 12.- Errores",
      enunciado: "¿Qué bloque permite capturar un error en tiempo de ejecución sin detener toda la página y qué storage borra los datos al cerrar la pestaña?",
      opciones: [
        "if / else y localStorage",
        "try / catch y sessionStorage",
        "switch / default y cookies",
        "for / break y cacheStorage"
      ],
      correcta: 1,
      explicacion: "<code>try / catch</code> maneja excepciones controladamente, y <code>sessionStorage</code> mantiene datos solo durante la sesión de la pestaña."
    }
  ];

  // Renderizar preguntas dinámicamente
  function renderizarPreguntas() {
    let html = "";

    preguntas.forEach((p, idx) => {
      let opcionesHtml = "";
      p.opciones.forEach((op, i) => {
        const inputId = `${p.id}_op${i}`;
        opcionesHtml += `
          <div class="form-check mb-2">
            <input class="form-check-input respuesta-radio" type="radio" name="${p.id}" id="${inputId}" value="${i}">
            <label class="form-check-label opcion-label" for="${inputId}">${op}</label>
          </div>
        `;
      });

      html += `
        <div class="card shadow-sm pregunta-card" id="card-${p.id}">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="badge bg-light text-primary border">${p.tema}</span>
              <span class="text-muted small fw-bold">Pregunta ${idx + 1} de ${preguntas.length}</span>
            </div>
            <h6 class="fw-bold text-dark mb-3">${p.enunciado}</h6>
            <div>${opcionesHtml}</div>
            <div class="retro-individual mt-2 small" id="retro-${p.id}" style="display: none;"></div>
          </div>
        </div>
      `;
    });

    $('#contenedor-preguntas').html(html);
  }

  // Actualizar barra de progreso
  function actualizarProgreso() {
    const total = preguntas.length;
    let respondidas = 0;

    preguntas.forEach(p => {
      if ($(`input[name="${p.id}"]:checked`).length > 0) {
        respondidas++;
      }
    });

    const porcentaje = Math.round((respondidas / total) * 100);
    $('#contador-respondidas').text(`${respondidas} / ${total} respondidas`);
    $('#barra-progreso').css('width', `${porcentaje}%`);
  }

  renderizarPreguntas();

  // Escuchar cambios en respuestas
  $('#contenedor-preguntas').on('change', '.respuesta-radio', function() {
    actualizarProgreso();
  });

  // Calificar evaluación
  $('#form-autoevaluacion').on('submit', function(e) {
    e.preventDefault();

    let aciertos = 0;
    let detalleHtml = `<ul class="list-group list-group-flush">`;

    preguntas.forEach((p, idx) => {
      const seleccionVal = $(`input[name="${p.id}"]:checked`).val();
      const seleccion = seleccionVal !== undefined ? Number(seleccionVal) : null;
      const esCorrecta = seleccion === p.correcta;

      const $card = $(`#card-${p.id}`);
      const $retro = $(`#retro-${p.id}`);

      $card.removeClass('border-success border-danger').css('border-left-width', '4px');

      if (esCorrecta) {
        aciertos++;
        $card.addClass('border-success');
        $retro
          .removeClass('text-danger')
          .addClass('text-success')
          .html(`<strong>¡Correcto!</strong> ${p.explicacion}`)
          .slideDown(150);
      } else {
        $card.addClass('border-danger');
        const respuestaCorrectaTexto = p.opciones[p.correcta];
        const respuestaUsuarioTexto = seleccion !== null ? p.opciones[seleccion] : "Sin responder";
        $retro
          .removeClass('text-success')
          .addClass('text-danger')
          .html(`<strong>Revisa este tema:</strong> Tu respuesta fue <em>${respuestaUsuarioTexto}</em>. Correcta: <strong>${respuestaCorrectaTexto}</strong>. ${p.explicacion}`)
          .slideDown(150);
      }

      detalleHtml += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span><strong>Pregunta ${idx + 1}</strong> (${p.tema})</span>
          <span class="badge ${esCorrecta ? 'bg-success' : 'bg-danger'}">${esCorrecta ? 'Correcta' : 'Incorrecta'}</span>
        </li>
      `;
    });

    detalleHtml += `</ul>`;

    const porcentaje = Math.round((aciertos / preguntas.length) * 100);
    let mensajeFinal = "";
    if (porcentaje >= 80) {
      mensajeFinal = `<div class="alert alert-success"><strong>¡Excelente dominio!</strong> Obtuviste ${aciertos} de ${preguntas.length} (${porcentaje}%). Estás listo para aplicar JavaScript en proyectos interactivos.</div>`;
    } else if (porcentaje >= 60) {
      mensajeFinal = `<div class="alert alert-warning"><strong>Buen avance.</strong> Obtuviste ${aciertos} de ${preguntas.length} (${porcentaje}%). Revisa las preguntas marcadas en rojo en el tutorial principal.</div>`;
    } else {
      mensajeFinal = `<div class="alert alert-danger"><strong>Sigue practicando.</strong> Obtuviste ${aciertos} de ${preguntas.length} (${porcentaje}%). Te recomendamos repasar los módulos del tutorial y probar los ejemplos interactivos.</div>`;
    }

    $('#badge-calificacion').text(`${aciertos} / ${preguntas.length} (${porcentaje}%)`);
    $('#detalle-resultado').html(mensajeFinal + detalleHtml);
    $('#panel-resultado').hide().fadeIn(300);

    $('html, body').animate({
      scrollTop: $('#panel-resultado').offset().top - 20
    }, 300);
  });

  // Reiniciar evaluación
  $('#btn-reiniciar').on('click', function() {
    $('#form-autoevaluacion')[0].reset();
    $('.retro-individual').hide().empty();
    $('.pregunta-card').removeClass('border-success border-danger');
    $('#panel-resultado').hide();
    actualizarProgreso();
  });

});
