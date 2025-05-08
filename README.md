# TaskMate – Aplikasi Manajemen Tugas Harian

## 📄 Deskripsi Aplikasi Web
**TaskMate** adalah aplikasi web berbasis React JS dan Python Pyramid yang memungkinkan pengguna untuk mencatat, memantau, dan mengelola tugas-tugas harian mereka secara efisien. Aplikasi ini mendukung operasi CRUD lengkap untuk entitas tugas dan pengguna, dilengkapi dengan autentikasi agar data aman dan personal.

---

## 📦 Dependensi Paket (Library)

### 🔙 Backend (Python Pyramid)
- `pyramid`
- `pyramid_jwt` atau `pyramid_auth`
- `sqlalchemy`
- `psycopg2`
- `alembic`
- `passlib`
- `pytest` (untuk testing)
- `pyramid_openapi3` *(opsional untuk dokumentasi API)*

### 🔜 Frontend (React JS)
- `react`
- `react-router-dom`
- `axios`
- `tailwindcss` *(atau bootstrap/material-ui sesuai preferensi styling)*
- `react-icons` *(opsional)*

---

## 🚀 Fitur Aplikasi
- Autentikasi pengguna (Register & Login)
- CRUD entitas **Task** (buat, lihat, edit, hapus tugas)
- Dashboard tugas dengan filter status
- Desain UI responsif (Mobile-friendly)
- Proteksi endpoint backend menggunakan token autentikasi
- Penyimpanan token login di `localStorage` (client-side)
- Unit testing backend (coverage minimal 60%)

---


