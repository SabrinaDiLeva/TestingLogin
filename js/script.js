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
    ic.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    inp.type = 'password';
    ic.classList.replace('fa-eye-slash', 'fa-eye');
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

// Simula un "refresh" con una transición de opacidad
function applyRefreshEffect(callback) {
  const cont = document.querySelector('.login-container');
  cont.style.transition = 'opacity 0.3s';
  cont.style.opacity = '0.5';
  setTimeout(() => {
    cont.style.opacity = '1';
    callback();
  }, 300);
}

// --- Registro ---
const regForm = document.getElementById('registerForm');
if (regForm) {
  const btn = regForm.querySelector('button[type="submit"]');
  regForm.addEventListener('submit', e => {
    e.preventDefault();
    clearMessage();
    applyRefreshEffect(() => {
      const u  = document.getElementById('regUsuario').value.trim();
      const em = document.getElementById('regEmail').value.trim();
      const p  = document.getElementById('regPassword').value.trim();
      const c  = document.getElementById('regConfirmPassword').value.trim();

      if (!u || !em || !p || !c) {
        showMessage('Todos los campos son obligatorios.', 'error');
        return;
      }
      if (!validEmail(em)) {
        showMessage('Formato de email inválido.', 'error');
        return;
      }
      if (users.some(x => x.username === u)) {
        showMessage('El usuario ya existe.', 'error');
        return;
      }
      if (users.some(x => x.email === em)) {
        showMessage('El email ya está registrado.', 'error');
        return;
      }
      if (p !== c) {
        showMessage('Las contraseñas no coinciden.', 'error');
        return;
      }

      users.push({ username: u, email: em, password: p });
      saveUsers();
      showMessage('Registro exitoso. Redirigiendo al login...', 'success');
      setTimeout(() => window.location.href = 'index.html', 2000);
    });
  });
}

// --- Login ---
const logForm = document.getElementById('loginForm');
if (logForm) {
  const btn = logForm.querySelector('button[type="submit"]');
  logForm.addEventListener('submit', e => {
    e.preventDefault();
    clearMessage();
    applyRefreshEffect(() => {
      const uField = document.getElementById('usuario');
      const pField = document.getElementById('password');
      const u = uField.value.trim();
      const p = pField.value.trim();

      if (!u || !p) {
        showMessage('Todos los campos son obligatorios.', 'error');
        pField.value = '';
        return;
      }

      const user = users.find(x => x.username === u && x.password === p);
      if (!user) {
        showMessage('Usuario o contraseña incorrectos.', 'error');
        pField.value = '';
        return;
      }

      sessionStorage.setItem('currentUser', user.username);
      window.location.href = 'dashboard.html';
    });
  });
}

// --- Recuperar Contraseña ---
const forgotForm = document.getElementById('forgotForm');
if (forgotForm) {
  const btn = forgotForm.querySelector('button[type="submit"]');
  forgotForm.addEventListener('submit', e => {
    e.preventDefault();
    clearMessage();
    applyRefreshEffect(() => {
      const u  = document.getElementById('forgotUsuario').value.trim();
      const em = document.getElementById('forgotEmail').value.trim();

      if (!u || !em) {
        showMessage('Todos los campos son obligatorios.', 'error');
        return;
      }
      if (!validEmail(em)) {
        showMessage('Formato de email inválido.', 'error');
        return;
      }

      const user = users.find(x => x.username === u && x.email === em);
      if (!user) {
        showMessage('Usuario y email no coinciden.', 'error');
        return;
      }

      showMessage(`Tu contraseña es: ${user.password}`, 'success');
    });
  });
}
