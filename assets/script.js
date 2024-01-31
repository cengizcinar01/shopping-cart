let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () => {
    cart.classList.add('active');
};

closeCart.onclick = () => {
    cart.classList.remove('active');
};

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    // Remove products from cart
    let removeCartButtons = document.getElementByClassName('cart-remove');
    console.log(removeCartButtons);
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
}

function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
}

// Update total price
function updateTotalPrice() {
    let cartContent = document.getElementByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementByClassName('cart-box');
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementByClassName('cart-price')[0];
        let quantityElement = cartBox.getElementByClassName('cart-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace("", "€"));
        let quantity = quantityElement.value;
        total = total + price * quantity;
    }
}
