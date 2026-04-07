// ========== DETECTAR SESIÓN ACTIVA ==========
const usuarioActivo = localStorage.getItem('usuarioActivo');
const btnLoginMiCuenta = document.getElementById('btnLoginMiCuenta');
const modalLoginBtn = document.getElementById('modalLoginBtn');

function actualizarBotonSesion() {
    if (usuarioActivo) {
        // Si hay sesión, el botón dice "Mi cuenta" y lleva al panel logueado
        if (btnLoginMiCuenta) {
            btnLoginMiCuenta.textContent = '👤 Mi cuenta';
            btnLoginMiCuenta.href = '../logueado/a.html';
            btnLoginMiCuenta.classList.add('btn-micuenta');
        }
        if (modalLoginBtn) {
            modalLoginBtn.href = '../logueado/a.html';
            modalLoginBtn.textContent = 'Ir a Mi Cuenta';
        }
    } else {
        // Si no hay sesión, el botón dice "Iniciar sesión" y lleva al login
        if (btnLoginMiCuenta) {
            btnLoginMiCuenta.textContent = 'Iniciar sesión';
            btnLoginMiCuenta.href = '../inicio%20de%20sesion/a.html';
        }
        if (modalLoginBtn) {
            modalLoginBtn.href = '../inicio%20de%20sesion/a.html';
            modalLoginBtn.textContent = 'Ir al Login';
        }
    }
}

// ========== FUNCIONES PARA EL LOGO E INICIO ==========
const logoPrincipal = document.getElementById('logoPrincipal');
if (logoPrincipal) {
    logoPrincipal.addEventListener('click', function() {
        window.location.href = window.location.pathname;
    });
}

const btnInicio = document.getElementById('btnInicio');
if (btnInicio) {
    btnInicio.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = window.location.pathname;
    });
}

// ========== FUNCIONES PARA EL MODAL ==========
function abrirModal() {
    document.getElementById("miModal").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("miModal").style.display = "none";
}

// ========== BASE DE DATOS DE PRODUCTOS ==========
const productos = [
    {
        id: 1,
        nombre: "Cuaderno Profesional 100 Hojas Premium",
        precio: 89,
        precioAnterior: 120,
        imagen: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=300",
        envioGratis: true,
        nuevo: true,
        descuento: 26
    },
    {
        id: 2,
        nombre: "Set de Plumas de Gel 12 Colores",
        precio: 140,
        precioAnterior: null,
        imagen: "https://images.unsplash.com/photo-1586074299757-d8a3cca4f8c0?auto=format&fit=crop&q=80&w=300",
        envioGratis: true,
        nuevo: false,
        descuento: null
    },
    {
        id: 3,
        nombre: "Organizador de Escritorio Minimalista",
        precio: 299,
        precioAnterior: 350,
        imagen: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?auto=format&fit=crop&q=80&w=300",
        envioGratis: true,
        nuevo: true,
        descuento: 26
    },
    {
        id: 4,
        nombre: "Agenda 2025 Ejecutiva Negra",
        precio: 89,
        precioAnterior: null,
        imagen: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=300",
        envioGratis: true,
        nuevo: false,
        descuento: 15
    }
];

// ========== MOSTRAR PRODUCTOS ==========
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

            <div onclick="abrirModal()">
                <img src="${p.imagen}" alt="${p.nombre}" class="productos">
                <h3 class="name-pro">${p.nombre}</h3>
            </div>

            <div class="pricing">
                <span class="price">$${p.precio}</span>
                ${p.precioAnterior ? `<span class="old-price">$${p.precioAnterior}</span>` : ''}
            </div>

            <div class="icon-tra">
                ${p.envioGratis ? `
                <img src="imagenes/camion.png" class="send-truck">
                <p class="send-text">Envío gratis</p>
                ` : ''}
                <img src="imagenes/corazon.png" class="send-heart" onclick="abrirModal()">
            </div>
        `;

        grid.appendChild(div);
    });
}

// ========== BUSCADOR ==========
const inputBusqueda = document.getElementById("input-busqueda");
const busquedaBtn = document.getElementById("btn-buscar");
const limpiarBtn = document.getElementById('btn-limpiar');

if (inputBusqueda) {
    inputBusqueda.addEventListener("input", function () {
        if (limpiarBtn) {
            limpiarBtn.style.display = this.value.length > 0 ? 'flex' : 'none';
        }
        if (this.value.length === 0) {
            cargarProductos(productos);
        }
    });

    inputBusqueda.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && this.value.length > 0) {
            e.preventDefault();
            document.getElementById("titulos")?.scrollIntoView({ behavior: "smooth" });
            const texto = this.value.toLowerCase();
            const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));
            cargarProductos(filtrados);
        }
    });
}

if (busquedaBtn) {
    busquedaBtn.addEventListener("click", function (e) {
        if (inputBusqueda && inputBusqueda.value.length > 0) {
            e.preventDefault();
            document.getElementById("titulos")?.scrollIntoView({ behavior: "smooth" });
            const texto = inputBusqueda.value.toLowerCase();
            const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));
            cargarProductos(filtrados);
        }
    });
}

if (limpiarBtn) {
    limpiarBtn.addEventListener('click', function () {
        if (inputBusqueda) {
            inputBusqueda.value = '';
            limpiarBtn.style.display = 'none';
            inputBusqueda.focus();
            cargarProductos(productos);
        }
    });
}

// ========== DESPLAZAMIENTO SUAVE ==========
document.querySelectorAll('a[href="#productos"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("titulos")?.scrollIntoView({ behavior: "smooth" });
    });
});

document.querySelectorAll('a[href="#contacto"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
    });
});

// ========== INICIO ==========
window.onload = function () {
    actualizarBotonSesion();
    cargarProductos(productos);
};