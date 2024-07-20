//Bienvenida
alert('Bienvenidos a paletcbol');


// Función para mostrar el loading
function showLoading() {
    document.getElementById('loading').style.display = 'flex';
    document.getElementById('site').style.display = 'none';
}
  
// Función para ocultar el loading y mostrar el sitio
function hideLoading() {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('site').style.display = 'block';
}
  
// Mostrar el loading al cargar la página
window.onload = showLoading;
  
// Ocultar el loading después de 2 segundos (puedes ajustar el tiempo según sea necesario)
setTimeout(hideLoading, 1000);


// ADICIONALES - SOLO SELECCIONAR 2 checkbox si selecciona mas de dos veces se actualiza la pagina web.
let checks = 2;
let checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('click', (e) => {
    if (checkboxes.filter((checkbox) => checkbox.checked).length > checks){
      alert('Solo puedes seleccionar 2 no mas.');
      location.reload();
    }
  });
});



//Boton de enviar
function enviar() {
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let radioSeleccionado = false;
  let checkboxSeleccionado = false;

  // Verificar si algún radio button está seleccionado
  for (const radio of radioButtons) {
      if (radio.checked) {
          radioSeleccionado = true;
          break;
      }
  }

  // Verificar si alguna casilla está seleccionada
  for (const checkbox of checkboxes) {
      if (checkbox.checked) {
          checkboxSeleccionado = true;
          break;
      }
  }
  
  const mensaje = document.getElementById("mensaje");

  if (!radioSeleccionado || !checkboxSeleccionado) {
      alert("Por favor, llena todos los campos.");
  } else {
      alert("Se envió con éxito.");
  }


  //Cosas que vienen siendo parte del boton enviar
  const frutas = document.querySelector('input[name="frutas"]:checked');
  const sabores = document.querySelector('input[name="sabores"]:checked');
  const adicionales = document.querySelectorAll('input[name="adicionales"]:checked');

  if (!frutas && !sabores) {
    alert("Por favor, seleccione al menos una paleta.");
    return;
  }

  /*const seleccion = {
    frutas: frutas ? frutas.value.split('-')[0] : null,
    sabores: sabores ? sabores.value.split('-')[0] : null,
    adicionales: Array.from(adicionales).map(adicional => adicional.value.split('-')[0]),
    total: calcularTotal(frutas, sabores, adicionales)
  };*/

  guardarEnLocalStorage(seleccion);
  alert("Datos enviados y guardados.");
  window.location.href = 'Facturar/facturar.html';
}


// Función para enviar los datos
function enviar() {
  const frutas = document.querySelector('input[name="frutas"]:checked');
  const sabores = document.querySelector('input[name="sabores"]:checked');
  const adicionales = document.querySelectorAll('input[name="adicionales"]:checked');

  if (!frutas && !sabores) {
    alert("Por favor, seleccione al menos una paleta.");
    return;
  }

  const seleccion = {
    frutas: frutas ? frutas.value.split('-')[0] : null,
    sabores: sabores ? sabores.value.split('-')[0] : null,
    adicionales: Array.from(adicionales).map(adicional => adicional.value.split('-')[0]),
    total: calcularTotal(frutas, sabores, adicionales)
  };

  guardarEnLocalStorage(seleccion);
  alert("Datos enviados y guardados.");
  window.location.href = 'Facturar/facturar.html';
}

// Función para calcular el total
function calcularTotal(frutas, sabores, adicionales) {
  let total = 0;
  if (frutas) {
    total += parseFloat(frutas.value.split('-')[1]);
  }
  if (sabores) {
    total += parseFloat(sabores.value.split('-')[1]);
  }
  adicionales.forEach(adicional => {
    total += parseFloat(adicional.value.split('-')[1]);
  });
  return total;
}

// Función para guardar los datos en localStorage
function guardarEnLocalStorage(seleccion) {
  let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
  pedidos.push(seleccion);
  localStorage.setItem('pedidos', JSON.stringify(pedidos));
}
