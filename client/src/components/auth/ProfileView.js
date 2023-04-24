import { useEffect, useState } from 'react'
import axios from 'axios'
import BackButton from '../common/BackArrow'
import { removeToken, userTokenFunction } from '../../helpers/auth'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [profile, setProfile] = useState([])
  const [updatedProfile, setUpdatedProfile] = useState({
    username: '',
    email: '',
    profileimage: '',
    password: '',
  }
  )
  const [error, setError] = useState('')
  const [messages, setMessages] = useState([])
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
    try {
      const { data } = await axios.put(`/api/auth/profile/${profile[0].id}/`, updatedProfile, userToken)
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  const handleClick = () => {
    if (updatedProfile.username) {
      const currentUser = updatedProfile.username
      localStorage.setItem('current user', currentUser)
    } else {
      const currentUser = profile[0].username
      localStorage.setItem('current user', currentUser)
    }
    navigate('/messages')
  }

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/auth/profile/${profile[0].id}/`, userToken)
      navigate('/musicals')
      removeToken()
    } catch (error) {
      console.log(error)
      setError(error.response.data.detail)
    }
  }

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/', userToken)
        setProfile(data)
        setUpdatedProfile(data)
      } catch (error) {
        console.log(error)
        setError(error.response.data.detail)
      }
    }
    getProfile()
  }, [])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get('/api/messages/1/', userToken)
        setMessages(data)
      } catch (error) {
        console.log(error)
        setError(error.response.data.detail)
      }
    }
    getMessages()
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
              <button className='button-common register-button changes-button'>Submit your changes</button>
              {error && <p className='error'>Error: {error}</p>}
              <button className='button-common register-button changes-button' onClick={handleClick}>View your messages: {messages.length} messages</button>
              <button className='button-common register-button changes-button delete-button' onClick={handleDelete}>Delete account</button>
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