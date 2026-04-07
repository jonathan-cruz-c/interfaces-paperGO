// "Base de datos" temporal
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
        imagen: "data:image/jpeg;base64,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",
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
    }/*,
    {
        id: 5,
        nombre: "Cuaderno Profesional 100 Hojas Premium",
        precio: 89,
        precioAnterior: 120,
        imagen: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=300",
        envioGratis: true,
        nuevo: true,
        descuento: 26
    },
    {
        id: 6,
        nombre: "Set de Plumas de Gel 12 Colores",
        precio: 140,
        precioAnterior: null,
        imagen: "data:image/jpeg;base64,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",
        envioGratis: true,
        nuevo: false,
        descuento: null
    },
    {
        id: 7,
        nombre: "Organizador de Escritorio Minimalista",
        precio: 299,
        precioAnterior: 350,
        imagen: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?auto=format&fit=crop&q=80&w=300",
        envioGratis: true,
        nuevo: true,
        descuento: 26
    },
    {
        id: 8,
        nombre: "Agenda 2025 Ejecutiva Negra",
        precio: 89,
        precioAnterior: null,
        imagen: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=300",
        envioGratis: true,
        nuevo: false,
        descuento: 15
    }*/
];

// FUNCIONES PARA EL MODAL
function abrirModal() {
    document.getElementById("miModal").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("miModal").style.display = "none";
}

// MOSTRAR PRODUCTOS
function cargarProductos(lista) {
    const grid = document.getElementById("grid-productos");
    grid.innerHTML = "";

    // Si la lista está vacía, mostramos el mensaje
    if (lista.length === 0) {
        grid.innerHTML = `<p class="no-encontrado">Producto no encontrado</p>`;
        return; // Salimos de la función
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

// BUSCADOR
const input = document.getElementById("input-busqueda");
const busqueda = document.getElementById("btn-buscar");
const limpiar = document.getElementById('btn-limpiar');

input.addEventListener("input", function () {
    if (input.value.length === 0) {
        const texto = this.value.toLowerCase();
        const filtrados = productos.filter(p =>
            p.nombre.toLowerCase().includes(texto)
        );    
        cargarProductos(filtrados);
    }
});

// EVENTO PARA PRESIONAR ENTER
input.addEventListener("keydown", function (e) {
    if (input.value.length > 0) {
        if (e.key === "Enter") {
            e.preventDefault();
            document.getElementById("titulos").scrollIntoView({
                behavior: "smooth"
            });
            const texto = this.value.toLowerCase();   
            const filtrados = productos.filter(p =>
                p.nombre.toLowerCase().includes(texto)
            );   
            cargarProductos(filtrados);
        }
    }
});


busqueda.addEventListener("click", function (e) {
    if (input.value.length > 0) {
        e.preventDefault();
        document.getElementById("titulos").scrollIntoView({
            behavior: "smooth"
        });
        const texto = input.value.toLowerCase();   
        const filtrados = productos.filter(p =>
            p.nombre.toLowerCase().includes(texto)
        );   
        cargarProductos(filtrados);
    }
});

input.addEventListener('input', function () {
    if (input.value.length > 0) {
        limpiar.style.display = 'flex';
    } else {
        limpiar.style.display = 'none';
    }
});

limpiar.addEventListener('click', function () {
    input.value = '';
    limpiar.style.display = 'none';
    input.focus();
    cargarProductos(productos);
});

// DESPLÁCESE SUAVEMENTE
document.querySelectorAll('a[href="#productos"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("titulos").scrollIntoView({
            behavior: "smooth"
        });
    });
});

document.querySelectorAll('a[href="#contacto"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("contacto").scrollIntoView({
            behavior: "smooth"
        });
    });
});

// INICIO
window.onload = function () {
    cargarProductos(productos);
};