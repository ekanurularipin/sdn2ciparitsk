'use client'

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import {
  Link,
  useSearchParams,
} from 'react-router-dom'

import BarcodeScannerComponent from 'react-qr-barcode-scanner'

import { supabase } from '../../../lib/supabase'

import type { Result } from '@zxing/library'

import {
  Search,
  UserCheck,
  BookOpen,
  Printer,
  Camera,
  ArrowLeft,
} from 'lucide-react'

type Student = {
  id: string
  nomor_peserta: string
  nisn: string
  nama: string
  kelas: string
  ruangan: string
  foto: string
}

type Attendance = {
  nisn: string
  nama: string
  kelas: string
  waktu: string
  status: string
}

type AttendanceDb = {
  nisn: string
  nama: string
  kelas: string
  jam_absen: string
  status: string
}

export default function AbsenPage() {
  const [searchParams] =
    useSearchParams()

  const selectedRuangan =
    searchParams.get('ruangan') ||
    'Ruang 1'

  const [students, setStudents] =
    useState<Student[]>([])

  const [attendance, setAttendance] =
    useState<Attendance[]>([])

  const [scanNisn, setScanNisn] =
    useState<string>('')

  const [mapel, setMapel] =
    useState<string>('Matematika')

  const [kelas, setKelas] =
    useState<string>('6')

  const [tanggal, setTanggal] =
    useState<string>(
      new Date().toISOString().split('T')[0]
    )

  const [pengawas] =
  useState<string>(
    selectedRuangan === 'Ruang 1'
      ? 'Pengawas Ruang 1'
      : 'Pengawas Ruang 2'
  )

const [kepalaSekolah] =
  useState<string>('Kepala Sekolah')


 

  const [openCamera, setOpenCamera] =
    useState<boolean>(false)

  

  const [loading, setLoading] =
    useState<boolean>(false)

  const inputRef =
    useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // ================= FETCH SISWA =================
  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error } =
        await supabase
          .from('siswa')
          .select('*')

      if (error) {
        console.error(error)
        return
      }

      setStudents(data || [])
    }

    fetchStudents()
  }, [])

  // ================= FETCH ABSENSI =================
  useEffect(() => {
    const fetchAttendance = async () => {
      const { data, error } =
        await supabase
          .from('absensi')
          .select('*')
          .order('created_at', {
            ascending: false,
          })

      if (error) {
        console.error(error)
        return
      }

      const formatted: Attendance[] =
        (data as AttendanceDb[]).map(
          (item) => ({
            nisn: item.nisn,
            nama: item.nama,
            kelas: item.kelas,
            waktu: item.jam_absen,
            status: item.status,
          })
        )

      setAttendance(formatted)
    }

    fetchAttendance()
  }, [])

  // ================= TOTAL HADIR =================
  const totalHadir = useMemo(() => {
    return attendance.length
  }, [attendance])

  // ================= HANDLE SCAN =================
  const handleScan = async (
    rawValue: string
  ) => {
    if (!rawValue || loading) return

    setLoading(true)

    try {
      const cleanNisn = String(rawValue)
        .replace('NISN:', '')
        .split('/')
        .pop()
        ?.trim()

      if (!cleanNisn) {
        setLoading(false)
        return
      }

      const student = students.find(
        (s) =>
          String(s.nisn).trim() ===
          cleanNisn
      )

      if (!student) {
        alert('NISN tidak ditemukan')

        setLoading(false)
        return
      }

     

      const { data: existing } =
        await supabase
          .from('absensi')
          .select('*')
          .eq('nisn', student.nisn)
          .maybeSingle()

      if (existing) {
        alert(
          'Siswa sudah absen'
        )

        setLoading(false)
        return
      }

      const waktu =
        new Date().toLocaleTimeString(
          'id-ID'
        )

      // ================= INSERT DATABASE =================
      const { error } = await supabase
        .from('absensi')
        .insert([
          {
            nisn: student.nisn,
            nama: student.nama,
            kelas: student.kelas,
            jam_absen: waktu,
            status: 'Hadir',
          },
        ])

      if (error) {
        console.error(error)

        alert(
          `Gagal simpan absensi: ${error.message}`
        )

        setLoading(false)
        return
      }

      // ================= UPDATE UI =================
      const newAttendance: Attendance =
        {
          nisn: student.nisn,
          nama: student.nama,
          kelas: student.kelas,
          waktu,
          status: 'Hadir',
        }

      setAttendance((prev) => [
        newAttendance,
        ...prev,
      ])

      setScanNisn('')

      // ================= SUARA SUCCESS =================
      const audio = new Audio(
        '/success.mp3'
      )

      audio.play()
    } catch (err) {
      console.error(err)

      alert('Terjadi kesalahan')
    }

    setLoading(false)
  }

  return (
    <div className='p-6 space-y-6 print:p-0'>
      {/* HEADER */}
      <div className='flex justify-between items-center flex-wrap gap-4 print:hidden'>
        <div>
          <div className='flex items-center gap-3'>
            <Link
              to='/'
              className='border rounded-lg p-2 hover:bg-gray-100'
            >
              <ArrowLeft size={18} />
            </Link>

            <div>
              <h1 className='text-3xl font-bold'>
                Absensi QR Siswa
              </h1>

              <p className='text-gray-500'>
                {selectedRuangan}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className='bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2'
        >
          <Printer size={18} />
          Cetak
        </button>
      </div>

      {/* SETTING */}
      <div className='border rounded-xl p-5 space-y-4 print:hidden'>
        <div className='flex items-center gap-2 font-semibold'>
          <BookOpen size={18} />
          Setting Absensi
        </div>

        <div className='grid md:grid-cols-5 gap-4'>
          <div>
            <label className='text-sm'>
              Mata Pelajaran
            </label>

            <input
              value={mapel}
              onChange={(e) =>
                setMapel(e.target.value)
              }
              className='w-full border rounded-lg p-2'
            />
          </div>

          <div>
            <label className='text-sm'>
              Kelas
            </label>

            <input
              value={kelas}
              onChange={(e) =>
                setKelas(e.target.value)
              }
              className='w-full border rounded-lg p-2'
            />
          </div>

          <div>
            <label className='text-sm'>
              Tanggal
            </label>

            <input
              type='date'
              value={tanggal}
              onChange={(e) =>
                setTanggal(e.target.value)
              }
              className='w-full border rounded-lg p-2'
            />
          </div>

          <div>
            <label className='text-sm'>
              Total Hadir
            </label>

            <div className='border rounded-lg p-2 h-11 flex items-center'>
              {totalHadir} siswa
            </div>
          </div>
        </div>
      </div>

      {/* SCANNER */}
      <div className='border rounded-xl p-5 space-y-4 print:hidden'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2 font-semibold'>
            <Search size={18} />
            Scan QR / Barcode
          </div>

          <button
            onClick={() =>
              setOpenCamera(!openCamera)
            }
            className='bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2'
          >
            <Camera size={18} />

            {openCamera
              ? 'Tutup Kamera'
              : 'Buka Kamera'}
          </button>
        </div>

        {openCamera && (
          <div className='overflow-hidden rounded-xl border'>
            <BarcodeScannerComponent
              width={'100%'}
              height={300}
              onUpdate={(
                _err: unknown,
                result?: Result
              ) => {
                if (result) {
                  const text =
                    result.getText()

                  const nisn =
                    text
                      .split('/')
                      .pop() || text

                  setScanNisn(nisn)

                  handleScan(nisn)
                }
              }}
            />
          </div>
        )}

        <div className='flex gap-3'>
          <input
            ref={inputRef}
            value={scanNisn}
            onChange={(e) =>
              setScanNisn(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleScan(scanNisn)
              }
            }}
            placeholder='Input NISN manual'
            className='flex-1 border rounded-lg p-3'
          />

          <button
            onClick={() =>
              handleScan(scanNisn)
            }
            className='bg-blue-600 text-white px-4 rounded-lg flex items-center gap-2'
          >
            <UserCheck size={18} />

            {loading
              ? 'Loading...'
              : 'Absen'}
          </button>
        </div>
      </div>

      {/* AREA PRINT */}
      <div id='print-area'>
        <div className='text-center mb-6 hidden print:block'>
          <h2 className='text-2xl font-bold'>
            DAFTAR HADIR PESERTA UJIAN
          </h2>

          <p>
            Mata Pelajaran: {mapel}
          </p>

          <p>
            Kelas: {kelas}
          </p>

          <p>
            Tanggal: {tanggal}
          </p>

          <p>
            Ruangan: {selectedRuangan}
          </p>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='border p-2'>
                  No
                </th>

                <th className='border p-2'>
                  NISN
                </th>

                <th className='border p-2'>
                  Nama
                </th>

                <th className='border p-2'>
                  Kelas
                </th>

                <th className='border p-2'>
                  Jam
                </th>

                <th className='border p-2'>
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {attendance.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className='border p-4 text-center text-gray-500'
                  >
                    Belum ada absensi
                  </td>
                </tr>
              )}

              {attendance.map(
                (item, index) => (
                  <tr key={index}>
                    <td className='border p-2'>
                      {index + 1}
                    </td>

                    <td className='border p-2'>
                      {item.nisn}
                    </td>

                    <td className='border p-2'>
                      {item.nama}
                    </td>

                    <td className='border p-2'>
                      {item.kelas}
                    </td>

                    <td className='border p-2'>
                      {item.waktu}
                    </td>

                    <td className='border p-2'>
                      {item.status}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* TTD */}
        <div className='grid grid-cols-2 gap-10 pt-16'>
          <div className='text-center'>
            <p>Pengawas</p>

            <div className='h-24'></div>

            <hr />

            <p className='font-semibold mt-2'>
              {pengawas}
            </p>
          </div>

          <div className='text-center'>
            <p>Kepala Sekolah</p>

            <div className='h-24'></div>

            <hr />

            <p className='font-semibold mt-2'>
              {kepalaSekolah}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}