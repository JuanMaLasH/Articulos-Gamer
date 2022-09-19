class ElementoCarrito {
  constructor(producto, cantidad) {
      this.producto = producto;
      this.cantidad = cantidad;
  }
}

// Constantes

const estandarDolaresAmericanos = Intl.NumberFormat('en-US');

// Arreglos: Productos y Carrito
let lista
let productos = [];
const elementosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

//Referencias

const contenedorProductos = document.getElementById ("contenedor-productos");
const contenedorCarritoCompras = document.getElementById ("items");
const contenedorFinalizarCompra = document.getElementById ("itemsFinalizarCompra");
const contenedorFooterCarrito = document.getElementById ("footer");
const contenedorFooterFinalizarCompra = document.getElementById ("footerFinalizarCompra");
let botonFinalizarCompra = document.getElementById("botonFinalizar");
const botonSiguiente = document.getElementById("botonSiguiente");

// Variables Globales

let totalCarrito

// Ejecución de Funciones

dibujarCatalogoProductos();
obtenerJSON();

// Declaración de Funciones

function dibujarCarrito () {

  totalCarrito = 0;

  contenedorCarritoCompras.innerHTML = "";

  elementosCarrito.forEach (
    (elemento) => {
      let renglonCarrito = document.createElement("tr");

      renglonCarrito.innerHTML = `
        <td>${elemento.producto.id}</td>
        <td>${elemento.producto.nombre}</td>
        <td><input id="cantidad-producto-${elemento.producto.id}" type="number" value="${elemento.cantidad}" min="1" max="100" setp="1" style="width: 40px;" /></input>
        <td>$${estandarDolaresAmericanos.format(elemento.producto.precio)}</td>
        <td>$${estandarDolaresAmericanos.format(elemento.producto.precio*elemento.cantidad)}</td>
        <td><button onclick = "eliminarDelCarrito(${elemento.producto.id})" class= "botonEliminar">🗑️</button></td>
      `;

      contenedorCarritoCompras.append(renglonCarrito);

      totalCarrito += elemento.cantidad*elemento.producto.precio;

      let inputCantidadProductos = document.getElementById (`cantidad-producto-${elemento.producto.id}`);
      inputCantidadProductos.addEventListener("change", (e) => {
        let nuevaCantidad = e.target.value;
        elemento.cantidad = nuevaCantidad;
        dibujarCarrito ();
      });
    }
  );

        if (elementosCarrito.lenth == 0) {
          contenedorFooterCarrito.innerHTML = ` 
          <th scope="row" colspan="5" class="text-center">Carrito vacío</th>
          `;
        } else { contenedorFooterCarrito.innerHTML = `
          <th scope="row" colspan="5" class="text-end">Total: $${estandarDolaresAmericanos.format(totalCarrito)}</th>
          `;}

localStorage.setItem("elementosCarrito", JSON.stringify(elementosCarrito));

}

