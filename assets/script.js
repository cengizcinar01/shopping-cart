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
    let removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    let quantityInputs = document.getElementsByClassName('cart-quantity');
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    let addCart = document.getElementsByClassName('add-cart');
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
}

function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotalPrice();
}

function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotalPrice();
}

// Add products to cart
function addCartClicked(event) {
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    let price = shopProducts.getElementsByClassName('price')[0].innerText;
    let productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotalPrice();
}

function addProductToCart(title, price, productImg) {
    let cartShopBox = document.createElement('div');
    //cartShopBox.classList.add('cart-box');
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (let i = 0; i < cartItemsNames.length; i++) {
        alert('This item is already in your cart');
    }
}

// Update total price
function updateTotalPrice() {
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let price = priceElement.innerText.replace('€', '').trim();
        price = parseFloat(price.replace(',', '.'));
        let quantity = parseInt(quantityElement.value);
        total += price * quantity;
    }

    total = total.toFixed(2).replace('.', ',');
    document.getElementsByClassName('total-price')[0].innerText = total + ' €';
}
