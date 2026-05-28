import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
// 🌟 HANYA IMPORT SATU FILE CSS UTAMA DI SINI

import App from './App.tsx' 
import VerifikasiPesertaPage from './components/administrasiujian/pages/verifikasi-peserta-page'
import LandingPage from './components/web/app.tsx' 
import LoginPage from './components/auth/login.tsx' 
import NomorMejaPage from './components/ujian-kelas1-5/pages/nomor-meja.tsx' 
import NomorMejaPerKelasPage from './components/ujian-kelas1-5/pages/kelas.tsx' 
import AbsenPage from './components/absensi/pages/absen.tsx' // 🌟 1. IMPORT FILE ABSEN KAMU DI SINI
import ProtectedRoute from './components/auth/ProtectedRoute'

// Catatan: Pastikan path import di atas sesuai dengan lokasi file AbsenPage kamu. 
// Jika nama filenya 'absen-page.tsx', gunakan huruf kecil sesuai nama file aslinya.

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 1. HALAMAN UTAMA (LANDING PAGE SEKOLAH - FULL TAILWIND) */}
        <Route path='/' element={<LandingPage />} />

        {/* 2. HALAMAN LOGIN SYSTEM */}
        <Route path='/login' element={<LoginPage />} />

        {/* 🌟 2. DAFTARKAN ROUTE ABSEN DI SINI AGAR TIDAK KOSONG SAAT DIKLIK */}
        <Route path='/absen' element={<AbsenPage />} />
        

        {/* 3. HALAMAN DASHBOARD / ADMIN */}
        <Route
  path='/admin/*'
  element={
    <ProtectedRoute>
      <App />
    </ProtectedRoute>
  }
  
/>

        {/* 4. HALAMAN VERIFIKASI QR */}
        <Route path='/verifikasi/:nisn' element={<VerifikasiPesertaPage />} />
        {/* 🌟 5. HALAMAN NOMOR MEJA */}
        <Route path='/nomor-meja' element={<NomorMejaPage />} />
        <Route path='/kelas' element={<NomorMejaPerKelasPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)