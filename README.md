# Undangan Pernikahan Digital - Niar & Reski

Website undangan pernikahan digital bernuansa vintage Victorian & botanical garden untuk pernikahan **Nur Rahmaniar & Muh Reski** (Ahad, 20 Desember 2026).

## Fitur Utama
- **Cover Sinematik & Animasi Elegan**: Efek pembukaan Ken Burns & Soft Bloom dengan tipografi monogram halus.
- **Isi Undangan Estetis**: Ayat suci Al-Qur'an (QS. Ar-Rum: 21), foto mempelai dalam bingkai Barok oval emas, kartu deckle-edge dengan pin medali N & R, lokasi acara Tamalate Takalar dengan tautan Google Maps, hitung mundur menuju hari bahagia, galeri 3 foto polaroid kenangan, dan form ucapan & doa restu.
- **Form Ucapan Persisten**: Ucapan dan doa dari para tamu tersimpan secara persisten menggunakan `localStorage` sehingga tidak hilang saat halaman di-reload.
- **Auto-Scroll & Kontrol Audio**: Gulir otomatis saat undangan dibuka, dilengkapi tombol kontrol melayang (*floating action stack*) untuk musik latar dan jeda/lanjut gulir otomatis.
- **Desain Responsif**: Tampilan mobile-first yang presisi untuk semua ukuran smartphone dan desktop.

## Struktur Proyek
- `index.html`: Struktur HTML halaman undangan.
- `style.css`: Desain visual, tipografi klasik, palet warna espresso-gold, dan animasi.
- `script.js`: Logika interaktif, animasi pembukaan, musik, hitung mundur, auto-scroll, dan pengelolaan ucapan.
- `sampul.jpg`: Gambar latar belakang sampul.
- `music.mp3`: Musik latar pernikahan.
- `assets/`: Aset gambar & ornamen:
  - `foto_pengantin.jpg`: Foto utama kedua mempelai dalam bingkai Barok oval emas.
  - `foto_gallery_1.jpg`: Foto kenangan polaroid 1.
  - `foto_gallery_2.jpg`: Foto kenangan polaroid 2.
  - `foto_gallery_3.jpg`: Foto kenangan polaroid 3.
  - `cameo_brooch.png`: Pin medali emas N & R.
  - `lace_border.svg`: Ornamen renda Victorian.

## 📸 Cara Menambahkan / Mengganti Foto Asli
Anda dapat langsung mengganti file foto di dalam folder `assets/`:
1. **Foto Utama Mempelai (Bingkai Oval Barok)**:
   Ganti file `assets/foto_pengantin.jpg` dengan foto Anda.
2. **Foto Kenangan (Strip Polaroid)**:
   Ganti 3 file foto berikut:
   - `assets/foto_gallery_1.jpg`
   - `assets/foto_gallery_2.jpg`
   - `assets/foto_gallery_3.jpg`

*Catatan: Sistem secara otomatis menyesuaikan aspek rasio (`object-fit: cover`) sehingga foto tidak akan gepeng atau terdistorsi.*

## Pembuat
create by ainulmtqn
