
# Performance Rules

## Core Principle

Saat melakukan optimasi, AI WAJIB mengikuti aturan berikut:

1. Jangan mengubah struktur folder project tanpa diminta.
2. Jangan memindahkan file hanya demi mengikuti best practice.
3. Jangan mengganti arsitektur project yang sudah berjalan.
4. Jangan mengganti state management yang sudah digunakan.
5. Jangan mengganti UI Library yang sudah digunakan.
6. Jangan mengganti styling yang sudah digunakan.
7. Jangan mengganti routing yang sudah ada.
8. Jangan menghapus fitur yang sudah berjalan.
9. Jangan melakukan breaking changes.
10. Selalu menjaga kompatibilitas dengan kode yang sudah ada.

---

## Existing Architecture First

Selalu analisis project terlebih dahulu.

Optimasi harus menyesuaikan:

- Struktur folder
- Naming convention
- Component pattern
- Hooks
- Utils
- Shared component
- Layout
- Route
- Styling
- TypeScript Config
- ESLint Config

Jangan membuat pola baru apabila project sudah memiliki pola yang konsisten.

---

## Performance Priority

Saat mengoptimasi, AI hanya boleh melakukan perubahan yang benar-benar meningkatkan performa tanpa mengubah behavior aplikasi.

Contoh perubahan yang diperbolehkan:

✅ Mengurangi re-render

✅ Menggunakan memo()

✅ Dynamic Import

✅ Lazy Loading

✅ next/image

✅ next/font

✅ Suspense

✅ Skeleton Loading

✅ Menghapus import yang tidak dipakai

✅ Mengurangi bundle size

✅ Mengurangi nested component

✅ Memecah component yang terlalu besar

✅ Menambahkan loading state

✅ Menambahkan Error Boundary

✅ Mengoptimalkan props

---

## Forbidden

AI TIDAK BOLEH

❌ Mengubah UI tanpa diminta

❌ Mengubah Design System

❌ Mengubah warna

❌ Mengubah spacing

❌ Mengubah typography

❌ Mengubah layout

❌ Mengganti Tailwind menjadi CSS Module

❌ Mengganti App Router menjadi Pages Router

❌ Mengganti Zustand menjadi Redux

❌ Mengganti Prisma

❌ Mengganti library yang sudah digunakan apabila tidak berkaitan dengan performa

❌ Refactor besar hanya karena mengikuti best practice

❌ Rename file tanpa alasan

❌ Memindahkan folder tanpa alasan

---

## Safe Optimization

Selalu pilih perubahan dengan urutan berikut

Level 1 (Aman)

- Remove unused import
- Remove unused state
- Remove unused effect
- Optimize image
- Optimize font
- Dynamic import
- Memoization
- Lazy loading

Level 2 (Perlu Review)

- Split Component
- Virtual List
- Suspense
- Loading UI

Level 3 (Jangan dilakukan tanpa izin)

- Mengubah struktur folder
- Mengubah arsitektur project
- Mengganti library
- Mengubah routing
- Mengubah state management
