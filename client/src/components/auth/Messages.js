import { useEffect, useState } from 'react'
import axios from 'axios'
import { userTokenFunction } from '../../helpers/auth'
import BackButton from '../common/BackArrow'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const [error, setError] = useState('')
  const userToken = userTokenFunction()

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get('/api/messages/', userToken)
        console.log(data)
        setMessages(data)
      } catch (error) {
        console.log(error)
        setError(error.response.data.message)
      }
    }
    getMessages()
  }, [])
  
  return (
    <div className='main-container'>
      {messages.length > 0 ?
        <div>
          <h3 className='profile-title'>{messages[0].owner.username} - your messages:</h3>
          <BackButton />
          <div className='messages-container'>
            {messages.map(item => {
              const { id, message, owner, recipient } = item
              return (
                <div key={id}>
                  <div className='comment-owner'>
                    <p className='username-box'>Message from: {owner.username}</p>
                    <img className='user-profile-image' src={owner.profileimage} alt='user profile image' />
                  </div>
                  <div className='comment-owner'>
                    <p className='username-box'>Message to: {recipient.username}</p>
                    <img className='user-profile-image' src={recipient.profileimage} alt='user profile image' />                    
                  </div>
                  <p className='user-comment'>{message}</p>
                </div>
              )
            })
            }
          </div>
        </div>
        :
        <p>no messages here</p>
      }
    </div>
  )
}

export default Messages