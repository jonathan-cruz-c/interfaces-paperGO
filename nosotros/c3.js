const input = document.getElementById('input-busqueda');
const limpiar = document.getElementById('btn-limpiar');
if (input && limpiar) {
    input.addEventListener('input', function() { limpiar.style.display = this.value.length > 0 ? 'flex' : 'none'; });
    limpiar.addEventListener('click', function() { input.value = ''; limpiar.style.display = 'none'; input.focus(); });
}

function actualizarBotonSesion() {
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    const btnLogin = document.querySelector('.nav-links .btn-login-nav');
    if (btnLogin) {
        if (usuarioActivo) {
            btnLogin.textContent = '👤 Mi cuenta';
            btnLogin.href = '../logueado/a.html';
            btnLogin.classList.add('btn-micuenta');
        } else {
            btnLogin.textContent = 'Iniciar sesión';
            btnLogin.href = '../inicio%20de%20sesion/a.html';
        }
    }
}

// Inicio dinámico
const btnInicio = document.querySelector('.nav-links a[href="../Sin%20inicio%20de%20secion/sin_login.html"]');
if (btnInicio) {
    btnInicio.addEventListener('click', function(e) {
        e.preventDefault();
        const usuarioActivo = localStorage.getItem('usuarioActivo');
        window.location.href = usuarioActivo ? "../logueado/a.html" : "../Sin%20inicio%20de%20secion/sin_login.html";
    });
}

// Productos dinámico
const btnProductos = document.querySelector('.nav-links a[href="../Sin%20inicio%20de%20secion/sin_login.html#productos"]');
if (btnProductos) {
    btnProductos.addEventListener('click', function(e) {
        e.preventDefault();
        const usuarioActivo = localStorage.getItem('usuarioActivo');
        if (usuarioActivo) window.location.href = "../logueado/a.html#productos";
        else window.location.href = "../Sin%20inicio%20de%20secion/sin_login.html#productos";
    });
}

// Logo dinámico
const logo = document.querySelector('.logo');
if (logo) {
    logo.removeAttribute('onclick');
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', function() {
        const usuarioActivo = localStorage.getItem('usuarioActivo');
        window.location.href = usuarioActivo ? "../logueado/a.html" : "../Sin%20inicio%20de%20secion/sin_login.html";
    });
}

// Animación números
const statNumbers = document.querySelectorAll('.stat-number');
function animateNumbers() {
    statNumbers.forEach(stat => {
        const target = stat.innerText;
        if (/[\dK+]/.test(target) && !stat.hasAttribute('data-animated')) {
            let value = target.replace('K+', '').replace('+', '');
            const hasPlus = target.includes('+');
            const hasK = target.includes('K');
            if (hasK) value = parseInt(value) * 1000;
            else value = parseInt(value);
            stat.setAttribute('data-animated', 'true');
            let current = 0;
            const increment = value / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    clearInterval(timer);
                    let finalValue = Math.floor(value);
                    if (hasK) finalValue = (finalValue / 1000) + 'K';
                    if (hasPlus && !hasK) finalValue = finalValue + '+';
                    stat.innerText = finalValue;
                } else {
                    let displayValue = Math.floor(current);
                    if (hasK) displayValue = (displayValue / 1000).toFixed(1) + 'K';
                    if (hasPlus && !hasK) displayValue = displayValue + '+';
                    stat.innerText = displayValue;
                }
            }, 20);
        }
    });
}
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { animateNumbers(); observer.unobserve(entry.target); } }); }, { threshold: 0.3 });
    observer.observe(statsSection);
}

actualizarBotonSesion();