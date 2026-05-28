import { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import { supabase } from '../../../lib/supabase'

export interface nomor_meja {
  id?: string
  nomor_peserta: string
  nama: string
  nisn: string
  tempat_lahir: string
  tanggal_lahir: string
  kelas: string
}

export default function SiswaPage() {
  const [loading, setLoading] = useState(false)
  const [siswaList, setSiswaList] = useState<nomor_meja[]>([])
  const [editId, setEditId] = useState<string | null>(null)

  const [form, setForm] = useState({
    nisn: '',
    nomorPeserta: '',
    nama: '',
    tempatLahir: '',
    tanggalLahir: '',
    kelas: '',
  })

  // =========================
  // GET DATA
  // =========================
  const getSiswa = async () => {
    const { data, error } = await supabase
      .from('nomor_meja')
      .select('*')
      .order('kelas', { ascending: true })
      .order('nomor_peserta', { ascending: true })

    if (!error && data) {
      setSiswaList(data)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getSiswa()
    }

    void fetchData()
  }, [])

  // =========================
  // PRINT
  // =========================
  const handlePrint = () => {
    window.print()
  }

  // =========================
  // IMPORT EXCEL
  // =========================
  const handleImportExcel = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = e.target.files?.[0]

      if (!file) return

      const data = await file.arrayBuffer()

      const workbook = XLSX.read(data)

      const sheetName = workbook.SheetNames[0]

      const worksheet = workbook.Sheets[sheetName]

      const jsonData =
        XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet)

      const siswaData = jsonData.map(
        (item: Record<string, unknown>) => ({
          nisn: String(item.nisn || ''),
          nomor_peserta: String(item.nomor_peserta || ''),
          nama: String(item.nama || ''),
          tempat_lahir: String(item.tempat_lahir || ''),
          tanggal_lahir: String(item.tanggal_lahir || ''),
          kelas: String(item.kelas || ''),
        })
      )

      const { error } = await supabase
        .from('nomor_meja')
        .insert(siswaData)

      if (error) {
        alert(error.message)
        return
      }

      alert('Import Excel berhasil')

      void getSiswa()
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
  }

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setForm({
      nisn: '',
      nomorPeserta: '',
      nama: '',
      tempatLahir: '',
      tanggalLahir: '',
      kelas: '',
    })

    setEditId(null)
  }

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async () => {
    try {
      setLoading(true)

      const payload = {
        nisn: form.nisn,
        nomor_peserta: form.nomorPeserta,
        nama: form.nama,
        tempat_lahir: form.tempatLahir,
        tanggal_lahir: form.tanggalLahir,
        kelas: form.kelas,
      }

      if (editId) {
        const { error } = await supabase
          .from('nomor_meja')
          .update(payload)
          .eq('id', editId)

        if (error) {
          alert(error.message)
          return
        }

        alert('Data berhasil diupdate')
      } else {
        const { error } = await supabase
          .from('nomor_meja')
          .insert([payload])

        if (error) {
          alert(error.message)
          return
        }

        alert('Data berhasil disimpan')
      }

      resetForm()

      void getSiswa()
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  // =========================
  // EDIT
  // =========================
  const handleEdit = (item: nomor_meja) => {
    setEditId(item.id || null)

    setForm({
      nisn: item.nisn,
      nomorPeserta: item.nomor_peserta,
      nama: item.nama,
      tempatLahir: item.tempat_lahir,
      tanggalLahir: item.tanggal_lahir,
      kelas: item.kelas,
    })

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id: string) => {
    try {
      const confirmDelete = confirm(
        'Yakin ingin menghapus data?'
      )

      if (!confirmDelete) return

      const { error } = await supabase
        .from('nomor_meja')
        .delete()
        .eq('id', id)

      if (error) {
        alert(error.message)
        return
      }

      setSiswaList((prev) =>
        prev.filter((item) => item.id !== id)
      )

      alert('Data berhasil dihapus')
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
  }

  return (
    <>
      <style>
        {`
          @page {
            size: A4 portrait;
            margin: 10mm;
          }

          @media print {
            body * {
              visibility: hidden;
            }

            .print-area,
            .print-area * {
              visibility: visible;
            }

            .print-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              background: white;
            }

            .no-print {
              display: none !important;
            }

            table {
              width: 100%;
              border-collapse: collapse;
            }

            th,
            td {
              border: 1px solid black;
              padding: 8px;
              font-size: 12px;
            }

            th {
              background: #f3f4f6 !important;
            }
          }
        `}
      </style>

      <div
        style={{
          padding: '24px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* IMPORT */}
        <div
          className='no-print'
          style={{ marginBottom: '20px' }}
        >
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#374151',
            }}
          >
            Import Data via Excel:
          </label>

          <input
            type='file'
            accept='.xlsx, .xls'
            onChange={handleImportExcel}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '14px',
            }}
          />
        </div>

        {/* FORM */}
        <div
          className='no-print'
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            padding: '24px',
            boxShadow:
              '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          }}
        >
          <h1
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#111827',
              margin: '0 0 4px 0',
            }}
          >
            {editId
              ? 'Edit Data Siswa'
              : 'Tambah Data Siswa'}
          </h1>

          <p
            style={{
              color: '#6b7280',
              fontSize: '14px',
              margin: '0 0 24px 0',
            }}
          >
            Masukkan data siswa.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
            }}
          >
            <input
              name='nomorPeserta'
              placeholder='Nomor Peserta'
              value={form.nomorPeserta}
              onChange={handleChange}
            />

            <input
              name='nisn'
              placeholder='NISN'
              value={form.nisn}
              onChange={handleChange}
            />

            <input
              name='nama'
              placeholder='Nama Lengkap'
              value={form.nama}
              onChange={handleChange}
            />

            <input
              name='tempatLahir'
              placeholder='Tempat Lahir'
              value={form.tempatLahir}
              onChange={handleChange}
            />

            <input
              type='date'
              name='tanggalLahir'
              value={form.tanggalLahir}
              onChange={handleChange}
            />

            <input
              name='kelas'
              placeholder='Kelas'
              value={form.kelas}
              onChange={handleChange}
            />
          </div>

          <div
            style={{
              marginTop: '24px',
              display: 'flex',
              gap: '12px',
            }}
          >
            <button
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? 'Menyimpan...'
                : editId
                ? 'Update Data'
                : 'Simpan Data'}
            </button>

            {editId && (
              <button onClick={resetForm}>
                Batal
              </button>
            )}
          </div>
        </div>

        {/* BUTTON PRINT */}
        <div
          className='no-print'
          style={{
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          <button
            onClick={handlePrint}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            PRINT DATA
          </button>
        </div>

        {/* TABLE */}
        <div className='print-area'>
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: '700',
                marginBottom: '16px',
              }}
            >
              List Siswa Terdaftar
            </h2>

            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                }}
              >
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>NISN</th>
                    <th>No Peserta</th>
                    <th>Kelas</th>
                    <th className='no-print'>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {siswaList.map((item) => (
                    <tr key={item.id}>
                      <td>{item.nama}</td>
                      <td>{item.nisn}</td>
                      <td>{item.nomor_peserta}</td>
                      <td>{item.kelas}</td>

                      <td className='no-print'>
                        <div
                          style={{
                            display: 'flex',
                            gap: '8px',
                          }}
                        >
                          <button
                            onClick={() =>
                              handleEdit(item)
                            }
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              item.id &&
                              handleDelete(item.id)
                            }
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}