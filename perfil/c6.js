const usuarioActivo = localStorage.getItem('usuarioActivo');
if (!usuarioActivo) {
    window.location.href = "../inicio%20de%20sesion/a.html";
}

let usuarioActual = JSON.parse(usuarioActivo);

document.getElementById('btnCerrarSesion')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('usuarioActivo');
    window.location.href = "../Sin%20inicio%20de%20secion/sin_login.html";
});

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

function cargarDatosPerfil() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioEncontrado = usuarios.find(u => u.id === usuarioActual.id);
    
    if (usuarioEncontrado) {
        document.getElementById('nombre').value = usuarioEncontrado.nombre || '';
        document.getElementById('email').value = usuarioEncontrado.email || '';
        document.getElementById('telefono').value = usuarioEncontrado.telefono || '';
        document.getElementById('direccion').value = usuarioEncontrado.direccion || '';
    }
}

const profileForm = document.getElementById('profileForm');
if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const direccion = document.getElementById('direccion').value.trim();
        
        if (!nombre || !email) {
            alert('❌ Nombre y correo son obligatorios');
            return;
        }
        
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const usuarioIndex = usuarios.findIndex(u => u.id === usuarioActual.id);
        
        if (usuarioIndex !== -1) {
            usuarios[usuarioIndex] = {
                ...usuarios[usuarioIndex],
                nombre: nombre,
                email: email,
                telefono: telefono,
                direccion: direccion
            };
            
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            
            usuarioActual = {
                ...usuarioActual,
                nombre: nombre,
                email: email,
                telefono: telefono,
                direccion: direccion
            };
            localStorage.setItem('usuarioActivo', JSON.stringify(usuarioActual));
            
            alert('✅ Perfil actualizado correctamente');
        } else {
            alert('❌ Error al actualizar el perfil');
        }
    });
}

cargarDatosPerfil();