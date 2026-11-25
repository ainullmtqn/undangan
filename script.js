/**
 * The Wedding of Niar & Reski
 * Cinematic Opening Animation Orchestrator
 */

function initApp() {
  // DOM Elements
  const cameraWorld = document.getElementById('cameraWorld');
  const stageOverlay = document.getElementById('stageOverlay');
  const badgeText = document.getElementById('badgeText');
  const monogramContainer = document.getElementById('monogramContainer');
  const coverCard = document.getElementById('coverCard');
  const btnOpenInvitation = document.getElementById('btnOpenInvitation');
  const invitationSheet = document.getElementById('invitationSheet');
  const btnCloseSheet = document.getElementById('btnCloseSheet');
  const sheetHandle = document.getElementById('sheetHandle');
  const btnReplay = document.getElementById('btnReplay');
  const btnSkip = document.getElementById('btnSkip');
  const btnMusic = document.getElementById('btnMusic');
  const soundWaves = document.getElementById('soundWaves');
  const progressFill = document.getElementById('progressFill');
  const stepPills = document.querySelectorAll('.step-pill');
  const particlesLayer = document.getElementById('particlesLayer');
  const guestNameEl = document.getElementById('guestName');
  const coverCreator = document.getElementById('coverCreator');
  const floatingActionStack = document.getElementById('floatingActionStack');
  const btnFloatingAudio = document.getElementById('btnFloatingAudio');
  const audioIconPlaying = document.getElementById('audioIconPlaying');
  const audioIconPaused = document.getElementById('audioIconPaused');
  const btnAutoScroll = document.getElementById('btnAutoScroll');

  // Background Audio Controller (Pure music.mp3 without music.js)
  const bgMusicAudio = document.getElementById('bgMusicAudio') || new Audio('music.mp3');
  if (bgMusicAudio) {
    bgMusicAudio.loop = true;
    bgMusicAudio.volume = 0.8;
  }

  function playMusic() {
    if (bgMusicAudio && bgMusicAudio.paused) {
      bgMusicAudio.play().catch(() => {});
    }
  }

  // Coba putar musik langsung saat script dimuat
  playMusic();

  // Character Elements for Symmetrical Typewriter Reveal
  const charElements = [
    document.getElementById('charI'),
    document.getElementById('charA'),
    document.getElementById('charR'),
    document.getElementById('charE'),
    document.getElementById('charS'),
    document.getElementById('charK'),
    document.getElementById('charI2')
  ];

  function hideAllNameChars() {
    charElements.forEach(el => {
      if (el) el.classList.remove('char-revealed');
    });
  }

  function showAllNameChars() {
    charElements.forEach(el => {
      if (el) el.classList.add('char-revealed');
    });
  }

  // Parse Guest Name from URL parameter (?to= or ?u=)
  const urlParams = new URLSearchParams(window.location.search);
  const guestQuery = urlParams.get('to') || urlParams.get('u') || urlParams.get('nama');
  if (guestQuery) {
    guestNameEl.textContent = decodeURIComponent(guestQuery);
  }

  // Create subtle floating particles in background
  createParticles();

  // Animation Timeline Controller
  let animationTimeouts = [];
  let currentPhase = 0;
  let isAutoPlaying = true;

  function clearAllAnimationTimeouts() {
    animationTimeouts.forEach(t => clearTimeout(t));
    animationTimeouts = [];
  }

  function updateStepPill(phaseNum) {
    if (stepPills && stepPills.length) {
      stepPills.forEach((pill, idx) => {
        pill.classList.toggle('active', idx + 1 === phaseNum);
      });
    }
    if (progressFill) {
      const percent = Math.min(100, Math.round(((phaseNum - 1) / 5) * 100));
      progressFill.style.width = `${percent}%`;
    }
  }

  function setBadgeText(text) {
    if (badgeText) {
      badgeText.textContent = text;
    }
  }

  function resetVisualStates() {
    cameraWorld.className = 'camera-world';
    monogramContainer.className = 'monogram-container';
    showAllNameChars();
    coverCard.classList.remove('card-revealed');
    if (coverCreator) coverCreator.classList.remove('card-revealed');
    const coverCouple = document.getElementById('coverCoupleContainer');
    if (coverCouple) coverCouple.classList.remove('couple-revealed');
  }

  /**
   * KONSEP 1: SINEMATIK ELEGAN (KEN BURNS & SOFT BLOOM)
   * - Latar pemandangan rumah adat bergerak anggun (Ken Burns sinematik).
   * - Judul & nama 'Niar & Reski' mekar dengan pendaran cahaya lembut (soft bloom & blur-to-clear).
   * - Kartu tamu, tombol buka undangan, dan kredit creator muncul mulus dalam ~1 detik.
   */
  function startSequence() {
    clearAllAnimationTimeouts();
    isAutoPlaying = true;
    resetVisualStates();
    playMusic();
    setBadgeText("The Wedding of Niar & Reski");

    // Langkah 1: Pendaran Cahaya Lembut & Mekarkan Monogram/Nama (240ms)
    const t1 = setTimeout(() => {
      monogramContainer.classList.add('bloom-revealed');
    }, 240);
    animationTimeouts.push(t1);

    // Langkah 2: Munculkan Foto Mempelai & Kartu Tamu BERSAMAAN secara Mulus (750ms)
    const t2 = setTimeout(() => {
      const coverCouple = document.getElementById('coverCoupleContainer');
      if (coverCouple) coverCouple.classList.add('couple-revealed');
      coverCard.classList.add('card-revealed');
      if (coverCreator) coverCreator.classList.add('card-revealed');
    }, 750);
    animationTimeouts.push(t2);
  }

  function goToPhase6() {
    clearAllAnimationTimeouts();
    monogramContainer.classList.add('bloom-revealed');
    showAllNameChars();
    coverCard.classList.add('card-revealed');
    if (coverCreator) coverCreator.classList.add('card-revealed');
    const coverCouple = document.getElementById('coverCoupleContainer');
    if (coverCouple) coverCouple.classList.add('couple-revealed');
    playMusic();
  }
  function goToPhase1() { startSequence(); }
  function goToPhase2() { startSequence(); }
  function goToPhase3() { startSequence(); }
  function goToPhase4() { startSequence(); }
  function goToPhase5() { startSequence(); }

  // Interactive timeline buttons (Step pills if present)
  if (stepPills && stepPills.length) {
    stepPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const phase = parseInt(pill.getAttribute('data-phase'));
        isAutoPlaying = false;
        switch(phase) {
          case 1: goToPhase1(); break;
          case 2: goToPhase2(); break;
          case 3: goToPhase3(); break;
          case 4: goToPhase4(); break;
          case 5: goToPhase5(); break;
          case 6: goToPhase6(); break;
        }
      });
    });
  }

  // Replay Button
  if (btnReplay) {
    btnReplay.addEventListener('click', () => {
      playMusic();
      startSequence();
    });
  }

  // Skip Button (if present)
  if (btnSkip) {
    btnSkip.addEventListener('click', () => {
      isAutoPlaying = false;
      goToPhase6();
    });
  }

  // Unlock and play audio on ANY user touch, click, or tap anywhere on the screen
  const unlockAndPlayAudio = () => {
    playMusic();
  };

  ['click', 'touchstart', 'touchend', 'pointerdown', 'mousedown', 'keydown', 'scroll'].forEach(eventName => {
    document.addEventListener(eventName, unlockAndPlayAudio, { passive: true });
    window.addEventListener(eventName, unlockAndPlayAudio, { passive: true });
  });

  // ========================================================
  // AUTO-SCROLL CONTROLLER FOR INVITATION SHEET
  // Smoothly scrolls the invitation content continuously
  // ========================================================
  let isAutoScrolling = false;
  let autoScrollRaf = null;
  let currentScrollY = 0;
  const autoScrollSpeed = 1.85; // Pleasant, active reading speed in px/frame
  let openScrollTimeout = null;

  function stepAutoScroll() {
    if (!isAutoScrolling || !invitationSheet) return;
    const maxScroll = invitationSheet.scrollHeight - invitationSheet.clientHeight;
    if (invitationSheet.scrollTop >= maxScroll - 4) {
      stopAutoScroll();
      return;
    }
    // Selaraskan dengan posisi scroll terkini agar tetap mulus jika pengguna sempat mengusap layar
    currentScrollY = invitationSheet.scrollTop + autoScrollSpeed;
    invitationSheet.scrollTop = currentScrollY;
    autoScrollRaf = requestAnimationFrame(stepAutoScroll);
  }

  function startAutoScroll() {
    if (isAutoScrolling || !btnAutoScroll || !invitationSheet) return;
    
    // If already at or near the bottom, restart from top
    const maxScroll = invitationSheet.scrollHeight - invitationSheet.clientHeight;
    if (invitationSheet.scrollTop >= maxScroll - 10) {
      invitationSheet.scrollTop = 0;
    }

    currentScrollY = invitationSheet.scrollTop;
    isAutoScrolling = true;
    btnAutoScroll.classList.add('is-scrolling');
    autoScrollRaf = requestAnimationFrame(stepAutoScroll);
  }

  function stopAutoScroll() {
    isAutoScrolling = false;
    if (autoScrollRaf) {
      cancelAnimationFrame(autoScrollRaf);
      autoScrollRaf = null;
    }
    if (btnAutoScroll) {
      btnAutoScroll.classList.remove('is-scrolling');
    }
  }

  function toggleAutoScroll() {
    if (isAutoScrolling) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  }

  // Open Full Invitation Sheet & Automatically Start Scrolling
  function openInvitation() {
    invitationSheet.classList.add('sheet-opened');
    if (floatingActionStack) floatingActionStack.classList.add('stack-active');
    playMusic();

    // Otomatis mulai gulir saat undangan dibuka (setelah sheet meluncur naik)
    clearTimeout(openScrollTimeout);
    openScrollTimeout = setTimeout(() => {
      startAutoScroll();
    }, 850);
  }

  // Close Sheet & Stop Scrolling
  function closeInvitation() {
    clearTimeout(openScrollTimeout);
    stopAutoScroll();
    invitationSheet.classList.remove('sheet-opened');
    if (floatingActionStack) floatingActionStack.classList.remove('stack-active');
  }

  btnOpenInvitation.addEventListener('click', openInvitation);
  btnOpenInvitation.addEventListener('touchend', (e) => {
    e.preventDefault();
    openInvitation();
  });
  btnCloseSheet.addEventListener('click', closeInvitation);
  sheetHandle.addEventListener('click', closeInvitation);

  if (btnAutoScroll) {
    btnAutoScroll.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleAutoScroll();
    });
    btnAutoScroll.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleAutoScroll();
    });
  }

  // ========================================================
  // FLOATING AUDIO CONTROLLER (Play/Pause Toggle)
  // ========================================================
  function updateAudioButtonState(isPlaying) {
    if (!btnFloatingAudio) return;
    if (isPlaying) {
      btnFloatingAudio.classList.remove('is-muted');
      if (audioIconPlaying) audioIconPlaying.style.display = 'block';
      if (audioIconPaused) audioIconPaused.style.display = 'none';
    } else {
      btnFloatingAudio.classList.add('is-muted');
      if (audioIconPlaying) audioIconPlaying.style.display = 'none';
      if (audioIconPaused) audioIconPaused.style.display = 'block';
    }
  }

  if (bgMusicAudio) {
    bgMusicAudio.addEventListener('play', () => updateAudioButtonState(true));
    bgMusicAudio.addEventListener('playing', () => updateAudioButtonState(true));
    bgMusicAudio.addEventListener('pause', () => updateAudioButtonState(false));
    bgMusicAudio.addEventListener('ended', () => updateAudioButtonState(false));
  }

  if (btnFloatingAudio) {
    btnFloatingAudio.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!bgMusicAudio) return;
      if (bgMusicAudio.paused) {
        bgMusicAudio.play().then(() => {
          updateAudioButtonState(true);
        }).catch(() => {});
      } else {
        bgMusicAudio.pause();
        updateAudioButtonState(false);
      }
    });
  }

  // Generate Subtle Floating Dust / Star Particles
  function createParticles() {
    const count = 18;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 5 + 3;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDelay = `${Math.random() * 8}s`;
      p.style.animationDuration = `${Math.random() * 6 + 6}s`;
      particlesLayer.appendChild(p);
    }
  }

  // Live Countdown Timer to December 20, 2026
  const targetDate = new Date('2026-12-20T09:00:00+08:00').getTime();
  const daysEl = document.getElementById('daysNum');
  const hoursEl = document.getElementById('hoursNum');
  const minsEl = document.getElementById('minsNum');
  const secsEl = document.getElementById('secsNum');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minsEl.textContent = String(minutes).padStart(2, '0');
      secsEl.textContent = String(seconds).padStart(2, '0');
    }
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Dynamic Wishes Controller with LocalStorage Persistence
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpNameInput = document.getElementById('rsvpName');
  const rsvpWishInput = document.getElementById('rsvpWish');
  const btnSubmitRsvp = document.getElementById('btnSubmitRsvp');
  const rsvpStatusAlert = document.getElementById('rsvpStatusAlert');
  const wishesList = document.getElementById('wishesList');

  const STORAGE_KEY_WISHES = 'wedding_wishes_niar_reski';
  const DEFAULT_WISHES = [
    {
      name: "Keluarga Besar Rahmat",
      text: "Selamat berbahagia untuk Niar & Reski! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah."
    },
    {
      name: "Sahabat Teknik",
      text: "Barakallahu lakum wa baraka alaikum wa jama'a bainakuma fi khair. Lancar sampai hari H!"
    }
  ];

  function getStoredWishes() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_WISHES);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      return [];
    }
  }

  function saveWish(name, text) {
    try {
      const current = getStoredWishes();
      current.unshift({ name, text, date: new Date().toLocaleDateString('id-ID') });
      localStorage.setItem(STORAGE_KEY_WISHES, JSON.stringify(current));
    } catch (err) {}
  }

  function renderWishesList() {
    if (!wishesList) return;
    const userWishes = getStoredWishes();
    const allWishes = [...userWishes, ...DEFAULT_WISHES];

    wishesList.innerHTML = '';
    allWishes.forEach(item => {
      const el = document.createElement('div');
      el.className = 'wish-item-vintage';
      el.innerHTML = `<strong>${escapeHtml(item.name)}</strong><p>${escapeHtml(item.text)}</p>`;
      wishesList.appendChild(el);
    });
  }

  // Pre-fill name if guest query exists (?to= or ?u=)
  if (guestQuery && rsvpNameInput) {
    rsvpNameInput.value = decodeURIComponent(guestQuery);
  }

  // Render wishes list immediately on load (including any saved from previous sessions)
  renderWishesList();

  function handleRsvpSubmit(e) {
    if (e) e.preventDefault();
    if (!rsvpNameInput) return;
    const name = rsvpNameInput.value.trim();
    const wish = rsvpWishInput ? rsvpWishInput.value.trim() : '';

    if (!name) {
      alert('Mohon isi nama lengkap Anda terlebih dahulu.');
      rsvpNameInput.focus();
      return;
    }
    if (!wish) {
      alert('Mohon tuliskan doa atau ucapan Anda.');
      if (rsvpWishInput) rsvpWishInput.focus();
      return;
    }

    // Save permanently to localStorage so reload NEVER loses it
    saveWish(name, wish);

    // Re-render wishes list with the new wish on top
    renderWishesList();

    if (rsvpStatusAlert) {
      rsvpStatusAlert.style.display = 'block';
      rsvpStatusAlert.innerHTML = `✨ <strong>Terima kasih, ${escapeHtml(name)}!</strong><br>Doa dan ucapan manis Anda telah tersimpan dan tersampaikan untuk Niar &amp; Reski.`;
    }

    if (btnSubmitRsvp) {
      btnSubmitRsvp.textContent = '✓ Ucapan Terkirim';
      btnSubmitRsvp.style.opacity = '0.85';
      btnSubmitRsvp.disabled = true;

      // Allow sending another wish after 3 seconds
      setTimeout(() => {
        btnSubmitRsvp.disabled = false;
        btnSubmitRsvp.style.opacity = '1';
        btnSubmitRsvp.textContent = 'Kirim Ucapan Lainnya 💌';
      }, 3000);
    }
    if (rsvpWishInput) rsvpWishInput.value = '';
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', handleRsvpSubmit);
  }
  if (btnSubmitRsvp) {
    btnSubmitRsvp.addEventListener('click', handleRsvpSubmit);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Check if specific phase is requested via URL (?phase=4 or #phase4)
  const requestedPhase = parseInt(urlParams.get('phase') || window.location.hash.replace('#phase', ''));
  if (requestedPhase && requestedPhase >= 1 && requestedPhase <= 6) {
    isAutoPlaying = false;
    // For instant preview / testing, remove animation transition delay
    cameraWorld.style.transition = 'none';
    monogramContainer.style.transition = 'none';
    coverCard.style.transition = 'none';
    if (coverCreator) coverCreator.style.transition = 'none';
    if (invitationSheet) invitationSheet.style.transition = 'none';
    if (floatingActionStack) floatingActionStack.style.transition = 'none';
    document.querySelectorAll('.monogram-container *').forEach(el => el.style.transition = 'none');

    switch(requestedPhase) {
      case 1: goToPhase1(); break;
      case 2: goToPhase2(); break;
      case 3: goToPhase3(); break;
      case 4: goToPhase4(); break;
      case 5: goToPhase5(); break;
      case 6: goToPhase6(); break;
    }

    // Re-enable smooth transition for subsequent interactions
    setTimeout(() => {
      cameraWorld.style.transition = '';
      monogramContainer.style.transition = '';
      coverCard.style.transition = '';
      if (coverCreator) coverCreator.style.transition = '';
      if (invitationSheet) invitationSheet.style.transition = '';
      if (floatingActionStack) floatingActionStack.style.transition = '';
    }, 100);
  } else {
    // Launch initial animation sequence on page load
    startSequence();
  }

  // Open Sheet directly if requested via URL (?sheet=1)
  if (urlParams.get('sheet') === '1') {
    invitationSheet.classList.add('sheet-opened');
    if (floatingActionStack) floatingActionStack.classList.add('stack-active');
    const targetScroll = parseInt(urlParams.get('scroll') || '-1');
    if (targetScroll >= 0) {
      invitationSheet.scrollTop = targetScroll;
    } else {
      openScrollTimeout = setTimeout(() => {
        startAutoScroll();
      }, 850);
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
