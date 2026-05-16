import { useEffect, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import Barcode from 'react-barcode'
import { supabase } from '../../../lib/supabase'
import LogoSekolah from '../../../assets/images/logo-sekolah.png'
import StempelSekolah from '../../../assets/images/ttd adang stempel.png'

export interface Siswa {
  id?: string
  nisn: string
  nomor_peserta: string
  nama: string
  tempat_lahir: string
  tanggal_lahir: string
  kelas: string
  ruangan: string
  foto: string
  foto_path?: string 
}

export default function KartuPesertaPage() {
  const [listSiswa, setListSiswa] = useState<Siswa[]>([])
  const [loading, setLoading] = useState(true)

  const logoTutWuri =
    'https://upload.wikimedia.org/wikipedia/commons/9/9c/Logo_of_Ministry_of_Education_and_Culture_of_Republic_of_Indonesia.svg'
  const logoSrc = LogoSekolah
  const stempelSrc = StempelSekolah

  const fetchDataSiswa = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('siswa')
        .select('*')
        .order('nomor_peserta', { ascending: true })

      if (error) throw error
      if (data) setListSiswa(data)
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

  const getFotoUrl = (fotoUrl: string, fotoPath?: string) => {
    if (fotoUrl && fotoUrl.startsWith('http')) return fotoUrl
    if (!fotoPath) return 'https://via.placeholder.com/150?text=No+Photo'
    
    const { data } = supabase.storage.from('foto-siswa').getPublicUrl(fotoPath)
    return data.publicUrl
  }

  const handlePrint = () => window.print()

  const chunkArray = (arr: Siswa[], size: number): Siswa[][] => {
    if (!arr || arr.length === 0) return []
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    )
  }

  const halamanSiswa = chunkArray(listSiswa, 8)

  if (loading)
    return (
      <div className='p-10 text-center text-white font-sans'>Memuat data siswa...</div>
    )

  return (
    <div className='min-h-screen bg-gray-600 py-10 Isolate-kartu-global'>
      <style>
        {`
    .Isolate-kartu-global {
      font-family: "Arial", "Helvetica", sans-serif !important;
      -webkit-font-smoothing: antialiased;
    }

    @page {
      size: 210mm 330mm;
      margin: 5mm;
    }

    @media print {
      body {
        background: none !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .no-print { display: none !important; }
      .page-break { display: block; page-break-after: always; }
      .paper-preview {
        margin: 0 !important;
        box-shadow: none !important;
        width: 210mm !important;
        height: 330mm !important;
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

    /* Kunci Mati Tinggi Kartu Pas 76mm */
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

    /* KOP ATAS (Tinggi Terkontrol) */
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
      font-size: 9.5px;
    }

    .text-kop-tengah {
      flex: 10;
      text-align: center;
    }

    .badge-peserta {
      border: 1px solid #000000;
      background: #000000;
      color: #ffffff;
      font-size: 9.5px;
      font-weight: bold;
      padding: 5px 6px;
      border-radius: 1px;
    }

    /* BODY UTAMA (Sisa Ruang Diisi Sempurna) */
    .main-body {
      flex: 1;
      position: relative;
      padding: 6px 6px 4px 6px;
      box-sizing: border-box;
    }

    /* QR CODE (Posisinya digeser sedikit ke kiri agar menjauhi border kanan) */
    .qr-wrapper {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 50;

  width: 72px;
  height: 72px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #fff;
  border: 1.5px solid #000;
  padding: 3px;

  box-sizing: border-box;
}

    /* TABEL DATA SISWA (Padding diperketat) */
    .table-siswa {
      width: 100%;
      border-collapse: collapse !important;
    }

    .table-siswa td {
      font-size: 8.5px !important;
      line-height: 1.60 !important;
      padding: 1px 0 !important;
      vertical-align: top !important;
      color: #000000 !important;
    }

    /* AREA BAWAH (FOTO & TTD SEJAJAR) */
    .bottom-row {
      position: absolute;
      bottom: 1px;
      top: 6px;
      left: 6px;
      right: 6px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    /* FOTO & BARCODE */
    .foto-barcode-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100px;
    }

    .foto-siswa {
      height: 85px !important;
      width: 70px !important;
      border: 1px solid #000000;
      object-fit: cover;
      background: #f3f4f6;
    }

    .barcode-container {
      margin-top: 1px;
      margin-left: -7px;
      transform: scale(0.68);
      transform-origin: left center;
      height: 14px;
      overflow: hidden;
    }

    /* TTD & STEMPEL KEPALA SEKOLAH */
    .ttd-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      width: 160px;
    }

    .text-date-title {
      font-size: 9.5px !important;
      line-height: 1.5 !important;
      margin: 0 !important;
      color: #000000;
    }

    .stempel-box {
      height: 32px;
      width: 110%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .img-stempel {
      position: absolute;
      left: px;
      top: -20px;
      height: 70px !important;
      width: auto !important;
      object-fit: contain;
      mix-blend-multiply: true;
      opacity: 0.95;
      z-index: 10;
      pointer-events: none;
    }

    .text-kepsek-name {
      font-size: 9px !important;
      font-weight: bold !important;
      text-decoration: underline !important;
      line-height: 1 !important;
      margin: 0 !important;
      position: relative;
      z-index: 20;
    }

    .text-kepsek-nip {
      font-size: 9px !important;
      line-height: 1 !important;
      margin: 1px 0 0 0 !important;
      position: relative;
      z-index: 20;
    }

    /* WATERMARK BACKGROUND */
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
  `}
      </style>

      {/* NAVIGASI ATAS */}
      <div className='no-print mx-auto mb-4 flex max-w-[210mm] items-center justify-between rounded-lg bg-white p-4 shadow-lg text-black'>
        <div>
          <h2 className='text-lg font-bold'>Cetak Kartu</h2>
          <p className='text-xs text-blue-500'>Total: {listSiswa.length} Siswa</p>
        </div>
        <button
          onClick={handlePrint}
          disabled={listSiswa.length === 0}
          className={`rounded px-6 py-2 font-bold text-white transition-all ${
            listSiswa.length === 0 ? 'bg-blue-700 cursor-not-allowed' : 'bg-blue-1000 hover:bg-blue-700'
          }`}
        >
          CETAK SEKARANG
        </button>
      </div>

      {/* VIEWPORT PEMBUNGKUS KARTU */}
      {halamanSiswa.length === 0 ? (
        <div className='no-print mx-auto max-w-[210mm] rounded-lg bg-yellow-50 border border-yellow-200 p-8 text-center text-black'>
          <p className='text-base font-semibold text-yellow-700'>⚠️ Tidak ada data siswa di database!</p>
        </div>
      ) : (
        halamanSiswa.map((group, pageIndex) => (
          <div key={pageIndex} className={`paper-preview ${pageIndex < halamanSiswa.length - 1 ? 'page-break' : ''}`}>
            <div className='grid-kartu'>
              {group.map((item) => (
                <div key={item.id || item.nisn} className='kartu text-black'>
                  {/* WATERMARK */}
                  <img src={logoSrc} className='watermark-bg' alt='Watermark' />

                  <div className='kartu-content'>
                    {/* KOP KARTU */}
                    <div className='kop-container'>
                      <img src={logoTutWuri} className='img-kop' alt='Logo Tut Wuri' />
                      <div className='text-kop-tengah'>
                        <h3
  className='font-bold uppercase tracking-tight text-black'
  style={{
    margin: 0,
    fontSize: '14px',
    lineHeight: '1'
  }}
>
  Kartu Peserta
</h3>

<h3
  className='font-extrabold uppercase text-black'
  style={{
    margin: 4,
    fontSize: '14px',
    lineHeight: '1'
  }}
>
  Asesmen Sumatif Akhir Jenjang SD/MI
</h3>
                        <p className='text-[7.5px] font-semibold text-gray-600' style={{ margin: 0 }}>
                          Tahun Pelajaran 2025/2026
                        </p>
                      </div>
                      <div className='badge-peserta'>PESERTA</div>
                    </div>

                    {/* KONTEN UTAMA */}
                    <div className='main-body'>
                      
                      {/* QR CODE */}
                      <div className='qr-wrapper'>
                        <QRCodeCanvas value={`https://sdn2ciparitsk.vercel.app/verifikasi/${item.nisn || '000'}`} size={64}/>
                      </div>

                      {/* DATA SISWA */}
                      <table className='table-siswa'>
                        <tbody>
                          <tr>
                            <td style={{ width: '62px', fontWeight: 600 }}>No. Peserta</td>
                            <td style={{ fontWeight: 700 }}>: {item.nomor_peserta || '-'}</td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 600 }}>Nama Peserta</td>
                            <td style={{ fontWeight: 800, paddingRight: '48px', textTransform: 'uppercase', fontSize: '8.5px' }}>
                              : {item.nama || '-'}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 600 }}>NISN</td>
                            <td>: {item.nisn || '-'}</td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 600 }}>Lahir</td>
                            <td>: {item.tempat_lahir || '-'}, {item.tanggal_lahir || '-'}</td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 600 }}>Ruang / Kelas</td>
                            <td>: {item.ruangan || '-'} / {item.kelas || '-'}</td>
                          </tr>
                        </tbody>
                      </table>

                      {/* AREA BAWAH (FOTO & TTD SEJAJAR) */}
                      <div className='bottom-row'>
                        
                        {/* Kiri: Foto & Barcode */}
                        <div className='foto-barcode-wrapper'>
                          <img
                            src={getFotoUrl(item.foto, item.foto_path)}
                            className='foto-siswa'
                            alt='Foto'
                            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Photo' }}
                          />
                          <div className='barcode-container'>
                            <Barcode
                              value={item.nomor_peserta && item.nomor_peserta.trim() !== '' ? item.nomor_peserta : '00000000'}
                              height={19}
                              width={1.0}
                              margin={0}
                              displayValue={false}
                            />
                          </div>
                        </div>

                        {/* Kanan: TTD & Stempel */}
                        <div className='ttd-container'>
                          <p className='text-date-title'>Tasikmalaya, 18 Mei 2026</p>
                          <p className='text-date-title' style={{ fontWeight: 500 }}>Kepala Sekolah,</p>

                          {/* Tempat Stempel Mengambang */}
                          <div className='stempel-box'>
                            <img src={stempelSrc} alt='Stempel' className='img-stempel' />
                          </div>

                          <p className='text-kepsek-name'>
                            A. ADANG, S.Pd., M.Pd.
                          </p>
                          <p className='text-kepsek-nip'>
                            NIP. 196810052003121002
                          </p>
                        </div>

                      </div> {/* End of bottom-row */}

                    </div> {/* End of main-body */}
                  </div> {/* End of kartu-content */}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}