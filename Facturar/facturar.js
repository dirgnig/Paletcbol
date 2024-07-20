//Boton pagar

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario');
  const resultado = document.getElementById('resultado');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe de la forma tradicional
    guardarDatos(event);
  });
});

const datos = [];

function guardarDatos(event) {
  const resultado = document.getElementById('resultado');
  resultado.textContent = ''; // Limpiar el resultado al intentar enviar

  const nombre = document.getElementById('nombre').value;
  const cedula = document.getElementById('cedula').value;
  const metodoPagar = document.querySelector('input[name="metodoPagar"]:checked').value;
  const precioTotal = parseFloat(document.getElementById('precioTotal').value);
  const monto = parseFloat(document.getElementById('monto').value);
  const vuelto = monto - precioTotal;

  // Depuración: Verificar los valores de 'precioTotal' y 'monto'
  console.log('Precio total ingresado:', precioTotal);
  console.log('Monto ingresado:', monto);

  if (isNaN(precioTotal) || precioTotal <= 0) {
    resultado.textContent = 'Por favor, ingrese un precio total válido mayor que 0.';
    resultado.style.color = 'red';
    return;
  }

  if (isNaN(monto) || monto <= 0) {
    resultado.textContent = 'Por favor, ingrese un monto válido mayor que 0.';
    resultado.style.color = 'red';
    return;
  }

  if (monto >= precioTotal) {
    resultado.textContent = `Pago realizado con éxito. Su vuelto es $${vuelto.toFixed(2)}`;
    resultado.style.color = 'green';
    
    // Deshabilitar los campos después del pago exitoso
    document.getElementById('monto').disabled = true;
    document.getElementById('precioTotal').disabled = true;
  } else {
    resultado.textContent = 'El monto ingresado es insuficiente para realizar el pago.';
    resultado.style.color = 'red';
    return;
  }

  const persona = {
    nombre,
    cedula,
    metodoPagar,
    precioTotal,
    monto,
    vuelto
  };
  
  datos.push(persona);
  document.getElementById('formulario').reset();
}

function cargarDatos() {
  const datosPersonalesDiv = document.getElementById('datosPersonales');
  datosPersonalesDiv.innerHTML = '';

  datos.forEach(persona => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p>Nombre: ${persona.nombre}</p>
      <p>Cédula: ${persona.cedula}</p>
      <p>Método de Pago: ${persona.metodoPagar}</p>
      <p>Precio Total: $${persona.precioTotal.toFixed(2)}</p>
      <p>Monto Pagado: $${persona.monto.toFixed(2)}</p>
      <p>Vuelto: $${persona.vuelto.toFixed(2)}</p>
      <hr>
    `;
    datosPersonalesDiv.appendChild(div);
  });
}
