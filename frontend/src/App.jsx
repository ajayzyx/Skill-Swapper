import React, { useState } from 'react'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import AdminLayout from './components/layout/AdminLayout'
import Dashboard from './components/admin/Dashboard'
import UserManagement from './components/admin/UserManagement'
import SkillModeration from './components/admin/SkillModeration'
import Logs from './components/admin/Logs'
import Notifications from './components/admin/NotificationSender'
import Settings from './components/admin/Settings'
import UserProfile from './components/user/UserProfile'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null)

  const handleLogin = (email, password) => {
    // Mock authentication logic - replace with actual API call
    if (email && password) {
      setIsAuthenticated(true)
      // Mock admin check - in real app, this would come from API response
      if (email.includes('admin') || email === 'admin@skillswapper.com') {
        setUserRole('admin')
      } else {
        setUserRole('user')
      }
    }
  }

  const handleSignup = (name, email, password) => {
    // Mock signup logic - replace with actual API call
    if (name && email && password) {
      setIsAuthenticated(true)
      setUserRole('user')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserRole(null)
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          },
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                userRole === 'admin' ? (
                  <Navigate to="/admin/dashboard" replace />
                ) : (
                  <UserProfile onLogout={handleLogout} />
                )
              ) : (
                <Signin onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <Signup onSignup={handleSignup} />
              )
            }
          />
          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              isAuthenticated && userRole === 'admin' ? (
                <AdminLayout onLogout={handleLogout}>
                  <Routes>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="moderation" element={<SkillModeration />} />
                    <Route path="logs" element={<Logs />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="settings" element={<Settings />} />
                  </Routes>
                </AdminLayout>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </>
  )
}

export default App
