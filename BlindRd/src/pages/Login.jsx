import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/NavBar'
import Footer from '../components/Footer'
import '../css/SignUpForm.css'

export default function Login() {
  const apiBaseUrl = 'http://localhost:8085/'
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    fetch(`${apiBaseUrl}api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.error || 'Login failed')
          });
        }
        return res.json()
      })
      .then(data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/my-account')
      })
      .catch(err => setError(err.message));
  }

  return (
    <>
      <Navbar />
      <div className='login'>
        <h1>Log in to your account</h1>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Log In</button>
        </form>
      </div>
      <Footer />
    </>
  );
}