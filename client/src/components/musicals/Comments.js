import SendIcon from '@mui/icons-material/Send'

const Comment = ({ comments }) => {
  return (
    comments.map(item => {
      const { id, owner, tip } = item
      return (
        <div key={id}>
          <div className='comment-owner'>
            <img className='user-profile-image' src={owner.profileimage} alt='user profile image' />
            <p className='username-box'>{owner.username}</p>
            <button className='button-common'><span><SendIcon sx={{ color: 'white', fontSize: 20 }} className='icon' /></span> Send a reply</button>
          </div>
          <p className='user-comment'>{tip}</p>
        </div>
      )
    }
    )
  )
}

export default Comment