/**
 * Скрипт интерактивной презентации для торговых агентов «Робосток»
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

  // Initialize Jump Grid Cards
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

  function updateSlideState() {
    slides.forEach((s, idx) => {
      if (idx === currentSlide) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });

    const progressPct = ((currentSlide + 1) / totalSlides) * 100;
    progressBar.style.width = `${progressPct}%`;
    slideCounter.textContent = `${(currentSlide + 1).toString().padStart(2, '0')} / ${totalSlides.toString().padStart(2, '0')}`;

    // Store state in sessionStorage
    sessionStorage.setItem('robostok_deck_slide', currentSlide);
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
    modalGrid.classList.add('open');
  }

  function closeModal() {
    modalGrid.classList.remove('open');
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  // Event Listeners
  btnNext.addEventListener('click', nextSlide);
  btnPrev.addEventListener('click', prevSlide);
  btnJump.addEventListener('click', openModal);
  btnCloseModal.addEventListener('click', closeModal);
  btnFullscreen.addEventListener('click', toggleFullscreen);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (modalGrid.classList.contains('open')) {
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

  // Touch Swipe for Tablets
  let touchStartX = 0;
  let touchStartY = 0;
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Check horizontal swipe
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }, { passive: true });

  // Autonomy Calculator Logic
  const calcItems = document.querySelectorAll('.calc-checkbox-item');
  const calcTotalWattsEl = document.getElementById('calcTotalWatts');
  const resF1200 = document.getElementById('resF1200');
  const resF2400 = document.getElementById('resF2400');
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
      if (resRezerv) resRezerv.textContent = '—';
      if (resDeye) resDeye.textContent = '—';
      return;
    }

    // Formulas: (Capacity Wh * Eff) / Total Watts
    const hF1200 = (1024 * 0.85) / totalWatts;
    const hF2400 = (2048 * 0.85) / totalWatts;
    const hRezerv = (5120 * 0.90) / totalWatts;
    const hDeye = (15360 * 0.92) / totalWatts;

    function formatHours(h) {
      if (h < 1) {
        return `${Math.round(h * 60)} мин`;
      }
      const fullHours = Math.floor(h);
      const mins = Math.round((h - fullHours) * 60);
      if (mins === 0 || fullHours >= 10) {
        return `~${Math.round(h)} ч`;
      }
      return `${fullHours} ч ${mins} м`;
    }

    if (resF1200) resF1200.textContent = formatHours(hF1200);
    if (resF2400) resF2400.textContent = formatHours(hF2400);
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
  const savedSlide = sessionStorage.getItem('robostok_deck_slide');
  if (savedSlide !== null) {
    const idx = parseInt(savedSlide, 10);
    if (!isNaN(idx) && idx >= 0 && idx < totalSlides) {
      currentSlide = idx;
    }
  }

  updateSlideState();
  calculateAutonomy();
});
