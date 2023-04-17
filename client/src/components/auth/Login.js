import axios from 'axios'
import { useLocation, useNavigate } from 'react-router'
import { useState } from 'react'

const LogIn = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/musicals'

  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formFields)
      localStorage.setItem('THEATRE-PROJECT-TOKEN', data.token)
      // need to navigate to previous id musical page
      navigate(from, { replace: true })
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  return (
    <main className='form-page'>
      <form onSubmit={handleSubmit}>
        <h1>Log In</h1>
        {/* <label htmlFor='username'onChange={handleChange} value={formFields}>Username</label>
        <input type='text' name='username' placeholder='Username' /> */}
        <label htmlFor='email' onChange={handleChange} value={formFields.email}>Email</label>
        <input type='email' name='email' placeholder='Email' />
        <label htmlFor='password' onChange={handleChange} value={formFields.password}>Password</label>
        <input type='password' name='password' placeholder='Password' />
        <button>Log In</button>
      </form>
    </main>
  )
}

export default LogIn