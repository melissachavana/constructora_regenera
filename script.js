

let cotizacion; 
let volumen;
let area;
let acero;
let concreto;
let PrecioAcero;
let PrecioConcreto;
let ManoObra;
let respuesta;
let totalPagar;
let resumenCotizacion;
let edicion=false;
let aceroPeso;
let salida;
let pagar=false;

const arregloElementos= [ ];





//CODIGO DOM


const servicioElement = document.getElementById("servicio");
const largoInput = document.getElementById("largo");
const anchoInput = document.getElementById("ancho");
const altoInput = document.getElementById("alto");
const estimatedValueBlock = document.getElementById("estimated-value-block");
const cartItemsContainer = document.getElementById("cart-items");

// Mapping of servicio options to elemento values
const servicioToElement = {
  servicio1: "muro",
  servicio2: "techo",
  servicio3: "columna",
  servicio4: "viga",
  servicio5: "firme",
  servicio6: "cimentación"
};

// Show the estimated value block
function showEstimatedValueBlock() {
    estimatedValueBlock.style.display = "block";
    
  }
  
  // Update the estimated value in the DOM
  function updateEstimatedValue(elementoCotizado) {
    document.getElementById("elemento").textContent = `Elemento ${elementoCotizado.elemento}`;
    document.getElementById("mano-obra").textContent = `Mano de obra $ ${elementoCotizado.manoobra} MXN`;
    document.getElementById("costo-acero").textContent = `Costo de acero $ ${elementoCotizado.acero} MXN`;
    document.getElementById("costo-concreto").textContent = `Costo de concreto $ ${elementoCotizado.concreto} MXN`;
    document.getElementById("total").textContent = `Total $ ${elementoCotizado.total}`;

}





 

  let cartItems = [];

  // Function to calculate estimated value
  function calculateEstimatedValue() {
    const selectedService = servicioElement.value;
    const elemento = servicioToElement[selectedService];
    const largo = parseFloat(largoInput.value);
    const ancho = parseFloat(anchoInput.value);
    const alto = parseFloat(altoInput.value);
  
    cotizar(elemento, largo, ancho, alto);
    showEstimatedValueBlock();
  }





  function displayCartItems(cartItems) {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";
  
    cartItems.forEach(item => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.service}: $${item.value.toFixed(2)}`;
      cartItemsContainer.appendChild(listItem);
    });
  }
  
  // Function to save cart items to local storage
  function saveToLocalStorage() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }




  // Hide the estimated value block
  function hideEstimatedValueBlock() {
    estimatedValueBlock.style.display = "none";
  }





  function addToCart() {
    const selectedService = document.getElementById("elemento").textContent;
    const servicioSimple=selectedService.replace("Elemento ", "");
  
    const estimatedValueText = document.getElementById("total").textContent;
    const estimatedValue = parseFloat(estimatedValueText.replace("Total $", "").replace(",", ""));  
    // Add the selected service to the cartItems array
    cartItems.push({ service: selectedService, value: estimatedValue });

    // Save the cart to local storage
    saveToLocalStorage();

    // Show a confirmation message
    //alert(`Se agregó "${selectedService}" a tu carrito de cotización.`);

    //Swal.fire('Hello SweetAlert!', `Se agregó "${selectedService}" a tu carrito de cotización.`, 'info');


  
      Swal.fire({
        title: 'Constructora Regenera',
        text: `Se agregó "${selectedService}" a tu carrito de cotización.`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#8a2be2',
        cancelButtonColor: '#007BFF',
        confirmButtonText: 'Ir a Carrito',
        cancelButtonText: 'Seguir Cotizando'
    }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = 'carrito.html';
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            //seguir cotizando
        }
    });




    // Update the cart in the DOM
    displayCartItems(cartItems);

    // Hide the estimated value block after adding to cart
    hideEstimatedValueBlock();

  }



function clearCart(pagar) {


  if(pagar===true){

    cartItems = [];

      // Clear the cart items from the HTML
      const cartItemsContainer = document.getElementById("cart-items");
      cartItemsContainer.innerHTML = "";

      // Clear the cart items from local storage
      localStorage.removeItem("cartItems");


  }

  else{

  Swal.fire({
    title: 'Constructora Regenera',
    text: `¿Estás seguro que quieres vaciar tu carrito?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Borrar carrito',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {

      // Clear the cart items from the JavaScript array
      cartItems = [];

      // Clear the cart items from the HTML
      const cartItemsContainer = document.getElementById("cart-items");
      cartItemsContainer.innerHTML = "";

      // Clear the cart items from local storage
      localStorage.removeItem("cartItems");


      Toastify({
        text: 'Tu carrito de cotización se ha borrado.',
        duration: 1500
    }).showToast();


      /*Swal.fire({
        title: 'Constructora Regenera',
        text: `Tu carrito de cotización se ha borrado.`,
        icon: 'success',
        confirmButtonText: 'Cerrar'
      })*/
      

    }
  });

}

  
}

