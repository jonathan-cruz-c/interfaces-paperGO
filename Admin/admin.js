// "Base de datos" temporal
let productos = JSON.parse(localStorage.getItem('productos')) || [
    {
        id: 1,
        nombre: "Cuaderno Profesional 100 Hojas Premium",
        descripcion: "Producto de alta calidad ideal para tu oficina o estudio.",
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
        descripcion: "Producto de alta calidad ideal para tu oficina o estudio.",
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
        descripcion: "Producto de alta calidad ideal para tu oficina o estudio.",
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
        descripcion: "Producto de alta calidad ideal para tu oficina o estudio.",
        precio: 89,
        precioAnterior: null,
        imagen: "imagenes/agenda.png",
        envioGratis: true,
        nuevo: false,
        descuento: 15
    }
];

const usuarioActivo = localStorage.getItem('usuarioActivo');
if (!usuarioActivo) window.location.href = "../inicio%20de%20sesion/a.html";
let usuarioActual = JSON.parse(usuarioActivo);

/*let usuarioActual = { id: 21, nombre: "Admin", email: "admin@gmail.com", telefono: "00 0000 0000", direccion: null, password: "Admin_21"};*/

// Logo principal
document.getElementById('logoPrincipal')?.addEventListener('click', () => {
    window.location.href = window.location.pathname;
});

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

// Boton de Inicio
document.getElementById('btnInicio')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = window.location.pathname;
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
        document.getElementById("contact-trigger").scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Manejo del menú de administración del candado
const btnPadlock = document.getElementById('link-icon-padlock');
const dropdownAdmin = document.getElementById('dropdown-admin');

btnPadlock.addEventListener('click', (e) => {
    e.stopPropagation();

    dropdownAdmin.classList.toggle('show');

    if (dropdownAdmin.classList.contains('show')) {
        btnPadlock.src = "imagenes/candado_abierto.png";
    } else {
        btnPadlock.src = "imagenes/candado.png";
    }
});

// Cerrar el menú si el usuario hace clic fuera de él
document.addEventListener('click', () => {
    if (dropdownAdmin.classList.contains('show')) {
        dropdownAdmin.classList.remove('show');
        btnPadlock.src = "imagenes/candado.png";
    }
});

// Boton de cerrar sesión
document.getElementById('btnCerrarSesion')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('usuarioActivo');
    window.location.href = "../Sin%20inicio%20de%20secion/sin_login.html";
});

