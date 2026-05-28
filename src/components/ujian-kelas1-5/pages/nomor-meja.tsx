
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import LogoSekolah from '../../../assets/images/logo-sekolah.png'

export interface nomor_meja {
  id?: string
  nomor_peserta: string
  nama: string
  nisn: string
  tempat_lahir: string
  tanggal_lahir: string
  kelas: string
}

export default function NomorMejaPage() {
  const [listSiswa, setListSiswa] = useState<nomor_meja[]>([])
  const [loading, setLoading] = useState(true)
const [filterKelas, setFilterKelas] = useState('Semua')
  const logoTutWuri =
    'https://upload.wikimedia.org/wikipedia/commons/9/9c/Logo_of_Ministry_of_Education_and_Culture_of_Republic_of_Indonesia.svg'

  const logoSrc = LogoSekolah

  const fetchDataSiswa = async () => {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from('nomor_meja')
        .select('*')
        .order('kelas', { ascending: true })
        .order('nomor_peserta', { ascending: true })

      if (error) throw error

      if (data) {
        setListSiswa(data)
      }
    } catch (err) {
      console.error('Gagal mengambil data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchDataSiswa()
    }

    void fetchData()
  }, [])

  const handlePrint = () => {
    window.print()
  }

  const chunkArray = (
    arr: nomor_meja[],
    size: number
  ): nomor_meja[][] => {
    if (!arr || arr.length === 0) return []

    return Array.from(
      { length: Math.ceil(arr.length / size) },
      (_, i) => arr.slice(i * size, i * size + size)
    )
  }

  const kelasList = [
  'Semua',
  ...new Set(listSiswa.map((item) => item.kelas))
]

const filteredSiswa =
  filterKelas === 'Semua'
    ? listSiswa
    : listSiswa.filter(
        (item) => item.kelas === filterKelas
      )

