const Comment = ({ comments }) => {
  return (
    comments.map(item => {
      const { id, owner, tip } = item
      return (
        <div key={id}>
          <div className='comment-owner'>
            <img className='user-profile-image' src={owner.profileimage} alt='user profile image' />
            <p className='username-box'>{owner.username}</p>
          </div>
          <p className='user-comment'>{tip}</p>
        </div>
      )
    }
    )
  )
}

export default Comment