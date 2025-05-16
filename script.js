document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.innerHTML = mainNav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Load Featured Products
    const featuredProducts = [
        {
            id: 1,
            name: "Quantum X Smartphone",
            price: 899.99,
            image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb",
            rating: 4.5,
            category: "smartphones"
        },
        {
            id: 2,
            name: "Nebula Pro Laptop",
            price: 1299.99,
            image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45",
            rating: 4.8,
            category: "laptops"
        },
        {
            id: 3,
            name: "Pulse Wireless Headphones",
            price: 199.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
            rating: 4.3,
            category: "audio"
        },
        {
            id: 4,
            name: "Vortex Gaming Console",
            price: 499.99,
            image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e",
            rating: 4.7,
            category: "gaming"
        }
    ];
    
    const productGrid = document.getElementById('featured-products');
    
    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card fade-in';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-rating">
                    ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                    (${product.rating})
                </div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
    
    // Cart Functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    
    function updateCartCount() {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
    
    updateCartCount();
    
    // Add to Cart
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = featuredProducts.find(p => p.id === productId);
            
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            
            // Animation feedback
            e.target.textContent = 'Added!';
            e.target.style.backgroundColor = 'var(--success)';
            setTimeout(() => {
                e.target.textContent = 'Add to Cart';
                e.target.style.backgroundColor = 'var(--primary)';
            }, 1000);
        }
    });
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        
        // In a real app, you would send this to your backend
        console.log('Subscribed email:', email);
        
        // Show success message
        this.innerHTML = `
            <p style="color: white; font-size: 1.2rem;">
                Thanks for subscribing! Check your email for your 10% off coupon.
            </p>
        `;
        
        // Store in localStorage
        let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
        subscribers.push(email);
        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
    });
    
    // Category Cards
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            window.location.href = `products.html?category=${category}`;
        });
    });
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});