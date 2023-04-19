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
    <div className='comments-form-container'>
      <form className='comments-form' onSubmit={handleSubmit}>
        {/* <label htmlFor='addComment'/> */}
        <input className='comment-entry' type='text' name='addComment' placeholder='Join the conversation...' onChange={handleChange} value={formFields.comments} />
        <button className='button-common'>Submit!</button>
      </form>
    </div>
  )
}

export default EditComment