const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {

  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  edad: /^\d{1,5}$/, // 1 a 3 numeros.
};

const campos = {
  nombre: false,
  apellidoP: false,
  apellidoM: false,
  carrera: false,
  estatura: false,
  correo: false,
  grupo: false,
  edad: false
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombre":
      validarCampo(expresiones.nombre, e.target,"nombre");
      break;
    case "apellidoP":
      validarCampo(expresiones.nombre, e.target, "apellidoP");
      break;
      
      case "apellidoM":
        validarCampo(expresiones.nombre, e.target, "apellidoM");
        break;
    case "carrera":
      validarCampo(expresiones.nombre, e.target, "carrera");
      break;
    case "estatura":
        validarCampo(expresiones.edad, e.target, "estatura");
        break;
    case "correo":
      validarCampo(expresiones.correo, e.target, "correo");
      break;
    case "grupo":
      validarCampo(expresiones.edad, e.target, "grupo");
      break;
    
    case "edad":
        validarCampo(expresiones.edad, e.target, "edad");
        break;
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-correcto");
    document.querySelector(`#grupo__${campo} span`).textContent = "error";
    document.querySelector(`#grupo__${campo} span`).textContent = "check";
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    campos[campo] = true;
  } else {
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-correcto");
    document.querySelector(`#grupo__${campo} span`).textContent = "check";
    document.querySelector(`#grupo__${campo} span`).textContent = "error";
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
    campos[campo] = false;
  }
};



inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  
    const formData = new FormData(formulario);
    console.log(formData);
    fetch("guardar.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          document
            .getElementById("formulario__mensaje-exito")
            .classList.add("formulario__mensaje-exito-activo");
          setTimeout(() => {
            document
              .getElementById("formulario__mensaje-exito")
              .classList.remove("formulario__mensaje-exito-activo");
          }, 5000);

          document
            .querySelectorAll(".formulario__grupo-correcto")
            .forEach((icono) => {
              icono.classList.remove("formulario__grupo-correcto");
            });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Ocurrió un error al enviar el formulario");
        document.getElementById("formulario__mensaje").textContent =
          "Error: Intentelo mas Tarde";
        setTimeout(() => {
            document.getElementById("formulario__mensaje")
            .classList.add("formulario__mensaje-activo");
        }, 5000);
      });
    // formulario.reset();
  
});
