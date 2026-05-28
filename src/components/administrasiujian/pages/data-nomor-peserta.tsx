import { useEffect,useRef, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import LogoSekolah from '../../../assets/images/logo-sekolah.png'


interface nomor_meja {
  id?: string
  nomor_peserta: string
  nama: string
  nisn: string
  tempat_lahir: string
  tanggal_lahir: string
  kelas: string
}

export default function DataNomorPesertaPage() {
  const [dataSiswa, setDataSiswa] = useState<nomor_meja[]>([])
  const [loading, setLoading] = useState(true)

  const logoTutWuri =
    'https://upload.wikimedia.org/wikipedia/commons/9/9c/Logo_of_Ministry_of_Education_and_Culture_of_Republic_of_Indonesia.svg'

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const { data, error } = await supabase
          .from('nomor_meja')
          .select('*')
          .order('kelas', { ascending: true })
          .order('nomor_peserta', { ascending: true })

        if (error) throw error

        setDataSiswa(data || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    void fetchData()
  }, [])

  const groupedData = dataSiswa.reduce((acc, item) => {
    if (!acc[item.kelas]) {
      acc[item.kelas] = []
    }

    acc[item.kelas].push(item)

    return acc
  }, {} as Record<string, nomor_meja[]>)

const printRef = useRef<HTMLDivElement>(null)

const handlePrint = () => {
  window.print()
}
  

  if (loading) {
    return (
      <div
        style={{
          padding: '40px',
          textAlign: 'center',
          fontSize: '18px',
          fontWeight: '600',
        }}
      >
        Memuat data...
      </div>
    )
  }

  return (
    <div id="print-area" className='page-wrapper'>
      <style>
        {`
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
            width: 80px;
            height: 80px;
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
        `}
      </style>

      {/* BUTTON PRINT */}
      <div
        className='no-print'
        style={{
          textAlign: 'center',
          marginTop: '20px',
        }}
      >
        <button className='btn-print' onClick={handlePrint}>
          CETAK DATA
        </button>
      </div>

      {/* SEMUA KELAS */}
      <div id="print-area" ref={printRef}>
        {Object.entries(groupedData).map(([kelas, siswa]) => (
                <div key={kelas} className='paper'>
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
                <div className='title'>
                    <h2>DATA NOMOR PESERTA ASAT</h2>
                    <h3>KELAS ({kelas})</h3>
                </div>

                {/* TABLE */}
                <table>
                    <thead>
                    <tr>
                        <th style={{ width: '40px' }}>No</th>

                        <th style={{ width: '90px' }}>
                        No Peserta
                        </th>

                        <th>Nama Peserta</th>

                        <th style={{ width: '130px' }}>
                        NISN
                        </th>

                        <th style={{ width: '120px' }}>
                        Tempat Lahir
                        </th>

                        <th style={{ width: '120px' }}>
                        Tanggal Lahir
                        </th>

                        <th style={{ width: '70px' }}>
                        Kelas
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {siswa.map((item, index) => (
                        <tr key={item.id}>
                        <td className='center'>
                            {index + 1}
                        </td>

                        <td className='center'>
                            {String(item.nomor_peserta).padStart(4, '0')}
                        </td>

                        <td className='nama'>
                            {item.nama}
                        </td>

                        <td className='center'>
                            {item.nisn}
                        </td>

                        <td className='center'>
                            {item.tempat_lahir}
                        </td>

                        <td className='center'>
                            {item.tanggal_lahir}
                        </td>

                        <td className='center'>
                            {item.kelas}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            ))}
      </div>
     
    </div>
  )
}