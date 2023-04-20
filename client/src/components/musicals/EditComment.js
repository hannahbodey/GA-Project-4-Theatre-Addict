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
  const { musicalid } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const userToken = userTokenFunction()
  // const from = location.state?.from?.pathname || '/musicals'

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    console.log(userToken)
    try {
      const { data } = await axios.post(`/api/musicals/${musicalid}/comments/`, formFields, userToken)
      // navigate(from, { replace: true })
      console.log(data)
      setNewComment(data)
      // displayComments(newComment)
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  const displayComments = (newComment) => {
    if (!newComment) return
    console.log(newComment)
    return (
      <p>New comment here</p>
      // <>
      //   <div className='comment-owner'>
      //     <img className='user-profile-image' src={newComment.owner.profile_image} alt='user profile image' />
      //     <p className='username-box'>{newComment.owner.username}</p>
      //   </div>
      //   <p className='user-comment'>{newComment.tip}</p>
      // </>
    )
  }

  useEffect(() => {
    displayComments(newComment)
  }, [newComment])

  return (
    <>
      <div className='comments-form-container'>
        <form className='comments-form' onSubmit={handleSubmit}>
          <label htmlFor='tip' />
          <input className='comment-entry' type='text' name='tip' placeholder='Join the conversation...' onChange={handleChange} value={formFields.tip} />
          <button className='button-common'>Submit!</button>
        </form>
      </div>
      {/* {displayComments()} */}
    </>


  )
}

export default EditComment