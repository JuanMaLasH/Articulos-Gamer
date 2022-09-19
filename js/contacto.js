// Change

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

let campoUsuario = document.getElementById("usuario");
campoUsuario.onchange = () => {
    console.log ("Se actualizó el contenido de tu usuario");
    console.log("Contenido actualizado: " + campoUsuario.value);
}

let campoPaís = document.getElementById("país");
campoPaís.onchange = () => {
    console.log ("Se actualizó el contenido de tu país");
    console.log("Contenido actualizado: " + campoPaís.value);
}

const campoMessage = document.getElementById("message");
campoMessage.onchange = () => {
    console.log ("Se actualizó el contenido de tu mensaje");
    console.log("Contenido actualizado: " + campoMessage.value);
}

// Submit

let formulario = document.getElementById("formulario");

formulario.addEventListener("submit", validarFormulario);

function validarFormulario (ev) {
    ev.preventDefault ();
    if ((campoNombre.value=="")||(!isNaN(campoNombre.value))||(campoApellido.value=="")||(!isNaN(campoApellido.value))|| (campoEmail.value=="")||(campoContraseña.value=="")||(campoUsuario.value=="")||(campoPaís.value=="")){
        swal({
            icon: 'error',
            title: 'Ingrese los datos correctamente',
            text: 'El formulario no se ha cargado',
            });
        }
        else {
            swal({
              title: "¡Formulario enviado!",
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