function finalizarCompra () {

  contenedorFinalizarCompra.innerHTML = "";

  let renglonCarritoMedioPago = document.createElement("div");
  
  let totalAPagar = totalCarrito;
  
  renglonCarritoMedioPago.innerHTML= `
  <div class="row seleccionarMedioPago text-center">
  <label for="input" class="form-label"><strong>Medio de pago</strong></label>
  <select class="form-select seleccionarMedioPago">
    <option selected class="text-center">Selecciona</option>
    <option class="text-center">Tarjeta de débito con 20% de descuento</option>
    <option class="text-center">Tarjeta de crédito: 3 cuotas s/interés</option>
    <option class="text-center">Tarjeta de crédito: 6 cuotas s/interés</option>
    <option class="text-center">Tarjeta de crédito: 9 cuotas s/interés</option>
    <option class="text-center">Tarjeta de crédito: 12 cuotas s/interés</option>
  </select>
  </div> 
  `;

  renglonCarritoMedioPago.onclick = (e) => {
    switch (e.target.value) {
      case "Tarjeta de débito con 20% de descuento": 
        totalAPagar = parseFloat(totalCarrito*0.80).toFixed(2);
        contenedorFinalizarCompra.innerHTML = `
        <th scope="row" colspan="5" class="text-center"><strong> Total a pagar con tarjeta de débito: $${estandarDolaresAmericanos.format(totalAPagar)}</strong></th>`;
        break;
      case "Tarjeta de crédito: 3 cuotas s/interés":
        totalAPagar = parseFloat(totalCarrito / 3).toFixed(2);
        contenedorFinalizarCompra.innerHTML = `
        <th scope="row" colspan="5" class="text-center"><strong> Total a pagar con tarjeta de crédito en 3 cuotas sin interés de: $${estandarDolaresAmericanos.format(totalAPagar)}</strong></th>`;
        break;
      case "Tarjeta de crédito: 6 cuotas s/interés":
        totalAPagar = parseFloat(totalCarrito / 6).toFixed(2);
        contenedorFinalizarCompra.innerHTML = `
        <th scope="row" colspan="5" class="text-center"><strong> Total a pagar con tarjeta de crédito en 6 cuotas sin interés de: $${estandarDolaresAmericanos.format(totalAPagar)}</strong></th>`;
        break;
      case "Tarjeta de crédito: 9 cuotas s/interés":
        totalAPagar = parseFloat(totalCarrito / 9).toFixed(2); 
        contenedorFinalizarCompra.innerHTML = `
        <th scope="row" colspan="5" class="text-center"><strong> Total a pagar con tarjeta de crédito en 9 cuotas sin interés de: $${estandarDolaresAmericanos.format(totalAPagar)}</strong></th>`;   
        break;  
      case "Tarjeta de crédito: 12 cuotas s/interés":
        totalAPagar = parseFloat(totalCarrito / 12).toFixed(2);
        contenedorFinalizarCompra.innerHTML= `                   <th scope="row" colspan="5" class="text-center"><strong> Total a pagar con tarjeta de crédito en 12 cuotas sin interés de: $${estandarDolaresAmericanos.format(totalAPagar)}</strong></th>`;
        break;
      default: 
      totalAPagar = 0;
    }
    }
  contenedorFinalizarCompra.append(renglonCarritoMedioPago);
}

function crearCard (producto) {
  // Botón
  let botonAgregar = document.createElement ("button");
  botonAgregar.className = "btn btn-primary";
  botonAgregar.innerText = "Agregar al carrito";
  // Card Body
  let cuerpoCarta = document.createElement("div");
  cuerpoCarta.className = "card-body";
  cuerpoCarta.innerHTML = `
        <h5>ID: ${producto.id}</h5>
        <p>${producto.nombre}</p>
        <p>Precio: $${estandarDolaresAmericanos.format(producto.precio)}</p>
  `;
  cuerpoCarta.append(botonAgregar);
  // Imagen
  let imagen = document.createElement("img");
  imagen.src = producto.foto;
  imagen.className = "card-img-top fotoArticulo";
  imagen.atl = producto.nombre;
  // Card
  let carta = document.createElement("div");
  carta.className = "card col-xs-12 col-sm-6 col-md-4 text-center p-2";
  carta.append(imagen);
  carta.append(cuerpoCarta);

  // Evento a Botón Card
  botonAgregar.onclick = (e) => {
    let elementoCarrito = new ElementoCarrito (producto, 1);
    elementosCarrito.push(elementoCarrito);

    dibujarCarrito();

    swal({
      title: "¡Producto agregado!",
      text: `${producto.nombre}`,
      icon: "success",
      buttons: {
          cerrar: {
              text: "Cerrar",
              value: false
          },
          carrito: {
              text: "Ir a carrito",
              value: true
          }
      }
  }).then((irACarrito) => {

      if(irACarrito) {
          //swal("Vamos al carrito!");
          const myModal = new bootstrap.Modal(document.getElementById('exampleModalToggle'), {keyboard: true});
          const modalToggle = document.getElementById('toggleMyModal'); 
          myModal.show(modalToggle);
          }
      });
  }
  return carta;
}

function dibujarCatalogoProductos () {
  contenedorProductos.innerHTML = "";

  productos.forEach (
    (producto) => {
      let contenedorCarta = crearCard (producto);
      contenedorProductos.append(contenedorCarta);
    }
  );
}

// Eliminar producto del carrito

