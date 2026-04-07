const usuarioActivo = localStorage.getItem('usuarioActivo');
if (!usuarioActivo) window.location.href = "../inicio%20de%20sesion/a.html";
let usuarioActual = JSON.parse(usuarioActivo);

document.getElementById('btnCerrarSesion')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('usuarioActivo');
    window.location.href = "../Sin%20inicio%20de%20secion/sin_login.html";
});

const input = document.getElementById('input-busqueda'), limpiar = document.getElementById('btn-limpiar');
input?.addEventListener('input', function() { limpiar.style.display = this.value.length > 0 ? 'flex' : 'none'; });
limpiar?.addEventListener('click', function() { input.value = ''; limpiar.style.display = 'none'; input.focus(); });

let carrito = [];
function cargarCarrito() { carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioActual.id}`) || '[]'); }
function guardarCarrito() { localStorage.setItem(`carrito_${usuarioActual.id}`, JSON.stringify(carrito)); }
function renderizarCarrito() {
    const container = document.getElementById('cartItems'), vacio = document.getElementById('carritoVacio'), content = document.querySelector('.cart-content');
    if (carrito.length === 0) {
        if (container) container.style.display = 'none';
        if (vacio) vacio.style.display = 'block';
        if (content) content.style.display = 'none';
        return;
    }
    if (container) container.style.display = 'block';
    if (vacio) vacio.style.display = 'none';
    if (content) content.style.display = 'grid';
    let subtotal = 0, html = '';
    carrito.forEach(item => {
        const itemTotal = item.precio * item.cantidad;
        subtotal += itemTotal;
        html += `<div class="cart-item"><img src="${item.imagen}" class="cart-item-img"><div class="cart-item-info"><h3>${item.nombre}</h3><p class="cart-item-price">$${item.precio}</p></div><div class="cart-item-quantity"><button class="quantity-btn" onclick="cambiarCantidad(${item.id}, -1)">-</button><input type="number" class="quantity-input" value="${item.cantidad}" min="1" onchange="cambiarCantidad(${item.id}, 0, this.value)"><button class="quantity-btn" onclick="cambiarCantidad(${item.id}, 1)">+</button></div><div class="cart-item-total">$${itemTotal}</div><button class="delete-item" onclick="eliminarProducto(${item.id})">🗑️</button></div>`;
    });
    if (container) container.innerHTML = html;
    const envio = subtotal > 500 ? 0 : 80;
    document.getElementById('subtotal').textContent = `$${subtotal}`;
    document.getElementById('envio').textContent = envio === 0 ? 'Gratis' : `$${envio}`;
    document.getElementById('total').textContent = `$${subtotal + envio}`;
}
function cambiarCantidad(id, cambio, nuevoValor = null) {
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        if (nuevoValor !== null) producto.cantidad = parseInt(nuevoValor);
        else producto.cantidad += cambio;
        if (producto.cantidad < 1) producto.cantidad = 1;
        guardarCarrito();
        renderizarCarrito();
    }
}
function eliminarProducto(id) { carrito = carrito.filter(item => item.id !== id); guardarCarrito(); renderizarCarrito(); }
document.getElementById('btnPagar')?.addEventListener('click', () => {
    if (carrito.length === 0) alert('❌ Tu carrito está vacío');
    else { alert('✅ ¡Gracias por tu compra!'); carrito = []; guardarCarrito(); renderizarCarrito(); }
});
cargarCarrito();
renderizarCarrito();