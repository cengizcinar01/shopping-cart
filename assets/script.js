document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('#cart-icon');
    const cart = document.querySelector('.cart');
    const closeCart = document.querySelector('#close-cart');

    cartIcon.addEventListener('click', () => cart.classList.add('active'));
    closeCart.addEventListener('click', () => cart.classList.remove('active'));

    const initCartFunctions = () => {
        document.querySelectorAll('.cart-remove').forEach((button) => {
            button.addEventListener('click', removeCartItem);
        });

        document.querySelectorAll('.cart-quantity').forEach((input) => {
            input.addEventListener('change', quantityChanged);
        });

        document.querySelectorAll('.add-cart').forEach((button) => {
            button.addEventListener('click', addCartClicked);
        });

        document.querySelector('.btn-buy').addEventListener('click', buyButtonClicked);
    };

    initCartFunctions();

    function buyButtonClicked() {
        const cartContent = document.querySelector('.cart-content');
        const cartItems = cartContent.querySelectorAll('.cart-box');
        if (cartItems.length === 0) {
            alert('Your cart is empty');
        } else {
            alert('Order successfully placed');
            while (cartContent.firstChild) {
                cartContent.removeChild(cartContent.firstChild);
            }
            document.querySelector('.total-price').innerText = '0,00 €';
        }
    }

    function removeCartItem(event) {
        event.target.parentElement.remove();
        updateTotalPrice();
    }

    function quantityChanged(event) {
        const input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateTotalPrice();
    }

    let isAddingToCart = false;

    function addCartClicked(event) {
        isAddingToCart = true;
        const button = event.target;
        const shopProducts = button.parentElement;
        const title = shopProducts.querySelector('.product-title').innerText;
        const price = shopProducts.querySelector('.price').innerText;
        const productImg = shopProducts.querySelector('.product-img').src;
        addProductToCart(title, price, productImg);
        updateTotalPrice();
        setTimeout(() => (isAddingToCart = false), 100);
    }

    function addProductToCart(title, price, productImg) {
        const cartItems = document.querySelector('.cart-content');
        const cartItemNames = cartItems.querySelectorAll('.cart-product-title');

        if (Array.from(cartItemNames).some((itemName) => itemName.innerText === title)) {
            alert('This item is already in your cart');
            return;
        }

        const cartShopBox = document.createElement('div');
        cartShopBox.classList.add('cart-box');
        cartShopBox.innerHTML = `
            <img src="${productImg}" alt="${title}" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class="bx bxs-trash-alt cart-remove"></i>`;
        cartItems.append(cartShopBox);

        cartShopBox.querySelector('.cart-remove').addEventListener('click', removeCartItem);
        cartShopBox.querySelector('.cart-quantity').addEventListener('change', quantityChanged);

        cart.classList.add('active');
    }

    function updateTotalPrice() {
        const cartContent = document.querySelector('.cart-content');
        const cartBoxes = cartContent.querySelectorAll('.cart-box');
        let total = 0;
        cartBoxes.forEach((cartBox) => {
            const priceElement = cartBox.querySelector('.cart-price');
            const quantityElement = cartBox.querySelector('.cart-quantity');
            let price = parseFloat(priceElement.innerText.replace('€', '').replace(',', '.'));
            let quantity = parseInt(quantityElement.value);
            total += price * quantity;
        });

        document.querySelector('.total-price').innerText = `${total.toFixed(2).replace('.', ',')} €`;
    }

    document.addEventListener('click', (event) => {
        if (!cart.contains(event.target) && !cartIcon.contains(event.target) && !isAddingToCart && cart.classList.contains('active')) {
            cart.classList.remove('active');
        }
    });
});
