import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import Comment from './Comments'
import { userTokenFunction } from '../../helpers/auth'

const EditComment = () => {
  const [formFields, setFormFields] = useState({
    tip: '',
  })
  const [newComment, setNewComment] = useState({})
  const [error, setError] = useState('')
  const [response, setResponse] = useState(false)
  const { musicalid } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const userToken = userTokenFunction()
  const currentUser = localStorage.getItem('current user')

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    console.log(userToken)
    console.log('form fields', formFields)
    try {
      const { data } = await axios.post(`/api/musicals/${musicalid}/comments/`, formFields, userToken)
      console.log(data)
      setNewComment(data)
      setResponse(!response)
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return (
    <>
      <div className='comments-form-container'>
        <form className='comments-form' onSubmit={handleSubmit}>
          <label htmlFor='tip' />
          <input className='comment-entry' type='text' name='tip' placeholder='Join the conversation...' onChange={handleChange} value={formFields.tip} />
          <button className={response ? 'button-common sent' : 'button-common'}>{response ? <span>Submitted</span> : <span>Submit!</span>}</button>
        </form>
      </div>
      {response &&
        <>
          <div className='comment-owner'>
            {/* <img className='user-profile-image' src={newComment.owner.profileimage} alt='user profile image' /> */}
            <p className='username-box'>{currentUser} - your new comment:</p>
          </div>
          <p className='user-comment'>{newComment.tip}</p>
        </>}
    </>
  )
}

export default EditComment