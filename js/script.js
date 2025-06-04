document.addEventListener("DOMContentLoaded", function () {
  const testUsuario = {
    usuario: "test",
    contrasena: "1234",
    correo: "test@email.com"
  };

  // Asegura que el usuario de prueba siempre esté
  const usuariosExistentes = JSON.parse(localStorage.getItem("usuarios") || "[]");
  const yaExiste = usuariosExistentes.some(u => u.usuario === testUsuario.usuario);
  if (!yaExiste) {
    usuariosExistentes.push(testUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuariosExistentes));
  }

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const forgotForm = document.getElementById("forgotForm");

  function getUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios") || "[]");
  }

  function setUsuarios(lista) {
    localStorage.setItem("usuarios", JSON.stringify(lista));
  }

  // === LOGIN ===
  if (loginForm) {
    const errorBox = document.getElementById("loginError");
    const userInput = document.getElementById("usuario");
    const passInput = document.getElementById("contrasena");

    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const usuario = userInput.value.trim();
      const contrasena = passInput.value.trim();
      const usuarios = getUsuarios();

      errorBox.style.display = "none";
      errorBox.innerText = "";

      const encontrado = usuarios.find(u => u.usuario === usuario);

      if (!encontrado) {
        errorBox.innerText = "El usuario no está registrado.";
        errorBox.style.display = "block";
      } else if (encontrado.contrasena !== contrasena) {
        errorBox.innerText = "Contraseña incorrecta.";
        errorBox.style.display = "block";
      } else {
        localStorage.setItem("usuarioActual", encontrado.usuario);
        window.location.href = "dashboard.html";
      }
    });

    [userInput, passInput].forEach(input => {
      input.addEventListener("input", () => {
        errorBox.style.display = "none";
        errorBox.innerText = "";
      });
    });
  }

  // === REGISTRO ===
  if (registerForm) {
    const userInput = document.getElementById("regUsuario");
    const passInput = document.getElementById("regContrasena");
    const emailInput = document.getElementById("regCorreo");
    const errorBox = document.getElementById("registerError");

    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const usuario = userInput.value.trim();
      const contrasena = passInput.value.trim();
      const correo = emailInput.value.trim();
      const usuarios = getUsuarios();

      errorBox.style.display = "none";
      errorBox.innerText = "";

      if (usuario.length < 3 || contrasena.length < 4) {
        errorBox.innerText = "El usuario debe tener al menos 3 caracteres y la contraseña 4.";
        errorBox.style.display = "block";
        return;
      }

      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
      if (!emailValido) {
        errorBox.innerText = "Por favor ingresá un correo válido.";
        errorBox.style.display = "block";
        return;
      }

      const existe = usuarios.find(u => u.usuario === usuario);
      if (existe) {
        errorBox.innerText = "Ese usuario ya existe.";
        errorBox.style.display = "block";
        return;
      }

      usuarios.push({ usuario, contrasena, correo });
      setUsuarios(usuarios);
      window.location.href = "index.html";
    });

    [userInput, passInput, emailInput].forEach(input => {
      input.addEventListener("input", () => {
        errorBox.style.display = "none";
        errorBox.innerText = "";
      });
    });
  }

  // === RECUPERAR CONTRASEÑA ===
  if (forgotForm) {
    const emailInput = document.getElementById("forgotEmail");
    const errorBox = document.getElementById("forgotError");
    const successBox = document.getElementById("forgotSuccess");

    forgotForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = emailInput.value.trim();
      const usuarios = getUsuarios();

      errorBox.style.display = "none";
      successBox.style.display = "none";
      errorBox.innerText = "";
      successBox.innerText = "";

      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailValido) {
        errorBox.innerText = "Por favor ingresá un correo válido.";
        errorBox.style.display = "block";
        return;
      }

      const encontrado = usuarios.find(u => u.correo === email);
      if (!encontrado) {
        errorBox.innerText = "El correo no está registrado.";
        errorBox.style.display = "block";
        return;
      }

      successBox.innerText = "Te enviamos un enlace para restablecer tu contraseña.";
      successBox.style.display = "block";
      forgotForm.reset();
    });

    emailInput.addEventListener("input", () => {
      errorBox.style.display = "none";
      successBox.style.display = "none";
    });
  }
});

// === TOGGLE PASSWORD ===
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const icon = input.nextElementSibling.querySelector("i");

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}
