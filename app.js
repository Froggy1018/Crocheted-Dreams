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



// Submits order to Google Apps Script Web App
function submitToSheet() {
    // Get form values
    const name = document.getElementById('nameb') ? document.getElementById('nameb').value : '';
    const email = document.getElementById('emailb') ? document.getElementById('emailb').value : '';
    // Compose cart data
    const cartData = cart;
    let total = 0;
    for (let product in cartData) {
        total += cartData[product].totalPrice;
    }

    // Debug: alert what will be sent
    alert('Submitting order...\nName: ' + name + '\nEmail: ' + email + '\nTotal: ' + total + '\nCart: ' + JSON.stringify(cartData));

    fetch('https://script.google.com/macros/s/AKfycbzz_QmuuZpJ7MOVkGpScfDllCL_EU3lJz83GKUIJooJoPcB3ih9gHuszncT1eGrR0I/exec', {
        method: 'POST',
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
    .then(async response => {
        let text = await response.text();
        alert('Response from server: ' + text + '\nStatus: ' + response.status + ' ' + response.statusText);
        if (response.ok) {
            resetCart();
        } else {
            alert('Server error: ' + text);
        }
    })
    .catch(error => {
        alert('Submission failed (network or CORS): ' + error + '\nCheck deployment permissions and CORS headers.');
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

