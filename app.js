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
    if (!cartList) return;
    cartList.innerHTML = '';
    let total = 0;
    for(let product in cart){
        const listItem = document.createElement('li');
        let colorText = cart[product].color ? `, Color: ${cart[product].color}` : '';
        listItem.innerText = `${product} - Quantity: ${cart[product].quantity}${colorText} - total Price: ₱${cart[product].totalPrice.toFixed(2)}`;
        cartList.appendChild(listItem);
        total += cart[product].totalPrice;
    }
    const totalBtn = document.getElementById('totalb');
    if (totalBtn) {
        totalBtn.innerHTML = `<b>&#9733; Total: ₱${total.toFixed(2)} &#9733;</b>`;
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

