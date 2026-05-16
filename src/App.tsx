import React, { useState } from 'react'
import {
  IconDashboard,
  IconSchool,
  IconUsers,
  IconFileSpreadsheet,
  IconPrinter,
  IconBarcode,
  IconSettings,
  IconBell,
  IconSearch,
  IconBook,
  IconChevronDown,
} from '@tabler/icons-react'

// IMPORT HALAMAN ASLI KAMU
import SiswaPage from './components/administrasiujian/pages/siswa-page'
import KartuPeserta from './components/administrasiujian/pages/kartu-peserta-page'

function App() {
  const [activeMenu, setActiveMenu] = useState<string>('dashboard')

  const getPageTitle = () => {
    switch (activeMenu) {
      case 'dashboard': return 'Dashboard'
      case 'data-siswa': return 'Data Siswa'
      case 'guru': return 'Data Guru'
      case 'export': return 'Export Excel'
      case 'print': return 'Print Dokumen'
      case 'admin-siswa': return 'Administrasi Ujian - Siswa'
      case 'kartu-peserta': return 'Kartu Peserta'
      case 'barcode': return 'Barcode'
      case 'pengaturan': return 'Pengaturan'
      default: return 'Dashboard'
    }
  }

  // Cek apakah halaman yang aktif adalah kartu-peserta untuk penyesuaian layout luar
  const isKartuPesertaActive = activeMenu === 'kartu-peserta'

  return (
    <div
      style={{
        minHeight: '100vh',
        // Jika kartu peserta aktif, biarkan background abu-abu gelap bawaan Tailwind-nya yang mendominasi
        background: isKartuPesertaActive 
          ? '#4b5563' 
          : 'linear-gradient(135deg, #f4ede7 0%, #efe7e1 40%, #e6dfda 100%)',
        padding: isKartuPesertaActive ? '0px' : '20px',
        fontFamily: 'Inter, sans-serif',
        transition: 'background 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', gap: isKartuPesertaActive ? '0px' : '20px', minHeight: '100vh' }}>
        
        {/* SIDEBAR (Disembunyikan otomatis saat mode Cetak/Print browser aktif via class 'no-print') */}
        <div
          className="no-print"
          style={{
            width: '260px',
            background: isKartuPesertaActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(20px)',
            padding: '24px',
            borderRight: '1px solid rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            // Jika bukan kartu peserta, pakai style rounded melayang bawaan kamu
            borderRadius: isKartuPesertaActive ? '0px' : '30px',
            margin: isKartuPesertaActive ? '0px' : '20px 0 20px 20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
          }}
        >
          <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '40px', color: '#222' }}>
            Admin Sekolah
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
            <MenuItem
              active={activeMenu === 'dashboard'}
              onClick={() => setActiveMenu('dashboard')}
              icon={<IconDashboard size={20} />}
              text="Dashboard"
            />

            <MenuItem
              active={activeMenu === 'data-siswa'}
              onClick={() => setActiveMenu('data-siswa')}
              icon={<IconSchool size={20} />}
              text="Data Siswa"
            />

            <MenuItem
              active={activeMenu === 'guru'}
              onClick={() => setActiveMenu('guru')}
              icon={<IconUsers size={20} />}
              text="Guru"
            />

            <MenuItem
              active={activeMenu === 'export'}
              onClick={() => setActiveMenu('export')}
              icon={<IconFileSpreadsheet size={20} />}
              text="Export Excel"
            />

            <MenuItem
              active={activeMenu === 'print'}
              onClick={() => setActiveMenu('print')}
              icon={<IconPrinter size={20} />}
              text="Print"
            />

            {/* DROPDOWN */}
            <DropdownMenu
              icon={<IconBook size={20} />}
              title="Administrasi Ujian"
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />

            <MenuItem
              active={activeMenu === 'barcode'}
              onClick={() => setActiveMenu('barcode')}
              icon={<IconBarcode size={20} />}
              text="Barcode"
            />

            <MenuItem
              active={activeMenu === 'pengaturan'}
              onClick={() => setActiveMenu('pengaturan')}
              icon={<IconSettings size={20} />}
              text="Pengaturan"
            />
          </div>
        </div>

        {/* CONTENT AREA */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          
          {/* TOPBAR (Disembunyikan jika membuka kartu peserta agar area cetak bersih) */}
          {!isKartuPesertaActive && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 20px 25px 0' }}>
              <div>
                <h1 style={{ fontSize: '42px', fontWeight: '700', margin: 0, color: '#222' }}>
                  {getPageTitle()}
                </h1>
                <p style={{ color: '#777', marginTop: '6px' }}>Sistem Administrasi Sekolah</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <TopButton icon={<IconSearch size={20} />} />
                <TopButton icon={<IconBell size={20} />} />
                <div style={{ padding: '10px 18px', background: '#111827', color: 'white', borderRadius: '14px', fontWeight: '600' }}>
                  Admin
                </div>
              </div>
            </div>
          )}

          {/* AREA UTAMA TEMPAT HALAMAN DI-RENDER */}
          <div style={{ flex: 1, padding: isKartuPesertaActive ? '0px' : '0 20px 20px 0' }}>
            
            {/* 1. HALAMAN DASHBOARD */}
            {activeMenu === 'dashboard' && (
              <>
                {/* STATS */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', marginBottom: '25px' }}>
                  <StatCard title="Total Siswa" value="1,245" />
                  <StatCard title="Guru" value="58" />
                  <StatCard title="Kelas" value="24" />
                  <StatCard title="Absensi" value="97%" />
                </div>

                {/* MAIN GRID */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                  {/* TABLE */}
                  <div style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px)', borderRadius: '30px', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
                    <h2 style={{ marginBottom: '20px', color: '#222' }}>Data Siswa</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ textAlign: 'left', color: '#777' }}>
                          <th style={{ paddingBottom: '14px' }}>NISN</th>
                          <th style={{ paddingBottom: '14px' }}>Nama</th>
                          <th style={{ paddingBottom: '14px' }}>Kelas</th>
                          <th style={{ paddingBottom: '14px' }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <TableRow nisn="123456789" nama="Ahmad Fauzi" kelas="6A" status="Aktif" />
                        <TableRow nisn="987654321" nama="Siti Nurhaliza" kelas="5B" status="Aktif" />
                        <TableRow nisn="456789123" nama="Rizky Maulana" kelas="4A" status="Aktif" />
                        <TableRow nisn="741852963" nama="Nabila Putri" kelas="6B" status="Aktif" />
                      </tbody>
                    </table>
                  </div>

                  {/* RIGHT PANEL */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ background: 'linear-gradient(135deg,#111827,#1f2937)', color: 'white', borderRadius: '30px', padding: '25px', minHeight: '220px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                      <h3 style={{ marginBottom: '20px' }}>Agenda Sekolah</h3>
                      <AgendaItem title="Rapat Guru" time="08:00 WIB" />
                      <AgendaItem title="Pembagian Raport" time="10:00 WIB" />
                      <AgendaItem title="Ujian Semester" time="13:00 WIB" />
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px)', borderRadius: '30px', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
                      <h3 style={{ marginBottom: '15px' }}>Statistik Kehadiran</h3>
                      <div style={{ height: '12px', background: '#ddd', borderRadius: '20px', overflow: 'hidden' }}>
                        <div style={{ width: '97%', height: '100%', background: 'linear-gradient(90deg,#ff9966,#ff5e62)' }} />
                      </div>
                      <p style={{ marginTop: '12px', color: '#555' }}>Kehadiran siswa bulan ini sangat baik.</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* 2. HALAMAN DARI FILE LUAR */}
            {activeMenu === 'admin-siswa' && <SiswaPage />}
            {activeMenu === 'kartu-peserta' && <KartuPeserta />}

            {/* 3. PLACEHOLDER UNTUK MENU YANG BELUM ADA FILE-NYA */}
            {!['dashboard', 'admin-siswa', 'kartu-peserta'].includes(activeMenu) && (
              <div style={{ padding: '40px', background: 'white', borderRadius: '30px', textAlign: 'center', marginTop: '20px' }}>
                <h3>Halaman "{getPageTitle()}"</h3>
                <p style={{ color: '#666' }}>Silakan buat file komponen untuk menu ini.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

// --- SUB KOMPONEN SIDEBAR MENU ---

function DropdownMenu({
  icon,
  title,
  activeMenu,
  setActiveMenu,
}: {
  icon: React.ReactNode
  title: string
  activeMenu: string
  setActiveMenu: (menu: string) => void
}) {
  return (
    <details>
      <summary
        style={{
          listStyle: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 16px',
          borderRadius: '16px',
          cursor: 'pointer',
          fontWeight: '600',
          color: '#444',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {icon}
          {title}
        </div>
        <IconChevronDown size={18} />
      </summary>

      <div style={{ marginTop: '10px', marginLeft: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SubMenuItem 
          text="Siswa" 
          active={activeMenu === 'admin-siswa'} 
          onClick={() => setActiveMenu('admin-siswa')} 
        />
        <SubMenuItem 
          text="Kartu Peserta" 
          active={activeMenu === 'kartu-peserta'} 
          onClick={() => setActiveMenu('kartu-peserta')} 
        />
        <SubMenuItem 
          text="Daftar Hadir" 
          active={activeMenu === 'daftar-hadir'} 
          onClick={() => setActiveMenu('daftar-hadir')} 
        />
        <SubMenuItem 
          text="Mata Pelajaran" 
          active={activeMenu === 'mapel'} 
          onClick={() => setActiveMenu('mapel')} 
        />
        <SubMenuItem 
          text="Absensi" 
          active={activeMenu === 'absensi-ujian'} 
          onClick={() => setActiveMenu('absensi-ujian')} 
        />
      </div>
    </details>
  )
}

function SubMenuItem({ text, active = false, onClick }: { text: string; active?: boolean; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '12px 16px',
        borderRadius: '14px',
        background: active ? '#111827' : 'rgba(255,255,255,0.5)',
        color: active ? 'white' : '#555',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'all 0.2s ease',
      }}
    >
      {text}
    </div>
  )
}

function MenuItem({ icon, text, active = false, onClick }: { icon: React.ReactNode; text: string; active?: boolean; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '14px 16px',
        borderRadius: '16px',
        background: active ? '#111827' : 'transparent',
        color: active ? 'white' : '#444',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      {icon}
      {text}
    </div>
  )
}

// --- UTILITY BLOCKS ---
function TopButton({ icon }: { icon: React.ReactNode }) {
  return (
    <div style={{ width: '45px', height: '45px', borderRadius: '14px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
      {icon}
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px)', borderRadius: '25px', padding: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
      <div style={{ color: '#777', marginBottom: '10px' }}>{title}</div>
      <div style={{ fontSize: '34px', fontWeight: '700', color: '#222' }}>{value}</div>
    </div>
  )
}

function TableRow({ nisn, nama, kelas, status }: { nisn: string; nama: string; kelas: string; status: string }) {
  return (
    <tr>
      <td style={{ padding: '14px 0' }}>{nisn}</td>
      <td>{nama}</td>
      <td>{kelas}</td>
      <td>
        <span style={{ background: '#dcfce7', color: '#166534', padding: '6px 12px', borderRadius: '999px', fontSize: '13px', fontWeight: '600' }}>
          {status}
        </span>
      </td>
    </tr>
  )
}

function AgendaItem({ title, time }: { title: string; time: string }) {
  return (
    <div style={{ marginBottom: '18px', paddingBottom: '18px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ fontWeight: '600' }}>{title}</div>
      <div style={{ color: '#bbb', fontSize: '14px', marginTop: '4px' }}>{time}</div>
    </div>
  )
}

export default App