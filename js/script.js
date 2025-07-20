// Farmácia Hiper Real - JavaScript Interativo
// Sistema completo de e-commerce

class FarmaciaEcommerce {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCartDisplay();
        this.setupAnimations();
        this.setupMobileMenu();
        this.setupSearch();
        this.setupNewsletter();
        this.setupScrollEffects();
    }

    // Configurar todos os event listeners
    setupEventListeners() {
        // Botões de adicionar ao carrinho
        document.querySelectorAll('.btn-add-cart').forEach(btn => {
            btn.addEventListener('click', (e) => this.addToCart(e));
        });

        // Ícone do carrinho
        document.getElementById('cartIcon').addEventListener('click', () => {
            this.openCartModal();
        });

        // Fechar modal do carrinho
        document.getElementById('closeCart').addEventListener('click', () => {
            this.closeCartModal();
        });

        // Finalizar compra
        document.getElementById('checkoutBtn').addEventListener('click', () => {
            this.checkout();
        });

        // Busca
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.performSearch();
        });

        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });

        // Newsletter
        document.getElementById('newsletterBtn').addEventListener('click', () => {
            this.subscribeNewsletter();
        });

        // Fechar modal clicando fora
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('cartModal');
            if (e.target === modal) {
                this.closeCartModal();
            }
        });

        // Quick view dos produtos
        document.querySelectorAll('.btn-quick-view').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showQuickView(e.target.closest('.produto-card'));
            });
        });

        // Clique nos produtos para WhatsApp
        document.querySelectorAll('.produto-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.btn-add-cart') && !e.target.closest('.btn-quick-view')) {
                    this.contactWhatsApp(card);
                }
            });
        });
    }

    // Adicionar produto ao carrinho
    addToCart(e) {
        e.stopPropagation();
        const button = e.target.closest('.btn-add-cart');
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);

        // Verificar se o produto já existe no carrinho
        const existingItem = this.cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                name: name,
                price: price,
                quantity: 1,
                id: Date.now()
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        this.showAddToCartFeedback(button);
        this.animateCartIcon();
    }

    // Remover produto do carrinho
    removeFromCart(id) {
        this.cart = this.cart.filter(item => item.id !== id);
        this.saveCart();
        this.updateCartDisplay();
        this.renderCartItems();
    }

    // Atualizar quantidade no carrinho
    updateQuantity(id, newQuantity) {
        const item = this.cart.find(item => item.id === id);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(id);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
                this.updateCartDisplay();
                this.renderCartItems();
            }
        }
    }

    // Salvar carrinho no localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    // Atualizar display do carrinho
    updateCartDisplay() {
        const cartCount = document.querySelector('.cart-count');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Animar contador se houver itens
        if (totalItems > 0) {
            cartCount.style.display = 'flex';
        } else {
            cartCount.style.display = 'none';
        }
    }

    // Abrir modal do carrinho
    openCartModal() {
        const modal = document.getElementById('cartModal');
        modal.style.display = 'block';
        this.renderCartItems();
        document.body.style.overflow = 'hidden';
    }

    // Fechar modal do carrinho
    closeCartModal() {
        const modal = document.getElementById('cartModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Renderizar itens do carrinho
    renderCartItems() {
        const cartItems = document.getElementById('cartItems');
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
            document.getElementById('cartTotal').textContent = '0,00';
            return;
        }

        let html = '';
        let total = 0;

        this.cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            html += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="ecommerce.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="qty-btn" onclick="ecommerce.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button class="remove-btn" onclick="ecommerce.removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    <div class="cart-item-total">
                        R$ ${itemTotal.toFixed(2).replace('.', ',')}
                    </div>
                </div>
            `;
        });

        cartItems.innerHTML = html;
        document.getElementById('cartTotal').textContent = total.toFixed(2).replace('.', ',');

        // Adicionar estilos para os itens do carrinho
        this.addCartItemStyles();
    }

    // Adicionar estilos para itens do carrinho
    addCartItemStyles() {
        if (!document.getElementById('cart-styles')) {
            const style = document.createElement('style');
            style.id = 'cart-styles';
            style.textContent = `
                .cart-item {
                    display: grid;
                    grid-template-columns: 1fr auto auto;
                    gap: 15px;
                    align-items: center;
                    padding: 15px 0;
                    border-bottom: 1px solid #eee;
                }
                .cart-item:last-child {
                    border-bottom: none;
                }
                .cart-item-info h4 {
                    margin: 0 0 5px 0;
                    font-size: 14px;
                    color: #333;
                }
                .cart-item-info p {
                    margin: 0;
                    color: #666;
                    font-size: 12px;
                }
                .cart-item-controls {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .qty-btn {
                    width: 30px;
                    height: 30px;
                    border: 1px solid #ddd;
                    background: white;
                    border-radius: 4px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .qty-btn:hover {
                    background: #f5f5f5;
                }
                .quantity {
                    min-width: 20px;
                    text-align: center;
                    font-weight: 600;
                }
                .remove-btn {
                    background: #dc3545;
                    color: white;
                    border: none;
                    padding: 5px 8px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-left: 10px;
                }
                .remove-btn:hover {
                    background: #c82333;
                }
                .cart-item-total {
                    font-weight: 600;
                    color: #D4AF37;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Finalizar compra via WhatsApp
    checkout() {
        if (this.cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        let message = 'Olá! Gostaria de finalizar minha compra:\n\n';
        let total = 0;

        this.cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            message += `• ${item.name}\n`;
            message += `  Quantidade: ${item.quantity}\n`;
            message += `  Preço unitário: R$ ${item.price.toFixed(2).replace('.', ',')}\n`;
            message += `  Subtotal: R$ ${itemTotal.toFixed(2).replace('.', ',')}\n\n`;
        });

        message += `*Total: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
        message += 'Aguardo informações sobre entrega e pagamento.';

        const whatsappUrl = `https://wa.me/557592196765?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        // Limpar carrinho após checkout
        this.cart = [];
        this.saveCart();
        this.updateCartDisplay();
        this.closeCartModal();
        this.showNotification('Redirecionando para WhatsApp...', 'success');
    }

    // Contato via WhatsApp para produto específico
    contactWhatsApp(productCard) {
        const productName = productCard.querySelector('h3').textContent;
        const message = `Olá! Tenho interesse no produto: ${productName}. Gostaria de mais informações.`;
        const whatsappUrl = `https://wa.me/557592196765?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    // Feedback visual ao adicionar ao carrinho
    showAddToCartFeedback(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
        button.style.background = '#28a745';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 2000);
    }

    // Animar ícone do carrinho
    animateCartIcon() {
        const cartIcon = document.getElementById('cartIcon');
        cartIcon.style.transform = 'scale(1.2)';
        cartIcon.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 300);
    }

    // Configurar menu mobile
    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.querySelector('i').className = 'fas fa-bars';
            });
        });
    }

    // Configurar busca
    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        
        // Busca em tempo real (debounced)
        let searchTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.liveSearch(searchInput.value);
            }, 300);
        });
    }

    // Realizar busca
    performSearch() {
        const query = document.getElementById('searchInput').value.trim();
        if (query) {
            this.showNotification(`Buscando por: "${query}"`, 'info');
            // Aqui você implementaria a lógica de busca real
            // Por enquanto, vamos simular
            setTimeout(() => {
                this.showSearchResults(query);
            }, 1000);
        }
    }

    // Busca em tempo real
    liveSearch(query) {
        if (query.length < 3) return;
        
        // Simular busca em tempo real
        const products = document.querySelectorAll('.produto-card');
        products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            const productDesc = product.querySelector('.produto-description').textContent.toLowerCase();
            
            if (productName.includes(query.toLowerCase()) || productDesc.includes(query.toLowerCase())) {
                product.style.display = 'block';
                product.style.border = '2px solid #D4AF37';
            } else {
                product.style.display = 'none';
                product.style.border = '';
            }
        });
    }

    // Mostrar resultados da busca
    showSearchResults(query) {
        // Reset da busca em tempo real
        document.querySelectorAll('.produto-card').forEach(product => {
            product.style.display = 'block';
            product.style.border = '';
        });
        
        this.showNotification(`Resultados para: "${query}"`, 'success');
    }

    // Configurar newsletter
    setupNewsletter() {
        const newsletterInput = document.getElementById('newsletterEmail');
        
        newsletterInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.subscribeNewsletter();
            }
        });
    }

    // Inscrever na newsletter
    subscribeNewsletter() {
        const email = document.getElementById('newsletterEmail').value.trim();
        
        if (!email) {
            this.showNotification('Por favor, insira seu e-mail', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showNotification('Por favor, insira um e-mail válido', 'error');
            return;
        }

        // Simular inscrição
        this.showNotification('E-mail cadastrado com sucesso!', 'success');
        document.getElementById('newsletterEmail').value = '';
    }

    // Validar e-mail
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Configurar animações
    setupAnimations() {
        // Intersection Observer para animações de entrada
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observar elementos para animação
        document.querySelectorAll('.produto-card, .benefit-item, .category-card').forEach(el => {
            observer.observe(el);
        });
    }

    // Configurar efeitos de scroll
    setupScrollEffects() {
        let lastScrollTop = 0;
        const header = document.querySelector('.header');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Header hide/show
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;

            // Parallax effect no banner
            const banner = document.querySelector('.hero-banner');
            if (banner) {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.5;
                banner.style.transform = `translateY(${parallax}px)`;
            }
        });

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
    }

    // Quick view do produto
    showQuickView(productCard) {
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price-current').textContent;
        const productDesc = productCard.querySelector('.produto-description').textContent;
        const productImg = productCard.querySelector('.produto-image img').src;

        // Criar modal de quick view
        const quickViewModal = document.createElement('div');
        quickViewModal.className = 'modal';
        quickViewModal.id = 'quickViewModal';
        quickViewModal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3>Visualização Rápida</h3>
                    <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: center;">
                        <div>
                            <img src="${productImg}" alt="${productName}" style="width: 100%; height: auto; border-radius: 10px;">
                        </div>
                        <div>
                            <h3 style="margin-bottom: 10px;">${productName}</h3>
                            <p style="color: #666; margin-bottom: 15px;">${productDesc}</p>
                            <div style="font-size: 1.5rem; font-weight: 700; color: #D4AF37; margin-bottom: 20px;">
                                ${productPrice}
                            </div>
                            <button class="btn btn-primary" onclick="window.open('https://wa.me/557592196765?text=${encodeURIComponent('Interesse no produto: ' + productName)}', '_blank')">
                                <i class="fab fa-whatsapp"></i> Comprar via WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(quickViewModal);
        quickViewModal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Fechar modal clicando fora
        quickViewModal.addEventListener('click', (e) => {
            if (e.target === quickViewModal) {
                quickViewModal.remove();
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Sistema de notificações
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Estilos da notificação
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 3000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;

        // Cores por tipo
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#17a2b8',
            warning: '#ffc107'
        };

        notification.style.background = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remover após 4 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Lazy loading para imagens
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Performance monitoring
    monitorPerformance() {
        // Monitorar tempo de carregamento
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Página carregada em ${loadTime}ms`);
        });
    }
}

