
let carrito = [];
let carritoStorage = [];
const listaCarrito = document.getElementById(`carro`);
const precioTotal = document.getElementById(`total`);
let contador = document.getElementById("contador").innerText;
//Agregando el producto al carrito si no existe, sino lo sumamos.
function AddCart(code) {
  let estaEnCarrito = carrito.find(producto => producto.codigo === code);
  if(estaEnCarrito) {
    let precioCard = document.getElementById(`precio${code}`).innerText;
    let stockCard = document.getElementById(`stockCard${code}`).innerText;
    if(stockCard > 0) {
      estaEnCarrito.cantidad++;
      estaEnCarrito.precio += Number(precioCard);
      document.getElementById(`cantidad${estaEnCarrito.codigo}`).innerHTML = `<p id="cantidad${estaEnCarrito.cantidad}">${estaEnCarrito.cantidad}</p>`;
      document.getElementById(`precioCarro${estaEnCarrito.codigo}`).innerHTML = `<p id="precioCarro${estaEnCarrito.codigo}">$${estaEnCarrito.precio}</p>`;
      Refresh(estaEnCarrito);
    };
  }else{
    let contenedor = document.createElement(`div`);
    contenedor.setAttribute("id", "contenedor");
    listaCarrito.appendChild(contenedor);
    let productoAgregar = arrayProductos.find(item=> item.codigo === code);
    productoAgregar.cantidad = 1;
    carrito.push(productoAgregar);
    Buttons();
    document.getElementById(`esconder`).style.display = "flex";
    Refresh(productoAgregar);
    ShowCart(productoAgregar)
  };
};
//Actualizacion para reducir código repetido.
function Refresh(producto) {
  CartAdd(); 
  carritoStorage.push(producto);
  SaveStorage(); 
  OutStock(producto.codigo); 
  CartCount();
  DecreaseStock(producto); 
};
//Creación de botones.
function Buttons() {
  if(carrito.length == 1) {
    document.getElementById("iconoCarrito").style.color = "blue"; //poner Azul si el carro esta en 1
    let divBorrar = document.createElement(`div`);
      divBorrar.innerHTML = `<button id="btnEliminarPedido">Borrar Pedido</button>`;
      listaCarrito.appendChild(divBorrar); 
      let borrarTodoCarro = document.getElementById(`btnEliminarPedido`); 
    borrarTodoCarro.addEventListener(`click`,()=> {
      Swal.fire({
        title: 'Estas seguro?',
        text: 'Vas a borrar todo el carrito!!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrar!'
      }).then((result) => {
        if(result.isConfirmed) {
          ClearCart();
          StockUpdate();
          Swal.fire({
            title: 'Confirmado!',
            showConfirmButton: false,
            timer: 1500,
            icon: 'success'
          });
        };  
      }); 
    });
    let divcomprar = document.createElement(`div`);
    divcomprar.innerHTML = `<button id="btnComprar">COMPRAR</button></button>`;
    listaCarrito.appendChild(divcomprar);
    let comprar = document.getElementById(`btnComprar`);
    comprar.addEventListener(`click`,()=> {
      Swal.fire(
        'Gracias x su compra!',
        'CBU: 14300017133003874820011',
        'success'
      );
      BuyCart(); 
    });
  };
};
//Crear carrito.
function ShowCart(productoAgregar) { 
  let div = document.createElement(`div`);
  div.setAttribute("id", "list");
  div.innerHTML = `<img id="imgCarro" src="${productoAgregar.imagen}">
                   <p id="cantidad${productoAgregar.codigo}">${productoAgregar.cantidad}</p>
                   <p>${productoAgregar.nombre}</p>
                   <p id="precioCarro${productoAgregar.codigo}">$${productoAgregar.precio}</p>
                   <button class="btnEliminar" id="btnEliminar${productoAgregar.codigo}"><i class="fa-solid fa-trash-can"></i></button>`;
  document.getElementById("contenedor").appendChild(div);
  CartAdd();
  DeleteProduct(productoAgregar); 
}
//Eliminar productos del carrito.
function DeleteProduct(productoAgregar) {
  let btnEliminar = document.getElementById(`btnEliminar${productoAgregar.codigo}`);
  btnEliminar.addEventListener(`click`,()=> {
    if(productoAgregar.cantidad > 1) {
      let precioCard = document.getElementById(`precio${productoAgregar.codigo}`).innerText;
      productoAgregar.cantidad--;
      productoAgregar.precio -= precioCard;
      document.getElementById(`cantidad${productoAgregar.codigo}`).innerHTML = `<p id="cantidad${productoAgregar.cantidad}">${productoAgregar.cantidad}</p>`;
      document.getElementById(`precioCarro${productoAgregar.codigo}`).innerHTML = `<p id="precioCarro${productoAgregar.codigo}">$${productoAgregar.precio}</p>`;
      RefreshDelete(productoAgregar);
    }else{
      carrito = carrito.filter(item => item.codigo !== productoAgregar.codigo);
      btnEliminar.parentElement.remove();
      RefreshDelete(productoAgregar);
    };
  });
};
//Actualizacion para reducir codigo en eliminar.
function RefreshDelete(producto) {
  StockAdd(producto);
  CartAdd();
  CountSubtractCart();
};
//Suma del carrito.
function CartAdd() {
  precioTotal.innerText = carrito.reduce((acc,num)=> acc + num.precio, 0);
  let tototalCarrito = document.getElementById("total").innerText;
  if(tototalCarrito == 0) {
    document.getElementById("iconoCarrito").style.color = "rgb(14, 46, 14)";
    document.getElementById(`esconder`).style.display = "none";
    let elimPedido = document.getElementById("btnEliminarPedido");
    let botonComprar = document.getElementById("btnComprar");
    elimPedido.parentElement.remove(); 
    botonComprar.parentElement.remove(); 
    location.hash = "#";
  };
};
//Comprar carrito.
function BuyCart() {
  ClearCart();
  location.hash = "#";
};
//Borrar todo el carrito.
function ClearCart() {
  localStorage.clear();
  document.getElementById('contenedor').innerHTML = '';
  carrito = [];
  CartAdd();
};
//Sumador del numero de productos en carrito.
function CartCount() {
  contador++;
  document.getElementById("contador").innerText = contador;
};
//Resta del numero de productos en carrito.
function CountSubtractCart(){
  contador--;
  document.getElementById("contador").innerText = contador;
};
//Guardar en el storage el carrito.
function SaveStorage() {
  localStorage.setItem("carroOlvidado",JSON.stringify(carritoStorage));
};
//Carga del storage al carrito.
function VerifyStorage() {
  let arrayCarrito = JSON.parse(localStorage.getItem("carroOlvidado"));
  if(arrayCarrito) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
    Toastify({
      text: 'Tu carrito te espera!',
      duration: 1900,
      position: 'right',
      gravity: "top"
  }).showToast()
    Buttons();
    for(elemento of arrayCarrito ) {
      AddCart(elemento.codigo);
    };
  };
  setTimeout(function(){
    localStorage.clear();
  },1900);
};
