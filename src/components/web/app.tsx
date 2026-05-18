import { useState } from 'react';
import { 
  BookOpen, MapPin, Phone, Mail, ArrowRight, 
  ChevronLeft, ChevronRight, Trophy, GraduationCap, 
  Building2, Newspaper, UserCheck, ChevronDown, Menu, X 
} from 'lucide-react';
// 🌟 1. IMPORT LINK DARI REACT ROUTER DOM
import { Link } from 'react-router-dom'; 

// Proses Import Logo
import logoSekolah from '../../assets/images/logo-sekolah.png'; 

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAbsenMenu, setOpenAbsenMenu] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F7F7] font-sans text-slate-800 antialiased scroll-smooth">
      
      {/* 1. NAVBAR PREMIUM */}
      <nav className="w-full py-5 bg-white border-b border-slate-100 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          
          {/* ================= LOGO ================= */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl overflow-hidden bg-white shadow-xs border flex items-center justify-center p-1">
              <img
                src={logoSekolah} 
                alt="Logo SDN 2 Cipari"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="font-black text-[#0A1B52] text-xl lg:text-2xl leading-none">
                SDN 2 CIPARI
              </h1>
              <p className="text-[#4B5563] font-medium text-xs lg:text-sm mt-1">
                KOTA TASIKMALAYA
              </p>
            </div>
          </div>

          {/* ================= DESKTOP MENU ================= */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="#" className="bg-[#E9EEF9] text-[#1D4ED8] px-5 py-2 rounded-full font-semibold text-sm">
              Beranda
            </a>
            <a href="#profil" className="font-semibold text-sm text-slate-600 hover:text-blue-700 transition">
              Profil
            </a>
            <a href="#akademik" className="font-semibold text-sm text-slate-600 hover:text-blue-700 transition">
              Akademik
            </a>
            <a href="#berita" className="font-semibold text-sm text-slate-600 hover:text-blue-700 transition">
              Berita
            </a>
            <a href="#kontak" className="font-semibold text-sm text-slate-600 hover:text-blue-700 transition">
              Kontak
            </a>

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

            {/* ================= LOGIN DESKTOP ================= */}
            {/* 🌟 MENGGUNAKAN <Link to="/login"> */}
            <Link
              to="/login"
              className="bg-[#0F52BA] hover:bg-[#0C3F90] transition text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md"
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
        </div>

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
      </nav>

      {/* 2. HERO SECTION ASIMETRIS DENGAN KARTU MELAYANG */}
      <section id="beranda" className="relative pt-8 pb-20 lg:pt-12 lg:pb-28 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Sisi Kiri: Kartu Selamat Datang Melayang */}
            <div className="lg:col-span-5 relative order-2 lg:order-1 mt-8 lg:mt-0">
              <div className="absolute -left-4 -bottom-4 w-12 h-12 bg-amber-400 rounded-full opacity-20 blur-md"></div>
              <div className="absolute -left-12 top-1/2 w-16 h-16 bg-blue-600 rounded-lg rotate-12 opacity-10"></div>
              
              <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden relative group transition-all duration-300">
                <div className="bg-[#0052CC] p-8 text-white relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-10">
                    <Trophy size={180} />
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight uppercase">
                    Selamat Datang<br/>di SDN 2 Cipari
                  </h1>
                </div>

                <div className="p-8 space-y-6">
                  <p className="text-lg font-bold text-slate-700 leading-snug border-l-4 border-amber-500 pl-4">
                    Unggul dalam Prestasi, Berkarakter Bhineka Tunggal Ika.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a href="#profil" className="bg-[#D9A74A] hover:bg-[#C4933B] text-white font-bold px-6 py-3.5 rounded-full shadow-lg shadow-amber-500/20 transition-all text-sm flex items-center gap-2">
                      Selamat Datang
                    </a>
                    <a href="#akademik" className="bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold px-6 py-3.5 rounded-full transition-all text-sm">
                      Mari Belajar
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Sisi Kanan: Foto Gedung Utama Sekolah */}
            <div className="lg:col-span-7 order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-[#E2E8F0] rounded-[3rem] transform translate-x-4 -translate-y-4 lg:translate-x-8 lg:-translate-y-6 opacity-60"></div>
              <div className="relative rounded-[3rem] overflow-hidden shadow-xl border-4 border-white aspect-4/3 bg-slate-200">
                <div className="w-full h-full bg-gradient-to-tr from-slate-700 to-slate-400 flex items-center justify-center text-white p-8">
                  <div className="text-center space-y-2">
                    <Building2 size={64} className="mx-auto opacity-50" />
                    <p className="text-sm font-semibold tracking-widest uppercase opacity-75">Gedung Utama Baru</p>
                    <p className="text-xs opacity-60">Foto Fasilitas Infrastruktur SDN 2 Cipari</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. VISI & MISI SECTION */}
      <section id="profil" className="py-20 bg-white border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5 space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-[#0A2540] tracking-tight">Visi & Misi</h2>
                <div className="h-1 w-16 bg-[#0052CC] rounded-full"></div>
              </div>
              <div className="bg-[#E6F0FF]/60 rounded-2xl p-6 border border-blue-50/50">
                <span className="bg-[#0052CC] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Visi Utama</span>
                <p className="mt-4 text-lg font-bold text-[#0A2540] leading-relaxed">
                  "Unggul dalam Prestasi, Berkarakter Bhina tunggal Ika."
                </p>
              </div>
            </div>

            <div className="md:col-span-7 grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">1</div>
                <h4 className="font-bold text-slate-900">Prestasi Akademik</h4>
                <p className="text-sm text-slate-600 leading-relaxed">Perkembangan anak didik dalam bidang kompetensi prestasi tingkat kota hingga nasional.</p>
              </div>
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">2</div>
                <h4 className="font-bold text-slate-900">Budi Pekerti Luhur</h4>
                <p className="text-sm text-slate-600 leading-relaxed">Menanamkan nilai moral toleransi budaya tinggi berdasarkan semboyan Bhineka Tunggal Ika.</p>
              </div>
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">3</div>
                <h4 className="font-bold text-slate-900">Kreativitas & Seni</h4>
                <p className="text-sm text-slate-600 leading-relaxed">Mengembangkan minat bakat natural anak melalui program ekstrakurikuler terarah.</p>
              </div>
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">4</div>
                <h4 className="font-bold text-slate-900">Adaptasi Teknologi</h4>
                <p className="text-sm text-slate-600 leading-relaxed">Mengenalkan perangkat literasi digital sehat untuk mendukung metode riset belajar mandiri.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FASILITAS UNGGULAN SECTION */}
      <section id="akademik" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl font-black text-[#0A2540]">Fasilitas Unggul</h2>
            <div className="flex gap-2">
              <button className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-xs"><ChevronLeft size={20} /></button>
              <button className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-xs"><ChevronRight size={20} /></button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs">
              <div className="h-56 bg-slate-300 bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center text-white font-medium text-sm">
                [Foto Gedung Sekolah]
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-slate-900">Lingkungan Sekolah Asri</h3>
                <p className="text-xs text-slate-500 mt-1">Gedung 2 Lantai Standar Nasional</p>
              </div>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
              {[
                { title: "Laboratorium Multimedia", desc: "Ruangan komputer terintegrasi jaringan internet sehat.", icon: <Building2 className="text-[#0052CC]" /> },
                { title: "Perpustakaan Umum", desc: "Ribuan katalog buku fisik & platform perpustakaan digital khusus.", icon: <BookOpen className="text-emerald-650" /> },
                { title: "Lapangan Olahraga", desc: "Area serbaguna penunjang aktivitas kebugaran fisik jasmani siswa.", icon: <Trophy className="text-amber-500" /> },
                { title: "Ruang Kelas AC", desc: "Proses belajar nyaman dengan fasilitas proyektor digital interaktif.", icon: <GraduationCap className="text-indigo-600" /> },
              ].map((item, index) => (
                <div key={index} className="bg-white border border-slate-100 p-6 rounded-2xl flex gap-4 items-start shadow-xs hover:shadow-md transition-shadow">
                  <div className="p-3 bg-slate-50 rounded-xl">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{item.title}</h4>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. RECENT NEWS SECTION */}
      <section id="berita" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-[#0A2540]">Recent News</h2>
              <p className="text-sm text-slate-500">Ikuti terus perkembangan aktivitas terupdate sekolah kami</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"><ChevronLeft size={18} /></button>
              <button className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"><ChevronRight size={18} /></button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { tag: "Kegiatan", date: "26 May 2026", title: "Momen Pendataan Mutu Sekolah Kota Tasikmalaya", desc: "Kunjungan pengawas dinas pendidikan dalam rangka survei akreditasi tahunan berkala." },
              { tag: "Prestasi", date: "26 May 2026", title: "Pentas Seni Kreativitas dan Lomba Kebudayaan", desc: "Penampilan tari tradisional persembahan siswi berprestasi di panggung utama daerah." },
              { tag: "Pengumuman", date: "27 May 2026", title: "Rapat Pertemuan Komite Wali Murid Triwulan Kedua", desc: "Sinergi kolaborasi program pengajaran kolaboratif menyambut ujian kenaikan kelas." },
            ].map((item, index) => (
              <div key={index} className="group border border-slate-100 rounded-3xl overflow-hidden bg-white shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <div className="h-48 bg-slate-100 bg-gradient-to-tr from-slate-200 to-slate-100 flex items-center justify-center text-slate-400 transition-transform duration-300">
                  <Newspaper size={32} className="opacity-40" />
                </div>
                <div className="p-6 flex flex-col flex-grow space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#0052CC] bg-[#E6F0FF] px-2.5 py-1 rounded-md">{item.tag}</span>
                    <span className="text-slate-400">{item.date}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-[#0052CC] transition-colors leading-snug line-clamp-2 text-base">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed flex-grow">
                    {item.desc}
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center text-xs font-bold text-[#0052CC] gap-1 group-hover:gap-2 transition-all">
                    Baca Selengkapnya <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer id="kontak" className="bg-[#003B99] text-white pt-16 pb-8 relative overflow-hidden">
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
            <div className="md:col-span-5 space-y-6">
              <div className="space-y-1">
                <h3 className="font-black text-2xl tracking-tight">SDN 2 CIPARI</h3>
                <p className="text-xs text-blue-200 tracking-wider font-semibold uppercase">KOTA TASIKMALAYA</p>
              </div>
              <div className="space-y-3.5 text-sm text-blue-100/90">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-amber-400" />
                  <p>Benerco Road, Kota Tasikmalaya, Jawa Barat, Indonesia</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="shrink-0 text-amber-400" />
                  <p>+08123 456-1234</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="shrink-0 text-amber-400" />
                  <p>oas.tasik@sdn2cipari.sch.id</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex items-center justify-center md:justify-start">
              <div className="bg-white/10 p-6 rounded-3xl border border-white/10 backdrop-blur-md text-center w-full max-w-[240px]">
                <div className="w-16 h-16 bg-white rounded-2xl mx-auto flex items-center justify-center text-[#0052CC] font-bold shadow-md shadow-black/10">
                  🏫
                </div>
                <p className="text-xs font-bold mt-4 tracking-widest text-amber-400 uppercase">Akreditasi A</p>
                <p className="text-[10px] text-blue-200 mt-1">Disertifikasi BAN-PDM</p>
              </div>
            </div>

            <div className="md:col-span-3 space-y-4">
              <h4 className="font-bold text-base text-amber-400 tracking-wide uppercase">Sitemap</h4>
              <ul className="space-y-2 text-sm text-blue-100/80 font-medium">
                <li><a href="#profil" className="hover:text-white hover:underline transition-all">Profil Lembaga</a></li>
                <li><a href="#akademik" className="hover:text-white hover:underline transition-all">Kurikulum Academic</a></li>
                <li><a href="#berita" className="hover:text-white hover:underline transition-all">Portal Berita</a></li>
                <li><a href="#kontak" className="hover:text-white hover:underline transition-all">Hubungi Sekretariat</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-xs text-blue-200/60 font-medium gap-4">
            <p>&copy; SDN 2 Cipari Kota Tasikmalaya. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">Sitemap</a>
              <span>&bull;</span>
              <a href="#" className="hover:text-white">Kebijakan Privasi</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}