// Inicializar o e-commerce quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.ecommerce = new FarmaciaEcommerce();
    
    // Adicionar alguns efeitos extras
    setupExtraEffects();
});

// Efeitos extras
function setupExtraEffects() {
    // Efeito de typing no banner
    const bannerTitle = document.querySelector('.banner-text h1');
    if (bannerTitle) {
        const text = bannerTitle.textContent;
        bannerTitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                bannerTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Contador animado para benefícios
    const animateCounters = () => {
        const counters = document.querySelectorAll('.benefit-item');
        counters.forEach((counter, index) => {
            counter.style.animationDelay = `${index * 0.2}s`;
        });
    };

    // Efeito de hover nos produtos
    document.querySelectorAll('.produto-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Easter egg - Konami Code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });

    // Adicionar animação rainbow para easter egg
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Função global para atualizar quantidade (usada nos botões do carrinho)
window.updateQuantity = (id, quantity) => {
    if (window.ecommerce) {
        window.ecommerce.updateQuantity(id, quantity);
    }
};

// Função global para remover do carrinho
window.removeFromCart = (id) => {
    if (window.ecommerce) {
        window.ecommerce.removeFromCart(id);
    }
};

// Service Worker para cache (PWA básico)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado com sucesso:', registration);
            })
            .catch(registrationError => {
                console.log('Falha no registro do SW:', registrationError);
            });
    });
}

