import { useState } from 'react'
import Navbar from '../components/NavBar'
import Footer from '../components/Footer'
import '../css/SignUpForm.css'

import { useNavigate } from 'react-router-dom'

const initialForm = { first_name: '',last_name: '', email: '', password: ''};

export default function SignUpForm({ onSuccess, apiBaseUrl = 'http://localhost:8085/'}){

    const [form, setForm] = useState(initialForm);
    const [status, setStatus] = useState('idle')
    const [error, setError] = useState('')
    const nav = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({...prev, [name]: value }));
    }

   async function handleSubmit(e) {
    e.preventDefault();
    setError('')

    if (form.password.length < 10) {
        setStatus('idle')
        setError('Password must be at least 10 characters.');
        return;
    }

    setStatus('submitting');

    try {
        const res = await fetch(`${apiBaseUrl}api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Could not create your account.');
        }

        setStatus('idle');
        setForm(initialForm);
        onSuccess?.(data.user, data.token);
        nav('/login')
    } catch (err) {
        setStatus('idle');
        setError(err.message);
    }
}


    return(
        <>
        <Navbar />
        <form className="signup" onSubmit={handleSubmit}>
            <div>
                <h2>Create your account</h2>
                <p>Save designs you like and find them later.</p>
            </div>
            <label>First Name
                <input
                    type='text'
                    name='first_name'
                    value={form.first_name}
                    onChange={handleChange}
                    required   />
            </label>

          <label>Last Name
            <input
                type='text'
                name='last_name'
                value={form.last_name}
                onChange={handleChange}
                required

            />
          </label>

          <label>Email
            <input
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                required

            />
          </label>

          <label>Password
            <input
                type='password'
                name='password'
                value={form.password}
                onChange={handleChange}
                required

            />
          </label>

        {error && <p className="error">{error}</p>}

          <button type='submit'
          disabled={status === 'Submitting'}
          >



        Create Account</button>

        </form>


        <Footer />
        </>
    )}