// Funcion para las notificaciones
function mostrarNotificacion(mensaje, imagen = null) {
    const container = document.getElementById('notification-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
       ${ imagen ? `<img src="${imagen}" class="notificacion-img">` : '' }
        <span>${mensaje}</span>
    `;
    
    container.appendChild(toast);

    // Eliminar el elemento del DOM después de que termine la animación
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Modal de agregar producto
const modalAgregar = document.getElementById('modal-agregar-container');
const btnOpcAgregar = document.getElementById('opc-agregar');
const btnCerrarAgregar = document.getElementById('btn-cerrar-agregar');
const btnCancelarAgregar = document.getElementById('btn-cancelar-agregar');
const formAgregar = document.getElementById('form-agregar-producto');
let huboCambiosEnAgregar = false;

formAgregar.addEventListener('input', () => { huboCambiosEnEdicion = true; });

btnOpcAgregar.addEventListener('click', (e) => {
    e.preventDefault();
    modalAgregar.style.display = 'flex';
    document.getElementById('dropdown-admin').classList.remove('show');
    huboCambiosEnAgregar = false;
});

function validarCierreAgre() {
    if (huboCambiosEnEdicion) {
        if (confirm("No has guardado los cambios. ¿Deseas salir de todos modos?")) {
            forzarCierreAgre();
        }
    } else {
        forzarCierreAgre();
    }
}

function forzarCierreAgre(){
    modalAgregar.style.display = 'none';
    formAgregar.reset();
    btnPadlock.src = "imagenes/candado.png";
}

[btnCerrarAgregar, btnCancelarAgregar].forEach(btn => btn.onclick = validarCierreAgre);

formAgregar.addEventListener('submit', function(e) {
    e.preventDefault();

    const imagenFile = document.getElementById('add-imagen').files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const prodsActuales = JSON.parse(localStorage.getItem('productos')) || productos;
        const nuevoId = prodsActuales.length > 0 
            ? Math.max(...prodsActuales.map(p => p.id)) + 1 
            : 1;

        const nuevoProducto = {
            id: nuevoId,
            nombre: document.getElementById('add-nombre').value,
            descripcion: document.getElementById("add-descripcion").value,
            precio: parseFloat(document.getElementById('add-precio').value),
            precioAnterior: document.getElementById('add-precioAnterior').value ? parseFloat(document.getElementById('add-precioAnterior').value) : null,
            imagen: event.target.result, // Base64 de la imagen subida
            envioGratis: document.getElementById('add-envioGratis').checked,
            nuevo: document.getElementById('add-nuevo').checked,
            descuento: document.getElementById('add-descuento').value ? parseInt(document.getElementById('add-descuento').value) : null
        };

        const dbActualizada = [...prodsActuales, nuevoProducto];
        localStorage.setItem('productos', JSON.stringify(dbActualizada));

        cargarProductos(dbActualizada);
        modalAgregar.style.display = 'none';
        formAgregar.reset();
        mostrarNotificacion("¡Producto agregado con éxito!", "imagenes/check-green.png");
    };

    if (imagenFile) {
        reader.readAsDataURL(imagenFile);
    }
    btnPadlock.src = "imagenes/candado.png";
});

// Modal de editar producto
const modalEditar = document.getElementById('modal-editar-container');
const btnOpcEditar = document.getElementById('opc-editar');
const btnCerrarEditar = document.getElementById('btn-cerrar-editar');
const btnCancelarEditar = document.getElementById('btn-cancelar-editar');
const btnBuscarEditar = document.getElementById('btn-buscar-editar');
const formEditar = document.getElementById('form-editar-producto');
const seccionBuscar = document.getElementById('seccion-buscar-id');

let huboCambiosEnEdicion = false;
// Si buvo cambios en el formulario de edición
formEditar.addEventListener('input', () => { huboCambiosEnEdicion = true; });
// Abrir modal de edición caundo se pide el id
btnOpcEditar.onclick = () => {
    modalEditar.style.display = 'flex';
    seccionBuscar.style.display = 'flex';
    formEditar.classList.remove('form-edicion-visible');
    huboCambiosEnEdicion = false;
};
// Cerrar con validación
function validarCierre() {
    if (huboCambiosEnEdicion) {
        if (confirm("No has guardado los cambios. ¿Deseas salir de todos modos?")) {
            forzarCierre();
            document.getElementById('edit-search-id').value = ""
        }
    } else {
        forzarCierre();
        document.getElementById('edit-search-id').value = ""
    }
}

function forzarCierre() {
    modalEditar.style.display = 'none';
    formEditar.reset();
    huboCambiosEnEdicion = false;
    btnPadlock.src = "imagenes/candado.png";
    document.getElementById('edit-search-id').value = ""
}

[btnCerrarEditar, btnCancelarEditar].forEach(btn => btn.onclick = validarCierre);
// Buscar los datos del producto y mostrar los en el formulario de edición
btnBuscarEditar.onclick = () => {
    const id = parseInt(document.getElementById('edit-search-id').value);
    const prod = productos.find(p => p.id === id);

    if (prod) {
        seccionBuscar.style.display = 'none';
        formEditar.classList.add('form-edicion-visible');
        
        // Rellenar datos
        document.getElementById('edit-id-hidden').value = prod.id;
        document.getElementById("edit-descripcion").value = prod.descripcion || '';
        document.getElementById('edit-nombre').value = prod.nombre;
        document.getElementById('edit-precio').value = prod.precio;
        document.getElementById('edit-precioAnterior').value = prod.precioAnterior || '';
        document.getElementById('edit-envioGratis').checked = prod.envioGratis;
        document.getElementById('edit-nuevo').checked = prod.nuevo;
        document.getElementById('edit-descuento').value = prod.descuento || '';
        document.getElementById('preview-edit-container').innerHTML = `<img src="${prod.imagen}">`;
        
        huboCambiosEnEdicion = false;
    } else {
        mostrarNotificacion("ID de producto no encontrado.", "imagenes/advertencia.png");
    }
};

formEditar.onsubmit = function(e) {
    e.preventDefault();
    
    let listaProductos = JSON.parse(localStorage.getItem('productos')) || productos;
    const id = parseInt(document.getElementById('edit-id-hidden').value);
    const index = listaProductos.findIndex(p => p.id === id);
    const imagenFile = document.getElementById('edit-imagen').files[0];

    const finalizarGuardado = (imgBase64) => {
        listaProductos[index] = {
            ...listaProductos[index],
            nombre: document.getElementById('edit-nombre').value,
            descripcion: document.getElementById("edit-descripcion").value,
            precio: parseFloat(document.getElementById('edit-precio').value),
            precioAnterior: document.getElementById('edit-precioAnterior').value ? parseFloat(document.getElementById('edit-precioAnterior').value) : null,
            imagen: imgBase64 || listaProductos[index].imagen,
            envioGratis: document.getElementById('edit-envioGratis').checked,
            nuevo: document.getElementById('edit-nuevo').checked,
            descuento: document.getElementById('edit-descuento').value ? parseInt(document.getElementById('edit-descuento').value) : null
        };

        localStorage.setItem('productos', JSON.stringify(listaProductos));
        productos = listaProductos;
        cargarProductos(listaProductos);
        huboCambiosEnEdicion = false;
        forzarCierre(); 
        mostrarNotificacion("¡Cambios guardados con éxito!", "imagenes/check-green.png");
    };

    if (imagenFile) {
        const reader = new FileReader();
        reader.onload = (event) => finalizarGuardado(event.target.result);
        reader.readAsDataURL(imagenFile);
    } else {
        finalizarGuardado();
    }
};

// Modal de eliminación
const modalEliminar = document.getElementById('modal-eliminar');
const btnOpcEliminar = document.getElementById('opc-eliminar');
const btnCerrarEliminar = document.getElementById('cerrar-eliminar');
const btnCancelarEliminar = document.getElementById('cancelar-eliminar');
const btnConfirmarEliminar = document.getElementById('btn-confirmar-eliminar');
const inputIdEliminar = document.getElementById('delete-id');

btnOpcEliminar.addEventListener('click', () => {
    modalEliminar.style.display = 'flex';
    inputIdEliminar.value = "";
});

const cerrarModalE = () => {
    modalEliminar.style.display = 'none';
};

btnCerrarEliminar.addEventListener('click', cerrarModalE);
btnCancelarEliminar.addEventListener('click', cerrarModalE);

btnConfirmarEliminar.addEventListener('click', () => {
    const idABuscar = parseInt(inputIdEliminar.value);

    if (!idABuscar) {
        mostrarNotificacion("Por favor, ingresa un ID válido.", "imagenes/advertencia.png");
        return;
    }

    
    const existe = productos.some(p => p.id === idABuscar);

    if (existe) {
        const confirmacion = confirm("¿Estás seguro de eliminar el producto?");
        
        if (confirmacion) {
            productos = productos.filter(p => p.id !== idABuscar);
            
            localStorage.setItem('productos', JSON.stringify(productos));
            
            if (typeof cargarProductos === 'function') {
                cargarProductos(productos);
            } else {
                location.reload();
            }

            mostrarNotificacion("Producto eliminado correctamente.", "imagenes/check-green.png");
            cerrarModalE();
        }
    } else {
        mostrarNotificacion("No se encontró ningún producto con el ID: " + idABuscar, "imagenes/advertencia.png");
    }
});

// MOSTRAR PRODUCTOS
function cargarProductos(lista = productos) {
    const grid = document.getElementById("grid-productos");
    if (!grid) return;
    grid.innerHTML = "";
    const favs = JSON.parse(localStorage.getItem(`favoritos_${usuarioActual.id}`) || '[]');

    // Si la lista está vacía, mostramos el mensaje
    if (lista.length === 0) {
        grid.innerHTML = `<p class="no-encontrado">Producto no encontrado</p>`;
        return; // Salimos de la función
    }

    lista.forEach(p => {
        const esFavorito = favs.some(f => f.id === p.id);
        const div = document.createElement("div");
        div.className = "product-card";

        div.innerHTML = `
            <div class="badges-container">
                ${p.nuevo ? '<span class="badge-new">Nuevo</span>' : ''}
                ${p.descuento ? `<span class="badges-discount">${p.descuento}%</span>` : ''}
            </div>

            <div onclick="prepararModalProducto(${p.id})">
                <img src="${p.imagen}" alt="${p.nombre}" class="productos-img">
                <h3 class="name-pro">${p.nombre}</h3>
                <h2 class="product-id">Id: ${p.id}</h2>
            </div>

            <div class="pricing">
                <span class="price">$${p.precio}</span>
                ${p.precioAnterior ? `<span class="old-price">$${p.precioAnterior}</span>` : ''}
            </div>

            <div class="icon-tra">
                ${p.envioGratis ? `
                <img src="imagenes/camion.png" class="send-truck">
                <p class="send-text">Envío gratis</p>` : ''}
                <img src="imagenes/corazon.png" class="send-heart ${esFavorito ? 'active' : ''}" data-id="${p.id}">
            </div>
        `;

        grid.appendChild(div);
    });

    asignarEventosCorazones();
}

// Funciones de LocalStorage para favoritos
// Función para guardar en favoritos
function toggleFavorito(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    // Recuperar favoritos actuales del usuario
    let favoritos = JSON.parse(localStorage.getItem(`favoritos_${usuarioActual.id}`) || '[]');
    const index = favoritos.findIndex(f => f.id === id);

    if (index === -1) {
        // No está, lo agregamos
        favoritos.push(producto);
    } else {
        // Ya está, lo quitamos
        favoritos.splice(index, 1);
    }

    // Guardar cambios
    localStorage.setItem(`favoritos_${usuarioActual.id}`, JSON.stringify(favoritos));
    
    cargarProductos();
}

function actualizarCorazonesUI(id, isFav) {
    // Actualizar corazón en la tarjeta de la cuadrícula
    const heartGrid = document.querySelector(`.send-heart[onclick*="prepararModalProducto(${id})"]`);
    if (heartGrid) {
        heartGrid.src = isFav ? "imagenes/corazon-lleno.png" : "imagenes/corazon.png";
        heartGrid.classList.toggle('active', isFav);
    }

    // Actualizar corazón dentro del modal si está abierto
    const heartModalImg = document.querySelector(`.heart-modal`);
    const heartText = document.querySelector(`.icon-fav-text`);
    if (heartModalImg) {
        heartModalImg.classList.toggle('active', isFav);
        if (heartText) {
            heartText.innerText = isFav ? "Quitar de favoritos" : "Añadir a favoritos";
        }
    }
}

// Función para asignar los clicks para corazones en las tarjetas de producto
function asignarEventosCorazones() {
    document.querySelectorAll(".send-heart").forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation()
            const id = parseInt(this.getAttribute('data-id'));
            toggleFavorito(id);
        });
    });
}

// Función para asignar los clicks para el modal corazones
function heartModal() {
    const btnFav = document.querySelector('.modal-icon-fav');
    if (btnFav) {
        btnFav.onclick = function() {
            const id = parseInt(this.getAttribute('data-id'));
            toggleFavorito(id);

            const icono = this.querySelector("img");
            const isFav = JSON.parse(localStorage.getItem(`favoritos_${usuarioActual.id}`)).some(f => f.id === id);
            icono.classList.toggle('active', isFav);
            this.querySelector('.icon-fav-text').innerText = isFav ? "Quitar de favoritos" : "Añadir a favoritos";
        };
    }
}

// Funciones de LocalStorage para carrito
// Función para guardar en carrito
function toggleBolsa(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    // Recuperar bolsa actuales del usuario
    let carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioActual.id}`) || '[]');
    const index = carrito.findIndex(f => f.id === id);

    if (index === -1) {
        // No está, lo agregamos
        carrito.push(producto);
    } else {
        // Ya está, lo quitamos
        carrito.splice(index, 1);
    }

    // Guardar cambios
    localStorage.setItem(`carrito_${usuarioActual.id}`, JSON.stringify(carrito));
    
    cargarProductos();
}

