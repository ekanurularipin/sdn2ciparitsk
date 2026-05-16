import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import '@tabler/core/dist/css/tabler.min.css'

import App from './App.tsx'
import VerifikasiPesertaPage from './components/administrasiujian/pages/verifikasi-peserta-page'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* HALAMAN UTAMA */}
        <Route path='/*' element={<App />} />

        {/* HALAMAN VERIFIKASI QR */}
        <Route
          path='/verifikasi/:nisn'
          element={<VerifikasiPesertaPage />}
        />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)