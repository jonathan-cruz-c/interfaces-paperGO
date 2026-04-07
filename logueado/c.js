const usuarioActivo = localStorage.getItem('usuarioActivo');
if (!usuarioActivo) window.location.href = "../inicio%20de%20sesion/a.html";
let usuarioActual = JSON.parse(usuarioActivo);
let productoSeleccionado = null;

document.getElementById('btnCerrarSesion')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('usuarioActivo');
    window.location.href = "../Sin%20inicio%20de%20secion/sin_login.html";
});

document.getElementById('logoPrincipal')?.addEventListener('click', () => {
    window.location.href = window.location.pathname;
});

document.getElementById('btnInicio')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = window.location.pathname;
});

document.querySelectorAll('a[href="#contacto"]').forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
    });
});

function abrirModalProducto(producto) {
    productoSeleccionado = producto;
    document.getElementById('modalProductoImg').src = producto.imagen;
    document.getElementById('modalProductoNombre').innerText = producto.nombre;
    document.getElementById('modalProductoPrecio').innerHTML = `$${producto.precio}`;
    if (producto.precioAnterior) {
        document.getElementById('modalProductoPrecioAnterior').innerHTML = `$${producto.precioAnterior}`;
        document.getElementById('modalProductoPrecioAnterior').style.display = 'inline';
    } else {
        document.getElementById('modalProductoPrecioAnterior').style.display = 'none';
    }
    const btnFavModal = document.getElementById('modalBtnFavorito');
    if (esFavorito(producto.id)) {
        btnFavModal.innerHTML = '❤️ Quitar de favoritos';
        btnFavModal.style.background = '#e91e63';
        btnFavModal.style.color = 'white';
    } else {
        btnFavModal.innerHTML = '🤍 Añadir a favoritos';
        btnFavModal.style.background = '#f0f0f0';
        btnFavModal.style.color = '#e91e63';
    }
    document.getElementById('productoModal').style.display = 'flex';
}

function cerrarModalProducto() {
    document.getElementById('productoModal').style.display = 'none';
    productoSeleccionado = null;
}

