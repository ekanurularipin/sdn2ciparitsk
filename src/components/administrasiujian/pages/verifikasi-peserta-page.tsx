import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../../../lib/supabase'

interface Siswa {
  id?: string
  nisn: string
  nomor_peserta: string
  nama: string
  tempat_lahir: string
  tanggal_lahir: string
  kelas: string
  ruangan: string
  foto?: string
  foto_path?: string
}

export default function VerifikasiPesertaPage() {
  const { nisn } = useParams()

  const [siswa, setSiswa] = useState<Siswa | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSiswa = async () => {
      if (!nisn) return

      const { data, error } = await supabase
        .from('siswa')
        .select('*')
        .eq('nisn', nisn)
        .single()

      if (!error && data) {
        setSiswa(data)
      }

      setLoading(false)
    }

    void fetchSiswa()
  }, [nisn])

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='text-xl font-semibold'>
          Memuat data peserta...
        </div>
      </div>
    )
  }

  if (!siswa) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-red-50'>
        <div className='bg-white p-8 rounded-xl shadow-lg text-center'>
          <h1 className='text-2xl font-bold text-red-600 mb-2'>
            Peserta Tidak Ditemukan
          </h1>

          <p className='text-gray-600'>
            NISN tidak terdaftar.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden'>

        <div className='bg-blue-700 text-white p-6 text-center'>
          <h1 className='text-2xl font-bold'>
            IDENTITAS PESERTA
          </h1>

          <p className='text-sm opacity-90 mt-1'>
            Asesmen Sumatif Akhir Jenjang SD/MI
          </p>
        </div>

        <div className='p-6'>

          <div className='flex justify-center mb-6'>
            <img
              src={
                siswa.foto ||
                'https://via.placeholder.com/150?text=No+Photo'
              }
              alt='Foto Siswa'
              className='w-36 h-44 object-cover border-4 border-gray-200 rounded-lg'
            />
          </div>

          <div className='space-y-3 text-sm'>

            <div className='flex'>
              <div className='w-40 font-semibold'>
                Nama
              </div>

              <div>: {siswa.nama}</div>
            </div>

            <div className='flex'>
              <div className='w-40 font-semibold'>
                NISN
              </div>

              <div>: {siswa.nisn}</div>
            </div>

            <div className='flex'>
              <div className='w-40 font-semibold'>
                Nomor Peserta
              </div>

              <div>: {siswa.nomor_peserta}</div>
            </div>

            <div className='flex'>
              <div className='w-40 font-semibold'>
                Tempat / Tanggal Lahir
              </div>

              <div>
                : {siswa.tempat_lahir}, {siswa.tanggal_lahir}
              </div>
            </div>

            <div className='flex'>
              <div className='w-40 font-semibold'>
                Kelas
              </div>

              <div>: {siswa.kelas}</div>
            </div>

            <div className='flex'>
              <div className='w-40 font-semibold'>
                Ruangan
              </div>

              <div>: {siswa.ruangan}</div>
            </div>

          </div>

          <div className='mt-8 text-center'>
            <div className='inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold'>
              ✔ Peserta Valid
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}