'use client'

import React, { useEffect, useState } from 'react'
import {
  useNavigate,
  Link,
} from 'react-router-dom'

import { supabase } from '../../lib/supabase'

import '@tabler/core/dist/css/tabler.min.css'
// import 'tailwindcss'

export default function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] =
    useState<string>('')

  const [password, setPassword] =
    useState<string>('')

  const [showPassword, setShowPassword] =
    useState<boolean>(false)

  const [loading, setLoading] =
    useState<boolean>(false)

  const [errorMessage, setErrorMessage] =
    useState<string>('')

  // ================= CHECK SESSION =================
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        navigate('/login')
      }
    }

    checkSession()
  }, [navigate])

  // ================= HANDLE LOGIN =================
  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setLoading(true)
    setErrorMessage('')

    try {
      // ================= VALIDASI =================
      if (!email || !password) {
        setErrorMessage(
          'Email dan Password wajib diisi'
        )

        setLoading(false)
        return
      }

      // ================= LOGIN SUPABASE =================
      const { data, error } =
        await supabase.auth.signInWithPassword(
          {
            email: email.trim(),
            password,
          }
        )

      if (error) {
        console.error(error)

        if (
          error.message ===
          'Invalid login credentials'
        ) {
          setErrorMessage(
            'Email atau Password salah'
          )
        } else {
          setErrorMessage(error.message)
        }

        setLoading(false)
        return
      }

      // ================= SUCCESS LOGIN =================
      if (data.user) {
        console.log(
          'LOGIN BERHASIL:',
          data.user
        )

        navigate('/admin')
      }
    } catch (err) {
      console.error(err)

      setErrorMessage(
        'Terjadi kesalahan saat login'
      )
    }

    setLoading(false)
  }

  return (
    <div className='d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center'>
      <div
        className='container container-tight py-4'
        style={{ maxWidth: '420px' }}
      >
        {/* LOGO */}
        <div className='text-center mb-4'>
          <div
            className='d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-3 fw-bold mb-2 shadow'
            style={{
              width: '52px',
              height: '52px',
              fontSize: '14px',
            }}
          >
            SDN 2
          </div>

          <h2
            className='text-dark fw-bold m-0'
            style={{
              color: '#003366',
            }}
          >
            Sistem Informasi Admin
          </h2>

          <p className='text-muted small mt-1'>
            SDN 2 Cipari Kota
            Tasikmalaya
          </p>
        </div>

        {/* CARD */}
        <div className='card shadow-sm border-0 rounded-4 overflow-hidden'>
          <div className='card-body p-4 p-sm-5'>
            <h3
              className='text-center mb-4 fw-bold'
              style={{
                color: '#003366',
                fontSize: '1.25rem',
              }}
            >
              Masuk ke Akun Admin
            </h3>

            {/* ERROR */}
            {errorMessage && (
              <div className='alert alert-danger rounded-3 py-2 px-3 small mb-3'>
                {errorMessage}
              </div>
            )}

            {/* FORM */}
            <form
              onSubmit={handleLogin}
              autoComplete='off'
            >
              {/* EMAIL */}
              <div className='mb-3'>
                <label className='form-label fw-semibold small'>
                  Alamat Email
                </label>

                <input
                  type='email'
                  className='form-control rounded-3'
                  placeholder='admin@gmail.com'
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  disabled={loading}
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className='mb-4'>
                <label className='form-label fw-semibold small'>
                  Kata Sandi
                </label>

                <div className='input-group'>
                  <input
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    className='form-control rounded-start-3'
                    placeholder='••••••••'
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    disabled={loading}
                    required
                  />

                  <button
                    type='button'
                    className='btn btn-outline-secondary rounded-end-3'
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    {showPassword
                      ? 'Hide'
                      : 'Show'}
                  </button>
                </div>
              </div>

              {/* BUTTON */}
              <button
                type='submit'
                className='btn btn-primary w-100 rounded-3 fw-bold shadow-sm'
                style={{
                  backgroundColor:
                    '#0052CC',
                  borderColor:
                    '#0052CC',
                }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className='spinner-border spinner-border-sm me-2'></span>
                    Loading...
                  </>
                ) : (
                  'Masuk Sistem'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* FOOTER */}
        <div className='text-center text-muted small mt-3'>
          Bukan Admin?{' '}
          <Link
            to='/'
            className='text-decoration-none fw-semibold'
            style={{
              color: '#FF9900',
            }}
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}