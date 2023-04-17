import axios from 'axios'
import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'

const EditComment = () => {
  const [formFields, setFormFields] = useState({
    comments: '',
  })
  const [error, setError] = useState('')
  const { musicalid } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/musicals'

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await axios.post(`/api/musicals/${musicalid}/comments`, formFields)
      navigate(from, { replace: true })
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='addComment'>Add comment here</label>
      <input type='text' name='addComment' placeholder='Add your comment' onChange={handleChange} value={formFields.comments}/>
      <button>Submit your comment!</button>
    </form>
  )
}

export default EditComment