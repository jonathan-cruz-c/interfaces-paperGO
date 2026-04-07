// Mostrar/ocultar botón limpiar del buscador
const input = document.getElementById('input-busqueda');
const limpiar = document.getElementById('btn-limpiar');

if (input && limpiar) {
    input.addEventListener('input', function() {
        limpiar.style.display = this.value.length > 0 ? 'flex' : 'none';
    });
    
    limpiar.addEventListener('click', function() {
        input.value = '';
        limpiar.style.display = 'none';
        input.focus();
    });
}

// ========== MOSTRAR CONTRASEÑA ==========
const passwordInput = document.getElementById('password');
const showPasswordCheckbox = document.getElementById('showPasswordCheckbox');

if (showPasswordCheckbox && passwordInput) {
    showPasswordCheckbox.addEventListener('change', function() {
        passwordInput.type = this.checked ? 'text' : 'password';
    });
}

// ========== LOGIN CON LOCALSTORAGE ==========
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value;
        
        if (!email || !password) {
            alert('❌ Por favor, completa todos los campos');
            return;
        }
        
        // Buscar usuario en localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const usuario = usuarios.find(u => u.email === email && u.password === password);
        
        if (usuario) {
            // Guardar sesión activa
            localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
            alert(`✅ ¡Bienvenido de vuelta ${usuario.nombre}!`);
            // Redirigir a la página principal logueada
            window.location.href = "../logueado/a.html";
        } else {
            alert('❌ Correo o contraseña incorrectos');
        }
    });
}

// ========== ¿OLVIDASTE TU CONTRASEÑA? ==========
const forgotPasswordBtn = document.getElementById('forgotPassword');
if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        if (!email) {
            alert('❌ Ingresa tu correo para recuperar contraseña');
            document.getElementById('email').focus();
            return;
        }
        
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const usuario = usuarios.find(u => u.email === email);
        
        if (usuario) {
            alert(`📧 Tu contraseña es: ${usuario.password}\n\nRecomendación: Cámbiala después de iniciar sesión.`);
        } else {
            alert('❌ No encontramos una cuenta con ese correo');
        }
    });
}