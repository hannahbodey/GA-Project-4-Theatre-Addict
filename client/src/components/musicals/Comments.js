const Comment = (comments) => {
  console.log(comments)
  return (
    comments.map(item => {
      const { id, owner, tip } = item
      const { username, profileImage } = owner
      return (
        <div key={id}>
          <p>{owner.username}</p>
          <p>{tip}</p>
        </div>
      )
    }
    )
  )
}

export default Comment