const eliminarDelCarrito = (productoID) => {
  const par = elementosCarrito.find(e => e.producto.id == productoID);
  const indice = elementosCarrito.indexOf(par);
  elementosCarrito.splice(indice, 1);
  dibujarCarrito();
}

  // Incorporación de productos.json

  async function obtenerJSON() {
    const URLJSON="/js/productos.json"
    const resp=await fetch(URLJSON)
    const data= await resp.json()
    productos = data;
    dibujarCatalogoProductos();
  } 

  
  // Selección de categoría de productos

    //Evento-Cuando la ventana está cargada
    window.onload=()=>{
      //selector y evento change
      document.getElementById("miSeleccion").setAttribute("option", "pordefecto");
      document.getElementById("miSeleccion").onchange=()=>seleccionarCategoría();
    };

  function seleccionarCategoría() {
    let seleccion = document.getElementById("miSeleccion").value;
    if (seleccion == "menor") {
        productos.sort(function(a, b) {
            return a.precio - b.precio
        });
    } else if (seleccion == "mayor") {
        productos.sort(function(a, b) {
            return b.precio - a.precio
        });
    } 
    contenedorProductos.innerHTML="";
    dibujarCatalogoProductos();
} 

 // Datos para finalizar la compra
 // Evento Change

let campoNombre = document.getElementById("nombre");
campoNombre.onchange = () => {
    console.log ("Se actualizó el contenido de tu nombre");
    console.log("Contenido actualizado: " + campoNombre.value);
}

let campoApellido = document.getElementById("apellido");
campoApellido.onchange = () => {
    console.log ("Se actualizó el contenido de tu apellido");
    console.log("Contenido actualizado: " + campoApellido.value);
}

let campoEmail = document.getElementById("email");
campoEmail.onchange = () => {
    console.log ("Se actualizó el contenido de tu email");
    console.log("Contenido actualizado: " + campoEmail.value);
}

let campoContraseña = document.getElementById("contraseña");
campoContraseña.onchange = () => {
    console.log ("Se actualizó el contenido de tu contraseña");
    console.log("Contenido actualizado: " + campoContraseña.value);
}

let campoDirección = document.getElementById("dirección");
campoDirección.onchange = () => {
    console.log ("Se actualizó el contenido de tu dirección");
    console.log("Contenido actualizado: " + campoDirección.value);
}

let campoLocalidad = document.getElementById("localidad");
campoLocalidad.onchange = () => {
    console.log ("Se actualizó el contenido de tu localidad");
    console.log("Contenido actualizado: " + campoLocalidad.value);
}

let campoCP = document.getElementById("códigoPostal");
campoCP.onchange = () => {
    console.log ("Se actualizó el contenido de tu Código Postal");
    console.log("Contenido actualizado: " + campoCP.value);
}

let campoNúmerosTarjeta = document.getElementById("númerosTarjeta");
campoNúmerosTarjeta.onchange = () => {
    console.log ("Se actualizó el contenido de los números de la tarjeta");
    console.log("Contenido actualizado: " + campoNúmerosTarjeta.value);
}

let campoVencimiento = document.getElementById("vencimiento");
campoVencimiento.onchange = () => {
    console.log ("Se actualizó el contenido del vencimiento de tu tarjeta");
    console.log("Contenido actualizado: " + campoVencimiento.value);
}

let campoCódigoSeguridad = document.getElementById("códigoSeguridad");
campoCódigoSeguridad.onchange = () => {
    console.log ("Se actualizó el contenido del código de seguridad de tu tarjeta");
    console.log("Contenido actualizado: " + campoCódigoSeguridad.value);
}

let formulario = document.getElementById("formulario");
formulario.addEventListener("submit", validarFormulario)

  function validarFormulario (ev) {
    ev.preventDefault ();
    if ((campoNombre.value=="")||(!isNaN(campoNombre.value))||(campoApellido.value=="")||(!isNaN(campoApellido.value))|| (campoEmail.value=="")||(campoContraseña.value=="")||(campoDirección.value=="")||(campoLocalidad.value=="")||(campoCP.value=="")||(campoNúmerosTarjeta.value=="")||(campoVencimiento.value=="")||(campoCódigoSeguridad.value=="")){
        swal({
            icon: 'error',
            title: 'Ingrese los datos correctamente',
            text: 'La compra no se ha efectuado',
            });
        }
        else {
            swal({
              title: "¡Compra realizada con éxito!",
              icon: "success",
              buttons: {
                  cerrar: {
                      text: "Cerrar",
                      value: false
                  },
              }
          })
          }
        }

