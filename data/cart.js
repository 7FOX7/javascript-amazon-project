import { isValidDeliveryOptionId } from "./deliveryOptions.js";
export let cart; 

loadFromStorage(); 

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')); 

    if(!cart) {
        cart = [
        {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
            quantity: 3, 
            deliveryOptionId: '2'
        }
        ]; 
    }
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, cartValue) {
    let matchingProduct; 

    cart.forEach((product) => {
        if(product.productId === productId) {
            matchingProduct = product;
        }
    });
    
    if(matchingProduct) {
        matchingProduct.quantity += Number(cartValue);
    }

    else {
        cart.push({
            productId, 
            quantity: Number(cartValue),
            deliveryOptionId: '1'
        });    
    }

    saveToStorage(); 
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId != productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    saveToStorage(); 
}

export function updateQuantity(productId, newQuantity) {
    let matchingProduct = ''; 
    cart.forEach((cartItem) => {
        if(cartItem.productId === productId) {
            matchingProduct = cartItem; 
            matchingProduct.quantity = newQuantity; 
        }
    });

    saveToStorage(); 
}

export function calculateCartQuantity() {
    let cartQuantity = 0; 

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    return cartQuantity; 
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem; 
    if(!isValidDeliveryOptionId(deliveryOptionId)) {
         return;
    }
    cart.forEach((cartItem) => {
        if(cartItem.productId === productId) {
            matchingItem = cartItem; 
        }
    });

    if(!matchingItem) {
        return; 
    }
    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage(); 
}

// function updateQuantitySelector(productId) {
//     const selectorId = document.querySelector(`.js-quantity-selector-${productId}`);
//     const cartValue = selectorId.value; 

//     return cartValue; 
// }