import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase' // 🌟 Pastikan path ke file supabase Anda benar

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session)
    }

    checkUserSession()
  }, [])

  // Loading Screen Sementara
  if (isAuthenticated === null) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  // Jika belum login, lempar ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Jika sudah login, izinkan masuk
  return <>{children}</>
}