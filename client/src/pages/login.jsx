import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../api/userLogin'

export default function Login() {
  const {
    username, setUsername,
    password, setPassword,
    error, userInfo,
    handleLogin
  } = useLogin()

  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('user', JSON.stringify(userInfo)) // 👉 thêm dòng này
      alert('Đăng nhập thành công!')
      navigate('/testcaselist')
    }
  }, [userInfo, navigate])

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => navigate('/register')}>Register</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
