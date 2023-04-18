import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ReactPlayer from 'react-player/youtube'
import Comment from './Comments'
import EditComment from './EditComment'

const SingleMusical = () => {
  const [musical, setMusical] = useState([])
  const [comments, setComments] = useState([])
  const [error, setError] = useState('')
  const [isActive, setActive] = useState(false)

  const location = useLocation()
  const { musicalid } = useParams()
  const navigate = useNavigate()

  const handleClick = () => {
    setActive(!isActive)
  }

  useEffect(() => {
    const getMusical = async () => {
      try {
        const { data } = await axios.get(`/api/musicals/${musicalid}/`)
        console.log(data)
        setMusical(data)
      } catch (error) {
        setError(error.response.data.message)
      }
    }
    getMusical()
  }, [])

  useEffect(() => {
    const getComments = async () => {
      try {
        const { data } = await axios.get(`/api/musicals/${musicalid}/comments/`)
        console.log(data)
        setComments(data)
      } catch (error) {
        setError(error.response.data.message)
      }
    }
    getComments()
  }, [])

  return (
    <main className='main-container'>
      <div className='title-logo-container' style={{ backgroundImage: `url(${musical.picture_2})` }}>
        <div className='title-container'>
          <h1 className='musical-name'>{musical.name}</h1>
          <h2 className='musical-location'>{musical.theatre}</h2>
          <a className='tickets-button' href={musical.website}>
            <button>Book tickets here!</button>
          </a>
        </div>

        <a className='tickets-button' href={musical.website}>
          <img className='logo-image' src={musical.picture_1} />
        </a>
      </div>
      <div className='video-comments-container'>
        <ReactPlayer className='musical-video' url={musical.video} />
        <div className='comments-tickets-container'>
          <p className='musical-description'>{musical.description}</p>
          <div className='tickets-button'>

          </div>
          <button onClick={handleClick}>Add your comments here...</button>
          <div className='comments'>
            <div className={isActive ? 'add-comment' : 'add-comment hidden'}>
              <EditComment />
            </div>
            {comments.length > 0 ?
              <>
                <Comment comments={comments} />
                <button onClick={handleClick}>Add your comments here...</button>
              </>
              :
              <button onClick={handleClick}>Be the first to comment.</button>
            }
            {/* Need to add the ability to add comments if you are logged in - should take you to the log in page */}
          </div>
        </div>
      </div>
      <img className='action-image' src={musical.picture_2} />
      <img className='action-image' src={musical.picture_3} />
    </main>
  )
}

export default SingleMusical