# LabPedia - Ensiklopedia Medis & Kalkulator Klinis

LabPedia adalah platform web modern berbahasa Indonesia yang dirancang khusus untuk mempermudah akses informasi medis dan perhitungan klinis secara cepat, akurat, dan intuitif. 

Aplikasi ini ditujukan bagi praktisi kesehatan, mahasiswa kedokteran, maupun masyarakat umum yang membutuhkan referensi istilah medis serta alat ukur klinis dalam satu tempat.

---

## 🌟 Fitur Utama

1. **Beranda Interaktif (`index.html`)**
   * Antarmuka modern dengan gaya *glassmorphism* dan mode gelap default.
   * Statistik interaktif dan navigasi yang responsif di seluruh perangkat (mobile & desktop).
   
2. **Kamus Medis (`kamus/dict.html`)**
   * Ensiklopedia istilah medis yang lengkap dan mudah dicari.
   * Fitur pencarian instan (*real-time filter*) untuk menemukan definisi klinis secara cepat.

3. **Kalkulator Klinis (`kalkulator/calc.html`)**
   * Berbagai alat bantu hitung parameter klinis penting, seperti:
     * *Body Mass Index (BMI)* / Indeks Massa Tubuh (IMT).
     * *Glomerular Filtration Rate (GFR)* / Laju Filtrasi Glomerulus untuk fungsi ginjal.
     * Dan kalkulator klinis lainnya yang disesuaikan secara medis.

4. **Halaman Kontak (`contact.html`) & Kebijakan Privasi (`privacy.html`)**
   * Form kontak interaktif untuk masukan pengguna serta dokumen privasi data standar.

---

## 🛠️ Teknologi yang Digunakan

* **Core:** HTML5 & Vanilla JavaScript (ES6+).
* **Styling & Desain:** Tailwind CSS (melalui CDN) dengan kostumisasi tema khusus (palet warna neon, dark-mode, dan font Inter).
* **Icons:** Google Material Symbols Outlined.
* **Build Tool:** Vite (v5.2.11) untuk performa pengembangan cepat dan kompresi aset yang optimal saat produksi.

---

## ⚙️ Cara Menjalankan Proyek Secara Lokal

### Prasyarat
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) di komputer Anda.

### Langkah-langkah
1. **Clone atau Unduh Proyek**
   Masukkan proyek ke dalam direktori lokal Anda.

2. **Instal Dependensi**
   Buka terminal di folder proyek ini dan jalankan perintah berikut untuk mengunduh Vite dan dependensi lainnya:
   ```bash
   npm install
   ```

3. **Jalankan Mode Pengembangan (Development)**
   Untuk melihat situs secara lokal dengan fitur *Hot Module Replacement* (HMR):
   ```bash
   npm run dev
   ```
   Setelah itu, buka browser dan akses alamat yang tertera di terminal Anda (biasanya `http://localhost:5173`).

4. **Build untuk Produksi**
   Jika Anda ingin mengompresi dan membuat versi web siap hosting:
   ```bash
   npm run build
   ```
   Hasil build akan diletakkan di dalam folder **`dist/`**. Folder ini yang nantinya akan diunggah ke layanan hosting gratis Anda.

5. **Pratinjau Hasil Build**
   Untuk menguji hasil kompresi produksi secara lokal:
   ```bash
   npm run preview
   ```

---

## 📂 Struktur Folder Proyek

```text
LabPedia/
├── favicon/             # Favicon dan ikon aplikasi untuk berbagai perangkat
├── kalkulator/          # Halaman kalkulator klinis & logika JS terkait
│   ├── calc.html
│   └── script.js
├── kamus/               # Halaman kamus medis & logika JS terkait
│   ├── dict.html
│   └── script.js
├── contact.html         # Halaman kontak
├── index.html           # Halaman utama (Beranda)
├── privacy.html         # Halaman Kebijakan Privasi
├── package.json         # Konfigurasi dependensi NPM & skrip build
├── package-lock.json    # Catatan versi dependensi terperinci
└── .gitignore           # File pengabaian Git (supaya node_modules & dist tidak diunggah)
```

---

## 🚀 Panduan Hosting Gratis

Anda dapat menghosting LabPedia secara gratis melalui layanan berikut:
* **Netlify (Rekomendasi Drag & Drop):** Jalankan `npm run build`, lalu seret dan taruh folder `dist` yang dihasilkan ke dashboard Netlify.
* **Vercel / Cloudflare Pages:** Hubungkan repositori GitHub Anda dengan layanan ini untuk pembaruan otomatis setiap kali Anda melakukan push kode.

---

## 📄 Lisensi
Proyek ini dilisensikan di bawah **ISC License**. Silakan gunakan dan kembangkan lebih lanjut!