// Function to save cart items to local storage
function saveToLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function loadFromLocalStorage() {
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      cartItems = JSON.parse(storedItems);
      displayCartItems(cartItems);
    }
  }


  document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
  });
  





/*
  document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    displayCartItems(cartItems);
    checkCartEmpty(); // Add this line to display the no items message initially
});


// Function to check if cart is empty and display a message
function checkCartEmpty() {
  const cartItemsList = document.getElementById('cart-items');
  const cartButtons = document.querySelector('.cart-buttons');
  const noItemsMessage = document.createElement('p');
  noItemsMessage.textContent = 'No hay elementos cotizados en este momento.';
  noItemsMessage.className = 'no-items-message';

  if (cartItems.length === 0) {
    cartItemsList.style.display = 'none'; // Hide cart items list
    cartButtons.style.display = 'none'; // Hide cart buttons
    // Append the noItemsMessage to the container
    cartItemsList.parentNode.appendChild(noItemsMessage);
  } else {
    cartItemsList.style.display = 'block'; // Show cart items list
    cartButtons.style.display = 'flex'; // Show cart buttons
    // Remove the noItemsMessage if it exists
    const existingMessage = document.querySelector('.no-items-message');
    if (existingMessage) {
      existingMessage.remove();
    }
  }
}
checkCartEmpty();

*/










//CODIGO MC

//


function valorAcero(volumen, elemento){
    switch(elemento)
    {
        case "muro":
            acero=0.150*volumen;
            break;
        case "techo":
            acero=0.200*volumen;
            break;
        case "columna":
            acero=0.200*volumen;
            break;
        case "viga":
            acero=0.250*volumen;
            break;
        case "firme":
            acero=0.100*volumen;
            break;
        case "cimentación":
            acero=0.200*volumen;
            break;
        default:
            alert("Opción inválida. Por favor, selecciona una opción válida.");
            break;
    }
    return acero;
}

function cotizar(elemento, largo, ancho, alto) {
    volumen = largo * ancho * alto;
    area = largo * ancho;
    aceroPeso = valorAcero(volumen, elemento);

    ManoObra = 600 * area + 5000 * aceroPeso + 300 * volumen;
    PrecioAcero = 1200 * aceroPeso;
    PrecioConcreto = 1500 * volumen;
    cotizacion = ManoObra + PrecioAcero + PrecioConcreto;

    let elementoCotizado = new Elementos(elemento, largo, ancho, alto, ManoObra, PrecioAcero, PrecioConcreto, cotizacion);


    //document.getElementById("elemento").textContent = "Resumen " + elementoCotizado.elemento;
    

    arregloElementos.push(elementoCotizado);
    updateEstimatedValue(elementoCotizado);
}








function accionesCarrito(respuestaCotizacion) {
    switch (respuestaCotizacion) {
        case "1":
            alert("Muchas gracias por cotizar en Constructora Regenera.");
            edicion=false;
            break;
        case "2":
            presentarElemento();
            editarCarrito = parseInt(prompt("¿Cuál elemento te gustaría editar para cotizar nuevamente?"));
            editarElemento(editarCarrito);
            edicion=true;
            break;
        case "3":
            presentarElemento();
            eliminarCarrito = parseInt(prompt("¿Cuál elemento te gustaría eliminar de la cotización total?"));
            eliminarElemento(eliminarCarrito);
            edicion=true;
            break;
        case "4":
            alert("Esperamos que vuelva pronto.");
            edicion=false;
            break;
        default:
            alert("Opción inválida. Por favor, selecciona una opción válida.");
            break;
    }

    return edicion;
}

