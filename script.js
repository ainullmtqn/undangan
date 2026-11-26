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
  const btnShareStory = document.getElementById('btnShareStory');
  const storyToast = document.getElementById('storyToast');
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

  // Parse Guest Name from URL parameter (?to=, ?u=, or ?nama=)
  const urlParams = new URLSearchParams(window.location.search);
  const rawGuest = urlParams.get('to') || urlParams.get('u') || urlParams.get('nama');
  let guestQuery = '';
  if (rawGuest) {
    try {
      guestQuery = decodeURIComponent(rawGuest.replace(/\+/g, ' '));
    } catch (e) {
      guestQuery = rawGuest;
    }
    if (guestNameEl) guestNameEl.textContent = guestQuery;
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

  // ========================================================
  // INSTAGRAM STORY NATIVE SHARE (AUTOMATIC STORY CANVAS INJECTION)
  // ========================================================
  let toastTimer = null;
  function showStoryToast(message, duration = 4000) {
    if (!storyToast) return;
    storyToast.textContent = message;
    storyToast.classList.add('toast-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      storyToast.classList.remove('toast-visible');
    }, duration);
  }

  let cachedStoryFile = null;

  // Generator gambar sampul dinamis beresolusi tinggi (1080x1920) dengan nama tamu khusus
  function generateCustomStoryImage(name) {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = 1080;
          canvas.height = 1920;
          const ctx = canvas.getContext('2d');

          // 1. Gambar template dasar sampul (1080x1920)
          ctx.drawImage(img, 0, 0, 1080, 1920);

          // 2. Tentukan nama tamu yang akan dicetak
          const displayName = (name && name.trim()) ? name.trim() : 'Tamu Undangan';

          // 3. Ukuran font adaptif agar nama panjang tidak terpotong
          let fontSize = 48;
          ctx.font = `bold ${fontSize}px "Playfair Display", Georgia, serif`;
          let textWidth = ctx.measureText(displayName).width;
          const maxAllowedWidth = 760; // Batas lebar aman kartu

          if (textWidth > maxAllowedWidth) {
            fontSize = Math.max(26, Math.floor(fontSize * (maxAllowedWidth / textWidth)));
            ctx.font = `bold ${fontSize}px "Playfair Display", Georgia, serif`;
          }

          ctx.fillStyle = '#221611';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          // Posisi Y = 1495 (persis posisi nama tamu di dalam kartu sampul)
          ctx.fillText(displayName, 540, 1495);

          canvas.toBlob((blob) => {
            if (blob) {
              resolve(new File([blob], 'Sampul-Undangan-Niar-Reski.jpg', { type: 'image/jpeg' }));
            } else {
              resolve(null);
            }
          }, 'image/jpeg', 0.95);
        } catch (canvasErr) {
          console.warn('Canvas story error:', canvasErr);
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      img.src = 'assets/story_base.jpg';
    });
  }

  // Pre-load gambar sampul di background agar user-gesture instan & zero-latency
  async function preloadStoryCover() {
    try {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      if (guestQuery && guestQuery.trim() && guestQuery.trim() !== 'Tamu Undangan') {
        cachedStoryFile = await generateCustomStoryImage(guestQuery);
      }
      if (!cachedStoryFile) {
        const response = await fetch('assets/story_cover.jpg');
        if (response.ok) {
          const blob = await response.blob();
          cachedStoryFile = new File([blob], 'Sampul-Undangan-Niar-Reski.jpg', { type: 'image/jpeg' });
        }
      }
    } catch (e) {
      console.warn('Preload story cover error:', e);
    }
  }
  preloadStoryCover();

  let isSharingStory = false;

  async function handleShareStory() {
    if (isSharingStory) return;
    isSharingStory = true;

    if (btnShareStory) {
      btnShareStory.classList.add('is-loading');
    }

    // Salin link undangan ke clipboard di awal agar siap jika tamu ingin menempelkan stiker tautan di IG
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(window.location.href);
      } catch (clipErr) {
        // Abaikan jika permission clipboard dibatasi
      }
    }

    try {
      // Pastikan file tersedia
      let fileToShare = cachedStoryFile;
      if (!fileToShare) {
        if (guestQuery && guestQuery.trim() && guestQuery.trim() !== 'Tamu Undangan') {
          fileToShare = await generateCustomStoryImage(guestQuery);
        }
        if (!fileToShare) {
          const response = await fetch('assets/story_cover.jpg');
          const blob = await response.blob();
          fileToShare = new File([blob], 'Sampul-Undangan-Niar-Reski.jpg', { type: 'image/jpeg' });
        }
        cachedStoryFile = fileToShare;
      }

      // KUNCI UTAMA:
      // Hanya kirim file gambar (TANPA parameter text, TANPA url, TANPA title)
      // agar Instagram langsung memuat file gambar secara otomatis ke dalam canvas Story,
      // sehingga saat memilih Stories, gambar sudah langsung terpasang dan sisa dibagikan!
      if (navigator.canShare && navigator.canShare({ files: [fileToShare] })) {
        await navigator.share({
          files: [fileToShare]
        });
      } else {
        // Fallback untuk desktop PC atau browser tanpa Web Share File
        triggerStoryFallback(fileToShare);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Share story error:', err);
        if (cachedStoryFile) {
          triggerStoryFallback(cachedStoryFile);
        }
      }
    } finally {
      if (btnShareStory) {
        btnShareStory.classList.remove('is-loading');
      }
      isSharingStory = false;
    }
  }

  function triggerStoryFallback(file) {
    // 1. Download file gambar sampul
    try {
      const url = URL.createObjectURL(file);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = 'Sampul-Undangan-Niar-Reski.jpg';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      setTimeout(() => {
        if (downloadLink.parentNode) downloadLink.parentNode.removeChild(downloadLink);
        URL.revokeObjectURL(url);
      }, 600);
    } catch (e) {
      console.warn('Fallback download error:', e);
    }

    // 2. Beri toast petunjuk
    showStoryToast('📸 Gambar sampul tersimpan di galeri & link disalin!');
  }

  if (btnShareStory) {
    btnShareStory.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleShareStory();
    });
    btnShareStory.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleShareStory();
    });
  }
  if (btnCloseSheet) btnCloseSheet.addEventListener('click', closeInvitation);
  if (sheetHandle) sheetHandle.addEventListener('click', closeInvitation);

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

  // Dynamic Wishes Controller with Google Sheets & LocalStorage Persistence
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzLWokGwBVDuJGRo10VLZ9Wqw2gLaewgt04UzrbYutd1mT3d-zPED5ItgnMyMw-yaam/exec';
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

  let cloudWishes = [];

  function getStoredWishes() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_WISHES);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      return [];
    }
  }

  function saveWishLocal(name, text) {
    try {
      const current = getStoredWishes();
      current.unshift({ name, text, date: new Date().toLocaleDateString('id-ID') });
      localStorage.setItem(STORAGE_KEY_WISHES, JSON.stringify(current));
    } catch (err) {}
  }

  // Ambil ucapan dari Google Sheets Database
  async function fetchCloudWishes() {
    if (!GOOGLE_SCRIPT_URL) return;
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, { redirect: 'follow' });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          cloudWishes = data;
          renderWishesList();
        }
      }
    } catch (err) {
      console.warn('Info: Menampilkan ucapan offline/lokal.', err);
    }
  }

  // Kirim ucapan ke Google Sheets Database
  async function sendWishToGoogleSheets(name, wish) {
    if (!GOOGLE_SCRIPT_URL) return;
    try {
      // Gunakan Content-Type text/plain agar browser tidak mengirimkan preflight OPTIONS yang ditolak Google Apps Script
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({ name: name, wish: wish })
      });
      // Sinkronisasi ulang daftar pesan dari cloud setelah 1.5 detik
      setTimeout(fetchCloudWishes, 1500);
    } catch (err) {
      console.warn('Gagal menyimpan ke Google Sheets, data tetap aman di lokal:', err);
    }
  }

  function renderWishesList() {
    if (!wishesList) return;
    const userWishes = getStoredWishes();

    // Gabungkan ucapan dari cloud, lokal, dan default dengan deduplikasi
    const combined = [];
    const seen = new Set();

    [...cloudWishes, ...userWishes, ...DEFAULT_WISHES].forEach(item => {
      const key = `${(item.name || '').trim().toLowerCase()}_${(item.text || item.wish || '').trim().toLowerCase()}`;
      if (!seen.has(key) && item.name && (item.text || item.wish)) {
        seen.add(key);
        combined.push({
          name: item.name,
          text: item.text || item.wish
        });
      }
    });

    wishesList.innerHTML = '';
    combined.forEach(item => {
      const el = document.createElement('div');
      el.className = 'wish-item-vintage';
      el.innerHTML = `<strong>${escapeHtml(item.name)}</strong><p>${escapeHtml(item.text)}</p>`;
      wishesList.appendChild(el);
    });
  }

  // Pre-fill name if guest query exists (?to=, ?u=, or ?nama=)
  if (guestQuery && rsvpNameInput) {
    rsvpNameInput.value = guestQuery;
  }

  // Render ucapan segera saat halaman dimuat & ambil pembaruan dari database cloud
  renderWishesList();
  fetchCloudWishes();

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

    // 1. Simpan di lokal agar langsung terlihat seketika (optimistic UI)
    saveWishLocal(name, wish);
    renderWishesList();

    // 2. Kirim ke Google Sheets di latar belakang
    sendWishToGoogleSheets(name, wish);

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
