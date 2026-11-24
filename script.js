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
    hideAllNameChars();
    coverCard.classList.remove('card-revealed');
    if (coverCreator) coverCreator.classList.remove('card-revealed');
  }

  /**
   * PHASE 1: Zoom In ke sisi sebelah rumah (Rumah Bagian Kanan)
   */
  function goToPhase1() {
    clearAllAnimationTimeouts();
    currentPhase = 1;
    updateStepPill(1);
    setBadgeText("1/5 • Zoom In Sisi Rumah");

    // Pastikan musik latar berputar
    playMusic();

    // Set camera to right side of house
    cameraWorld.className = 'camera-world phase-house-right';
    monogramContainer.className = 'monogram-container';
    coverCard.classList.remove('card-revealed');

    if (isAutoPlaying) {
      const t = setTimeout(goToPhase2, 1700);
      animationTimeouts.push(t);
    }
  }

  /**
   * PHASE 2: Pindah ke sisi kiri rumah (Veranda, tangga & pepohonan kiri)
   */
  function goToPhase2() {
    clearAllAnimationTimeouts();
    currentPhase = 2;
    updateStepPill(2);
    setBadgeText("2/5 • Pindah Sisi Kiri");

    // Pan camera to left side of house
    cameraWorld.className = 'camera-world phase-house-left';
    monogramContainer.className = 'monogram-container';
    coverCard.classList.remove('card-revealed');

    if (isAutoPlaying) {
      const t = setTimeout(goToPhase3, 1600);
      animationTimeouts.push(t);
    }
  }

  /**
   * PHASE 3: Pindah ke sisi atas (Langit / kanopi di atas rumah)
   */
  function goToPhase3() {
    clearAllAnimationTimeouts();
    currentPhase = 3;
    updateStepPill(3);
    setBadgeText("3/5 • Pindah Sisi Atas");

    // Pan camera up to top area
    cameraWorld.className = 'camera-world phase-sky-top';
    monogramContainer.className = 'monogram-container';
    coverCard.classList.remove('card-revealed');

    if (isAutoPlaying) {
      const t = setTimeout(goToPhase4, 1500);
      animationTimeouts.push(t);
    }
  }

  /**
   * PHASE 4: Pada sisi atas munculkan inisial N & R polos secara elegan
   */
  function goToPhase4() {
    clearAllAnimationTimeouts();
    currentPhase = 4;
    updateStepPill(4);
    setBadgeText("4/5 • Munculkan Inisial N & R");

    // Camera stays at top
    cameraWorld.className = 'camera-world phase-sky-top';
    
    // Ensure trailing characters are hidden so only N & R is visible
    hideAllNameChars();

    // Reveal Monogram N & R at top with dynamic entrance
    monogramContainer.className = 'monogram-container state-monogram-top';
    coverCard.classList.remove('card-revealed');

    if (isAutoPlaying) {
      // Tampilkan inisial N & R secara elegan selama 1200ms sebelum mulai zoom out
      const t = setTimeout(goToPhase5, 1200);
      animationTimeouts.push(t);
    }
  }

  /**
   * PHASE 5: Zoom out ke tampilan penuh dengan inisial N & R tetap utuh
   * Selesaikan dulu gerakan zoom out dan penempatan N & R ke posisi header,
   * baru setelah mendarat tenang di posisi akhir, ketikkan nama lengkapnya.
   */
  function goToPhase5() {
    clearAllAnimationTimeouts();
    currentPhase = 5;
    updateStepPill(5);
    setBadgeText("5/5 • Zoom Out & Penempatan Inisial");

    // Camera smoothly zooms out to full view (1.9s transition)
    cameraWorld.className = 'camera-world phase-zoom-out';

    // Monogram smoothly glides to final header position keeping N & R intact (no expansion yet)
    monogramContainer.className = 'monogram-container state-zooming-out';
    coverCard.classList.remove('card-revealed');

    // Mendaratkan kamera dan langsung memekarkan nama 'iar' & 'eski' serta THE WEDDING OF & tanggal bersamaan
    const t = setTimeout(revealNamesTogether, 1900);
    animationTimeouts.push(t);
  }

  /**
   * REVEAL NAMES TOGETHER:
   * Memasukkan huruf 'iar', 'eski', label 'THE WEDDING OF', dan tanggal pernikahan
   * secara bersamaan serentak setelah kamera dan inisial N & R mendarat tenang di posisi cover.
   */
  function revealNamesTogether() {
    clearAllAnimationTimeouts();
    setBadgeText("5/5 • Menampilkan Sampul Lengkap");

    // Pastikan seluruh karakter aktif
    showAllNameChars();

    // Masuk bersamaan: 'iar' & 'eski', 'THE WEDDING OF', divider ❖, dan tanggal pernikahan
    monogramContainer.className = 'monogram-container state-names-revealed state-cover-final';

    // Pastikan musik latar berputar saat sampul lengkap mulai terlihat
    playMusic();

    // Lanjut ke Phase 6 untuk memunculkan Kartu Undangan Tamu bersamaan dengan create by
    if (isAutoPlaying) {
      const t = setTimeout(goToPhase6, 900);
      animationTimeouts.push(t);
    }
  }

  /**
   * PHASE 6: Selesai - Tampilkan Tombol Buka Undangan & Kartu Tamu
   */
  function goToPhase6() {
    clearAllAnimationTimeouts();
    currentPhase = 6;
    updateStepPill(6);
    if (progressFill) progressFill.style.width = '100%';
    setBadgeText("Sampul Lengkap • Siap Dibuka");

    cameraWorld.className = 'camera-world phase-zoom-out';
    monogramContainer.className = 'monogram-container state-names-revealed state-cover-final';
    showAllNameChars();
    coverCard.classList.add('card-revealed');
    if (coverCreator) coverCreator.classList.add('card-revealed');

    // Pastikan musik terputar saat seluruh halaman sampul selesai ditampilkan
    playMusic();
  }

  /**
   * Start or Replay the full animation sequence
   */
  function startSequence() {
    clearAllAnimationTimeouts();
    isAutoPlaying = true;
    resetVisualStates();
    if (progressFill) progressFill.style.width = '0%';
    setBadgeText("Memulai Animasi...");

    // Putar musik latar
    playMusic();

    // Start with a gentle pause then launch Phase 1
    const t = setTimeout(goToPhase1, 400);
    animationTimeouts.push(t);
  }

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

  // Dynamic RSVP & Wishes Controller (Vintage Luxury Form)
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpNameInput = document.getElementById('rsvpName');
  const rsvpWishInput = document.getElementById('rsvpWish');
  const btnSubmitRsvp = document.getElementById('btnSubmitRsvp');
  const rsvpStatusAlert = document.getElementById('rsvpStatusAlert');
  const wishesList = document.getElementById('wishesList');

  // Pre-fill name if guest query exists (?to= or ?u=)
  if (guestQuery && rsvpNameInput) {
    rsvpNameInput.value = decodeURIComponent(guestQuery);
  }

  function handleRsvpSubmit(e) {
    if (e) e.preventDefault();
    if (!rsvpNameInput) return;
    const name = rsvpNameInput.value.trim();
    const wish = rsvpWishInput ? rsvpWishInput.value.trim() : '';
    const attendanceEl = document.querySelector('input[name="attendance"]:checked');
    const attendance = attendanceEl ? attendanceEl.value : 'Hadir';
    const guestCountEl = document.getElementById('guestCount');
    const guestCount = guestCountEl ? guestCountEl.value : '1';

    if (!name) {
      alert('Mohon isi nama lengkap Anda terlebih dahulu.');
      rsvpNameInput.focus();
      return;
    }

    if (wish && wishesList) {
      const item = document.createElement('div');
      item.className = 'wish-item-vintage';
      item.innerHTML = `<strong>${escapeHtml(name)} <span style="font-size:10.5px; opacity:0.8; font-weight:normal;">(${escapeHtml(attendance)} • ${escapeHtml(guestCount)} orang)</span></strong><p>${escapeHtml(wish)}</p>`;
      wishesList.prepend(item);
    }

    if (rsvpStatusAlert) {
      rsvpStatusAlert.style.display = 'block';
      rsvpStatusAlert.innerHTML = `✨ <strong>Terima kasih, ${escapeHtml(name)}!</strong><br>Konfirmasi kehadiran Anda (${escapeHtml(attendance)}) telah tersimpan.`;
    }

    if (btnSubmitRsvp) {
      btnSubmitRsvp.textContent = '✓ Konfirmasi Terkirim';
      btnSubmitRsvp.style.opacity = '0.85';
      btnSubmitRsvp.disabled = true;
    }
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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
