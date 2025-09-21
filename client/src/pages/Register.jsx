import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'donor' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded-md">
      <h1 className="text-2xl font-semibold mb-4">Register</h1>
      {error && <div className="bg-red-50 text-red-700 px-3 py-2 rounded mb-3 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input name="name" autoComplete="name" className="w-full border rounded px-3 py-2" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" name="email" autoComplete="email" className="w-full border rounded px-3 py-2" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input type="password" name="password" autoComplete="new-password" className="w-full border rounded px-3 py-2" value={form.password} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Role</label>
          <select name="role" className="w-full border rounded px-3 py-2" value={form.role} onChange={handleChange}>
            <option value="donor">Donor</option>
            <option value="ngo">NGO</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark disabled:opacity-60">
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>
      <p className="text-sm text-gray-600 mt-3">Already have an account? <Link to="/login" className="text-primary">Login</Link></p>
    </div>
  )
}
