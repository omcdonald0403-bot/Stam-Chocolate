/**
 * Harvest Collection Landing Page - Router & Interactivity Engine
 * File: app.js
 */

// Global Shopping Cart State
let cart = [];

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Single-Page Application (SPA) Router
  initRouter();
  
  // 2. Initialize Slide-Over Cart Drawer Events
  initCartDrawer();
  
  // 3. Generate Falling Leaves Background FX
  initLeavesFX();
});

/**
 * 1. SPA Router - Handles dynamic navigation between the main ad banner 
 *    and individual sub-ad landing pages without reloading the page.
 */
function initRouter() {
  function navigateTo(pageId) {
    // Hide all active page views
    document.querySelectorAll('.page-view').forEach(view => {
      view.classList.remove('active');
    });

    // Determine target view (fallback to 'home' if page ID is invalid)
    const targetView = document.getElementById(pageId) || document.getElementById('home');
    targetView.classList.add('active');

    // Update global navigation bar active tab state
    document.querySelectorAll('.nav-item').forEach(nav => {
      if (nav.getAttribute('data-page') === pageId) {
        nav.classList.add('active');
      } else {
        nav.classList.remove('active');
      }
    });

    // Scroll smoothly back to top on page switch
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL hash for browser history support
    if (window.location.hash !== `#${pageId}`) {
      history.pushState(null, null, `#${pageId}`);
    }
  }

  // Intercept click on any element containing data-page attribute
  document.body.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-page]');
    if (trigger) {
      e.preventDefault();
      const pageTarget = trigger.getAttribute('data-page');
      navigateTo(pageTarget);
    }
  });

  // Handle browser Back / Forward navigation buttons
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    navigateTo(hash);
  });

  // Initial routing check on load
  const initialHash = window.location.hash.replace('#', '') || 'home';
  navigateTo(initialHash);
}

/**
 * 2. Cart Data Management & Dynamic UI Updates
 */
function addToCart(title, price) {
  cart.push({ title, price });
  updateCartUI();
  openCart();
  showToastNotification(`Added "${title}" to your cart!`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  const cartBadge = document.getElementById('cartBadge');
  const cartList = document.getElementById('cartList');
  const cartTotal = document.getElementById('cartTotal');

  if (cartBadge) {
    cartBadge.textContent = cart.length;
  }

  if (!cartList || !cartTotal) return;

  if (cart.length === 0) {
    cartList.innerHTML = `<p style="color: #6C5A50; text-align: center; margin-top: 2rem;">Your cart is currently empty.</p>`;
    cartTotal.textContent = `$0.00`;
    return;
  }

  let total = 0;
  cartList.innerHTML = cart.map((item, index) => {
    total += item.price;
    return `
      <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid #E8D6C8;">
        <div>
          <strong style="display: block; color: #3A1A10;">${item.title}</strong>
          <span style="color: #6B1C1C; font-weight: 600;">$${item.price.toFixed(2)}</span>
        </div>
        <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #C86D51; font-weight: 600; cursor: pointer;">Remove</button>
      </div>
    `;
  }).join('');

  cartTotal.textContent = `$${total.toFixed(2)}`;
}

/**
 * 3. Slide-Over Cart Drawer Controller
 */
function initCartDrawer() {
  const openBtn = document.getElementById('openCartBtn');
  const closeBtn = document.getElementById('closeCartBtn');
  const overlay = document.getElementById('cartOverlay');

  if (openBtn) openBtn.addEventListener('click', openCart);
  if (closeBtn) closeBtn.addEventListener('click', closeCart);
  if (overlay) overlay.addEventListener('click', closeCart);
}

function openCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer && overlay) {
    drawer.classList.add('open');
    overlay.classList.add('active');
  }
}

function closeCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
  }
}

/**
 * 4. Falling Autumn Leaves Visual Effects Engine
 */
function initLeavesFX() {
  const container = document.getElementById('leavesContainer');
  if (!container) return;

  const icons = ['🍁', '🍂', '🍃', '🌰'];
  const leafCount = 15;
  
  for (let i = 0; i < leafCount; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.textContent = icons[Math.floor(Math.random() * icons.length)];
    leaf.style.left = `${Math.random() * 100}%`;
    leaf.style.animationDuration = `${6 + Math.random() * 8}s`;
    leaf.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(leaf);
  }
}

/**
 * Helper: Toast Notification Handler
 */
function showToastNotification(message) {
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
      padding: 12px 20px;
      border-radius: 30px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      z-index: 9999;
      font-size: 14px;
      font-weight: 600;
      transition: opacity 0.3s ease, transform 0.3s ease;
      transform: translateY(20px);
      opacity: 0;
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
  }, 3000);
}
