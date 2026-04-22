# 📝 Sistem Manajemen Catatan Dokumentasi

Sistem manajemen catatan untuk dokumentasi development dengan format struktur yang terstandarisasi.

## ✨ Fitur Utama

- ✅ **Format Terstruktur**: Menggunakan template [MODULE], [DESC], [FILES], dll.
- ✅ **Organisasi Folder**: Struktur modules/, core/, logs/
- ✅ **Pencarian Cepat**: Search dalam semua konten catatan
- ✅ **UI User-Friendly**: Interface yang mudah digunakan
- ✅ **Export/Import**: Backup dan restore data
- ✅ **Local Storage**: Data tersimpan di browser
- ✅ **Responsive Design**: Dapat digunakan di desktop dan mobile

## 🚀 Cara Menggunakan

### 1. Membuka Aplikasi
Buka file `index.html` di browser Anda.

### 2. Membuat Catatan Baru
- Klik tombol **"➕ Buat Catatan Baru"**
- Isi form dengan informasi yang diperlukan:
  - **Nama Module**: Nama modul (contoh: BOOKING)
  - **Folder**: Pilih folder tujuan (modules/, core/, logs/)
  - **Deskripsi**: Deskripsi singkat modul
  - **Files**: Daftar file yang terkait
  - **Flow**: Alur proses aplikasi
  - **Dependency**: Module yang diperlukan
  - **Database**: Informasi tabel dan relasi
  - **API**: Endpoint yang tersedia
  - **Log**: Catatan perubahan dan bug fixes
  - **TODO**: Task yang perlu dikerjakan
  - **History**: Riwayat versi

### 3. Mencari Catatan
- Gunakan **kotak pencarian** untuk mencari dalam semua konten
- Gunakan **filter folder** untuk melihat catatan dari folder tertentu
- Pencarian bekerja seperti `grep` - mencari di seluruh konten catatan

### 4. Mengelola Catatan
- **View**: Klik pada card catatan untuk melihat detail
- **Edit**: Klik tombol "✏️ Edit" untuk mengubah catatan
- **Delete**: Klik tombol "🗑️" untuk menghapus catatan

### 5. Backup & Restore
- **Export**: Klik "📤 Export Data" untuk backup
- **Import**: Klik "📥 Import Data" untuk restore

## 📁 Struktur Format Catatan

Setiap catatan mengikuti format standar:

```
[MODULE] NAMA_MODULE
==================================================

[DESC]
Deskripsi singkat modul

[FILES]
- Daftar file yang terkait
- Controller, Service, Model, View, dll

[FLOW]
Alur proses aplikasi step by step

[DEPENDENCY]
- Module/service yang diperlukan

[DB]
Informasi database:
- Nama tabel
- Field-field
- Relasi antar tabel

[API]
Endpoint API yang tersedia

[LOG]
Catatan perubahan:
- YYYY-MM-DD: Deskripsi perubahan

[TODO]
- Task yang perlu dikerjakan

[HISTORY]
Riwayat versi:
- v1.0: Deskripsi versi
```

## 🗂️ Struktur Folder

```
docs/
├── modules/          # Module aplikasi (booking, customer, payment)
│   ├── booking.txt
│   ├── customer.txt
│   └── payment.txt
├── core/            # Konfigurasi inti (database, auth, config)
│   ├── database.txt
│   ├── auth.txt
│   └── config.txt
└── logs/            # Log development dan perubahan
    └── development_log.txt
```

## ⚡ Keyboard Shortcuts

- **Ctrl/Cmd + N**: Buat catatan baru
- **Ctrl/Cmd + F**: Focus pada search box
- **Escape**: Tutup modal/viewer yang sedang terbuka

## 🎯 Contoh Penggunaan

### Mencari Semua File Terkait Booking:
1. Ketik "booking" di kotak pencarian
2. Sistem akan menampilkan semua catatan yang mengandung kata "booking"

### Melihat Semua Module:
1. Pilih "modules" pada filter folder
2. Sistem akan menampilkan semua catatan di folder modules/

### Backup Data:
1. Klik tombol "📤 Export Data"
2. File JSON akan otomatis terdownload
3. Simpan file untuk backup

## 🛠️ Teknologi

- **HTML5**: Struktur aplikasi
- **CSS3**: Styling dengan gradient dan animasi
- **JavaScript ES6+**: Logic aplikasi
- **LocalStorage**: Penyimpanan data browser

## ⭐ Kelebihan Sistem Ini

- ✅ Gampang di-search (seperti grep)
- ✅ Tidak tergantung tools external
- ✅ Bisa versioning dengan Git
- ✅ Cocok untuk project besar
- ✅ Tracking perubahan development
- ✅ Format yang konsisten dan terstruktur

## 📱 Mobile Responsive

Aplikasi ini dirancang responsif dan dapat digunakan dengan nyaman di:
- Desktop/Laptop
- Tablet
- Smartphone

## 🔧 Troubleshooting

### Data Hilang
- Data tersimpan di LocalStorage browser
- Pastikan tidak membersihkan data browser
- Gunakan fitur export untuk backup reguler

### Performance
- Aplikasi dioptimalkan untuk ratusan catatan
- Jika lambat, coba clear cache browser
- Gunakan search untuk filter data yang besar

---

**Happy Documenting! 📚✨**