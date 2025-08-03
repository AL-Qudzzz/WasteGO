# SRS / Proposal Singkat WasteGO

---

## 1. Latar Belakang Masalah

Pengelolaan sampah di Indonesia masih menjadi tantangan besar. Volume sampah yang terus meningkat, rendahnya tingkat daur ulang, serta kurangnya kesadaran masyarakat menyebabkan permasalahan lingkungan yang serius. Banyak masyarakat dan pelaku usaha kesulitan dalam memilah, mengelola, dan menyalurkan sampah ke tempat yang tepat. Selain itu, belum banyak platform digital yang menyediakan layanan penjadwalan penjemputan sampah, pelacakan status, serta insentif bagi masyarakat yang berpartisipasi dalam pengelolaan sampah berkelanjutan.

## 2. Tujuan Aplikasi

- Menyediakan platform digital yang memudahkan masyarakat dan pelaku usaha dalam mengelola sampah secara bertanggung jawab.
- Meningkatkan tingkat daur ulang dan pengelolaan sampah berkelanjutan di Indonesia.
- Memberikan insentif dan penghargaan kepada pengguna yang aktif berpartisipasi.
- Menyediakan layanan penjadwalan penjemputan, pelacakan status, dan edukasi dampak lingkungan.

## 3. Fitur Utama

- **Penjadwalan Penjemputan Sampah:** Pengguna dapat menjadwalkan penjemputan sampah sesuai waktu dan lokasi yang diinginkan.
- **Manajemen Jenis Sampah:** Mendukung berbagai kategori sampah (rumah tangga, medis, furnitur, elektronik, dll).
- **Pelacakan Status Real-Time:** Pengguna dapat memantau status penjemputan dan posisi kurir secara langsung.
- **Ringkasan Dampak Lingkungan:** AI menghasilkan ringkasan personal dampak positif pengguna terhadap lingkungan (misal: pohon terselamatkan, air terhemat).
- **Sistem Poin & Reward:** Pengguna mendapatkan poin dari aktivitas daur ulang yang dapat ditukar dengan hadiah.
- **Role-based Access:** Fitur dan tampilan berbeda untuk user, kurir, admin, dan mitra perusahaan.
- **Dashboard & Riwayat:** Tersedia dashboard statistik, riwayat penjemputan, dan pencapaian pengguna.
- **Upload Foto Sampah:** Untuk verifikasi dan dokumentasi sebelum penjemputan.
- **Panel Admin:** Manajemen pengguna, permintaan penjemputan, dan monitoring sistem.

## 4. Target Pengguna

- **Rumah Tangga:** Individu/keluarga yang ingin mengelola sampah dengan mudah dan bertanggung jawab.
- **Perusahaan & Bisnis:** Perusahaan, restoran, klinik, dan pelaku usaha yang membutuhkan layanan pengelolaan sampah khusus.
- **Kurir/Petugas Lapangan:** Petugas yang bertugas menjemput dan menyalurkan sampah.
- **Admin & Mitra:** Pengelola sistem dan mitra pengolahan sampah.

**Karakteristik:**
- Usia 18-65 tahun, familiar dengan aplikasi mobile/web, peduli lingkungan, dan ingin mendapatkan insentif dari aktivitas daur ulang.

## 5. Teknologi yang Digunakan

- **Frontend:** Next.js (React), TypeScript, Tailwind CSS, ShadCN UI
- **Backend & Database:** Firebase (Firestore, Authentication, Storage)
- **AI Integration:** Google AI & Genkit (untuk ringkasan dampak lingkungan)
- **Maps:** OpenStreetMap + React-Leaflet (pelacakan kurir)
- **State Management:** React Context, React Hook Form, Zod
- **Deployment:** Vercel
- **Lainnya:** ESLint, Turbopack, Lucide React, Recharts, date-fns

## 6. Design Figma

- [Figma Design WasteGO](https://www.figma.com/design/gXPu5kU3VbQt6gRBKPiGfp/WasteGo?node-id=553-147&m=dev)

## 7. Link Github

- [Github Repository WasteGO](https://github.com/AL-Qudzzz/WasteGO.git)

---

**Disusun oleh:**
- Syifa Najwa Azzahra (UI/UX & Project Idea)
- Muhammad Faiqul Umam Dzunnuroeni (Fullstack Development & Tester)

**Versi:** 1.0  
**Tanggal:** November 2024 