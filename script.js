// Carrinho de compras
let cart = [];
let cartTotal = 0;

// Produtos em destaque
const featuredProducts = [
    {
        id: 1,
        name: "Tênis Esportivo Premium",
        price: 299.90,
        image: "assets/images/produtos_destaque.png",
        description: "Tênis confortável para atividades esportivas"
    },
    {
        id: 2,
        name: "Bolsa Executiva",
        price: 189.90,
        image: "assets/images/produtos_destaque.png",
        description: "Bolsa elegante para o dia a dia"
    },
    {
        id: 3,
        name: "Fones de Ouvido Bluetooth",
        price: 159.90,
        image: "assets/images/produtos_destaque.png",
        description: "Som de alta qualidade sem fio"
    },
    {
        id: 4,
        name: "Camiseta Premium",
        price: 79.90,
        image: "assets/images/produtos_destaque.png",
        description: "Camiseta de algodão 100% premium"
    },
    {
        id: 5,
        name: "Relógio Inteligente",
        price: 399.90,
        image: "assets/images/produtos_destaque.png",
        description: "Smartwatch com múltiplas funcionalidades"
    },
    {
        id: 6,
        name: "Notebook Gamer",
        price: 2499.90,
        image: "assets/images/produtos_destaque.png",
        description: "Notebook para jogos e trabalho"
    }
];

// Função para toggle do carrinho
function toggleCart() {
    const cartPopup = document.getElementById('cartPopup');
    cartPopup.classList.toggle('active');
}

// Função para adicionar produto ao carrinho
function addToCart(productId) {
    const product = featuredProducts.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    updateCartCount();
    
    // Mostrar feedback visual
    showAddToCartFeedback();
}

// Função para remover produto do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    updateCartCount();
}

// Função para atualizar quantidade no carrinho
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartDisplay();
        updateCartCount();
    }
}

// Função para atualizar exibição do carrinho
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
        cartTotal.textContent = '0,00';
        return;
    }
    
    let total = 0;
    let cartHTML = '';
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        cartHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="margin-left: 10px; color: red;">×</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartItems.innerHTML = cartHTML;
    cartTotal.textContent = total.toFixed(2).replace('.', ',');
}

// Função para atualizar contador do carrinho
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (totalItems > 0) {
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }
}

// Função para mostrar feedback de adição ao carrinho
function showAddToCartFeedback() {
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.style.transform = 'scale(1.2)';
    cartBtn.style.background = '#4CAF50';
    
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
        cartBtn.style.background = '#FFD700';
    }, 300);
}

// Função para carregar produtos em destaque
function loadFeaturedProducts() {
    const productsGrid = document.getElementById('featuredProducts');
    if (!productsGrid) return;
    
    let productsHTML = '';
    
    featuredProducts.forEach(product => {
        productsHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        `;
    });
    
    productsGrid.innerHTML = productsHTML;
}

// Função para fechar carrinho ao clicar fora
function closeCartOnClickOutside(event) {
    const cartContainer = document.querySelector('.cart-container');
    const cartPopup = document.getElementById('cartPopup');
    
    if (!cartContainer.contains(event.target) && cartPopup.classList.contains('active')) {
        cartPopup.classList.remove('active');
    }
}

// Função para busca de produtos
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // Redirecionar para página de produtos com query
            window.location.href = `produtos.html?search=${encodeURIComponent(query)}`;
        }
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Função para newsletter
function setupNewsletter() {
    const newsletterBtn = document.querySelector('.newsletter-btn');
    const newsletterInput = document.querySelector('.newsletter-input');
    
    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', function() {
            const email = newsletterInput.value.trim();
            if (email && isValidEmail(email)) {
                alert('Obrigado por se inscrever! Você receberá nossas novidades em breve.');
                newsletterInput.value = '';
            } else {
                alert('Por favor, insira um e-mail válido.');
            }
        });
    }
}

// Função para validar e-mail
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para animações de scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.category-card, .product-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Função para menu mobile (se necessário)
function setupMobileMenu() {
    // Implementar menu hamburger para mobile se necessário
    const nav = document.querySelector('.nav');
    const navList = document.querySelector('.nav-list');
    
    // Adicionar botão de menu mobile se a tela for pequena
    if (window.innerWidth <= 768) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.style.cssText = `
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #333;
        `;
        
        nav.insertBefore(mobileMenuBtn, navList);
        
        mobileMenuBtn.addEventListener('click', function() {
            navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
        });
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
    setupSearch();
    setupNewsletter();
    setupScrollAnimations();
    setupMobileMenu();
    
    // Event listeners
    document.addEventListener('click', closeCartOnClickOutside);
    
    // Inicializar contador do carrinho
    updateCartCount();
    
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Função para redimensionamento da janela
window.addEventListener('resize', function() {
    // Reajustar elementos se necessário
    const cartPopup = document.getElementById('cartPopup');
    if (window.innerWidth <= 768) {
        cartPopup.style.width = '300px';
        cartPopup.style.right = '-50px';
    } else {
        cartPopup.style.width = '350px';
        cartPopup.style.right = '0';
    }
});