let carrito = [];
function cargarCarrito() {
    carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioActual.id}`) || '[]');
}
function guardarCarrito() {
    localStorage.setItem(`carrito_${usuarioActual.id}`, JSON.stringify(carrito));
}
function agregarAlCarrito(p) {
    let existente = carrito.find(item => item.id === p.id);
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ ...p, cantidad: 1 });
    }
    guardarCarrito();
    alert(`✅ ${p.nombre} añadido al carrito`);
    cerrarModalProducto();
}

let favoritos = [];
function cargarFavoritos() {
    favoritos = JSON.parse(localStorage.getItem(`favoritos_${usuarioActual.id}`) || '[]');
    actualizarCorazones();
}
function guardarFavoritos() {
    localStorage.setItem(`favoritos_${usuarioActual.id}`, JSON.stringify(favoritos));
}
function esFavorito(id) {
    return favoritos.some(f => f.id === id);
}
function toggleFavorito(p) {
    let idx = favoritos.findIndex(f => f.id === p.id);
    if (idx === -1) {
        favoritos.push({ id: p.id, nombre: p.nombre, precio: p.precio, imagen: p.imagen });
        alert(`❤️ ${p.nombre} añadido a favoritos`);
    } else {
        favoritos.splice(idx, 1);
        alert(`💔 ${p.nombre} eliminado de favoritos`);
    }
    guardarFavoritos();
    actualizarCorazones();
    if (productoSeleccionado && productoSeleccionado.id === p.id) {
        let btn = document.getElementById('modalBtnFavorito');
        if (esFavorito(p.id)) {
            btn.innerHTML = '❤️ Quitar de favoritos';
            btn.style.background = '#e91e63';
            btn.style.color = 'white';
        } else {
            btn.innerHTML = '🤍 Añadir a favoritos';
            btn.style.background = '#f0f0f0';
            btn.style.color = '#e91e63';
        }
    }
    cerrarModalProducto();
}
function actualizarCorazones() {
    document.querySelectorAll('.heart-icon').forEach(heart => {
        let id = parseInt(heart.getAttribute('data-id'));
        if (esFavorito(id)) {
            heart.innerHTML = '❤️';
        } else {
            heart.innerHTML = '🤍';
        }
    });
}

const productos = [
    {
        id: 1,
        nombre: "Cuaderno Profesional 100 Hojas Premium",
        precio: 89,
        precioAnterior: 120,
        imagen: "imagenes/cuaderno.png",
        envioGratis: true,
        nuevo: true,
        descuento: 26
    },
    {
        id: 2,
        nombre: "Set de Plumas de Gel 12 Colores",
        precio: 140,
        precioAnterior: null,
        imagen: "imagenes/set.png",
        envioGratis: true,
        nuevo: false,
        descuento: null
    },
    {
        id: 3,
        nombre: "Organizador de Escritorio Minimalista",
        precio: 299,
        precioAnterior: 350,
        imagen: "imagenes/escritorio.png",
        envioGratis: true,
        nuevo: true,
        descuento: 26
    },
    {
        id: 4,
        nombre: "Agenda 2026 Ejecutiva Negra",
        precio: 89,
        precioAnterior: null,
        imagen: "imagenes/agenda.png",
        envioGratis: true,
        nuevo: false,
        descuento: 15
    }
];

function cargarProductos(lista) {
    const grid = document.getElementById("grid-productos");
    if (!grid) return;
    grid.innerHTML = "";
    if (lista.length === 0) {
        grid.innerHTML = `<p class="no-encontrado">Producto no encontrado</p>`;
        return;
    }
    lista.forEach(p => {
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
            <div class="badges-container">
                ${p.nuevo ? '<span class="badge-new">Nuevo</span>' : ''}
                ${p.descuento ? `<span class="badges-discount">${p.descuento}%</span>` : ''}
            </div>
            <div onclick='abrirModalProducto(${JSON.stringify(p)})'>
                <img src="${p.imagen}" alt="${p.nombre}" class="productos">
                <h3 class="name-pro">${p.nombre}</h3>
            </div>
            <div class="pricing">
                <span class="price">$${p.precio}</span>
                ${p.precioAnterior ? `<span class="old-price">$${p.precioAnterior}</span>` : ''}
            </div>
            <div class="icon-tra">
                ${p.envioGratis ? `<img src="../Sin%20inicio%20de%20secion/imagenes/camion.png" class="send-truck"><p class="send-text">Envío gratis</p>` : ''}
                <span class="heart-icon" data-id="${p.id}" onclick='toggleFavorito(${JSON.stringify(p)})'>🤍</span>
            </div>
        `;
        grid.appendChild(div);
    });
    actualizarCorazones();
}

const input = document.getElementById('input-busqueda');
const limpiar = document.getElementById('btn-limpiar');
const buscar = document.getElementById('btn-buscar');

input?.addEventListener('input', function() {
    if (limpiar) limpiar.style.display = this.value.length > 0 ? 'flex' : 'none';
});

input?.addEventListener('keydown', function(e) {
    if (e.key === "Enter" && this.value.length > 0) {
        e.preventDefault();
        document.getElementById("titulos")?.scrollIntoView({ behavior: "smooth" });
        cargarProductos(productos.filter(p => p.nombre.toLowerCase().includes(this.value.toLowerCase())));
    }
});

buscar?.addEventListener('click', function() {
    if (input?.value.length > 0) {
        document.getElementById("titulos")?.scrollIntoView({ behavior: "smooth" });
        cargarProductos(productos.filter(p => p.nombre.toLowerCase().includes(input.value.toLowerCase())));
    }
});

limpiar?.addEventListener('click', function() {
    if (input) {
        input.value = '';
        limpiar.style.display = 'none';
        input.focus();
        cargarProductos(productos);
    }
});

document.querySelectorAll('a[href="#productos"]').forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        document.getElementById("titulos")?.scrollIntoView({ behavior: "smooth" });
    });
});

document.getElementById('modalBtnAgregarCarrito')?.addEventListener('click', () => {
    if (productoSeleccionado) agregarAlCarrito(productoSeleccionado);
});

document.getElementById('modalBtnFavorito')?.addEventListener('click', () => {
    if (productoSeleccionado) toggleFavorito(productoSeleccionado);
});

cargarCarrito();
cargarFavoritos();
cargarProductos(productos);