function editarElemento(indexCarrito) {
    let posicion = parseInt(indexCarrito) - 1;

    let respuestaEdicion = prompt("Características de " + arregloElementos[posicion].elemento +
                                   "\n" +
                                   "\n Dimensiones" +
                                   "\n 1)Largo: " + arregloElementos[posicion].largo +
                                   "\n 2)Ancho: " + arregloElementos[posicion].ancho +
                                   "\n 3)Alto: " + arregloElementos[posicion].alto +
                                   "\n" +
                                   "\n ¿Cuál dimensión desea modificar?\n");

    switch (respuestaEdicion) {
        case "1":
            let nuevoLargo = parseFloat(prompt("¿Cuál es el nuevo largo del elemento " + arregloElementos[posicion].elemento));
            arregloElementos[posicion].largo = nuevoLargo;
            break;
        case "2":
            let nuevoAncho = parseFloat(prompt("¿Cuál es el nuevo ancho del elemento " + arregloElementos[posicion].elemento));
            arregloElementos[posicion].ancho = nuevoAncho;
            break;
        case "3":
            let nuevoAlto = parseFloat(prompt("¿Cuál es el nuevo alto del elemento " + arregloElementos[posicion].elemento));
            arregloElementos[posicion].alto = nuevoAlto;
            break;
        default:
            alert("Opción inválida. Por favor, selecciona una opción válida.");
            break;
    }

    volumen = arregloElementos[posicion].largo * arregloElementos[posicion].ancho * arregloElementos[posicion].alto;
    area = arregloElementos[posicion].largo * arregloElementos[posicion].ancho;
    aceroPeso = valorAcero(volumen, arregloElementos[posicion].elemento);

    ManoObra = 600 * area + 5000 * aceroPeso + 300 * volumen;
    PrecioAcero = 1200 * aceroPeso;
    PrecioConcreto = 1500 * volumen;
    cotizacion = ManoObra + PrecioAcero + PrecioConcreto;

    arregloElementos[posicion].manoobra = ManoObra;
    arregloElementos[posicion].acero = PrecioAcero;
    arregloElementos[posicion].concreto = PrecioConcreto;
    arregloElementos[posicion].total = cotizacion;

    alert("Resumen de cotización: \n 1)Elemento " + arregloElementos[posicion].elemento +
          "\n" +
          "\n Dimensiones" +
          "\n 2)Largo: " + arregloElementos[posicion].largo +
          "\n 3)Ancho: " + arregloElementos[posicion].ancho +
          "\n 4)Alto: " + arregloElementos[posicion].alto +
          "\n" +
          "\n Costos" +
          "\n" +
          "\n Total: " + arregloElementos[posicion].total + " MXN"
    );
}

function eliminarElemento(indexCarrito) {
    let posicion = parseInt(indexCarrito) - 1;
    arregloElementos.splice(posicion, 1);
}

/*function Elementos(nElemento, eLargo, eAncho, eAlto, mObra, pAcero, pConcreto, cTotal) {
    this.elemento = nElemento;
    this.largo = eLargo;
    this.ancho = eAncho;
    this.alto = eAlto;
    this.manoobra = mObra;
    this.acero = pAcero;
    this.concreto = pConcreto;
    this.total = cTotal;
}*/


class Elementos {
    constructor(nElemento, eLargo, eAncho, eAlto, mObra, pAcero, pConcreto, cTotal) {
      this.elemento = nElemento;
      this.largo = eLargo;
      this.ancho = eAncho;
      this.alto = eAlto;
      this.manoobra = mObra;
      this.acero = pAcero;
      this.concreto = pConcreto;
      this.total = cTotal;
    }
  }


function payCart(){



  Swal.fire({
    title: 'Constructora Regenera',
    text: `Muchas gracias por su compra. Nos pondremos en contacto con usted en menos de 24 horas`,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })


clearCart(true);

}







