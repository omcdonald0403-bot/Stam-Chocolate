// ==========================================
// Chocolaterie Stam - Harvest Collection App
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  showMainView();
  initNavigation();
  initCountdownTimer();
  initCopyPromoCode();
  initQuantityControls();
});

function showMainView() {
  const mainView = document.getElementById('mainView');
  const adView = document.getElementById('adView');

  if (!mainView || !adView) return;

  mainView.classList.remove('hidden');
  adView.classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Handles switching between the main content view and the full ad detail page
 */
function initNavigation() {
  const mainView = document.getElementById('mainView');
  const adView = document.getElementById('adView');
  const adTriggerElements = document.querySelectorAll('.ad-trigger, [data-action="view-ad"]');
  const backToMainButtons = document.querySelectorAll('[data-action="back-to-main"]');

  // Open Ad Page when clicking any ad unit
  adTriggerElements.forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      if (mainView) mainView.classList.add('hidden');
      if (adView) adView.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Return to Main Website View
  backToMainButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      if (adView) adView.classList.add('hidden');
      if (mainView) mainView.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

/**
 * Promotional Offer Countdown Timer
 */
function initCountdownTimer() {
  const timerElement = document.getElementById('promoTimer');
  if (!timerElement) return;

  // Set target end time to 24 hours from current session
  let durationSeconds = 24 * 60 * 60 - 15; 

  function updateTimer() {
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = durationSeconds % 60;

    const formattedTime = [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');

    timerElement.textContent = formattedTime;

    if (durationSeconds > 0) {
      durationSeconds--;
    } else {
      timerElement.textContent = "00:00:00 - OFFER EXPIRED";
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/**
 * Copy Promo Code to Clipboard
 */
function initCopyPromoCode() {
  const copyBtn = document.getElementById('copyPromoBtn');
  const codeInput = document.getElementById('promoCodeInput');

  if (!copyBtn || !codeInput) return;

  copyBtn.addEventListener('click', () => {
    codeInput.select();
    codeInput.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(codeInput.value).then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      copyBtn.style.backgroundColor = '#8B2613';
      copyBtn.style.color = '#FFFFFF';

      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.backgroundColor = '';
        copyBtn.style.color = '';
      }, 2500);
    }).catch(err => {
      console.error('Failed to copy code: ', err);
    });
  });
}

/**
 * Product Quantity & Price Calculation Controls
 */
function initQuantityControls() {
  const qtyInput = document.getElementById('bundleQty');
  const btnMinus = document.getElementById('qtyMinus');
  const btnPlus = document.getElementById('qtyPlus');
  const totalPriceElement = document.getElementById('totalPrice');
  
  const BASE_PRICE = 38.40; // Reduced price after 20% discount ($48.00 original)

  if (!qtyInput || !btnMinus || !btnPlus || !totalPriceElement) return;

  function updatePrice() {
    const qty = parseInt(qtyInput.value, 10) || 1;
    const total = (qty * BASE_PRICE).toFixed(2);
    totalPriceElement.textContent = `$${total}`;
  }

  btnMinus.addEventListener('click', () => {
    let currentQty = parseInt(qtyInput.value, 10) || 1;
    if (currentQty > 1) {
      qtyInput.value = currentQty - 1;
      updatePrice();
    }
  });

  btnPlus.addEventListener('click', () => {
    let currentQty = parseInt(qtyInput.value, 10) || 1;
    if (currentQty < 99) {
      qtyInput.value = currentQty + 1;
      updatePrice();
    }
  });

  qtyInput.addEventListener('change', () => {
    let currentQty = parseInt(qtyInput.value, 10);
    if (isNaN(currentQty) || currentQty < 1) {
      qtyInput.value = 1;
    }
    updatePrice();
  });
}
