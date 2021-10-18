'use strict';

function agregarProducto() {
    let productos = new Array();
    const elementos = parseInt(prompt("Cuantos productos quieres agregar?"));
    for (let i = 0; i < elementos; i++) {
        const codigo = prompt("Introduce el codigo del producto: ");
        const producto = prompt("Introduce el nombre de producto: ");
        const cantidad = parseInt(prompt("Introduce la cantidad: "));
        const precio = parseFloat(prompt("Introduce el precio: "));
        const marca = parseFloat(prompt("Introduce la marca: "));

        productos.push(new Array(codigo, producto, cantidad, precio, marca));
    }
    return productos;
}

function getCells(data, type) {
  let fila = data.map(cell => `<${type}>${cell}</${type}>`).join('');
  if (data.length >= 1 && type == 'td') {
    fila += `<td><input type="submit" value="Eliminar producto" onclick="eliminar(); "/><input type="submit" value="Ver producto" onclick="ver(); "/></td>`;
  }
  return fila;
}

function createBody(data) {
  return data.map((row, idx) => `<tr id="${idx}">${getCells(row, 'td')}</tr>`).join('');
}

function createTable(data) {
  let cabeceras = ['Codigo', 'Nombre', 'Cantidad', 'Precio', 'Marca', 'Acciones'];
  return `
    <table>
      <thead>${getCells(cabeceras, 'th')}</thead>
      <tbody id="cuerpo">${createBody(data)}</tbody>
    </table>
  `;
}

function crearItems() {
    const productosAux = agregarProducto();
    const addHtml = createBody(productosAux);
    document.getElementById("cuerpo").innerHTML += addHtml;
}

function eliminar() {
  document.querySelector("table").addEventListener("click", function(event){
    console.log(event.target.parentNode.parentNode);
    event.target.parentNode.parentNode.remove();
  }, false);
}

function ver() {
  alert("Detalle del producto: " + Object.values(event.target.parentNode.parentNode));
}

document.body.insertAdjacentHTML('beforeend', createTable([]));
