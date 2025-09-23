//https://designmodo.com/shopping-cart-ui/ use this tut to make the shopping bag//

// Load cart from localStorage or start with an empty cart
let cart = JSON.parse(localStorage.getItem('cart')) || {};

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productName, productPrice){
    if (cart[productName]){
        cart[productName].quantity += 1;
        cart[productName].totalPrice += productPrice;
    } else {
        cart[productName] = {
            quantity: 1,
            totalPrice: productPrice
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
        listItem.innerText = `${product} - Quantity: ${cart[product].quantity} - total Price: ₱${cart[product].totalPrice.toFixed(2)}`;
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

