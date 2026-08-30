/**
 * Скрипт интерактивной презентации для торговых агентов «РОБОСТОК»
 * Адаптация под все типы экранов: ПК, планшеты, смартфоны (Touch & Swipe)
 */

document.addEventListener('DOMContentLoaded', () => {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  const progressBar = document.getElementById('progressBar');
  const slideCounter = document.getElementById('slideCounter');
  const modalGrid = document.getElementById('modalGrid');
  const btnJump = document.getElementById('btnJump');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const jumpCardsContainer = document.getElementById('jumpGridContainer');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const btnFullscreen = document.getElementById('btnFullscreen');
  const slidesCanvas = document.querySelector('.slides-canvas');

  // Initialize Jump Grid Cards
  if (jumpCardsContainer) {
    jumpCardsContainer.innerHTML = '';
    slides.forEach((slide, idx) => {
      const titleEl = slide.querySelector('.slide-title') || slide.querySelector('h1');
      const titleText = titleEl ? titleEl.textContent.trim() : `Слайд ${idx + 1}`;
      
      const card = document.createElement('div');
      card.className = 'jump-card';
      card.innerHTML = `
        <div class="jump-num">СЛАЙД ${(idx + 1).toString().padStart(2, '0')}</div>
        <div class="jump-title">${titleText}</div>
      `;
      card.addEventListener('click', () => {
        goToSlide(idx);
        closeModal();
      });
      jumpCardsContainer.appendChild(card);
    });
  }

  function updateSlideState() {
    slides.forEach((s, idx) => {
      if (idx === currentSlide) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });

    // Reset scroll on slide change
    if (slidesCanvas) {
      slidesCanvas.scrollTop = 0;
    }

    const progressPct = ((currentSlide + 1) / totalSlides) * 100;
    if (progressBar) progressBar.style.width = `${progressPct}%`;
    if (slideCounter) slideCounter.textContent = `${(currentSlide + 1).toString().padStart(2, '0')} / ${totalSlides.toString().padStart(2, '0')}`;

    // Store state in sessionStorage
    try {
      sessionStorage.setItem('robostok_deck_slide', currentSlide);
    } catch(e) {}
  }

  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateSlideState();
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlideState();
    }
  }

  function goToSlide(idx) {
    if (idx >= 0 && idx < totalSlides) {
      currentSlide = idx;
      updateSlideState();
    }
  }

  function openModal() {
    if (modalGrid) modalGrid.classList.add('open');
  }

  function closeModal() {
    if (modalGrid) modalGrid.classList.remove('open');
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(err => {
          console.warn(`Fullscreen error: ${err.message}`);
        });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  // Event Listeners
  if (btnNext) btnNext.addEventListener('click', nextSlide);
  if (btnPrev) btnPrev.addEventListener('click', prevSlide);
  if (btnJump) btnJump.addEventListener('click', openModal);
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
  if (btnFullscreen) btnFullscreen.addEventListener('click', toggleFullscreen);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (modalGrid && modalGrid.classList.contains('open')) {
      if (e.key === 'Escape') closeModal();
      return;
    }

    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide(totalSlides - 1);
    } else if (e.key === 'g' || e.key === 'G' || e.key === 'п' || e.key === 'П') {
      e.preventDefault();
      openModal();
    } else if (e.key === 'f' || e.key === 'F' || e.key === 'а' || e.key === 'А') {
      e.preventDefault();
      toggleFullscreen();
    }
  });

  // Touch Swipe Handling (Optimized for iOS / Android / Tablets)
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;

  document.addEventListener('touchstart', (e) => {
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
    touchStartTime = Date.now();
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    const duration = Date.now() - touchStartTime;

    // Detect horizontal swipe if moved > 45px and mostly horizontal in under 800ms
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.4 && duration < 800) {
      if (diffX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }, { passive: true });

  // Autonomy Calculator Logic inside Slide 8
  const calcItems = document.querySelectorAll('.calc-checkbox-item');
  const calcTotalWattsEl = document.getElementById('calcTotalWatts');
  const resF1200 = document.getElementById('resF1200');
  const resF2400 = document.getElementById('resF2400');
  const resPecronE3800 = document.getElementById('resPecronE3800');
  const resF5000 = document.getElementById('resF5000');
  const resRezerv = document.getElementById('resRezerv');
  const resDeye = document.getElementById('resDeye');

  function calculateAutonomy() {
    let totalWatts = 0;
    calcItems.forEach(item => {
      if (item.classList.contains('checked')) {
        totalWatts += parseInt(item.getAttribute('data-watts'), 10) || 0;
      }
    });

    if (calcTotalWattsEl) {
      calcTotalWattsEl.textContent = `${totalWatts} Вт`;
    }

    if (totalWatts === 0) {
      if (resF1200) resF1200.textContent = '—';
      if (resF2400) resF2400.textContent = '—';
      if (resPecronE3800) resPecronE3800.textContent = '—';
      if (resF5000) resF5000.textContent = '—';
      if (resRezerv) resRezerv.textContent = '—';
      if (resDeye) resDeye.textContent = '—';
      return;
    }

    // Formulas: (Capacity Wh * Efficiency) / Total Watts
    const hF1200 = (1024 * 0.85) / totalWatts;
    const hF2400 = (2048 * 0.85) / totalWatts;
    const hE3800 = (3840 * 0.88) / totalWatts;
    const hF5000 = (5000 * 0.90) / totalWatts;
    const hRezerv = (5120 * 0.90) / totalWatts;
    const hDeye = (15360 * 0.92) / totalWatts;

    function formatHours(h) {
      if (h >= 48) return `>48 ч (3–5 сут)`;
      if (h < 1) return `${Math.round(h * 60)} мин`;
      const fullHours = Math.floor(h);
      const mins = Math.round((h - fullHours) * 60);
      if (mins === 0 || fullHours >= 10) return `~${Math.round(h)} ч`;
      return `${fullHours} ч ${mins} м`;
    }

    if (resF1200) resF1200.textContent = formatHours(hF1200);
    if (resF2400) resF2400.textContent = formatHours(hF2400);
    if (resPecronE3800) resPecronE3800.textContent = formatHours(hE3800);
    if (resF5000) resF5000.textContent = formatHours(hF5000);
    if (resRezerv) resRezerv.textContent = formatHours(hRezerv);
    if (resDeye) resDeye.textContent = formatHours(hDeye);
  }

  calcItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('checked');
      const checkSpan = item.querySelector('.check-status');
      if (checkSpan) {
        checkSpan.textContent = item.classList.contains('checked') ? '✔' : '+';
      }
      calculateAutonomy();
    });
  });

  // Restore previous slide if available
  try {
    const savedSlide = sessionStorage.getItem('robostok_deck_slide');
    if (savedSlide !== null) {
      const idx = parseInt(savedSlide, 10);
      if (!isNaN(idx) && idx >= 0 && idx < totalSlides) {
        currentSlide = idx;
      }
    }
  } catch(e) {}

  updateSlideState();
  calculateAutonomy();
});
