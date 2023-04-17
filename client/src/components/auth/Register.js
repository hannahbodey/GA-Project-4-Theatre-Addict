import axios from 'axios'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

const Register = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/musicals'

  const [formFields, setFormFields] = useState({
    username: '',
    email: '',
    profileImage: '',
    password: '',
    passwordConfirmation: '',
  })
  const [error, setError] = useState('')
  
  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/auth/register/', formFields)
      // navigate back to single musical page
      navigate(from, { replace: true })
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
      setFormFields({ ...formFields, profileImage: data.secure_url })
    } catch (error) {
      setError(error.response.data.message)
    }
  }  

  return (
    <main className='form-page'>
      <form onSubmit={handleSubmit}>
        <h1>Register here!</h1>
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' placeholder='Username' onChange={handleChange} />
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' placeholder='Email' onChange={handleChange} />
        <label htmlFor='profileImage'>Profile Image</label>
        { formFields.profileImage ? <img src={formFields.profileImage}/> : <input type='file' onChange={handleUpload}/> }
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' placeholder='Password' onChange={handleChange} />
        <label htmlFor='passwordConfirmation'>Password Confirmation</label>
        <input type='password' name='passwordConfirmation' placeholder='Confirm password' onChange={handleChange} />
        <button>Register</button>
        {error && <p>{error}</p>}
      </form>
    </main>
  )
}

export default Register