function actualizarBolsaUI(isBol) {
    // Actualizar corazón dentro del modal si está abierto
    const buyModalImg = document.querySelector(`.buy-modal`);
    const buyText = document.querySelector(`.icon-buy-text`);
    if (buyModalImg) {
        buyModalImg.classList.toggle('active', isBol);
        if (buyText) {
            buyText.innerText = isBol ? "Quitar del carrito" : "Añadir al carrito";
        }
    }
}

// Función para asignar los clicks para el modal bolsa
function asignarEventosCarrito() {
    const btncori = document.querySelector('.modal-icon-buy');
    if (btncori) {
        btncori.onclick = function() {
            const id = parseInt(this.getAttribute('data-id'));
            toggleBolsa(id);

            const icono = this.querySelector("img");
            const isBol = JSON.parse(localStorage.getItem(`carrito_${usuarioActual.id}`)).some(f => f.id === id);
            icono.classList.toggle('active', isBol);
            this.querySelector('.icon-buy-text').innerText = isBol ? "Quitar del carrito" : "Añadir al carrito";
        };
    }
}


/*function obtenerCarrito(){
    if (!usuarioActual) return [];
    return JSON.parse(localStorage.getItem(`carrito_${usuarioActual.id}`)) || [];
}

function guardarCarrito(carrito){
    if (!usuarioActual) return;
    localStorage.setItem(`carrito_${usuarioActual.id}`, JSON.stringify(carrito));
}

// Función para asignar los clicks para el modal carrito
function asignarEventosCarrito() {
    const contenedores = document.querySelectorAll(".modal-icon-buy");

    contenedores.forEach(contenedor => {
        contenedor.onclick = function() {
            const id = parseInt(this.dataset.id);
            const icono = this.querySelector(".buy-modal");
            const texto = this.querySelector(".icon-buy-text");
            let carrito = obtenerCarrito();

            if (carrito.includes(id)) {
                carrito = carrito.filter(c => c !== id);
                icono.classList.remove("active");
                texto.innerText = "Añadir al carrito";
            } else {
                carrito.push(id);
                icono.classList.add("active");
                texto.innerText = "Quitar del carrito";
            }
            guardarCarrito(carrito);
        };
    });
}*/


