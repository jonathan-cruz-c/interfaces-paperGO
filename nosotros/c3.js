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

// Animación de números al hacer scroll
const statNumbers = document.querySelectorAll('.stat-number');

function animateNumbers() {
    statNumbers.forEach(stat => {
        const target = stat.innerText;
        const isNumber = /[\dK+]/.test(target);
        
        if (isNumber && !stat.hasAttribute('data-animated')) {
            let value = target.replace('K+', '').replace('+', '');
            let hasPlus = target.includes('+');
            let hasK = target.includes('K');
            
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

// Intersection Observer para activar animación
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(statsSection);
}