/**
 * Harvest Collection Landing Page - Navigation & Interactivity Script
 * File: nav.js
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all UI handlers
    initMobileNavigation();
    initCartDrawer();
    initBundleCalculator();
    initSmoothScrolling();
    initCheckoutModal();
    initAutumnLeavesAnimation();
});

/**
 * 1. Mobile Navigation Toggle Handler
 */
function initMobileNavigation() {
    const navToggleBtn = document.getElementById('navToggle');
    const navLinksList = document.getElementById('navLinks');

    if (!navToggleBtn || !navLinksList) return;

    navToggleBtn.addEventListener('click', () => {
        const isOpen = navLinksList.classList.toggle('active');
        navToggleBtn.setAttribute('aria-expanded', isOpen);
        
        // Toggle hamburger / close icon visual state
        const icon = navToggleBtn.querySelector('i') || navToggleBtn;
        if (isOpen) {
            navToggleBtn.classList.add('is-open');
        } else {
            navToggleBtn.classList.remove('is-open');
        }
    });

    // Close menu when clicking any nav link on mobile
    const navItems = navLinksList.querySelectorAll('a');
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinksList.classList.remove('active');
            navToggleBtn.setAttribute('aria-expanded', 'false');
            navToggleBtn.classList.remove('is-open');
        });
    });

    // Close nav when clicking outside
    document.addEventListener('click', (event) => {
        if (!navLinksList.contains(event.target) && !navToggleBtn.contains(event.target)) {
            navLinksList.classList.remove('active');
            navToggleBtn.setAttribute('aria-expanded', 'false');
            navToggleBtn.classList.remove('is-open');
        }
    });
}

/**
 * 2. Cart Slide-Over Drawer Controller
 */
function initCartDrawer() {
    const cartTriggerBtns = document.querySelectorAll('.cart-trigger, #cartBtn');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCartBtn = document.getElementById('closeCart');

    function openCart() {
        if (cartDrawer && cartOverlay) {
            cartDrawer.classList.add('open');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    function closeCart() {
        if (cartDrawer && cartOverlay) {
            cartDrawer.classList.remove('open');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    cartTriggerBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    });

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartDrawer && cartDrawer.classList.contains('open')) {
            closeCart();
        }
    });
}

/**
 * 3. Interactive Harvest Bundle Price Calculator
 */
function initBundleCalculator() {
    const coffeeSelect = document.getElementById('coffeeSelect');
    const chocolateSelect = document.getElementById('chocolateSelect');
    
    const originalPriceElem = document.getElementById('originalPrice');
    const discountAmountElem = document.getElementById('discountAmount');
    const finalPriceElem = document.getElementById('finalPrice');
    const addToCartBtn = document.getElementById('addBundleToCartBtn');

    if (!coffeeSelect || !chocolateSelect) return;

    function recalculateBundle() {
        // Fetch price values stored in selected option data attributes
        const selectedCoffeeOpt = coffeeSelect.options[coffeeSelect.selectedIndex];
        const selectedChocOpt = chocolateSelect.options[chocolateSelect.selectedIndex];

        const coffeePrice = parseFloat(selectedCoffeeOpt.getAttribute('data-price') || 0);
        const chocolatePrice = parseFloat(selectedChocOpt.getAttribute('data-price') || 0);

        // 20% Discount applies specifically to the Harvest Collection Chocolate Box when bought with coffee
        const chocolateDiscount = chocolatePrice * 0.20;
        const totalOriginal = coffeePrice + chocolatePrice;
        const totalFinal = totalOriginal - chocolateDiscount;

        // Render calculated figures
        if (originalPriceElem) {
            originalPriceElem.textContent = `$${totalOriginal.toFixed(2)}`;
        }
        if (discountAmountElem) {
            discountAmountElem.textContent = `-$${chocolateDiscount.toFixed(2)}`;
        }
        if (finalPriceElem) {
            finalPriceElem.textContent = `$${totalFinal.toFixed(2)}`;
        }
    }

    // Attach listeners on dropdown change
    coffeeSelect.addEventListener('change', recalculateBundle);
    chocolateSelect.addEventListener('change', recalculateBundle);

    // Add Bundle to Cart Action
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const coffeeName = coffeeSelect.options[coffeeSelect.selectedIndex].text;
            const chocolateName = chocolateSelect.options[chocolateSelect.selectedIndex].text;

            // Trigger notification banner or cart drawer update
            showNotification(`Added ${coffeeName} & ${chocolateName} (20% Off applied!)`);
            
            // Increment cart count badge if present
            const cartBadge = document.querySelector('.cart-count');
            if (cartBadge) {
                let count = parseInt(cartBadge.textContent) || 0;
                cartBadge.textContent = count + 1;
            }
        });
    }

    // Run calculation once on startup
    recalculateBundle();
}

/**
 * 4. Smooth Anchor Scrolling for Page Links
 */
function initSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeaderHeight = document.querySelector('header')?.offsetHeight || 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeaderHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 5. Checkout & Order Confirmation Modal
 */
function initCheckoutModal() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    const modal = document.getElementById('checkoutModal');
    const closeModal = document.getElementById('closeModal');

    if (checkoutBtn && modal) {
        checkoutBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }

    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

/**
 * 6. Falling Autumn Leaves Dynamic FX
 */
function initAutumnLeavesAnimation() {
    const leavesContainer = document.getElementById('fallingLeavesContainer');
    if (!leavesContainer) return;

    const leafSymbols = ['🍁', '🍂', '🍃', '🌰'];
    const totalLeaves = 14;

    for (let i = 0; i < totalLeaves; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        leaf.textContent = leafSymbols[Math.floor(Math.random() * leafSymbols.length)];
        
        // Randomize leaf animation timing and positioning
        leaf.style.left = `${Math.random() * 100}%`;
        leaf.style.animationDuration = `${6 + Math.random() * 8}s`;
        leaf.style.animationDelay = `${Math.random() * 5}s`;
        leaf.style.opacity = Math.random() * 0.7 + 0.3;
        leaf.style.fontSize = `${16 + Math.random() * 16}px`;

        leavesContainer.appendChild(leaf);
    }
}

/**
 * Utility function for Toast Notifications
 */
function showNotification(message) {
    let toast = document.getElementById('toastNotification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toastNotification';
        toast.style.cssText = `
            position: fixed;
            bottom: 25px;
            right: 25px;
            background-color: #6B1C1C;
            color: #FFFFFF;
            padding: 14px 24px;
            border-radius: 8px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.2);
            z-index: 9999;
            font-family: sans-serif;
            font-size: 14px;
            transition: opacity 0.3s ease, transform 0.3s ease;
            transform: translateY(20px);
            opacity: 0;
        `;
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
    }, 3500);
}
