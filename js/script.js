// --- Init storage ---
let users = JSON.parse(localStorage.getItem('users')) || [];
if (!users.length) {
  users = [{ username: 'test', email: 'test@local', password: 'test' }];
  localStorage.setItem('users', JSON.stringify(users));
}
function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}

// --- Helpers ---
function togglePassword(fieldId, iconId) {
  const inp = document.getElementById(fieldId);
  const ic  = document.getElementById(iconId);
  if (inp.type === 'password') {
    inp.type = 'text';
    ic.classList.replace('fa-eye','fa-eye-slash');
  } else {
    inp.type = 'password';
    ic.classList.replace('fa-eye-slash','fa-eye');
  }
}
function showMessage(msg, type) {
  const c = document.getElementById('message');
  if (c) c.innerHTML = `<div class="message ${type}">${msg}</div>`;
}
function clearMessage() {
  const c = document.getElementById('message');
  if (c) c.innerHTML = '';
}
function validEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

// --- Registro ---
const regForm = document.getElementById('registerForm');
if (regForm) {
  regForm.addEventListener('submit', e => {
    e.preventDefault();
    clearMessage();

    const u  = document.getElementById('regUsuario').value.trim();
    const em = document.getElementById('regEmail').value.trim();
    const p  = document.getElementById('regPassword').value.trim();
    const c  = document.getElementById('regConfirmPassword').value.trim();

    if (!u || !em || !p || !c) {
      return showMessage('Todos los campos son obligatorios.', 'error');
    }
    if (!validEmail(em)) {
      return showMessage('Formato de email inválido.', 'error');
    }
    if (users.some(x => x.username === u)) {
      return showMessage('El usuario ya existe.', 'error');
    }
    if (users.some(x => x.email === em)) {
      return showMessage('El email ya está registrado.', 'error');
    }
    if (p !== c) {
      return showMessage('Las contraseñas no coinciden.', 'error');
    }

    users.push({ username: u, email: em, password: p });
    saveUsers();
    showMessage('Registro exitoso. Redirigiendo al login...', 'success');
    setTimeout(() => window.location.href = 'index.html', 2000);
  });
}

// --- Login ---
const logForm = document.getElementById('loginForm');
if (logForm) {
  logForm.addEventListener('submit', e => {
    e.preventDefault();
    clearMessage();

    const u = document.getElementById('usuario').value.trim();
    const p = document.getElementById('password').value.trim();
    if (!u || !p) {
      return showMessage('Todos los campos son obligatorios.', 'error');
    }

    const user = users.find(x => x.username === u);
    if (!user) {
      return showMessage('Usuario no registrado.', 'error');
    }
    if (user.password !== p) {
      document.getElementById('password').value = '';
      return showMessage('Contraseña incorrecta.', 'error');
    }

    sessionStorage.setItem('currentUser', user.username);
    window.location.href = 'dashboard.html';
  });
}

// --- Recuperar Contraseña ---
const forgotForm = document.getElementById('forgotForm');
if (forgotForm) {
  forgotForm.addEventListener('submit', e => {
    e.preventDefault();
    clearMessage();

    const u  = document.getElementById('forgotUsuario').value.trim();
    const em = document.getElementById('forgotEmail').value.trim();
    if (!u || !em) {
      return showMessage('Todos los campos son obligatorios.', 'error');
    }
    if (!validEmail(em)) {
      return showMessage('Formato de email inválido.', 'error');
    }

    const user = users.find(x => x.username === u);
    if (!user) {
      return showMessage('Usuario no registrado.', 'error');
    }
    if (user.email !== em) {
      return showMessage('El email no coincide con el usuario.', 'error');
    }

    // Mensaje genérico en lugar de mostrar la contraseña
    showMessage(
      'Te enviamos un correo de recuperación. Revisa tu bandeja de entrada para ver las instrucciones.',
      'success'
    );
  });
}
