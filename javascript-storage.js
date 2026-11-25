$(document).ready(function() {

  // Renderizar tablas leyendo directamente la memoria del navegador
  function renderizarTablas() {
    // 1. Pintar localStorage
    let htmlLocal = "";
    if (localStorage.length === 0) {
      htmlLocal = `<tr><td colspan="3" class="text-center text-muted">Sin datos en localStorage</td></tr>`;
    } else {
      for (let i = 0; i < localStorage.length; i++) {
        const clave = localStorage.key(i);
        const valor = localStorage.getItem(clave);
        htmlLocal += `
          <tr>
            <td class="fw-bold">${clave}</td>
            <td class="text-break"><code>${valor}</code></td>
            <td>
              <button class="btn btn-outline-danger btn-sm py-0 btn-eliminar-item" data-tipo="local" data-clave="${clave}">
                Borrar
              </button>
            </td>
          </tr>`;
      }
    }
    $('#tabla-local').html(htmlLocal);

    // 2. Pintar sessionStorage
    let htmlSession = "";
    if (sessionStorage.length === 0) {
      htmlSession = `<tr><td colspan="3" class="text-center text-muted">Sin datos en sessionStorage</td></tr>`;
    } else {
      for (let i = 0; i < sessionStorage.length; i++) {
        const clave = sessionStorage.key(i);
        const valor = sessionStorage.getItem(clave);
        htmlSession += `
          <tr>
            <td class="fw-bold">${clave}</td>
            <td class="text-break"><code>${valor}</code></td>
            <td>
              <button class="btn btn-outline-danger btn-sm py-0 btn-eliminar-item" data-tipo="session" data-clave="${clave}">
                Borrar
              </button>
            </td>
          </tr>`;
      }
    }
    $('#tabla-session').html(htmlSession);
  }

  // Carga inicial
  renderizarTablas();

  // Guardar clave/valor manual
  $('#form-storage').on('submit', function(e) {
    e.preventDefault();
    const tipo = $('#storage-tipo').val();
    const clave = $('#storage-clave').val().trim();
    const valor = $('#storage-valor').val().trim();

    if (tipo === 'local') {
      localStorage.setItem(clave, valor);
    } else {
      sessionStorage.setItem(clave, valor);
    }

    $('#form-storage')[0].reset();
    renderizarTablas();
  });

  // Guardar ejemplo de objeto serializado con JSON.stringify
  $('#btn-guardar-objeto').on('click', function() {
    const perfilUsuario = {
      usuario: "superusuario",
      curso: "JavaScript Avanzado",
      activo: true,
      ultimoAcceso: new Date().toLocaleTimeString()
    };

    localStorage.setItem('perfil_demo_json', JSON.stringify(perfilUsuario));
    renderizarTablas();
  });

  // Eliminar un elemento individual
  $(document).on('click', '.btn-eliminar-item', function() {
    const tipo = $(this).data('tipo');
    const clave = $(this).data('clave');

    if (tipo === 'local') {
      localStorage.removeItem(clave);
    } else {
      sessionStorage.removeItem(clave);
    }
    renderizarTablas();
  });

  // Refrescar manualmente
  $('#btn-refrescar-storage').on('click', function() {
    renderizarTablas();
  });

  // Vaciar ambos almacenamientos
  $('#btn-vaciar-todo').on('click', function() {
    localStorage.clear();
    sessionStorage.clear();
    renderizarTablas();
  });

});
