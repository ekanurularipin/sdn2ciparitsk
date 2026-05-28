import { useState } from 'react';
import { 
   UserCheck, ChevronDown, Menu, X 
} from 'lucide-react';
// 🌟 1. IMPORT LINK DARI REACT ROUTER DOM
import { Link } from 'react-router-dom'; 

// Proses Import Logo
import logoSekolah from '../../assets/images/logo-sekolah.png'; 

export default function SDN2CipariWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAbsenMenu, setOpenAbsenMenu] = useState(false);
  return (
    <div className="min-h-screen bg-white text-slate-800 overflow-hidden">
      {/* Navbar */}
      
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl  flex items-center justify-center shadow-lg shadow-blue-200">
                
                <img src={logoSekolah} 
                alt="Logo SDN 2 Cipari"
                className="w-full h-full object-contain" />
                
              </div>

              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-900">
                  SDN 2 Cipari
                </h1>
                <p className="text-sm text-slate-500">
                  Tasikmalaya, Jawa Barat
                </p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-8 font-medium text-slate-700">
              <a href="#beranda" className="hover:text-blue-600 transition-all duration-300">
                Beranda
              </a>
              <a href="#profile" className="hover:text-blue-600 transition-all duration-300">
                Profile
              </a>
              <a href="#prestasi" className="hover:text-blue-600 transition-all duration-300">
                Prestasi
              </a>
              <a href="#sarpras" className="hover:text-blue-600 transition-all duration-300">
                Sarana Prasarana
              </a>
              {/* <a href="#sarpras" className="hover:text-blue-600 transition-all duration-300">
                Nomor Meja
                
              </a> */}
                 <Link
               to="/nomor-meja"
               className="hover:text-blue-600 transition-all duration-300"
             >
               Nomor Meja
             </Link>
                 <Link
               to="/kelas"
               className="hover:text-blue-600 transition-all duration-300"
             >
               pilih aja
             </Link>
              {/* ================= DROPDOWN ABSENSI ================= */}
             <div className="relative">
               <button
                onClick={() => setOpenAbsenMenu(!openAbsenMenu)}
                className="font-bold text-xs text-[#0057D9] hover:text-blue-800 flex items-center gap-2 transition bg-blue-50 border border-blue-100 px-4 py-2 rounded-full cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                Absen Siswa
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openAbsenMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* ================= DROPDOWN MENU KOTAK ================= */}
              {openAbsenMenu && (
                <div className="absolute top-full right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                  {/* 🌟 MENGGUNAKAN <Link to="..."> BUKAN <a href="..."> */}
                  <Link
                    to="/absen?ruangan=Ruang 1"
                    onClick={() => setOpenAbsenMenu(false)}
                    className="flex items-center justify-between px-5 py-4 hover:bg-blue-50 transition font-semibold text-slate-700 text-sm"
                  >
                    Ruang 1
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Ujian</span>
                  </Link>
                  <Link
                    to="/absen?ruangan=Ruang 2"
                    onClick={() => setOpenAbsenMenu(false)}
                    className="flex items-center justify-between px-5 py-4 hover:bg-green-50 transition font-semibold text-slate-700 text-sm border-t border-slate-100"
                  >
                    Ruang 2
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Ujian</span>
                  </Link>
                  <Link
                    to="/absen?ruangan=Ruang 3"
                    onClick={() => setOpenAbsenMenu(false)}
                    className="flex items-center justify-between px-5 py-4 hover:bg-yellow-50 transition font-semibold text-slate-700 text-sm border-t border-slate-100"
                  >
                    Ruang 3
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Ujian</span>
                  </Link>
                </div>
              )}
            </div>
              <a href="#spmb" className="hover:text-blue-600 transition-all duration-300">
                SPMB
              </a>
              
            </nav>
              <Link
               to="/login"
               className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-orange-400 text-white font-semibold shadow-lg shadow-blue-200 hover:scale-105 transition-all duration-300"
             >
               Login Admin
             </Link>
            
          </div>
          {/* ================= MOBILE BUTTON ================= */}
           <button
             onClick={() => setIsMenuOpen(!isMenuOpen)}
             className="lg:hidden p-2 rounded-xl bg-white shadow-xs border border-slate-100 text-slate-800 cursor-pointer"
           >
             {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
           </button>
           {/* ================= MOBILE MENU PANEL ================= */}
         {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full px-5 mt-2 z-50">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 space-y-4">
              {/* Menu internal scroll pakai anchor tag biasa tidak apa-apa */}
              <a href="#" onClick={() => setIsMenuOpen(false)} className="block font-semibold py-2 text-slate-800 hover:text-blue-600 border-b border-slate-50">
                Beranda
              </a>
              <a href="#profil" onClick={() => setIsMenuOpen(false)} className="block font-semibold py-2 text-slate-800 hover:text-blue-600 border-b border-slate-50">
                Profil
              </a>
              <a href="#akademik" onClick={() => setIsMenuOpen(false)} className="block font-semibold py-2 text-slate-800 hover:text-blue-600 border-b border-slate-50">
                Akademik
              </a>
              <a href="#berita" onClick={() => setIsMenuOpen(false)} className="block font-semibold py-2 text-slate-800 hover:text-blue-600 border-b border-slate-50">
                Berita
              </a>
              <a href="#kontak" onClick={() => setIsMenuOpen(false)} className="block font-semibold py-2 text-slate-800 hover:text-blue-600 border-b border-slate-50">
                Kontak
              </a>

              {/* ================= MOBILE ABSENSI ================= */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 font-bold text-sm text-[#0057D9]">
                  <UserCheck className="w-4 h-4" />
                  Pilih Ruangan Absensi
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {/* 🌟 MENGGUNAKAN <Link to="..."> */}
                  <Link to="/absen?ruangan=Ruang 1" onClick={() => setIsMenuOpen(false)} className="text-center bg-blue-50 border border-blue-100 py-2.5 rounded-xl text-xs font-semibold text-slate-700">
                    Ruang 1
                  </Link>
                  <Link to="/absen?ruangan=Ruang 2" onClick={() => setIsMenuOpen(false)} className="text-center bg-green-50 border border-green-100 py-2.5 rounded-xl text-xs font-semibold text-slate-700">
                    Ruang 2
                  </Link>
                  <Link to="/absen?ruangan=Ruang 3" onClick={() => setIsMenuOpen(false)} className="text-center bg-yellow-50 border border-yellow-100 py-2.5 rounded-xl text-xs font-semibold text-slate-700">
                    Ruang 3
                  </Link>
                </div>
              </div>

              {/* ================= LOGIN MOBILE ================= */}
              {/* 🌟 MENGGUNAKAN <Link to="/login"> */}
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block bg-[#0F52BA] text-center text-white py-3 rounded-2xl font-bold text-sm shadow-md"
              >
                Login Admin
              </Link>
            </div>
          </div>
          
          )}
          </div>
      </header>
      
      {/* Hero */}
      <section
        id="beranda"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50"></div>

        <div className="absolute top-20 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-32 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold mb-6">
              ✨ Sekolah Dasar Modern & Berprestasi
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight text-slate-900">
              Membangun
              <span className="bg-gradient-to-r from-blue-600 to-orange-400 bg-clip-text text-transparent">
                {' '}Generasi Cerdas
              </span>
              <br />
              dan Berkarakter
            </h1>

            <p className="mt-8 text-lg text-slate-600 leading-relaxed max-w-2xl">
              SDN 2 Cipari Tasikmalaya menghadirkan pendidikan berkualitas,
              lingkungan belajar nyaman, dan teknologi modern untuk membentuk
              siswa yang unggul, kreatif, religius, serta siap menghadapi masa depan.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold shadow-xl shadow-blue-200 hover:scale-105 transition-all duration-300">
                Jelajahi Sekolah
              </button>

              <button className="px-8 py-4 rounded-2xl border border-slate-300 bg-white/70 backdrop-blur-xl text-slate-700 font-bold hover:border-orange-400 hover:text-orange-500 transition-all duration-300">
                Lihat Prestasi
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-100 shadow-xl">
                <h3 className="text-3xl font-black text-blue-600">500+</h3>
                <p className="text-slate-500 mt-2 text-sm">Siswa Aktif</p>
              </div>

              <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-100 shadow-xl">
                <h3 className="text-3xl font-black text-orange-500">20+</h3>
                <p className="text-slate-500 mt-2 text-sm">Prestasi</p>
              </div>

              <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-100 shadow-xl">
                <h3 className="text-3xl font-black text-blue-600">15</h3>
                <p className="text-slate-500 mt-2 text-sm">Tenaga Guru</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-orange-300 blur-3xl opacity-60"></div>

            <div className="relative rounded-[40px] overflow-hidden shadow-2xl border border-white/50 bg-white p-4">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop"
                alt="Sekolah"
                className="w-full h-[600px] object-cover rounded-[30px]"
              />

              <div className="absolute bottom-10 left-10 right-10 p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-xl">
                <h3 className="text-2xl font-black text-slate-900">
                  Sekolah Nyaman & Modern
                </h3>
                <p className="mt-2 text-slate-600">
                  Lingkungan belajar inspiratif dengan fasilitas lengkap.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile */}
      <section id="profile" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=1400&auto=format&fit=crop"
              alt="Profile Sekolah"
              className="rounded-[40px] shadow-2xl"
            />
          </div>

          <div>
            <span className="text-orange-500 font-bold uppercase tracking-[0.3em]">
              Profile Sekolah
            </span>

            <h2 className="mt-4 text-5xl font-black leading-tight text-slate-900">
              Pendidikan Berkualitas dengan Nilai Karakter
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-slate-600">
              SDN 2 Cipari berkomitmen menciptakan lingkungan belajar yang
              inovatif, menyenangkan, dan mendukung perkembangan akademik maupun
              karakter siswa. Dengan tenaga pendidik profesional serta fasilitas
              modern, sekolah menjadi tempat terbaik untuk tumbuh dan berkembang.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100">
                <h3 className="font-black text-xl text-blue-700">
                  Visi
                </h3>
                <p className="mt-3 text-slate-600">
                  Menjadi sekolah unggul, berprestasi, religius dan berwawasan teknologi.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-orange-50 border border-orange-100">
                <h3 className="font-black text-xl text-orange-500">
                  Misi
                </h3>
                <p className="mt-3 text-slate-600">
                  Membentuk siswa cerdas, disiplin, kreatif dan berkarakter positif.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prestasi */}
      <section id="prestasi" className="py-28 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-blue-600 font-bold uppercase tracking-[0.3em]">
              Prestasi Sekolah
            </span>

            <h2 className="mt-5 text-5xl font-black text-slate-900">
              Prestasi Membanggakan
            </h2>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Berbagai pencapaian akademik maupun non-akademik yang diraih siswa
              dan sekolah sebagai bukti kualitas pendidikan terbaik.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[
              "Juara Olimpiade Matematika",
              "Juara Lomba Pramuka",
              "Sekolah Adiwiyata",
              "Juara Seni Tari Daerah",
              "Juara Futsal Tingkat Kecamatan",
              "Sekolah Ramah Anak",
            ].map((item, index) => (
              <div
                key={index}
                className="group p-8 rounded-[32px] bg-white border border-white shadow-xl hover:-translate-y-3 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-orange-400 text-white flex items-center justify-center text-2xl shadow-lg">
                  🏆
                </div>

                <h3 className="mt-6 text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-all duration-300">
                  {item}
                </h3>

                <p className="mt-4 text-slate-600 leading-relaxed">
                  Prestasi luar biasa yang menunjukkan kualitas siswa SDN 2 Cipari.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sarpras */}
      <section id="sarpras" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-orange-500 font-bold uppercase tracking-[0.3em]">
                Sarana & Prasarana
              </span>

              <h2 className="mt-4 text-5xl font-black text-slate-900 leading-tight">
                Fasilitas Modern dan Nyaman
              </h2>
            </div>

            <p className="max-w-xl text-lg text-slate-600 leading-relaxed">
              Mendukung proses belajar mengajar dengan fasilitas terbaik untuk siswa.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {[
              "Ruang Kelas Modern",
              "Perpustakaan",
              "Lapangan Olahraga",
              "Laboratorium Komputer",
            ].map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-[30px] group"
              >
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop"
                  alt={item}
                  className="w-full h-[320px] object-cover group-hover:scale-110 transition-all duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-black text-white">
                    {item}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPMB */}
      <section id="spmb" className="py-28 bg-gradient-to-br from-blue-600 to-orange-400 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full border border-white"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full border border-white"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center text-white">
          <span className="font-bold uppercase tracking-[0.3em] text-white/80">
            SPMB 2026
          </span>

          <h2 className="mt-6 text-5xl lg:text-6xl font-black leading-tight">
            Penerimaan Peserta Didik Baru
          </h2>

          <p className="mt-8 text-xl leading-relaxed text-white/90 max-w-3xl mx-auto">
            Daftarkan putra putri terbaik Anda di SDN 2 Cipari Tasikmalaya dan
            jadilah bagian dari sekolah modern, kreatif, dan penuh prestasi.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <button className="px-8 py-4 rounded-2xl bg-white text-blue-600 font-black hover:scale-105 transition-all duration-300 shadow-2xl">
              Daftar Sekarang
            </button>

            <button className="px-8 py-4 rounded-2xl border border-white/40 bg-white/10 backdrop-blur-xl text-white font-black hover:bg-white hover:text-blue-600 transition-all duration-300">
              Download Brosur
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row gap-10 items-center justify-between">
          <div>
            <h3 className="text-3xl font-black">
              SDN 2 Cipari
            </h3>
            <p className="mt-3 text-slate-400 max-w-lg leading-relaxed">
              Sekolah dasar modern yang berkomitmen menciptakan generasi unggul,
              cerdas, kreatif dan berkarakter.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-slate-300">
            <a href="#" className="hover:text-white transition-all duration-300">
              Instagram
            </a>
            <a href="#" className="hover:text-white transition-all duration-300">
              Facebook
            </a>
            <a href="#" className="hover:text-white transition-all duration-300">
              YouTube
            </a>
          </div>
        </div>
      </footer>
   </div>
);
}