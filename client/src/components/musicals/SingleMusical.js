import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
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
      <h1>{musical.name}</h1>
      <h2>{musical.theatre}</h2>
      <p>{musical.description}</p>
      <img src={musical.picture_1} />
      <img src={musical.picture_2} />
      <img src={musical.picture_3} />
      <div className='tickets-button'>
        <a href={musical.website}>
          <button>Book tickets here!</button>
        </a>
      </div>
      <ReactPlayer url={musical.video} />
      <div className='comments'>
        {comments.length > 0 ?
          <Comment comments={[comments]} />
          :
          <button onClick={handleClick}>Be the first to comment.</button>
        }
        {/* Need to add the ability to add comments if you are logged in - should take you to the log in page */}
        <button onClick={handleClick}>Add your comments here...</button>
        <form className={isActive ? 'add-comment' : 'add-comment hidden'}>
          <EditComment />
        </form>
      </div>
    </main>
  )
}

export default SingleMusical