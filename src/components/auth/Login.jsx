import { useState } from 'react'

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('https://dropserver.shop/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.status === 'success') {
        // ✅ Save login session
        setIsAuthenticated(true)
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('adminEmail', data.user.email)
        localStorage.setItem('adminId', data.user.id)
      } else {
        setError(data.message || 'Invalid credentials')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Server error. Please try again later.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111111]">
      <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-xl w-96 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-300"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-300"
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
