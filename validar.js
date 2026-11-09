$(document).ready(function() {
  var listaUsuarios = [];

  // Función auxiliar para alertas
  function mostrarAlerta(mensaje, tipo) {
    var $alert = $('#alert-box');
    $alert.removeClass('d-none alert-success alert-danger alert-warning')
          .addClass('alert-' + tipo)
          .html(mensaje);
  }

  function ocultarAlerta() {
    $('#alert-box').addClass('d-none');
  }

  // 1. CARGA INICIAL DE DATOS: Ignorando localStorage y leyendo siempre del JSON
  $.getJSON('parametros.json', function(data) {
    listaUsuarios = data;
  }).fail(function() {
    console.error("Error crítico: No se pudo leer el archivo parametros.json.");
    mostrarAlerta('No se pudo cargar el archivo de configuración <strong>parametros.json</strong>. Verifique que esté en la misma ruta y que esté usando un servidor local (Live Server).', 'danger');
  });

  // Verificar sesión activa existente
  var usuarioLogueado = sessionStorage.getItem('usuario_activo');
  if (usuarioLogueado) {
    mostrarEstadoSesion(usuarioLogueado);
  }

  function mostrarEstadoSesion(usuario) {
    $('#form-login').hide();
    $('#session-active-info').removeClass('d-none');
    $('#active-user-name').text(usuario);
  }

  // 2. VALIDACIÓN E INICIO DE SESIÓN
  $('#form-login').on('submit', function(e) {
    e.preventDefault();
    ocultarAlerta();

    var inputUsuario = $('#login-usuario').val().trim();
    var inputClave = $('#login-clave').val().trim();

    // REGLA 1: Evitar acceso simultáneo si el mismo usuario ya tiene sesión activa en esta pestaña/navegador
    var usuarioActivo = sessionStorage.getItem('usuario_activo');
    if (usuarioActivo === inputUsuario) {
      mostrarAlerta('El usuario <strong>' + inputUsuario + '</strong> ya tiene una sesión activa abierta en este navegador.', 'warning');
      return;
    }

    // Buscar coincidencia en la lista cargada desde el JSON
    var usuarioEncontrado = listaUsuarios.find(function(item) {
      return item.usuario === inputUsuario && item.clave === inputClave;
    });

    if (usuarioEncontrado) {
      // REGLA NUEVA: Validar si está activo o inactivo
      if (usuarioEncontrado.activo === false || usuarioEncontrado.activo === "false") {
        mostrarAlerta('El acceso está denegado. El usuario <strong>' + inputUsuario + '</strong> se encuentra inactivo.', 'danger');
        return;
      }

      // Si todo es correcto, iniciar sesión
      sessionStorage.setItem('usuario_activo', usuarioEncontrado.usuario);
      mostrarAlerta('¡Acceso concedido! Bienvenido/a ' + usuarioEncontrado.usuario + '.', 'success');
      mostrarEstadoSesion(usuarioEncontrado.usuario);
      $('#form-login')[0].reset();
    } else {
      mostrarAlerta('Usuario o clave incorrectos. Verifique sus parámetros.', 'danger');
    }
  });

  // 3. CERRAR SESIÓN
  $('#btn-logout').click(function() {
    sessionStorage.removeItem('usuario_activo');
    $('#session-active-info').addClass('d-none');
    $('#form-login').show();
    mostrarAlerta('Sesión cerrada correctamente.', 'info');
  });

  // 4. REGISTRO DE NUEVOS USUARIOS 
  // (Nota: Como ya no se guarda en localStorage, los registros nuevos solo vivirán 
  // en memoria durante la sesión actual y desaparecerán al recargar la página).
  $('#form-registro').on('submit', function(e) {
    e.preventDefault();
    ocultarAlerta();

    var nuevoUsuario = $('#reg-usuario').val().trim();
    var nuevaClave = $('#reg-clave').val().trim();
    var nuevoTelefono = $('#reg-telefono').val().trim();
    var nuevaIp = $('#reg-ippublica').val().trim();
    var esActivo = $('#reg-activo').is(':checked');

    // Verificar si el usuario ya existe en la lista del JSON
    var existe = listaUsuarios.some(function(item) {
      return item.usuario === nuevoUsuario;
    });

    if (existe) {
      mostrarAlerta('El nombre de usuario <strong>' + nuevoUsuario + '</strong> ya se encuentra registrado.', 'warning');
      return;
    }

    // Crear el objeto del nuevo usuario temporal
    var nuevoRegistro = {
      usuario: nuevoUsuario,
      clave: nuevaClave,
      telefono: nuevoTelefono,
      ippublica: nuevaIp,
      activo: esActivo
    };

    // Agregar a la lista en memoria (se borrará al recargar la página)
    listaUsuarios.push(nuevoRegistro);

    mostrarAlerta('Usuario <strong>' + nuevoUsuario + '</strong> registrado con éxito (temporal).', 'success');
    $('#form-registro')[0].reset();
    $('#reg-activo').prop('checked', true);
    
    setTimeout(function() {
      $('#login-tab').tab('show');
    }, 1500);
  });
});
