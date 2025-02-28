document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    updateCartCount();
});

// Fetch Products
function fetchProducts() {
    const products = [
        { name: "Laptop", price: 1000, image: "laptop.jpg" },
        { name: "Smartphone", price: 500, image: "phone.jpg" },
        { name: "Headphones", price: 150, image: "headphones.jpg" },
        { name: "Watch", price: 200, image: "watch.jpg" }
    ];
    displayProducts(products);
}

// Display Products
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-card');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Search Products
function searchProducts() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const name = product.querySelector('h2').innerText.toLowerCase();
        product.style.display = name.includes(query) ? "block" : "none";
    });
}

// Add to Cart
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Update Cart Count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').innerText = cart.length;
}

// Scroll to Products
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}
document.addEventListener('DOMContentLoaded', loadCart);

// Load Cart Items from LocalStorage
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsDiv = document.getElementById('cart-items');
    let cartTotal = document.getElementById('cart-total');
    cartItemsDiv.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        let itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <p>${item.name} - $${item.price}</p>
            <button onclick="removeFromCart(${index})">❌ Remove</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });

    cartTotal.innerText = total.toFixed(2);
}

// Remove Item from Cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Checkout Function
function checkout() {
    alert("Thank you for your purchase! 🎉");
    localStorage.removeItem('cart');
    window.location.href = "index.html";
}
