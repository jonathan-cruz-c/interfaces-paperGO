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

// ========== VALIDACIÓN DE CONTRASEÑA ==========
function validarContrasena(contrasena) {
    if (contrasena.length === 0) {
        return { valida: true, mensaje: "", fortaleza: "weak" };
    }
    
    if (contrasena.length < 6) {
        return { valida: false, mensaje: `🔒 Faltan ${6 - contrasena.length} caracteres (mínimo 6)`, fortaleza: "weak" };
    }
    
    const tieneMayuscula = /[A-Z]/.test(contrasena);
    const tieneMinuscula = /[a-z]/.test(contrasena);
    const tieneNumero = /[0-9]/.test(contrasena);
    const tieneEspecial = /[!@#$%^&*()\-_=+[\]{};:,.<>/?|]/.test(contrasena);
    
    const requisitos = [];
    if (!tieneMayuscula) requisitos.push("mayúscula");
    if (!tieneMinuscula) requisitos.push("minúscula");
    if (!tieneNumero) requisitos.push("número");
    if (!tieneEspecial) requisitos.push("carácter especial");
    
    if (requisitos.length > 0) {
        if (requisitos.length === 1) {
            return { valida: false, mensaje: `⚠️ Falta 1 ${requisitos[0]}`, fortaleza: "weak" };
        } else {
            return { valida: false, mensaje: `⚠️ Faltan: ${requisitos.join(", ")}`, fortaleza: "weak" };
        }
    }
    
    return { valida: true, mensaje: "✅ Contraseña segura", fortaleza: "strong" };
}

// Validación en tiempo real de la contraseña
const passwordInput = document.getElementById('password');
const passwordStrength = document.getElementById('passwordStrength');

if (passwordInput && passwordStrength) {
    passwordInput.addEventListener('input', function() {
        const resultado = validarContrasena(this.value);
        passwordStrength.textContent = resultado.mensaje;
        passwordStrength.className = 'password-strength';
        if (resultado.mensaje.includes("Faltan") || resultado.mensaje.includes("Falta")) {
            passwordStrength.classList.add('weak');
        } else if (resultado.mensaje === "✅ Contraseña segura") {
            passwordStrength.classList.add('strong');
        }
        
        const confirmInput = document.getElementById('confirmPassword');
        if (confirmInput && confirmInput.value.length > 0) {
            verificarConfirmacion();
        }
    });
}

// Verificar que las contraseñas coincidan
const confirmInput = document.getElementById('confirmPassword');
const confirmStrength = document.getElementById('confirmStrength');

function verificarConfirmacion() {
    if (!passwordInput || !confirmInput || !confirmStrength) return;
    
    if (confirmInput.value.length === 0) {
        confirmStrength.textContent = "";
        return;
    }
    
    if (passwordInput.value === confirmInput.value) {
        confirmStrength.textContent = "✅ Las contraseñas coinciden";
        confirmStrength.className = "password-strength match";
    } else {
        confirmStrength.textContent = "❌ Las contraseñas no coinciden";
        confirmStrength.className = "password-strength mismatch";
    }
}

if (confirmInput && confirmStrength) {
    confirmInput.addEventListener('input', verificarConfirmacion);
}

// ========== MOSTRAR CONTRASEÑA ==========
const showPasswordCheckbox = document.getElementById('showPasswordCheckbox');
if (showPasswordCheckbox && passwordInput && confirmInput) {
    showPasswordCheckbox.addEventListener('change', function() {
        const type = this.checked ? 'text' : 'password';
        passwordInput.type = type;
        confirmInput.type = type;
    });
}

// ========== REGISTRO ==========
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const password = passwordInput.value;
        const confirmPassword = confirmInput.value;
        const termsCheckbox = document.getElementById('termsCheckbox');
        
        if (!nombre || !email || !password || !confirmPassword) {
            alert('❌ Por favor, completa todos los campos');
            return;
        }
        
        const validacion = validarContrasena(password);
        if (!validacion.valida) {
            alert(`❌ ${validacion.mensaje}`);
            return;
        }
        
        if (password !== confirmPassword) {
            alert('❌ Las contraseñas no coinciden');
            return;
        }
        
        if (!termsCheckbox.checked) {
            alert('❌ Debes aceptar los términos y condiciones');
            return;
        }
        
        alert(`✅ ¡Bienvenido ${nombre}!\nTu cuenta ha sido creada exitosamente.\n\nAhora inicia sesión con tu correo: ${email}`);
        
        window.location.href = "../inicio%20de%20sesion/a.html";
    });
}