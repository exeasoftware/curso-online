$(document).ready(function() {

  function escribirConsola(texto) {
    $('#consola-fetch').text(texto);
  }

  $('#btn-limpiar-fetch').on('click', function() {
    escribirConsola('> Consola limpia. Esperando petición...');
  });

  // 1. GET: Obtener IP pública (igual que en tu módulo de registro)
  $('#btn-fetch-ip').on('click', async function() {
    escribirConsola('> Ejecutando: fetch("https://api.ipify.org?format=json")...');
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      escribirConsola(
        `> Estado HTTP: ${response.status} OK\n` +
        `> Respuesta JSON recibida:\n${JSON.stringify(data, null, 2)}`
      );
    } catch (error) {
      escribirConsola(`> Error en fetch: ${error.message}`);
    }
  });

  // 2. GET: Obtener lista de usuarios desde API de pruebas JSONPlaceholder
  $('#btn-fetch-users').on('click', async function() {
    escribirConsola('> Consultando usuarios de prueba...');
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=3');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const usuarios = await response.json();
      const resumen = usuarios.map(u => ({ id: u.id, nombre: u.name, email: u.email }));

      escribirConsola(
        `> Se recibieron ${usuarios.length} registros:\n` +
        JSON.stringify(resumen, null, 2)
      );
    } catch (error) {
      escribirConsola(`> Error al consultar usuarios: ${error.message}`);
    }
  });

  // 3. GET: Leer archivo local parametros.json (requiere Live Server)
  $('#btn-fetch-local').on('click', async function() {
    escribirConsola('> Intentando leer archivo local parametros.json...');
    try {
      const response = await fetch('parametros.json');
      if (!response.ok) throw new Error(`No encontrado (HTTP ${response.status})`);

      const datosLocales = await response.json();
      escribirConsola(
        `> Archivo parametros.json leído correctamente:\n` +
        JSON.stringify(datosLocales, null, 2)
      );
    } catch (error) {
      escribirConsola(
        `> No se pudo leer parametros.json: ${error.message}\n` +
        `> Nota: Asegúrate de que parametros.json exista en la misma carpeta y estés ejecutando el proyecto con un servidor local (como Live Server en VS Code) para evitar bloqueos CORS.`
      );
    }
  });

  // 4. POST: Enviar datos JSON al servidor
  $('#form-fetch-post').on('submit', async function(e) {
    e.preventDefault();

    const payload = {
      usuario: $('#post-nombre').val().trim(),
      rol: $('#post-rol').val().trim(),
      fechaRegistro: new Date().toISOString()
    };

    escribirConsola(`> Enviando petición POST con cuerpo:\n${JSON.stringify(payload, null, 2)}\n> Esperando confirmación...`);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(payload)
      });

      const respuestaServidor = await response.json();
      escribirConsola(
        `> ¡Petición POST exitosa! (Código HTTP ${response.status} Created)\n` +
        `> Respuesta devuelta por el servidor:\n${JSON.stringify(respuestaServidor, null, 2)}`
      );
    } catch (error) {
      escribirConsola(`> Error en envío POST: ${error.message}`);
    }
  });

});
