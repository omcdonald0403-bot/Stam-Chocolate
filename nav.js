// =========================================================
// Chocolaterie Stam - Harvest Collection & Navigation Script
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  // Target DOM Views
  const mainView = document.getElementById('mainView');
  const adView = document.getElementById('adView');

  // 1. Navigate from Main Page Ads -> Dictionary Ad Page
  const adTriggers = document.querySelectorAll('.ad-trigger');
  
  adTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      mainView.classList.add('hidden');
      adView.classList.remove('hidden');
      
      // Smooth scroll back to top of page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });

  // 2. Navigate from any of the 4 Ad Units on Ad Page -> Back to Main Landing Page
  const returnTriggers = document.querySelectorAll('.ad-return-trigger');
  
  returnTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      adView.classList.add('hidden');
      mainView.classList.remove('hidden');
      
      // Smooth scroll back to top of page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
});
