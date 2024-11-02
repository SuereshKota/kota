const products = {
    necklaces: [
        { name: "Gold Necklace", price: 99, image: "product1.jpg" },
        { name: "Diamond Necklace", price: 129, image: "product2.jpg" }
    ],
    bracelets: {
        men: [
            { name: "Men's Gold Bracelet", price: 90, image: "product8.jpg" },
            { name: "Men's Leather Bracelet", price: 50, image: "product9.jpg" }
        ],
        women: [
            { name: "Women's Gold Bracelet", price: 80, image: "product10.jpg" },
            { name: "Women's Beaded Bracelet", price: 60, image: "product11.jpg" }
        ]
    },
    rings: {
        men: [
            { name: "Men's Gold Ring", price: 75, image: "product4.jpg" },
            { name: "Men's Diamond Ring", price: 150, image: "product5.jpg" }
        ],
        women: [
            { name: "Women's Gold Ring", price: 85, image: "product6.jpg" },
            { name: "Women's Diamond Ring", price: 160, image: "product7.jpg" }
        ]
    },
    earrings: [
        { name: "Gold Earrings", price: 49, image: "product3.jpg" }
    ],
    sets: []
};

let cartCount = 0; // Initialize cart count
let cartItems = []; // Array to hold cart items

function showCategory(category, subcategory = null) {
    const productDisplay = document.getElementById('product-display');
    productDisplay.innerHTML = ''; // Clear previous content

    if (subcategory) {
        // If a specific subcategory is clicked (men or women)
        const specificProducts = products[category][subcategory] || [];

        if (specificProducts.length > 0) {
            specificProducts.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                `;
                productDisplay.appendChild(productDiv);
            });
        } else {
            productDisplay.innerHTML = `<p>Launching Soon!</p>`;
        }
    } else {
        // Handle main categories (display products from both subcategories)
        if (products[category]) {
            const allProducts = [];
            if (category === 'bracelets' || category === 'rings') {
                allProducts.push(...products[category].men, ...products[category].women);
            } else {
                allProducts.push(...products[category]);
            }

            if (allProducts.length > 0) {
                allProducts.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.classList.add('product');
                    productDiv.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>$${product.price}</p>
                        <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                    `;
                    productDisplay.appendChild(productDiv);
                });
            } else {
                productDisplay.innerHTML = `<p>Launching Soon!</p>`;
            }
        }
    }
}

function addToCart(productName, price) {
    // Increment cart count
    cartCount++;
    
    // Update cart count display
    document.getElementById('cart-count').textContent = cartCount;

    // Add item to cartItems array
    cartItems.push({ name: productName, price: price });

    // Show notification
    const notification = document.getElementById('notification');
    notification.style.display = 'block'; // Show the notification
    notification.textContent = `${productName} added to cart!`; // Set notification message

    // Hide the notification after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function showCartModal() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ''; // Clear previous cart items

    // Check if cart is empty
    if (cartItems.length === 0) {
        document.getElementById('cart-empty-message').style.display = 'block';
    } else {
        document.getElementById('cart-empty-message').style.display = 'none';

        // Display each cart item
        cartItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `${item.name} - $${item.price}`;
            cartItemsDiv.appendChild(itemDiv);
        });
    }

    // Show the modal
    document.getElementById('cart-modal').style.display = 'block';
}

function closeCartModal() {
    // Hide the modal
    document.getElementById('cart-modal').style.display = 'none';
}
