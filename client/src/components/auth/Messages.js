import { useEffect, useState } from 'react'
import axios from 'axios'
import { userTokenFunction } from '../../helpers/auth'
import BackButton from '../common/BackArrow'
import SendIcon from '@mui/icons-material/Send'
import Messaging from '../common/Messaging'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const [error, setError] = useState('')
  const userToken = userTokenFunction()
  const currentUser = localStorage.getItem('current user')
  const [isActive, setActive] = useState(false)
  const [newrecipient, setNewRecipient] = useState()
  // const [filters, setFilters] = useState([])
  // const [filteredMessages, setFilteredMessages] = useState([])

  const handleClick = (e) => {
    setActive(!isActive)
    setNewRecipient(e.target.value)
  }

  // const handleChange = (e) => {
  //   const newFilters = { ...filters, username: e.target.value }
  //   setFilters(newFilters)
  //   console.log(filters)
  // }

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get('/api/messages/1/', userToken)
        setMessages(data)
      } catch (error) {
        console.log(error)
        setError(error.response.data.message)
      }
    }
    getMessages()
  }, [])


  // useEffect(() => {
  //   if (messages.length > 0) {
  //     const newMessages = [...new Set(messages.reduce(()))]
  //     const newMessages = messages.map((data) => {
  //       return { ...data, username: data.filter(item => item.owner.username === filters.username) }
  //     })
  //     setFilteredMessages(newMessages)
  //     console.log('new messages', newMessages)
  //   }
  // }, [filters])

  return (
    <div className='main-container'>
      {/* <select name='filter-messages' id='filter-messages' value={filters.username} onChange={handleChange}>
        <option key='selectuser' value='selectuser'>Message someone:</option>
        {messages.length > 0 ?
          messages.map(item => {
            const { id, message, owner, recipient } = item
            return <option key={id} value={owner.username}>{owner.username}</option>
          })
          :
          <option value='add'>No messages</option>
        }
      </select> */}
      {messages.length > 0 ?
        <div>
          <h3 className='profile-title'>Your messages:</h3>
          <BackButton />
          <div className='messages-container'>
            {messages.map(item => {
              const { id, message, owner, recipient } = item
              return (
                <div key={id} className='message-box'>
                  <div className='comment-owner'>
                    <p className='username-box'>Message from: {owner.username}</p>
                    <img className='user-profile-image' src={owner.profileimage} alt='user profile image' />
                    {currentUser === owner.username ? <></> : <button className='button-common send-message-button' onClick={handleClick} value={owner.id}><span><SendIcon sx={{ color: 'white', fontSize: 20 }} className='icon' /></span> Reply to {owner.username}</button>}
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
            {isActive ? <Messaging value={newrecipient} /> : <></>}
          </div>
        </div>
        :
        <div>
          <h3 className='profile-title'>Your messages:</h3>
          <BackButton />
          <div className='messages-container'>
            <div className='message-box'>
              <p className='username-box'>You have not yet sent any messages!</p>
            </div>
          </div>
        </div>
      }
    </div >
  )
}

export default Messages