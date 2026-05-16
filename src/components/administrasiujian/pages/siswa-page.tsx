import { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import { supabase } from '../../../lib/supabase'

interface Siswa {
  id: string
  nisn: string
  nomor_peserta: string
  nama: string
  tempat_lahir: string
  tanggal_lahir: string
  kelas: string
  ruangan: string
  foto: string
  foto_path: string
}

export default function SiswaPage() {
  const [loading, setLoading] = useState(false)
  const [siswaList, setSiswaList] = useState<Siswa[]>([])
  const [editId, setEditId] = useState<string | null>(null)

  const [form, setForm] = useState({
    nisn: '',
    nomorPeserta: '',
    nama: '',
    tempatLahir: '',
    tanggalLahir: '',
    kelas: '',
    ruangan: '',
    foto: null as File | null,
  })

  // =========================
  // GET DATA
  // =========================
  const getSiswa = async () => {
    const { data, error } = await supabase
      .from('siswa')
      .select('*')
      .order('created_at', { ascending: false })

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
  // IMPORT EXCEL
  // =========================
  const handleImportExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      if (!file) return

      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data)
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet)

      const siswaData = jsonData.map((item: Record<string, unknown>) => ({
        nisn: String(item.nisn || ''),
        nomor_peserta: String(item.nomor_peserta || ''),
        nama: String(item.nama || ''),
        tempat_lahir: String(item.tempat_lahir || ''),
        tanggal_lahir: String(item.tanggal_lahir || ''),
        kelas: String(item.kelas || ''),
        ruangan: String(item.ruangan || ''),
        foto: '',
        foto_path: '',
      }))

      const { error } = await supabase.from('siswa').insert(siswaData)

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
    const { name, value, files } = e.target

    if (name === 'foto' && files) {
      setForm({
        ...form,
        foto: files[0],
      })
      return
    }

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
      ruangan: '',
      foto: null,
    })
    setEditId(null)
  }

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async () => {
    try {
      setLoading(true)

      if (editId) {
        const oldData = siswaList.find((item) => item.id === editId)
        let updateFotoUrl = oldData?.foto || ''
        let updateFotoPath = oldData?.foto_path || ''

        if (form.foto) {
          if (oldData?.foto_path) {
            const { error: removeError } = await supabase.storage
              .from('foto-siswa')
              .remove([oldData.foto_path])

            if (removeError) {
              alert(removeError.message)
              return
            }
          }

          const fileName = `${Date.now()}-${form.foto.name}`
          const { error: uploadError } = await supabase.storage
            .from('foto-siswa')
            .upload(fileName, form.foto)

          if (uploadError) {
            alert(uploadError.message)
            return
          }

          const { data } = supabase.storage.from('foto-siswa').getPublicUrl(fileName)
          updateFotoUrl = data.publicUrl
          updateFotoPath = fileName
        }

        const { error } = await supabase
          .from('siswa')
          .update({
            nisn: form.nisn,
            nomor_peserta: form.nomorPeserta,
            nama: form.nama,
            tempat_lahir: form.tempatLahir,
            tanggal_lahir: form.tanggalLahir,
            kelas: form.kelas,
            ruangan: form.ruangan,
            foto: updateFotoUrl,
            foto_path: updateFotoPath,
          })
          .eq('id', editId)

        if (error) {
          alert(error.message)
          return
        }

        alert('Data berhasil diupdate')
      } else {
        let fotoUrl = ''
        let fileName = ''

        if (form.foto) {
          fileName = `${Date.now()}-${form.foto.name}`
          const { error: uploadError } = await supabase.storage
            .from('foto-siswa')
            .upload(fileName, form.foto)

          if (uploadError) {
            alert(uploadError.message)
            return
          }

          const { data } = supabase.storage.from('foto-siswa').getPublicUrl(fileName)
          fotoUrl = data.publicUrl
        }

        const { error } = await supabase.from('siswa').insert([
          {
            nisn: form.nisn,
            nomor_peserta: form.nomorPeserta,
            nama: form.nama,
            tempat_lahir: form.tempatLahir,
            tanggal_lahir: form.tanggalLahir,
            kelas: form.kelas,
            ruangan: form.ruangan,
            foto: fotoUrl,
            foto_path: fileName,
          },
        ])

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

  const handleEdit = (item: Siswa) => {
    setEditId(item.id)
    setForm({
      nisn: item.nisn,
      nomorPeserta: item.nomor_peserta,
      nama: item.nama,
      tempatLahir: item.tempat_lahir,
      tanggalLahir: item.tanggal_lahir,
      kelas: item.kelas,
      ruangan: item.ruangan,
      foto: null,
    })

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleDelete = async (id: string) => {
    try {
      const confirmDelete = confirm('Yakin ingin menghapus data?')
      if (!confirmDelete) return

      const siswa = siswaList.find((item) => item.id === id)

      if (siswa?.foto_path) {
        const { error: storageError } = await supabase.storage
          .from('foto-siswa')
          .remove([siswa.foto_path])

        if (storageError) {
          alert(storageError.message)
          return
        }
      }

      const { error } = await supabase.from('siswa').delete().eq('id', id)

      if (error) {
        alert(error.message)
        return
      }

      setSiswaList((prev) => prev.filter((item) => item.id !== id))
      alert('Data berhasil dihapus')
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
  }

  return (
    <div style={{ padding: '24px', width: '100%', boxSizing: 'border-box' }}>
      {/* TOMBOL IMPORT EXCEL */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
          Import Data via Excel:
        </label>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleImportExcel}
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '14px'
          }}
        />
      </div>

      {/* BLOCK FORM INPUT */}
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0' }}>
          {editId ? 'Edit Data Siswa' : 'Tambah Data Siswa'}
        </h1>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 24px 0' }}>
          Masukkan spesifikasi data siswa untuk administrasi cetak kartu ujian.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <input name="nomorPeserta" placeholder="Nomor Peserta" value={form.nomorPeserta} onChange={handleChange} style={{ border: '1px solid #d1d5db', borderRadius: '8px', padding: '10px 14px', fontSize: '14px' }} />
          <input name="nisn" placeholder="NISN" value={form.nisn} onChange={handleChange} style={{ border: '1px solid #d1d5db', borderRadius: '8px', padding: '10px 14px', fontSize: '14px' }} />
          <input name="nama" placeholder="Nama Lengkap" value={form.nama} onChange={handleChange} style={{ border: '1px solid #d1d5db', borderRadius: '8px', padding: '10px 14px', fontSize: '14px' }} />
          <input name="tempatLahir" placeholder="Tempat Lahir" value={form.tempatLahir} onChange={handleChange} style={{ border: '1px solid #d1d5db', borderRadius: '8px', padding: '10px 14px', fontSize: '14px' }} />
          <input type="date" name="tanggalLahir" value={form.tanggalLahir} onChange={handleChange} style={{ border: '1px solid #d1d5db', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', color: '#374151' }} />
          <input name="kelas" placeholder="Kelas" value={form.kelas} onChange={handleChange} style={{ border: '1px solid #d1d5db', borderRadius: '8px', padding: '10px 14px', fontSize: '14px' }} />
          <input name="ruangan" placeholder="Ruangan" value={form.ruangan} onChange={handleChange} style={{ border: '1px solid #d1d5db', borderRadius: '8px', padding: '10px 14px', fontSize: '14px' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '12px', fontWeight: '500', color: '#4b5563' }}>Upload Foto Siswa (3x4):</label>
            <input type="file" name="foto" accept="image/*" onChange={handleChange} style={{ border: '1px solid #d1d5db', borderRadius: '8px', padding: '7px 14px', fontSize: '14px', backgroundColor: '#f9fafb' }} />
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              fontWeight: '600',
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            {loading ? 'Menyimpan...' : editId ? 'Update Data' : 'Simpan Data'}
          </button>

          {editId && (
            <button
              onClick={resetForm}
              style={{ backgroundColor: '#6b7280', color: '#ffffff', fontWeight: '600', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Batal
            </button>
          )}
        </div>
      </div>

      {/* LIST DATA SISWA */}
      <div style={{ marginTop: '32px', backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '0 0 16px 0' }}>List Siswa Terdaftar</h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '12px', fontWeight: '600', color: '#374151' }}>Foto</th>
                <th style={{ padding: '12px', fontWeight: '600', color: '#374151' }}>Nama</th>
                <th style={{ padding: '12px', fontWeight: '600', color: '#374151' }}>NISN</th>
                <th style={{ padding: '12px', fontWeight: '600', color: '#374151' }}>No Peserta</th>
                <th style={{ padding: '12px', fontWeight: '600', color: '#374151' }}>Kelas</th>
                <th style={{ padding: '12px', fontWeight: '600', color: '#374151' }}>Ruangan</th>
                <th style={{ padding: '12px', fontWeight: '600', color: '#374151', textBreak: 'keep-all' }}>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {siswaList.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px' }}>
                    <div style={{ width: '64px', height: '80px', overflow: 'hidden', borderRadius: '4px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' }}>
                      <img
                        src={item.foto || 'https://placehold.co/100x120?text=No+Foto'}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        alt="Siswa"
                      />
                    </div>
                  </td>

                  <td style={{ padding: '12px', fontWeight: '500', color: '#111827' }}>{item.nama}</td>
                  <td style={{ padding: '12px', color: '#4b5563' }}>{item.nisn}</td>
                  <td style={{ padding: '12px', color: '#4b5563' }}>{item.nomor_peserta}</td>
                  <td style={{ padding: '12px', color: '#4b5563' }}>{item.kelas}</td>
                  <td style={{ padding: '12px', color: '#4b5563' }}>{item.ruangan}</td>

                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleEdit(item)}
                        style={{ backgroundColor: '#eab308', color: '#ffffff', fontSize: '12px', fontWeight: '600', padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{ backgroundColor: '#dc2626', color: '#ffffff', fontSize: '12px', fontWeight: '600', padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
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
  )
}