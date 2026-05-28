import { useEffect, useMemo, useState } from 'react'
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

export default function KelasPage() {
  const [listSiswa, setListSiswa] = useState<nomor_meja[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedKelas, setSelectedKelas] = useState<string | null>(null)

  const logoTutWuri =
    'https://upload.wikimedia.org/wikipedia/commons/9/9c/Logo_of_Ministry_of_Education_and_Culture_of_Republic_of_Indonesia.svg'

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        const { data, error } = await supabase
          .from('nomor_meja')
          .select('*')
          .order('kelas', { ascending: true })
          .order('nomor_peserta', { ascending: true })

        if (error) throw error
        setListSiswa(data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // ambil kelas unik
  const kelasList = useMemo(() => {
    return [...new Set(listSiswa.map((i) => i.kelas))].sort()
  }, [listSiswa])

  // data berdasarkan kelas yang dipilih
  const filteredSiswa = useMemo(() => {
    if (!selectedKelas) return []
    return listSiswa.filter((i) => i.kelas === selectedKelas)
  }, [listSiswa, selectedKelas])

  const handlePrint = () => window.print()

  if (loading) {
    return (
      <div className="p-10 text-center text-white">
        Memuat data...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* STYLE PRINT */}
      <style>{`
        
body {
            background: #d1d5db;
            font-family: Arial, Helvetica, sans-serif;
          }
@media print {
  body * {
    visibility: hidden;
  }

  #print-area,
  #print-area * {
    visibility: visible;
  }

  #print-area {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }

  .paper {
    box-shadow: none !important;
    margin: 0 auto !important;
  }
}
        
        .kelas-card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          cursor: pointer;
          transition: 0.2s;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .kelas-card:hover {
          transform: scale(1.02);
        }

        .grid-kelas {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 15px;
        }

        @page {
            size: A4 portrait;
            margin: 10mm;
          }

          .page-wrapper {
            width: 100%;
          }

          .paper {
            width: 210mm;
            min-height: 297mm;
            background: white;
            margin: 20px auto;
            padding: 10mm;
            box-sizing: border-box;
            box-shadow: 0 0 15px rgba(0,0,0,0.2);
            page-break-after: always;
            }

        .kop {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 3px double black;
            padding-bottom: 8px;
            margin-bottom: 16px;
          }


        .logo {
          width: 70px;
          height: 70px;
          object-fit: contain;
        }

        .kop-text {
            flex: 1;
            text-align: center;
            line-height: 1.4;
          }

          .kop-text h1,
          .kop-text h2,
          .kop-text p {
            margin: 0;
          }

          .kop-text h1 {
            font-size: 18px;
            font-weight: 700;
          }

          .kop-text h2 {
            font-size: 34px;
            font-weight: 800;
          }

          .kop-text p {
            font-size: 13px;
            font-weight: 600;
          }

        .title {
            text-align: center;
            margin-bottom: 20px;
          }

          .title h2 {
            margin: 0;
            font-size: 28px;
            font-weight: 800;
          }

          .title h3 {
            margin: 4px 0 0 0;
            font-size: 22px;
            font-weight: 700;
          }

        table {
            width: 100%;
            border-collapse: collapse;
          }

          th,
          td {
            border: 1px solid black;
            padding: 6px;
            font-size: 12px;
          }

          th {
            background: #f3f4f6;
            text-align: center;
            font-weight: 700;
          }

          td {
            vertical-align: middle;
          }

          .center {
            text-align: center;
          }

          .nama {
            font-weight: 600;
            text-transform: uppercase;
          }

          .btn-print {
            background: #2563eb;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 700;
            cursor: pointer;
            margin-bottom: 20px;
            font-size: 14px;
          }

        .back-btn {
          margin-bottom: 15px;
          background: #374151;
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
        }
           @media print {
            html,
            body {
                width: 210mm;
                height: auto;
                margin: 0 !important;
                padding: 0 !important;
                background: white !important;
                overflow: visible !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }

            #root {
                margin: 0;
                padding: 0;
                overflow: visible !important;
            }

            .no-print {
                display: none !important;
            }

            .page-wrapper {
                margin: 0 !important;
                padding: 0 !important;
                width: 100%;
            }

            .paper {
                width: 210mm !important;
                min-height: 297mm !important;
                margin: 0 auto !important;
                padding: 10mm !important;
                box-shadow: none !important;
                overflow: visible !important;
                page-break-after: always;
            }
            }
      `}</style>

      {/* ===================== VIEW 1: LIST KELAS ===================== */}
      {!selectedKelas && (
        <div className="grid-kelas">
          {kelasList.map((kelas) => (
            <div
              key={kelas}
              className="kelas-card"
              onClick={() => setSelectedKelas(kelas)}
            >
              <h2 className="text-center font-bold">
                Kelas {kelas}
              </h2>

              <p className="text-center text-sm text-gray-500">
                Klik untuk lihat data
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ===================== VIEW 2: DETAIL KELAS ===================== */}
      {selectedKelas && (
        <div id="print-area" className="paper">

          <button
            className="no-print back-btn"
            onClick={() => setSelectedKelas(null)}
          >
            ← Kembali
          </button>

          <button
            className="no-print bg-blue-700 text-white px-4 py-2 rounded mb-4"
            onClick={handlePrint}
          >
            CETAK
          </button>

          {/* KOP */}
         <div className='kop'>
                             <img src={logoTutWuri} className='logo' alt='Logo kiri' />
         
                             <div className='kop-text'>
                             <h1>PEMERINTAH KOTA TASIKMALAYA</h1>
         
                             <h2>SDN 2 CIPARI</h2>
         
                             <p>
                                 Jalan : A.H. Nasution Km. 9 - Cikunir Hilir 02/02
                                 Kel. Cipawitra
                             </p>
         
                             <p>Kec. Mangkubumi Kota Tasikmalaya</p>
         
                             <p>Email : sdncipari2tasik@gmail.com</p>
         
                             <p>POS : 46181</p>
                             </div>
         
                             <img src={LogoSekolah} className='logo' alt='Logo kanan' />
                         </div>
          {/* TITLE */}
          <div className="title">
            <h2>DATA NOMOR MEJA PESERTA</h2>
            <h3>KELAS {selectedKelas}</h3>
          </div>

          {/* TABLE */}
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>No Peserta</th>
                <th>Nama</th>
                <th>NISN</th>
                <th>TTL</th>
                <th>Kelas</th>
              </tr>
            </thead>

            <tbody>
              {filteredSiswa.map((item, index) => (
                <tr key={item.id}>
                  <td className="center">{index + 1}</td>
                  <td className="center">{item.nomor_peserta}</td>
                  <td className="nama">{item.nama}</td>
                  <td className="center">{item.nisn}</td>
                  <td>
                    {item.tempat_lahir}, {item.tanggal_lahir}
                  </td>
                  <td className="center">Kelas {item.kelas}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}

    </div>
  )
}