const halamanSiswa = chunkArray(filteredSiswa, 8)

  if (loading) {
    return (
      <div className='p-10 text-center text-white font-sans'>
        Memuat data siswa...
      </div>
    )
  }

  return (
    <div
      id='print-nomor-meja'
      className='min-h-screen bg-gray-600 py-10 Isolate-kartu-global'
    >
      <style>
        {`
        .Isolate-kartu-global {
          font-family: Arial, Helvetica, sans-serif !important;
          -webkit-font-smoothing: antialiased;
        }

        @page {
          size: 210mm 330mm;
          margin: 5mm;
        }

        @media print {

          body * {
            visibility: hidden;
          }

          #print-nomor-meja,
          #print-nomor-meja * {
            visibility: visible;
          }

          #print-nomor-meja {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
          }

          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .no-print {
            display: none !important;
          }

          .page-break {
            display: block;
            page-break-after: always;
          }

          .paper-preview {
            margin: 0 auto !important;
            box-shadow: none !important;
            width: 210mm !important;
            height: 330mm !important;
            background: white !important;
          }
        }

        .paper-preview {
          background: white;
          width: 210mm;
          height: 330mm;
          padding: 5mm;
          margin: 0 auto 20px auto;
          box-shadow: 0 0 15px rgba(0,0,0,0.4);
          box-sizing: border-box;
        }

        .grid-kartu {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(4, 1fr);
          gap: 12px;
          height: 100%;
        }

        .kartu {
          border: 1.5px solid #000000 !important;
          height: 76mm;
          max-height: 80mm;
          position: relative;
          overflow: hidden;
          background: #ffffff !important;
          box-sizing: border-box !important;
        }

        .kartu-content {
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
          z-index: 10;
        }

        .kop-container {
          display: flex;
          align-items: center;
          border-bottom: 1.5px solid #000000;
          padding: 3px 6px;
          height: 65px;
          box-sizing: border-box;
          line-height: 0.6 !important;
        }

        .img-kop {
          width: 38px !important;
          height: 38px !important;
          object-fit: contain;
        }

        .img-kop-sekolah {
          width: 45px !important;
          height: 45px !important;
          object-fit: contain;
        }

        .text-kop-tengah {
          flex: 1;
          text-align: center;
        }

        .main-body {
          flex: 1;
          position: relative;
          padding: 9px;
          box-sizing: border-box;
        }

        .table-siswa {
          width: 100%;
          border-collapse: collapse !important;
        }

        .table-siswa td {
          font-size: 12px !important;
          line-height: 1.7 !important;
          padding: 2px !important;
          vertical-align: top !important;
          color: #000000 !important;
        }

        .watermark-bg {
          position: absolute;
          top: 55%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 150px !important;
          height: 150px !important;
          object-fit: contain;
          opacity: 0.05;
          z-index: 0;
          pointer-events: none;
        }

        .nomor-meja-box {
          width: 100%;
          text-align: center;
          margin-bottom: 10px;
          margin-top: 2px;
        }

        .nomor-meja-number {
          font-size: 28px;
          font-weight: 900;
          margin: 0;
          line-height: 1;
          color: #000;
          letter-spacing: 2px;
        }
        `}
      </style>

      <div className='no-print mx-auto mb-4 flex max-w-[210mm] items-center justify-between rounded-lg bg-white p-4 shadow-lg text-black'>
        <div>
          <h2 className='text-lg font-bold'>Cetak Kartu</h2>

          <p className='text-xs text-blue-500'>
            Total: {filteredSiswa.length} Siswa
          </p>
          
        </div>
        <div className='mt-3 flex flex-wrap gap-2'>
  {kelasList.map((kelas) => (
    <button
      key={kelas}
      onClick={() => setFilterKelas(kelas)}
      className={`rounded px-3 py-1 text-xs font-bold transition-all ${
        filterKelas === kelas
          ? 'bg-blue-900 text-white'
          : 'bg-gray-200 text-black hover:bg-gray-300'
      }`}
    >
      {kelas === 'Semua'
        ? 'Semua Kelas'
        : `Kelas ${kelas}`}
    </button>
  ))}
</div>

        <button
          onClick={handlePrint}
          disabled={listSiswa.length === 0}
          className={`rounded px-6 py-2 font-bold text-white transition-all ${
            listSiswa.length === 0
              ? 'bg-blue-700 cursor-not-allowed'
              : 'bg-blue-900 hover:bg-blue-700'
          }`}
        >
          CETAK SEKARANG
        </button>
      </div>

      {halamanSiswa.length === 0 ? (
        <div className='no-print mx-auto max-w-[210mm] rounded-lg border border-yellow-200 bg-yellow-50 p-8 text-center text-black'>
          <p className='text-base font-semibold text-yellow-700'>
            Tidak ada data siswa di database!
          </p>
        </div>
      ) : (
        halamanSiswa.map((group, pageIndex) => (
          <div
            key={pageIndex}
            className={`paper-preview ${
              pageIndex < halamanSiswa.length - 1
                ? 'page-break'
                : ''
            }`}
          >
            <div className='grid-kartu'>
              {group.map((item) => (
                <div
                  key={item.id || item.nisn}
                  className='kartu text-black'
                >
                  <img
                    src={logoSrc}
                    className='watermark-bg'
                    alt='Watermark'
                  />

                  <div className='kartu-content'>
                    <div className='kop-container'>
                      <img
                        src={logoTutWuri}
                        className='img-kop'
                        alt='Logo Tut Wuri'
                      />

                      <div className='text-kop-tengah'>
                        <h3
                          className='font-bold uppercase tracking-tight text-black'
                          style={{
                            margin: 0,
                            fontSize: '14px',
                            lineHeight: '1',
                          }}
                        >
                          Nomor Meja
                        </h3>

                        <h3
                          className='font-extrabold uppercase text-black'
                          style={{
                            margin: 4,
                            fontSize: '14px',
                            lineHeight: '1',
                          }}
                        >
                          Asesmen Sumatif Akhir Tahun SD/MI
                        </h3>

                        <p
                          className='text-[15px] font-semibold text-black'
                          style={{ margin: 0 }}
                        >
                          Tahun Pelajaran 2025/2026
                        </p>
                      </div>

                      <img
                        src={logoSrc}
                        className='img-kop-sekolah'
                        alt='Logo sekolah'
                      />
                    </div>

                    <div className='main-body'>
                      <table className='table-siswa'>
                        <tbody>
                          <tr>
                            <td colSpan={3}>
                              <div className='nomor-meja-box'>
                                <h1 className='nomor-meja-number'>
                                  {item.nomor_peserta || '-'}
                                </h1>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td className='font-bold'>
                              Nama Peserta
                            </td>

                            <td>:</td>

                            <td className='font-bold'>
                              {item.nama || '-'}
                            </td>
                          </tr>

                          <tr>
                            <td>NISN</td>

                            <td>:</td>

                            <td>{item.nisn || '-'}</td>
                          </tr>

                          <tr>
                            <td>Lahir</td>

                            <td>:</td>

                            <td>
                              {item.tempat_lahir || '-'},
                              {' '}
                              {item.tanggal_lahir || '-'}
                            </td>
                          </tr>

                          <tr>
                            <td>Kelas</td>

                            <td>:</td>

                            <td>
                              Kelas {item.kelas || '-'}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