// Funciones del modal del producto
const modal = document.getElementById("modal-content");

function abrirModalProducto(producto) {
    const modalproduc = document.getElementById("modal-producto");
    const carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioActual.id}`) || '[]');;
    const esComprado = carrito.some(c => c.id === producto.id);
    const favs = JSON.parse(localStorage.getItem(`favoritos_${usuarioActual.id}`) || '[]');
    const esFavorito = favs.some(f => f.id === producto.id);

    modalproduc.innerHTML = `
        <button class="modal-close" onclick="cerrarModalProducto()">X</button>
        <img src="${producto.imagen}" alt="${producto.nombre}" class="modal-product-image">
        <div class="modal-product-info">
            <h3 class="modal-product-name">${producto.nombre}</h3>
            <p class="modal-producto-descripcion">${producto.descripcion || " "}</p>

            <div class="modal-product-pricing">
                <span class="modal-product-price">$${producto.precio}</span>
                ${producto.precioAnterior ? `<span class="modal-product-old-price">$${producto.precioAnterior}</span>` : ''}
            </div>
            <h2 class="modal-product-id">Id: ${producto.id}</h2>
            <div class="modal-product-icons">
                <div class="modal-icon-buy container-clickable" data-id="${producto.id}" style="cursor:pointer">
                    <img src="imagenes/bolsa.png" class="buy-modal ${esComprado ? 'active' : ''}"> 
                    <p class="icon-buy-text">${esComprado ? `Quitar del carrito` : `Añadir al carrito`}</p>
                </div>

                <div class="modal-icon-fav container-clickable" data-id="${producto.id}" style="cursor:pointer">
                    <img src="imagenes/corazon.png" class="heart-modal ${esFavorito ? 'active' : ''}">
                     <p class="icon-fav-text">${esFavorito ? `Quitar de favoritos` : `Añadir a favoritos`}</p>
                </div>
             </div>
        </div>
    `;

    modal.style.display = "flex";
    heartModal();
    asignarEventosCarrito();
}

function prepararModalProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        abrirModalProducto(producto);
    }
}

function cerrarModalProducto() {
    modal.style.display = "none";
}

// INICIO
window.onload = function () {
    cargarProductos(productos);
};