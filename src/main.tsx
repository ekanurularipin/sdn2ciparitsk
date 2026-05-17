import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// 🌟 HANYA IMPORT SATU FILE CSS UTAMA DI SINI
import './index.css' 

import App from './App.tsx' 
import VerifikasiPesertaPage from './components/administrasiujian/pages/verifikasi-peserta-page'
import LandingPage from './components/web/app.tsx' 
import LoginPage from './components/auth/login.tsx' 
import AbsenPage from './components/absensi/pages/absen.tsx' // 🌟 1. IMPORT FILE ABSEN KAMU DI SINI

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
        <Route path='/admin/*' element={<App />} />

        {/* 4. HALAMAN VERIFIKASI QR */}
        <Route path='/verifikasi/:nisn' element={<VerifikasiPesertaPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)