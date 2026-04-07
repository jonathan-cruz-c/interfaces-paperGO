const usuarioActivo = localStorage.getItem('usuarioActivo');
if (!usuarioActivo) window.location.href = "../inicio%20de%20sesion/a.html";
let usuarioActual = JSON.parse(usuarioActivo);

document.getElementById('btnCerrarSesion')?.addEventListener('click', (e) => { e.preventDefault(); localStorage.removeItem('usuarioActivo'); window.location.href = "../Sin%20inicio%20de%20secion/sin_login.html"; });

const input = document.getElementById('input-busqueda'), limpiar = document.getElementById('btn-limpiar');
input?.addEventListener('input', function() { limpiar.style.display = this.value.length > 0 ? 'flex' : 'none'; });
limpiar?.addEventListener('click', function() { input.value = ''; limpiar.style.display = 'none'; input.focus(); });

let favoritos = [];
function cargarFavoritos() { favoritos = JSON.parse(localStorage.getItem(`favoritos_${usuarioActual.id}`) || '[]'); }
function guardarFavoritos() { localStorage.setItem(`favoritos_${usuarioActual.id}`, JSON.stringify(favoritos)); }
function eliminarFavorito(id) { favoritos = favoritos.filter(item => item.id !== id); guardarFavoritos(); renderizarFavoritos(); }

function renderizarFavoritos() {
    const grid = document.getElementById('favoritesGrid');
    const vacio = document.getElementById('favoritosVacio');
    if (favoritos.length === 0) {
        if (grid) grid.style.display = 'none';
        if (vacio) vacio.style.display = 'block';
        return;
    }
    if (grid) grid.style.display = 'grid';
    if (vacio) vacio.style.display = 'none';
    let html = '';
    favoritos.forEach(p => {
        html += `<div class="favorite-card"><img src="${p.imagen}" class="favorite-img" onclick="window.location.href='../logueado/a.html'"><div class="favorite-info"><h3 class="favorite-name" onclick="window.location.href='../logueado/a.html'">${p.nombre}</h3><p class="favorite-price">$${p.precio}</p><button class="btn-remove-fav" onclick="eliminarFavorito(${p.id})">Eliminar de favoritos</button></div></div>`;
    });
    if (grid) grid.innerHTML = html;
}

cargarFavoritos();
renderizarFavoritos();