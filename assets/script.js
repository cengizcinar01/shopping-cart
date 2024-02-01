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
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}

function buyButtonClicked() {
    alert('Order successfully placed');
    let cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
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
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemNames = cartItems.getElementsByClassName('cart-product-title');
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already in your cart');
            return;
        }
    }

    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    let cartBoxContent = `
                        <img src="${productImg}" alt="${title}" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <i class="bx bxs-trash-alt cart-remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
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
