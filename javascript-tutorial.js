// ============================================================================
// FUNCIONES GLOBALES (Necesarias para el Módulo 8: llamadas directas desde HTML)
// ============================================================================
function saludarDesdeAtributoHTML(nombreUsuario, rol) {
  const salida = document.getElementById('salida-demo');
  if (salida) {
    salida.innerHTML = `> [Ejecución vía atributo onclick]\n> Hola ${nombreUsuario}, tu rol asignado es: ${rol}.`;
  }
}

function recibirDatosFormularioHTML(event) {
  event.preventDefault(); // Evita que la página se recargue
  const nombre = document.getElementById('param-nombre').value;
  const edad = document.getElementById('param-edad').value;
  const salida = document.getElementById('salida-demo');

  salida.innerHTML = `> Parámetros recibidos desde inputs HTML:\n` +
                     `> Nombre (string): "${nombre}"\n` +
                     `> Edad (number): ${Number(edad)} (En 5 años tendrás ${Number(edad) + 5})`;
}

// ============================================================================
// LÓGICA PRINCIPAL CON JQUERY AL CARGAR EL DOCUMENTO
// ============================================================================
$(document).ready(function() {

  // Diccionario detallado y segmentado de los 12 temas
  const temarioJS = {
    "variables": {
      titulo: "1.- Estructura de Parámetros y Variables",
      categoria: "Fundamentos",
      explicacion: `En JavaScript moderno (ES6+) existen tres formas de declarar variables, además de los parámetros que reciben las funciones:
      <ul>
        <li><strong>const:</strong> Crea una constante cuyo valor no puede reasignarse. Es la opción recomendada por defecto.</li>
        <li><strong>let:</strong> Crea una variable cuyo valor sí puede cambiar y respeta el alcance de bloque (<code>{ }</code>).</li>
        <li><strong>var:</strong> Forma antigua (alcance de función). Se evita en proyectos nuevos para prevenir errores de sobrescritura.</li>
        <li><strong>Parámetros:</strong> Variables locales declaradas en la firma de una función (ej. <code>function sumar(a, b)</code>) que reciben valores al ser invocada.</li>
      </ul>`,
      sintaxis: `const PI = 3.1416;          // Constante (no cambia)
let contador = 0;           // Variable mutable (number)
let curso = "JavaScript";   // Cadena de texto (string)
let activo = true;          // Booleano (boolean)

// Parámetros con valor por defecto
function calcularTotal(precio, impuesto = 0.16) {
  return precio + (precio * impuesto);
}`,
      demoHtml: `<button id="btn-demo-vars" class="btn btn-success btn-sm">Ejecutar Prueba de Variables</button>`,
      ejecutarDemo: function() {
        const curso = "JavaScript";
        let intentos = 1;
        intentos++;
        const total = 100 + (100 * 0.16);
        $('#salida-demo').text(
          `> const curso = "${curso}" (Tipo: ${typeof curso})\n` +
          `> let intentos incrementado = ${intentos} (Tipo: ${typeof intentos})\n` +
          `> Resultado con parámetro por defecto (100 + 16%): $${total}`
        );
      }
    },

    "condiciones": {
      titulo: "2.- Estructuras de Condiciones y Casos",
      categoria: "Control de Flujo",
      explicacion: `Permiten tomar decisiones lógicas ejecutando distintos bloques de código según se cumpla o no una condición:
      <ul>
        <li><strong>if / else if / else:</strong> Evalúa expresiones booleanas (<code>===</code> comparación estricta de valor y tipo, <code>&gt;</code>, <code>&amp;&amp;</code> Y, <code>||</code> O).</li>
        <li><strong>Operador Ternario:</strong> Forma abreviada en una línea: <code>condicion ? valorSi : valorNo</code>.</li>
        <li><strong>switch / case:</strong> Ideal cuando se compara una misma variable contra múltiples valores exactos.</li>
      </ul>`,
      sintaxis: `let nota = 85;

// 1. Estructura if / else
if (nota >= 90) {
  console.log("Excelente");
} else if (nota >= 70) {
  console.log("Aprobado");
} else {
  console.log("Reprobado");
}

// 2. Estructura switch
let rol = "ADMIN";
switch (rol) {
  case "ADMIN": console.log("Acceso Total"); break;
  case "EDITOR": console.log("Acceso Parcial"); break;
  default: console.log("Solo Lectura");
}`,
      demoHtml: `
        <div class="input-group input-group-sm mb-2" style="max-width: 320px;">
          <input type="number" id="input-nota" class="form-control" value="85" min="0" max="100" placeholder="Ingresa nota (0-100)">
          <button id="btn-demo-cond" class="btn btn-success">Evaluar Nota</button>
        </div>`,
      ejecutarDemo: function() {
        const nota = Number($('#input-nota').val());
        let estado = "";
        if (nota >= 90) estado = "Sobresaliente (A)";
        else if (nota >= 70) estado = "Aprobado (B)";
        else estado = "Reprobado (F)";

        const acceso = (nota >= 70) ? "Habilitado para siguiente módulo" : "Requiere recuperación";
        $('#salida-demo').text(`> Nota evaluada: ${nota}\n> Resultado if/else: ${estado}\n> Operador Ternario: ${acceso}`);
      }
    },

    "repeticion": {
      titulo: "3.- Estructuras de Repetición (Bucles)",
      categoria: "Control de Flujo",
      explicacion: `Permiten repetir un bloque de instrucciones múltiples veces sin duplicar código:
      <ul>
        <li><strong>for:</strong> Se usa cuando sabemos exactamente cuántas veces queremos repetir el ciclo.</li>
        <li><strong>while:</strong> Repite el bloque mientras una condición sea verdadera (se evalúa antes de entrar).</li>
        <li><strong>for...of:</strong> Recorre directamente los elementos de un arreglo de forma limpia y legible.</li>
      </ul>`,
      sintaxis: `// 1. Bucle for clásico
for (let i = 1; i <= 5; i++) {
  console.log("Iteración #" + i);
}

// 2. Bucle while
let energia = 3;
while (energia > 0) {
  console.log("Procesando... energía restante: " + energia);
  energia--;
}`,
      demoHtml: `<button id="btn-demo-bucles" class="btn btn-success btn-sm">Generar Tabla del 5 con Bucle For</button>`,
      ejecutarDemo: function() {
        let resultado = "> Tabla de multiplicar del 5:\n";
        for (let i = 1; i <= 5; i++) {
          resultado += `  5 x ${i} = ${5 * i}\n`;
        }
        $('#salida-demo').text(resultado);
      }
    },

    "arreglos": {
      titulo: "4.- Arreglos (Arrays) y Matrices",
      categoria: "Estructuras de Datos",
      explicacion: `Un <strong>Arreglo</strong> es una lista ordenada de elementos indexados desde la posición <code>0</code>. Una <strong>Matriz</strong> es un arreglo bidimensional (arreglos dentro de otro arreglo, formando filas y columnas).
      <br>JavaScript ofrece métodos integrados muy potentes como <code>.push()</code> (agregar), <code>.filter()</code> (filtrar) y <code>.map()</code> (transformar).`,
      sintaxis: `// Arreglo simple (1 dimensión)
let lenguajes = ["HTML", "CSS", "JavaScript"];
lenguajes.push("SQL"); // Agrega al final -> índice 3

// Matriz 2x3 (2 filas, 3 columnas)
let matriz = [
  [10, 20, 30], // Fila 0
  [40, 50, 60]  // Fila 1
];
console.log(matriz[1][2]); // Accede a Fila 1, Columna 2 -> 60`,
      demoHtml: `<button id="btn-demo-arrays" class="btn btn-success btn-sm">Procesar Arreglo y Matriz</button>`,
      ejecutarDemo: function() {
        const precios = [15, 45, 80, 120];
        const mayoresA50 = precios.filter(p => p > 50);
        const matriz = [
          ["Ana", 95],
          ["Luis", 88]
        ];
        $('#salida-demo').text(
          `> Arreglo original: [${precios.join(", ")}]\n` +
          `> Filtrados (> 50) con .filter(): [${mayoresA50.join(", ")}]\n` +
          `> Lectura de Matriz [1][0] y [1][1]: Estudiante ${matriz[1][0]} tiene ${matriz[1][1]} pts.`
        );
      }
    },

    "funciones_objetos": {
      titulo: "5.- Funciones y Objetos",
      categoria: "Estructuras Avanzadas",
      explicacion: `<ul>
        <li><strong>Funciones:</strong> Bloques reutilizables de código. Pueden escribirse de forma tradicional o como <strong>Funciones Flecha (Arrow Functions)</strong> <code>() =&gt; {}</code>.</li>
        <li><strong>Objetos:</strong> Colecciones de propiedades definidas en pares <code>clave: valor</code>. Son la base del formato JSON usado en APIs y archivos de configuración.</li>
      </ul>`,
      sintaxis: `// Objeto literal
const usuario = {
  nombre: "Carlos",
  correo: "carlos@curso.com",
  activo: true
};

// Función Flecha que recibe un objeto
const presentarUsuario = (user) => {
  return \`Usuario: \${user.nombre} (\${user.correo})\`;
};`,
      demoHtml: `<button id="btn-demo-obj" class="btn btn-success btn-sm">Inspeccionar Objeto y Función Flecha</button>`,
      ejecutarDemo: function() {
        const alumno = {
          usuario: "superusuario",
          telefono: "04148252604",
          activo: true
        };
        const formatear = (obj) => `Alumno: ${obj.usuario} | Tel: ${obj.telefono} | Estado: ${obj.activo ? 'Activo' : 'Inactivo'}`;
        $('#salida-demo').text(`> Objeto serializado (JSON):\n  ${JSON.stringify(alumno)}\n> Salida Función Flecha:\n  ${formatear(alumno)}`);
      }
    },

    "clases": {
      titulo: "6.- Clases y Métodos (POO)",
      categoria: "Programación Orientada a Objetos",
      explicacion: `Una <strong>Clase</strong> es una plantilla o molde para crear múltiples objetos con la misma estructura.
      <ul>
        <li><strong>constructor():</strong> Método especial que se ejecuta automáticamente al instanciar la clase con la palabra clave <code>new</code>.</li>
        <li><strong>this:</strong> Hace referencia a la instancia actual del objeto.</li>
        <li><strong>Métodos:</strong> Funciones que pertenecen a la clase y definen el comportamiento de sus objetos.</li>
      </ul>`,
      sintaxis: `class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }

  // Método de la clase
  aplicarDescuento(porcentaje) {
    this.precio -= this.precio * (porcentaje / 100);
    return \`\${this.nombre} ahora cuesta $\${this.precio}\`;
  }
}

const laptop = new Producto("Laptop Dell", 800);
console.log(laptop.aplicarDescuento(10)); // $720`,
      demoHtml: `<button id="btn-demo-clases" class="btn btn-success btn-sm">Instanciar Clase Producto</button>`,
      ejecutarDemo: function() {
        class Producto {
          constructor(nombre, precio) {
            this.nombre = nombre;
            this.precio = precio;
          }
          aplicarDescuento(porcentaje) {
            const final = this.precio - (this.precio * (porcentaje / 100));
            return `${this.nombre}: Precio base $${this.precio} -> Con ${porcentaje}% desc: $${final}`;
          }
        }
        const item = new Producto("Monitor 24''", 200);
        $('#salida-demo').text(`> Instancia creada: new Producto("Monitor 24''", 200)\n> Ejecutando método: ${item.aplicarDescuento(15)}`);
      }
    },

    "html_a_js": {
      titulo: "7.- Cómo Enviar Parámetros de HTML a JavaScript",
      categoria: "Integración HTML + JS",
      explicacion: `Existen 3 formas principales de pasar datos desde etiquetas HTML hacia tus funciones JavaScript:
      <ol>
        <li><strong>Argumentos directos en eventos:</strong> Pasar valores literales dentro de <code>onclick="miFuncion('dato', 123)"</code>.</li>
        <li><strong>Atributos personalizados <code>data-*</code>:</strong> Guardar datos ocultos en el HTML (ej. <code>data-id="45"</code>) y leerlos con jQuery mediante <code>$(this).data('id')</code>.</li>
        <li><strong>Lectura de controles de formulario:</strong> Capturar lo que el usuario escribe en un <code>&lt;input&gt;</code> usando <code>$('#id').val()</code> o <code>document.getElementById('id').value</code>.</li>
      </ol>`,
      sintaxis: `<!-- Forma 1: Argumento directo -->
<button onclick="saludarDesdeAtributoHTML('María', 'Estudiante')">Saludar</button>

<!-- Forma 2: Atributo data-* leído con jQuery -->
<button class="btn-item" data-codigo="JS-101">Ver Código</button>
<script>
  $('.btn-item').click(function() {
    let cod = $(this).data('codigo'); // Obtiene "JS-101"
  });
</script>`,
      demoHtml: `
        <form onsubmit="recibirDatosFormularioHTML(event)" class="row g-2 align-items-center">
          <div class="col-auto">
            <input type="text" id="param-nombre" class="form-control form-control-sm" value="Pedro" required placeholder="Nombre">
          </div>
          <div class="col-auto">
            <input type="number" id="param-edad" class="form-control form-control-sm" value="25" required placeholder="Edad">
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-success btn-sm">Enviar Inputs a JS</button>
          </div>
        </form>`
    },

    "ejecutar_desde_html": {
      titulo: "8.- Cómo Ejecutar una Función JavaScript desde HTML",
      categoria: "Integración HTML + JS",
      explicacion: `Puedes disparar funciones JavaScript desde HTML mediante dos enfoques:
      <ul>
        <li><strong>Enfoque Inline (Atributos HTML):</strong> Usando atributos como <code>onclick</code>, <code>onchange</code>, <code>onkeyup</code> o <code>onsubmit</code> directamente en la etiqueta. Requiere que la función sea global.</li>
        <li><strong>Enfoque No Obstructivo (Recomendado con jQuery / addEventListener):</strong> Mantener el HTML limpio con un <code>id</code> o <code>class</code> y vincular el evento desde el archivo <code>.js</code> externo.</li>
      </ul>`,
      sintaxis: `<!-- A) Llamada directa desde atributo HTML -->
<button onclick="saludarDesdeAtributoHTML('Ana', 'Administradora')">
  Ejecutar onclick
</button>

<!-- B) Enlace limpio desde archivo .js (Recomendado) -->
<button id="btn-accion">Ejecutar vía jQuery</button>
<script>
  $('#btn-accion').on('click', function() {
    alert("¡Ejecutado sin ensuciar el HTML!");
  });
</script>`,
      demoHtml: `
        <div class="d-flex gap-2">
          <button type="button" class="btn btn-primary btn-sm" onclick="saludarDesdeAtributoHTML('Ana', 'Administradora')">
            1. Probar onclick HTML
          </button>
          <button type="button" id="btn-prueba-jquery" class="btn btn-success btn-sm">
            2. Probar Listener jQuery
          </button>
        </div>`,
      ejecutarDemo: function() {
        $('#salida-demo').text(`> [Ejecución vía jQuery .on('click')]\n> ¡Función ejecutada limpiamente desde javascript-tutorial.js!`);
      }
    },

    "dom_eventos": {
      titulo: "9.- [Extra] Manipulación del DOM y Eventos",
      categoria: "Ampliación de Conocimiento",
      explicacion: `El <strong>DOM (Document Object Model)</strong> es la representación en árbol de todas las etiquetas HTML. JavaScript y jQuery permiten modificar textos, estilos y estructura en tiempo real sin recargar la página.`,
      sintaxis: `// Cambiar texto e inyectar HTML
$('#titulo').text('Nuevo Título');
$('#contenedor').html('<span class="badge bg-success">Activo</span>');

// Alternar clases CSS dinámicamente
$('#caja').toggleClass('bg-warning');`,
      demoHtml: `<button id="btn-demo-dom" class="btn btn-warning btn-sm">Alternar Color de la Consola</button>`,
      ejecutarDemo: function() {
        const $consola = $('#salida-demo');
        $consola.toggleClass('border border-warning border-3');
        $consola.text(`> Método .toggleClass() ejecutado sobre el elemento DOM #salida-demo.`);
      }
    },

    "json_async": {
      titulo: "10.- [Extra] Lectura de JSON y Asincronía",
      categoria: "Ampliación de Conocimiento",
      explicacion: `Cuando necesitas traer datos desde un servidor o un archivo externo (como <code>parametros.json</code>), la operación es <strong>asíncrona</strong> (toma unos milisegundos). Usamos <code>fetch()</code> en JS moderno o <code>$.getJSON()</code> en jQuery.`,
      sintaxis: `// Con jQuery (usado en tu proyecto de Login)
$.getJSON('parametros.json', function(datos) {
  console.log("Usuarios cargados:", datos);
}).fail(function() {
  console.error("Error leyendo el archivo JSON");
});`,
      demoHtml: `<button id="btn-demo-json" class="btn btn-success btn-sm">Simular Petición JSON Asíncrona</button>`,
      ejecutarDemo: function() {
        $('#salida-demo').text(`> Solicitando datos al servidor... (esperando respuesta)`);
        setTimeout(() => {
          const respuestaSimulada = [{ usuario: "superusuario", activo: true }];
          $('#salida-demo').text(`> ¡Respuesta recibida tras 600ms!\n> Datos parseados: ${JSON.stringify(respuestaSimulada)}`);
        }, 600);
      }
    },

    "storage": {
      titulo: "11.- [Extra] Almacenamiento Local (Storage)",
      categoria: "Ampliación de Conocimiento",
      explicacion: `Los navegadores ofrecen dos espacios de memoria clave-valor:
      <ul>
        <li><strong>sessionStorage:</strong> Guarda datos mientras la pestaña esté abierta (ideal para controlar sesiones activas).</li>
        <li><strong>localStorage:</strong> Guarda datos de forma permanente aunque se cierre el navegador.</li>
      </ul>`,
      sintaxis: `// Guardar dato
sessionStorage.setItem('usuario_activo', 'superusuario');

// Leer dato
let user = sessionStorage.getItem('usuario_activo');

// Eliminar dato (Cerrar sesión)
sessionStorage.removeItem('usuario_activo');`,
      demoHtml: `<button id="btn-demo-storage" class="btn btn-success btn-sm">Guardar y Leer en sessionStorage</button>`,
      ejecutarDemo: function() {
        sessionStorage.setItem('demo_curso', 'JS_Nivel_1');
        const leido = sessionStorage.getItem('demo_curso');
        $('#salida-demo').text(`> Guardado en sessionStorage: key="demo_curso"\n> Valor recuperado: "${leido}"`);
      }
    },

    "errores": {
      titulo: "12.- [Extra] Manejo de Errores (try / catch)",
      categoria: "Ampliación de Conocimiento",
      explicacion: `Si ocurre un error inesperado (por ejemplo, intentar convertir un texto corrupto a JSON), JavaScript detiene toda la página. El bloque <code>try / catch</code> captura el fallo de forma controlada.`,
      sintaxis: `try {
  // Código susceptible a fallar
  let datos = JSON.parse("{ json_invalido }");
} catch (error) {
  // Se ejecuta si ocurre un error sin romper la web
  console.error("Fallo controlado:", error.message);
}`,
      demoHtml: `<button id="btn-demo-error" class="btn btn-danger btn-sm">Simular Error Controlado</button>`,
      ejecutarDemo: function() {
        try {
          JSON.parse("{ clave_sin_comillas: 123 }");
        } catch (err) {
          $('#salida-demo').text(`> [Excepción capturada con éxito por catch]\n> Tipo: ${err.name}\n> Mensaje: ${err.message}\n> La aplicación sigue funcionando normalmente.`);
        }
      }
    }
  };

  // ==========================================================================
  // MANEJADOR DE NAVEGACIÓN DEL MENÚ IZQUIERDO
  // ==========================================================================
  $('.tema-selector').on('click', function(e) {
    e.preventDefault();

    // Resaltar opción seleccionada
    $('.tema-selector').removeClass('activo');
    $(this).addClass('activo');

    const clave = $(this).data('key');
    const tema = temarioJS[clave];

    if (tema) {
      $('#badge-categoria').text(tema.categoria);

      const plantilla = `
        <div>
          <h4 class="text-primary fw-bold mb-3">${tema.titulo}</h4>
          
          <div class="mb-3 text-dark">
            ${tema.explicacion}
          </div>

          <div class="mb-3">
            <label class="form-label fw-bold small text-secondary">Sintaxis y Ejemplo de Código:</label>
            <pre class="bg-dark text-light p-3 rounded small mb-0"><code>${escaparHTML(tema.sintaxis)}</code></pre>
          </div>

          <div class="p-3 bg-light border rounded">
            <label class="form-label fw-bold small text-dark d-block mb-2">Laboratorio Interactivo (Prueba en vivo):</label>
            <div class="mb-2">
              ${tema.demoHtml}
            </div>
            <div id="salida-demo" class="consola-salida small">> Presiona el botón de prueba para ver la salida de ejecución...</div>
          </div>
        </div>
      `;

      $('#contenido-dinamico').hide().html(plantilla).fadeIn(250);

      // Vincular el evento del botón de demostración recién inyectado
      $('#contenido-dinamico').find('button[id^="btn-demo-"], #btn-prueba-jquery').on('click', function() {
        if (typeof tema.ejecutarDemo === 'function') {
          tema.ejecutarDemo();
        }
      });
    }
  });

  // Función auxiliar para mostrar etiquetas HTML como texto seguro en el bloque de código
  function escaparHTML(texto) {
    return texto
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

});
