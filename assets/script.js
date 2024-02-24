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
    const removeCartButtons = document.getElementsByClassName('cart-remove');
    const quantityInputs = document.getElementsByClassName('cart-quantity');
    const addCartButtons = document.getElementsByClassName('add-cart');

    Array.from(removeCartButtons).forEach((button) => {
        button.addEventListener('click', removeCartItem);
    });

    Array.from(quantityInputs).forEach((input) => {
        input.addEventListener('change', quantityChanged);
    });

    Array.from(addCartButtons).forEach((button) => {
        button.addEventListener('click', addCartClicked);
    });

    const buyButton = document.getElementsByClassName('btn-buy')[0];
    if (buyButton) {
        buyButton.addEventListener('click', buyButtonClicked);
    }
}

function buyButtonClicked() {
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartItems = cartContent.getElementsByClassName('cart-box');
    if (cartItems.length === 0) {
        alert('Your cart is empty');
    } else {
        alert('Order successfully placed');
        while (cartContent.hasChildNodes()) {
            cartContent.removeChild(cartContent.firstChild);
        }
        document.getElementsByClassName('total-price')[0].innerText = '0,00 €';
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
    isAddingToCart = true;
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    let price = shopProducts.getElementsByClassName('price')[0].innerText;
    let productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotalPrice();
    setTimeout(() => {
        isAddingToCart = false;
    }, 100);
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

    cart.classList.add('active');
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

document.addEventListener('click', function (event) {
    let clickInsideCart = cart.contains(event.target);
    let clickOnCartIcon = cartIcon.contains(event.target);

    if (!clickInsideCart && !clickOnCartIcon && !isAddingToCart) {
        if (cart.classList.contains('active')) {
            cart.classList.remove('active');
        }
    }
});
