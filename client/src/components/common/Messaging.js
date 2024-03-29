import { useState, useEffect } from 'react'
import axios from 'axios'
import { userTokenFunction } from '../../helpers/auth'

const Messaging = ({ value }) => {
  const [formFields, setFormFields] = useState({
    owner: '',
    recipient: '',
    message: '',
  })
  const [profile, setProfile] = useState([])
  const [error, setError] = useState('')
  const [response, setResponse] = useState(false)
  const [active, setIsActive] = useState(true)
  const delay = 10000
  const userToken = userTokenFunction()

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setError('')
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/', userToken)
        setProfile(data)
      } catch (error) {
        console.log(error)
        setError(error.response.data.message)
      }
    }
    getUser()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive(false)
    }, delay)
    return () => clearInterval(interval)
  }, [response])

  const handleSubmit = async (e) => {
    setFormFields({ ...formFields, recipient: value })
    e.preventDefault()
    try {
      const { data } = await axios.post(`/api/messages/${value}/`, formFields, userToken)
      setResponse(!response)
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  return (
    <form className={active ? 'send-message' : 'send-message hidden'} onSubmit={handleSubmit}>
      <label htmlFor='message'></label>
      <input type='text' name='message' placeholder='Enter message' onChange={handleChange} value={formFields.message} />
      <button className={response ? 'button-comment sent' : 'button-comment'}>{response ? <span>Message sent!</span> : <span>Send message</span>}</button>
    </form>
  )
}

export default Messaging