import SendIcon from '@mui/icons-material/Send'
import { authenticatedUser } from '../../helpers/auth'
import { useState, useEffect } from 'react'
import Messaging from '../common/Messaging'

const Comment = ({ comments }) => {
  const [isActive, setActive] = useState(false)
  const [recipient, setRecipient] = useState()
  const isAuthenticated = authenticatedUser()

  const handleClick = (e) => {
    setActive(!isActive)
    setRecipient(e.target.value)
  }

  return (
    <>
      {isActive ? <Messaging value={recipient} /> : <></>}
      {comments.map(item => {
        const { id, owner, tip } = item
        return (
          <div key={id}>
            <div className='comment-message-owner'>
              <div className='comment-owner'>
                <img className='user-profile-image' src={owner.profileimage} alt='user profile image' />
                <p className='username-box'>{owner.username}</p>
              </div>
              <div className='message-user-box'>
                {isAuthenticated && <button className='button-common message-button' onClick={handleClick} value={owner.id}><span><SendIcon sx={{ color: 'white', fontSize: 10 }} className='icon' /></span> Ask {owner.username} more</button>}
              </div>
            </div>
            <p className='user-comment'>{tip}</p>
          </div>
        )
      }
      )}
    </>
  )
}

export default Comment