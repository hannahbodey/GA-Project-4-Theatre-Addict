import axios from 'axios'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import ImageCarousel from '../common/ImageCarousel'

const Register = () => {
  const location = useLocation()
  const navigate = useNavigate()
  // const from = location.state?.from?.pathname || '/musicals'

  const [formFields, setFormFields] = useState({
    username: '',
    email: '',
    profileimage: '',
    password: '',
    passwordconfirmation: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    console.log(formFields)
    e.preventDefault()
    try {
      await axios.post('/api/auth/register/', formFields)
      // navigate back to single musical page
      const musicalpage = localStorage.getItem('musical-page')
      navigate(musicalpage)
      localStorage.removeItem('musical-page')
      // navigate(from, { replace: true })
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  const handleUpload = async (e) => {
    const image = e.target.files[0]
    const pictureToUpload = new FormData()
    pictureToUpload.append('file', image)
    pictureToUpload.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET)
    try {
      const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`, pictureToUpload)
      setFormFields({ ...formFields, profileimage: data.secure_url })
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  const navigateLogin = () => {
    navigate('/login')
  }

  return (
    <main className='form-page'>
      <form onSubmit={handleSubmit}>
        <h1>Register here!</h1>
        <div className='form-container'>
          <a href='https://uk.hadestown.com/?_ga=2.141747122.1843058498.1681983080-1442831874.1681983080'>
            <img className='register-image' src='https://images.ctfassets.net/6pezt69ih962/2PxxtNSc6MjdNIWz4OQbrd/e5ef0df143a6a389243bb1b16cb8cfd5/hadestown_new-1200.jpg' alt='Hadestown image' />
          </a>
          <label htmlFor='username'></label>
          <input type='text' name='username' placeholder='Username' onChange={handleChange} value={formFields.username} />
          <label htmlFor='email'></label>
          <input type='email' name='email' placeholder='Email' onChange={handleChange} value={formFields.email} />
          <label htmlFor='profileimage'></label>
          {formFields.profileimage ? <img src={formFields.profileimage} /> : <input type='file' onChange={handleUpload} value={formFields.profileimage} />}
          <label htmlFor='password'></label>
          <input type='password' name='password' placeholder='Password' onChange={handleChange} value={formFields.password} />
          <label htmlFor='passwordconfirmation'></label>
          <input type='password' name='passwordconfirmation' placeholder='Confirm password' onChange={handleChange} value={formFields.passwordconfirmation} />
        </div>
        <button className='register-button button-common'>Register</button>
        {error && <p>{error}</p>}
        <button onClick={navigateLogin} className='register-button button-common'>Already have an account? Log in now.</button>
      </form>
      <ImageCarousel />
    </main>
  )
}

export default Register