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
  - `foto1.png`: Foto / ilustrasi mempelai berbusana adat di halaman depan (sampul).
  - `foto_pengantin.jpg`: Foto utama kedua mempelai dalam bingkai Barok oval emas.
  - `foto_gallery_main.jpg`: Foto kenangan utama (backdrop kolase).
  - `foto_gallery_1.jpg`: Foto polaroid kiri (tilted -8°).
  - `foto_gallery_2.jpg`: Foto polaroid tengah (straight front).
  - `foto_gallery_3.jpg`: Foto polaroid kanan (tilted +8°).
  - `cameo_brooch.png`: Pin medali emas N & R.
  - `lace_border.svg`: Ornamen renda Victorian.

## 📸 Cara Menambahkan / Mengganti Foto Asli
Anda dapat langsung mengganti file foto di dalam folder `assets/`:
1. **Foto Mempelai Halaman Depan (Sampul)**:
   Ganti file `assets/foto1.png` (atau `Foto1.png`) dengan foto / ilustrasi mempelai yang diinginkan (disarankan berlatar transparan).
2. **Foto Utama Mempelai di Lembaran Undangan (Full-Width Soft Blend)**:
   Ganti file `assets/foto_pengantin.jpg` dengan foto potret/landscape Anda. Foto akan tampil penuh membentang selebar kartu (*full-width*) dengan tepi atas dan bawah yang memudar halus menyatu dengan latar kertas krem.
3. **Kolase Foto Kenangan (Backdrop & 3 Polaroid Overlapping)**:
   Ganti 4 file foto berikut:
   - `assets/foto_gallery_main.jpg` (foto landscape utama di belakang)
   - `assets/foto_gallery_1.jpg` (polaroid kiri)
   - `assets/foto_gallery_2.jpg` (polaroid tengah)
   - `assets/foto_gallery_3.jpg` (polaroid kanan)

*Catatan: Sistem secara otomatis menyesuaikan aspek rasio (`object-fit: cover`) sehingga foto tidak akan gepeng atau terdistorsi.*

## Pembuat
create by ainulmtqn
