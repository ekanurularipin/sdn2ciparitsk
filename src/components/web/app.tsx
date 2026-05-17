'use client';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  ChevronDown,
  Menu,
  X,
  UserCheck,
} from 'lucide-react';

import { supabase } from '../../lib/supabase';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  category: string;
  created_at: string;
}

interface WebProfile {
  hero_title: string;
  hero_subtitle: string;
  total_siswa: string;
  lokasi: string;
  visi: string;
  misi_1: string;
  misi_2: string;
  hero_image_url: string;
}

export default function Home() {
  // ================= STATE =================
  const [, setNewsList] = useState<
    NewsItem[]
  >([]);

  const [, setLoadingNews] =
    useState(true);

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const [openAbsenMenu, setOpenAbsenMenu] =
    useState(false);

  const [, setProfile] =
    useState<WebProfile>({
      hero_title:
        'SELAMAT DATANG DI SDN 2 CIPARI',
      hero_subtitle:
        'Unggul dalam prestasi, berkarakter Bhineka Tunggal Ika.',
      total_siswa: '0',
      lokasi: 'Tasikmalaya',
      visi: '',
      misi_1: '',
      misi_2: '',
      hero_image_url: '',
    });

  // ================= FETCH PROFILE =================
  const fetchProfile = async () => {
    try {
      const { data, error } =
        await supabase
          .from('web_profile')
          .select('*');

      if (error) throw error;

      if (data) {
        const profileData = data.reduce(
          (acc, item) => {
            acc[item.key] = item.value;

            return acc;
          },
          {} as Record<string, string>
        );

        setProfile((prev) => ({
          ...prev,
          ...profileData,
        }));
      }
    } catch (err) {
      console.error(
        'Gagal mengambil profile:',
        err
      );
    }
  };

  // ================= FETCH NEWS =================
  const fetchNews = async () => {
    try {
      const { data, error } =
        await supabase
          .from('news')
          .select('*')
          .order('created_at', {
            ascending: false,
          })
          .limit(3);

      if (error) throw error;

      setNewsList(
        (data as NewsItem[]) || []
      );
    } catch (err) {
      console.error(
        'Gagal mengambil berita:',
        err
      );
    } finally {
      setLoadingNews(false);
    }
  };

  // ================= USE EFFECT =================
  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        fetchProfile(),
        fetchNews(),
      ]);
    };

    loadData();
  }, []);

  return (
    <div className="bg-[#F7F7F7] min-h-screen w-full text-slate-800 antialiased">
      {/* ================= NAVBAR ================= */}
      <nav className="w-full py-5 bg-transparent relative z-50">
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          {/* ================= LOGO ================= */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl overflow-hidden bg-white shadow-md border flex items-center justify-center p-1">
              <img
                src="/logo.png"
                alt="logo"
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
          <div className="hidden lg:flex items-center gap-8">
            <a
              href="#"
              className="bg-[#E9EEF9] text-[#1D4ED8] px-5 py-2 rounded-full font-semibold"
            >
              Beranda
            </a>

            <a
              href="#profil"
              className="font-semibold text-slate-800 hover:text-blue-700 transition"
            >
              Profil
            </a>

            <a
              href="#akademik"
              className="font-semibold text-slate-800 hover:text-blue-700 transition"
            >
              Akademik
            </a>

            <a
              href="#berita"
              className="font-semibold text-slate-800 hover:text-blue-700 transition"
            >
              Berita
            </a>

            <a
              href="#kontak"
              className="font-semibold text-slate-800 hover:text-blue-700 transition"
            >
              Kontak
            </a>

            {/* ================= DROPDOWN ABSENSI ================= */}
            <div className="relative">
              <button
                onClick={() =>
                  setOpenAbsenMenu(
                    !openAbsenMenu
                  )
                }
                className="font-bold text-[#0057D9] hover:text-blue-800 flex items-center gap-2 transition bg-blue-50 border border-blue-100 px-4 py-2 rounded-full"
              >
                <UserCheck className="w-4 h-4" />

                Absen Siswa

                <ChevronDown
                  className={`w-4 h-4 transition ${
                    openAbsenMenu
                      ? 'rotate-180'
                      : ''
                  }`}
                />
              </button>

              {/* ================= DROPDOWN MENU ================= */}
              {openAbsenMenu && (
                <div className="absolute top-full right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
                  <Link
                    to="/absen?ruangan=Ruang 1"
                    className="flex items-center justify-between px-5 py-4 hover:bg-blue-50 transition font-semibold text-slate-700"
                  >
                    Ruang 1

                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      Ujian
                    </span>
                  </Link>

                  <Link
                    to="/absen?ruangan=Ruang 2"
                    className="flex items-center justify-between px-5 py-4 hover:bg-green-50 transition font-semibold text-slate-700 border-t"
                  >
                    Ruang 2

                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Ujian
                    </span>
                  </Link>

                  <Link
                    to="/absen?ruangan=Ruang 3"
                    className="flex items-center justify-between px-5 py-4 hover:bg-yellow-50 transition font-semibold text-slate-700 border-t"
                  >
                    Ruang 3

                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                      Ujian
                    </span>
                  </Link>
                </div>
              )}
            </div>

            {/* ================= LOGIN ================= */}
            <Link
              to="/login"
              className="bg-[#0F52BA] hover:bg-[#0C3F90] transition text-white px-6 py-3 rounded-full font-bold shadow-lg"
            >
              Login Admin
            </Link>
          </div>

          {/* ================= MOBILE BUTTON ================= */}
          <button
            onClick={() =>
              setIsMenuOpen(!isMenuOpen)
            }
            className="lg:hidden p-2 rounded-xl bg-white shadow-md text-slate-800"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full px-5 mt-2 z-50">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 space-y-4">
              <a
                href="#"
                onClick={() =>
                  setIsMenuOpen(false)
                }
                className="block font-semibold py-2 text-slate-800 hover:text-blue-600 border-b border-slate-50"
              >
                Beranda
              </a>

              <a
                href="#profil"
                onClick={() =>
                  setIsMenuOpen(false)
                }
                className="block font-semibold py-2 text-slate-800 hover:text-blue-600 border-b border-slate-50"
              >
                Profil
              </a>

              <a
                href="#akademik"
                onClick={() =>
                  setIsMenuOpen(false)
                }
                className="block font-semibold py-2 text-slate-800 hover:text-blue-600 border-b border-slate-50"
              >
                Akademik
              </a>

              <a
                href="#berita"
                onClick={() =>
                  setIsMenuOpen(false)
                }
                className="block font-semibold py-2 text-slate-800 hover:text-blue-600 border-b border-slate-50"
              >
                Berita
              </a>

              <a
                href="#kontak"
                onClick={() =>
                  setIsMenuOpen(false)
                }
                className="block font-semibold py-2 text-slate-800 hover:text-blue-600 border-b border-slate-50"
              >
                Kontak
              </a>

              {/* ================= MOBILE ABSENSI ================= */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#0057D9]">
                  <UserCheck className="w-4 h-4" />

                  Pilih Ruangan Absensi
                </div>

                <Link
                  to="/absen?ruangan=Ruang 1"
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                  className="block text-center bg-blue-50 hover:bg-blue-100 border border-blue-200 py-3 rounded-xl font-semibold text-slate-700 transition"
                >
                  Ruang 1
                </Link>

                <Link
                  to="/absen?ruangan=Ruang 2"
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                  className="block text-center bg-green-50 hover:bg-green-100 border border-green-200 py-3 rounded-xl font-semibold text-slate-700 transition"
                >
                  Ruang 2
                </Link>

                <Link
                  to="/absen?ruangan=Ruang 3"
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                  className="block text-center bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 py-3 rounded-xl font-semibold text-slate-700 transition"
                >
                  Ruang 3
                </Link>
              </div>

              {/* ================= LOGIN ================= */}
              <Link
                to="/login"
                onClick={() =>
                  setIsMenuOpen(false)
                }
                className="block bg-[#0F52BA] text-center text-white py-3 rounded-2xl font-bold shadow-md shadow-blue-200"
              >
                Login Admin
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}