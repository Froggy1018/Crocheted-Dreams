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


function submitToSheet() {
    const name = document.getElementById('nameb') ? document.getElementById('nameb').value : '';
    const email = document.getElementById('emailb') ? document.getElementById('emailb').value : '';
    const cartData = JSON.stringify(cart);
    let total = 0;
    for (let product in cart) {
        total += cart[product].totalPrice;
    }

    fetch('https://script.google.com/macros/s/AKfycbyr-yIhVDjkPUVQpe2j4oMejstlum_27RlO4aY45ypeF_ejFkeTCSUqkRQ0n5pNr4I/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            cart: cartData,
            total: total
        })
    })
    .then(() => {
        alert('Order submitted!');
        resetCart();
    });
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

