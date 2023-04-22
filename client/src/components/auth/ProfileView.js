import { useEffect, useState } from 'react'
import axios from 'axios'
import BackButton from '../common/BackArrow'
import { userTokenFunction } from '../../helpers/auth'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [profile, setProfile] = useState([])
  const [updatedProfile, setUpdatedProfile] = useState({
    username: '',
    email: '',
    profileimage: '',
    password: '',
    // passwordconfirmation: '',
  }
  )
  const [error, setError] = useState('')
  const userToken = userTokenFunction()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value })
    setError('')
  }

  const handleUpload = async (e) => {
    const image = e.target.files[0]
    const pictureToUpload = new FormData()
    pictureToUpload.append('file', image)
    pictureToUpload.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET)
    try {
      const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`, pictureToUpload)
      setUpdatedProfile({ ...updatedProfile, profileimage: data.secure_url })
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('submitting', updatedProfile)
    try {
      const { data } = await axios.put(`/api/auth/profile/${profile[0].id}/`, updatedProfile, userToken)
      console.log(data)
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  const handleClick = () => {
    navigate('/messages')
  }

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/', userToken)
        console.log(data)
        setProfile(data)
        setUpdatedProfile(data)
      } catch (error) {
        console.log(error)
        setError(error.response.data.message)
      }
    }
    getProfile()
  }, [])

  return (
    <div className='main-container'>
      {profile.length > 0 ?
        <>
          <h3 className='profile-title'>Welcome back, {updatedProfile.username ? updatedProfile.username : profile[0].username}</h3>
          <BackButton />
          <div className='profile-update-form'>
            <form onSubmit={handleSubmit}>
              <label htmlFor='profileimage'></label>
              {updatedProfile.profileimage ? <img className='profile-image-update' src={updatedProfile.profileimage} /> : <img className='profile-image-update' src={profile[0].profileimage} />}
              <input type='file' onChange={handleUpload} />
              <label htmlFor='username'></label>
              <input type='text' name='username' placeholder={updatedProfile.username ? updatedProfile.username : profile[0].username} onChange={handleChange} value={updatedProfile.username}/>
              <label htmlFor='email'></label>
              <input type='email' name='email' placeholder={updatedProfile.email ? updatedProfile.email : profile[0].email} onChange={handleChange} value={updatedProfile.email} />
              {/* <label htmlFor='password'></label>
              <input type='password' name='password' placeholder='Type password to confirm' onChange={handleChange} value={updatedProfile.password} />
              <label htmlFor='passwordconfirmation'></label>
              <input type='password' name='passwordconfirmation' placeholder='Confirm new password' onChange={handleChange} value={updatedProfile.passwordconfirmation} /> */}
              <button className='button-common register-button changes-button'>Submit your changes</button>
              {error && <p>Error: {error}</p>}
              <button className='button-common register-button changes-button' onClick={handleClick}>View your messages</button>
            </form>
          </div>
        </>
        :
        <p>no user here</p>
      }
    </div>
  )
}

export default Profile