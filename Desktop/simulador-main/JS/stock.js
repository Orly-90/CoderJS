function DecreaseStock(productoAgregar) { 
  let stockCard = document.getElementById(`stockCard${productoAgregar.codigo}`).innerText; //Id stock del producto.
  stockCard--; //Mermar 1 producto del stock.
  document.getElementById(`stockCard${productoAgregar.codigo}`).innerText = stockCard; //Cambio de stock en el documento.
} 

function StockAdd(productoAgregar) { 
  let stockCard = document.getElementById(`stockCard${productoAgregar.codigo}`).innerText; //Id stock del producto.
  stockCard++; //Sumar 1 producto del stock.
  document.getElementById(`stockCard${productoAgregar.codigo}`).innerText = stockCard; //Cambio de stock en el documento.
  stockCard == 1 && WithStock(productoAgregar); //Operador lógico and (&&).
} 

function OutStock(prod) {
  let cant = document.getElementById(`stockCard${prod}`).innerText; //Id del stock.
  if(cant == 0) { //Si es 0...
    //Oscurecer la tarjeta.
    document.getElementById(`card${prod}`).style.backgroundColor = "grey";
    document.getElementById(`card${prod}`).style.border = "10px solid grey";
    document.getElementById(`imagen${prod}`).style.filter = "grayscale(1)";
    document.getElementById(`codigo${prod}`).style.backgroundColor = "grey";
    document.getElementById(`codigo${prod}`).style.border = "none";
    document.getElementById(`sinStock${prod}`).style.display = "block";
    document.getElementById(`btn${prod}`).style.backgroundColor = "grey";
  }
}

function WithStock(prod){ //Si tenemos stock volvemos al color la tarjeta.
  document.getElementById(`card${prod.codigo}`).style.backgroundColor = "rgba(54, 133, 11, 0.213)";
  document.getElementById(`card${prod.codigo}`).style.border = "10px solid rgb(72, 211, 30)";
  document.getElementById(`imagen${prod.codigo}`).style.filter = "none";
  document.getElementById(`codigo${prod.codigo}`).style.backgroundColor = "rgb(22, 96, 47)";
  document.getElementById(`codigo${prod.codigo}`).style.border = "1px solid rgb(34, 255, 0)";
  document.getElementById(`sinStock${prod.codigo}`).style.display = "none";
  document.getElementById(`btn${prod.codigo}`).style.backgroundColor = "rgb(84, 159, 98)";
}

function StockUpdate() {
  location.reload(); //Actualizar el stock que viene de la base de datos.
}
