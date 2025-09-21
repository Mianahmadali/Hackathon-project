import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const linkClass = ({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-white bg-primary' : 'text-gray-700 hover:text-primary'}`

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-primary">DonateHub</Link>
        <nav className="flex items-center gap-2">
          <NavLink to="/campaigns" className={linkClass}>Campaigns</NavLink>
          {user && (
            <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
          )}
        </nav>
        <div>
          {loading ? (
            <span className="text-gray-500 text-sm">Loading...</span>
          ) : user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Hi, {user.name} ({user.role})</span>
              <button onClick={handleLogout} className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <NavLink to="/login" className={linkClass}>Login</NavLink>
              <NavLink to="/register" className={linkClass}>Register</NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
