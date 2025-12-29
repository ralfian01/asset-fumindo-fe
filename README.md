# Asset Management System (Fumindo)

Sistem Informasi Manajemen Aset berbasis web modern yang dibangun menggunakan **Vue 3** dan **Vite**. Aplikasi ini dirancang untuk mengelola inventaris perusahaan dengan fitur CRUD (Create, Read, Update, Delete) yang lengkap, autentikasi aman, dan antarmuka responsif.

## 🛠️ Teknologi yang Digunakan

- **Core Framework:** [Vue 3](https://vuejs.org/) (Composition API & Script Setup)
- **Build Tool:** [Vite](https://vitejs.dev/) (Super fast build time)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Routing:** [Vue Router 4](https://router.vuejs.org/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Icons:** [Lucide Vue](https://lucide.dev/)

---

## 🚀 Persiapan & Instalasi

Pastikan Anda telah menginstal **Node.js** (Versi 18.0.0 atau terbaru direkomendasikan) di komputer Anda.

### 1. Clone Repository

```bash
git clone https://github.com/username-anda/asset-fumindo.git
cd asset-fumindo
```

### 2. Install Dependencies

Install semua library yang dibutuhkan (Vue, Pinia, Tailwind, dll).

```bash
npm install
```

### 3. Konfigurasi Environment (.env)

Aplikasi ini membutuhkan URL API Backend agar dapat berjalan.

1. Buat file baru bernama `.env` di root folder (sejajar dengan `package.json`).
2. Isi dengan konfigurasi berikut:

```env
# Ganti dengan URL Backend API Anda
VITE_API_URL=http://localhost:8080
```

> **Catatan:** Variabel wajib diawali dengan `VITE_` agar dapat dibaca oleh browser.

### 4. Jalankan Aplikasi (Mode Development)

Untuk menjalankan server lokal:

```bash
npm run dev
```

Buka browser dan akses: `http://localhost:5173/` (atau port lain sesuai terminal).

---

## 📂 Struktur Folder

Berikut adalah struktur direktori utama proyek agar mudah dipahami:

```
src/
├── assets/             # File statis (CSS Utama, Logo, Gambar)
│   └── main.css        # Entry point Tailwind CSS (@tailwind directives)
├── components/         # Komponen UI yang dapat digunakan kembali
│   ├── Header.vue      # Topbar (User info & Logout)
│   └── Sidebar.vue     # Navigasi Menu Samping
├── layouts/            # Struktur tata letak halaman
│   └── MainLayout.vue  # Layout utama (Sidebar + Header + Content)
├── router/             # Konfigurasi Rute & Navigasi
│   └── index.ts        # Definisi URL & Navigation Guards
├── stores/             # Global State Management (Pinia)
│   ├── auth.ts         # Login/Logout logic & Token handling
│   └── asset.ts        # CRUD Logic untuk data aset
├── views/              # Halaman Utama (Pages)
│   ├── LoginView.vue       # Halaman Login
│   ├── DashboardView.vue   # Halaman Dashboard (Statistik)
│   ├── AssetsView.vue      # Tabel Daftar Aset
│   ├── AssetCreateView.vue # Form Tambah Aset
│   └── AssetEditView.vue   # Form Edit Aset
├── App.vue             # Root Component
└── main.ts             # Entry point aplikasi Vue
```

---

## ✨ Fitur Utama

### 1. Autentikasi (Authentication)

- **Basic Auth Login:** Menggunakan enkripsi Base64 untuk mengirim kredensial ke server.
- **Session Storage:** Token disimpan sementara di browser untuk menjaga sesi login.
- **Navigation Guard:** Mencegah akses ke halaman dashboard tanpa login dan melempar user ke halaman login jika token tidak valid.

### 2. Dashboard

- Layout responsif dengan **Sidebar** yang bisa di-collapse di tampilan mobile.
- Ringkasan statistik data (Total Aset, Nilai Aset, dll).

### 3. Manajemen Aset (CRUD)

- **Read (Lihat Data):** Menampilkan daftar aset dalam bentuk tabel yang rapi dengan indikator *Loading* dan *Error handling*.
- **Create (Tambah):** Formulir input dengan validasi tipe data (otomatis konversi number untuk stok).
- **Update (Edit):** Mengambil data lama berdasarkan ID (Pre-fill) sebelum user melakukan perubahan.
- **Delete (Hapus):** Menghapus data dengan konfirmasi keamanan browser (`confirm`) dan pembaruan UI otomatis (Optimistic UI).

### 4. Optimasi Performa

- **Lazy Loading Routes:** Menggunakan `import()` dinamis pada Router. Halaman (seperti AssetsView) hanya didownload oleh browser saat user mengkliknya, membuat loading awal aplikasi sangat cepat.

---

## 📜 Skrip Tersedia

- `npm run dev`: Menjalankan server development dengan Hot Reload (HMR).
- `npm run build`: Melakukan build aplikasi untuk produksi (output di folder `dist`).
- `npm run preview`: Melihat preview hasil build produksi secara lokal.
- `npm run lint`: Memeriksa dan merapikan kode menggunakan ESLint/Prettier.

---

## ⚠️ Troubleshooting Umum

**1. CSS Tailwind tidak muncul?**
Pastikan file `src/main.ts` sudah mengimport file CSS utama:
`import './assets/main.css'`

**2. Error "Cannot read properties of undefined (reading 'imports')"?**
Biasanya terjadi karena masalah cache Vite atau path folder di Windows.
Solusi: Hapus folder `node_modules` dan file `package-lock.json`, lalu jalankan `npm install` lagi.

**3. API Error (CORS)?**
Jika muncul error CORS di browser console, pastikan Backend API Anda mengizinkan akses dari origin `http://localhost:5173`.

---

**Developed for Asset Fumindo Project.**
