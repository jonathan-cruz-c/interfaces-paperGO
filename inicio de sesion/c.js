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

// ========== VALIDACIÓN INTELIGENTE DE CONTRASEÑA ==========
function validarContrasena(contrasena) {
    const resultado = {
        valida: true,
        mensaje: "",
        fortaleza: "weak" // weak, medium, strong
    };
    
    if (contrasena.length === 0) {
        resultado.valida = true;
        resultado.mensaje = "";
        resultado.fortaleza = "weak";
        return resultado;
    }
    
    if (contrasena.length < 6) {
        resultado.valida = false;
        resultado.mensaje = `🔒 Faltan ${6 - contrasena.length} caracteres (mínimo 6)`;
        resultado.fortaleza = "weak";
        return resultado;
    }
    
    // Verificar qué contiene
    const tieneMayuscula = /[A-Z]/.test(contrasena);
    const tieneMinuscula = /[a-z]/.test(contrasena);
    const tieneNumero = /[0-9]/.test(contrasena);
    const tieneEspecial = /[!@#$%^&*()\-_=+[\]{};:,.<>/?|]/.test(contrasena);
    
    const requisitos = [];
    if (!tieneMayuscula) requisitos.push("mayúscula");
    if (!tieneMinuscula) requisitos.push("minúscula");
    if (!tieneNumero) requisitos.push("número");
    if (!tieneEspecial) requisitos.push("carácter especial (!@#$...)");
    
    if (requisitos.length > 0) {
        resultado.valida = false;
        if (requisitos.length === 1) {
            resultado.mensaje = `⚠️ Falta 1 ${requisitos[0]}`;
        } else {
            resultado.mensaje = `⚠️ Faltan: ${requisitos.join(", ")}`;
        }
        resultado.fortaleza = "weak";
    } else {
        resultado.valida = true;
        resultado.mensaje = "✅ Contraseña segura";
        resultado.fortaleza = "strong";
    }
    
    return resultado;
}

// Aplicar validación en tiempo real
const passwordInput = document.getElementById('password');
const strengthElement = document.getElementById('passwordStrength');

if (passwordInput && strengthElement) {
    passwordInput.addEventListener('input', function() {
        const resultado = validarContrasena(this.value);
        
        strengthElement.textContent = resultado.mensaje;
        strengthElement.className = 'password-strength';
        
        if (resultado.mensaje.includes("Faltan") || resultado.mensaje.includes("Falta")) {
            strengthElement.classList.add('weak');
        } else if (resultado.mensaje === "✅ Contraseña segura") {
            strengthElement.classList.add('strong');
        }
    });
}

// ========== MOSTRAR CONTRASEÑA ==========
const showPasswordCheckbox = document.getElementById('showPasswordCheckbox');
if (showPasswordCheckbox && passwordInput) {
    showPasswordCheckbox.addEventListener('change', function() {
        passwordInput.type = this.checked ? 'text' : 'password';
    });
}

// ========== ¿OLVIDASTE TU CONTRASEÑA? ==========
const forgotPasswordBtn = document.getElementById('forgotPassword');
if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        if (!email) {
            alert('❌ Primero ingresa tu correo electrónico');
            document.getElementById('email').focus();
            return;
        }
        
        // Modal de recuperación
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '9999';
        
        modal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 20px; max-width: 350px; text-align: center;">
                <h3 style="color: #e91e63; margin-bottom: 15px;">📧 Recuperar contraseña</h3>
                <p>Hemos enviado un enlace de recuperación a:</p>
                <p style="font-weight: bold; margin: 15px 0;">${email}</p>
                <button id="cerrarModal" style="background: #000; color: white; padding: 10px 30px; border: none; border-radius: 30px; cursor: pointer;">Aceptar</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('cerrarModal').addEventListener('click', function() {
            modal.remove();
        });
    });
}

// ========== LOGIN ==========
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!email || !password) {
            alert('❌ Completa todos los campos');
            return;
        }
        
        const validacion = validarContrasena(password);
        if (!validacion.valida) {
            alert(`❌ ${validacion.mensaje}`);
            return;
        }
        
        if (email === "admin@papergo.com" && password === "123456") {
            alert('✅ Inicio de sesión exitoso');
            window.location.href = "../Sin%20inicio%20de%20secion/sin_login.html";
        } else {
            alert('❌ Correo o contraseña incorrectos\n\nPrueba con:\nadmin@papergo.com\n123456');
        }
    });
}

// ========== REGISTRO ==========
const btnRegistro = document.getElementById('btnRegistro');
if (btnRegistro) {
    btnRegistro.addEventListener('click', function(e) {
        e.preventDefault();
        alert('🚧 Página de registro en construcción');
    });
}