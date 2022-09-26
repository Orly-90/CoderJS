const listaProductos = document.getElementById(`container`);
const apiKey = `dcacea55e6bce077bd20412a0dc1c31f`;
const nombreProductoAgregar = document.getElementById(`nombreProductoBuscar`);
const btnBuscar = document.getElementById("btnBuscar");

//Api del clima.
const fetchData = position => {
  const {latitude, longitude} = position.coords;
  fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => WeatherData(data))
};
const WeatherData = data => {
  let temperatura = document.getElementById("temperatura");
  temperatura.innerHTML = `La Temperatura en ${data.name} es de ${data.main.temp}°`
  if(Number(data.main.temp) > 16) {
    Swal.fire({
      title: 'Lindo día para comprar productos de verano!',
      showConfirmButton: false,
      timer: 2500,
      icon: 'success'
    });
  }else {
    Swal.fire({
      title: 'Que frío! A comprar productos de invierno!',
      showConfirmButton: false,
      timer: 2500,
      icon: 'success'
    });
  };
};
const OnLoad = ()=> {
  navigator.geolocation.getCurrentPosition(fetchData);
};
//Api de github.
fetch('https://api.github.com/users/Orly-90')
    .then((resp) => resp.json())
    .then((data) => {
      let avatar = document.getElementById("avatar");
      avatar.innerHTML = `<img class="avatar" src="${data.avatar_url}">`;
    }).catch(error=> {
          Swal.fire("error");
      });
  //Traer productos de la base de datos.
const ReturnProducts =() => {
  return new Promise((resolve) => {
    setTimeout(()=> {
      document.getElementById("principio").style.display = "none";
      document.getElementById("barra").style.display = "none";
      document.getElementById("nav").style.display = "flex";
      document.getElementById("body").style.backgroundImage = "linear-gradient(white, #f9ffff, #ededed, rgb(234, 232, 232), rgb(212, 202, 202), rgba(78, 74, 74, 0.544));"
      document.getElementById("containerInputs").style.display = "block"
      resolve(arrayProductos);
    },3000);
  });
};
//Retornar los productos traidos de la base de datos.
ReturnProducts().then((respuesta)=>{
  listadoDeProductos = respuesta;
  ShowProducts(listadoDeProductos);
});
nombreProductoAgregar.addEventListener(`input`, () => {
  let encontrados = listadoDeProductos.filter(({nombre}) => {
    return nombre.toLowerCase().includes(nombreProductoAgregar.value.toLowerCase());
  });
  ShowProducts(encontrados);
});
//Busqueda por precio.
btnBuscar.addEventListener(`click`, ()=> {
  const desde = document.getElementById("desde").value;
  const hasta = document.getElementById("hasta").value;
  Reset();
  let encontrados = listadoDeProductos.filter(({precio})=> {
  return Number(precio) >= desde && Number(precio) <= hasta;
  });
  ShowProducts(encontrados);
});
//Reseteado de la busqueda por precio.
function Reset() {
  document.getElementById("desde").value = '';
  document.getElementById("hasta").value = '';
  const volver = document.getElementById("volver");
  volver.style.display = "contents";
  volver.addEventListener(`click`, ()=> {
    ShowProducts(listadoDeProductos);
    volver.style.display = "none";
  });
};
//Muestra los productos.
function ShowProducts(array) {
  listaProductos.innerHTML = "";
  if(array.length === 0) {
    document.getElementById("volver").style.display = "none";
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
      text: 'No hay productos!',
      duration: 1900,
      position: 'left',
      gravity: "top"
  }).showToast();
    ShowProducts(listadoDeProductos);
  }; //recorro el inventario e inyecto codigo HTML
  array.forEach(({codigo, nombre, imagen, descripcion, stock, precio}) => {
    let div = document.createElement(`div`);
    div.innerHTML = `<div id="card${codigo}" class="articulo">
                      <h2>${nombre}</h2>
                      <img id="imagen${codigo}" class="imagen" src="${imagen}"><p class="descripcion">Descripción: ${descripcion}</p>
                      <div class="sinStock" id="sinStock${codigo}">SIN STOCK</div>
                      <div class="stock" id="stockCard${codigo}">${stock}</div>
                      <div class="precio">
                        <h3 class="pre">Precio: $</h3>
                        <h3 class="pre" id="precio${codigo}">${precio}</h3>
                      </div>
                      <div id="codigo${codigo}" class="codigo">
                        <h4>Código</h4>  
                        <h4>${codigo}</h4>
                      </div>
                        <button id="btn${codigo}" class="button"><span>AGREGAR</span></button>
                      </div>
                    </div>`;
    listaProductos.appendChild(div);
    let btnAgregar = document.getElementById(`btn${codigo}`);
    btnAgregar.addEventListener(`click`,()=> {
      AddCart(codigo); 
      OutStock(codigo); 
    });
  });
  VerifyStorage();
};
