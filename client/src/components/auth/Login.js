import axios from 'axios'
import { useLocation, useNavigate } from 'react-router'
import { useState } from 'react'
import ImageCarousel from '../common/ImageCarousel'

const LogIn = () => {
  const location = useLocation()
  const navigate = useNavigate()

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
    setError('')
    try {
      const { data } = await axios.post('/api/auth/login/', formFields)
      localStorage.setItem('THEATRE-PROJECT-TOKEN', data.token)
      console.log(data)
      const currentUser = data.username
      localStorage.setItem('current user', currentUser)
      const musicalpage = localStorage.getItem('musical-page')
      navigate(musicalpage)
      localStorage.removeItem('musical-page')
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  return (
    <main className='form-page'>
      <form onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <div className='form-container'>
          <a href='https://uk.hadestown.com/?_ga=2.141747122.1843058498.1681983080-1442831874.1681983080'>
            <img className='register-image' src='https://x9x6y4p2.stackpathcdn.com/wp-content/uploads/2018/11/1.-Eva-Noblezada-Eurydice-in-Hadestown-at-National-Theatre-c-Helen-Maybanks-1024x620.jpg' alt='Hadestown pic'/>
          </a>
          <label htmlFor='email'></label>
          <input type='email' name='email' placeholder='Email' onChange={handleChange} value={formFields.email} />
          <label htmlFor='password'></label>
          <input type='password' name='password' placeholder='Password' onChange={handleChange} value={formFields.password} />
        </div>
        <button className='register-button button-common'>Log In</button>
        {error && <p>Error: {error}</p>}
      </form>
      <ImageCarousel />
    </main>
  )
}

export default LogIn