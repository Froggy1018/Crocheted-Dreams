//https://designmodo.com/shopping-cart-ui/ use this tut to make the shopping bag//

// Load cart from localStorage or start with an empty cart
let cart = JSON.parse(localStorage.getItem('cart')) || {};

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}



function addToCart(productName, productPrice, idSuffix) {
    // If idSuffix is provided, try to get quantity/color from selectors
    let quantity = 1;
    let color = undefined;
    if (idSuffix) {
        const quantityElem = document.getElementById('quantity-' + idSuffix);
        const colorElem = document.getElementById('color-' + idSuffix);
        if (quantityElem) quantity = parseInt(quantityElem.value);
        if (colorElem) color = colorElem.value;
    }
    const key = color ? `${productName} (${color})` : productName;
    if (cart[key]) {
        cart[key].quantity += quantity;
        cart[key].totalPrice += productPrice * quantity;
    } else {
        cart[key] = {
            quantity: quantity,
            color: color,
            totalPrice: productPrice * quantity
        };
    }
    saveCart();
    updateCartDisplay();
}

// For backwards compatibility, keep addCustomToCart as an alias
function addCustomToCart(productName, productPrice, idSuffix) {
    addToCart(productName, productPrice, idSuffix);
}

// For custom items with color and quantity selectors
function addCustomToCart(productName, productPrice, idSuffix) {
    const quantity = parseInt(document.getElementById('quantity-' + idSuffix).value);
    const color = document.getElementById('color-' + idSuffix).value;
    const key = `${productName} (${color})`;
    if (cart[key]) {
        cart[key].quantity += quantity;
        cart[key].totalPrice += productPrice * quantity;
    } else {
        cart[key] = {
            quantity: quantity,
            color: color,
            totalPrice: productPrice * quantity
        };
    }
    saveCart();
    updateCartDisplay();
}

function updateCartDisplay(){
    const cartList = document.getElementById('cart');
    const cartTotal = document.getElementById('cart-total');
    if (!cartList) return;
    cartList.innerHTML = '';
    let total = 0;
    for(let product in cart){
        const item = cart[product];
        let colorText = item.color ? `, <b>Color:</b> ${item.color}` : '';
        cartList.innerHTML += `<li><b>${product}</b> - <b>Qty:</b> ${item.quantity}${colorText} - <b>₱${item.totalPrice.toFixed(2)}</b></li>`;
        total += item.totalPrice;
    }
    if (cartTotal) {
        cartTotal.innerHTML = `Total: ₱${total.toFixed(2)}`;
    }
}




// Load cart and update display on page load
window.onload = function() {
    cart = JSON.parse(localStorage.getItem('cart')) || {};
    updateCartDisplay();
};

function resetCart() {
    cart = {};
    localStorage.removeItem('cart');
    updateCartDisplay();
}

function submitToSheet() {
  const name = document.getElementById('nameb')?.value || '';
  const email = document.getElementById('emailb')?.value || '';
  const message = document.getElementById('message')?.value || '';
  const cartString = JSON.stringify(cart);

  // Calculate total
  let total = 0;
  for (let product in cart) {
    total += cart[product].totalPrice;
  }

  const formData = new FormData();
  formData.append('entry.592178790', name);      // Name field's entry ID
  formData.append('entry.1360041219', email);    // Email field's entry ID
  formData.append('entry.1682171163', message);  // Message field's entry ID
  formData.append('entry.65011336', cartString); // Cart field's entry ID
  formData.append('entry.1390758339', total); // <-- Replace with your Total field's entry ID

  fetch('https://docs.google.com/forms/d/e/1FAIpQLSd39O4-T4zhkh6ZBAgX_clN4JY-R9mIw-hmIeQjFM3NI-Hsbg/formResponse', {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  }).then(() => {
    alert('Order submitted!');
    resetCart();
  }).catch(() => {
    alert('There was an error submitting your order.');
  });
}