import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ReactPlayer from 'react-player/youtube'
import Comment from './Comments'
import EditComment from './EditComment'
import Spinner from '../common/Spinner'
import { authenticatedUser, removeToken } from '../../helpers/auth'
import BackButton from '../common/BackArrow'
import PricesSingle from '../common/PricesSingle'
import GenresSingle from '../common/GenresSingle'

const SingleMusical = () => {
  const [musical, setMusical] = useState([])
  const [comments, setComments] = useState([])
  const [error, setError] = useState('')
  const [isActive, setActive] = useState(false)
  const [activeUser, setActiveUser] = useState(false)

  const { musicalid } = useParams()
  const navigate = useNavigate()

  const handleClick = () => {
    setActive(!isActive)
  }

  const navigateRegister = () => {
    localStorage.setItem('musical-page', `/musicals/${musicalid}/`)
    navigate('/register')
  }

  const goProfile = () => {
    navigate('/profile')
  }

  const handleLogout = () => {
    removeToken()
    setActiveUser(false)
  }

  useEffect(() => {
    const getMusical = async () => {
      try {
        const { data } = await axios.get(`/api/musicals/${musicalid}/`)
        setMusical(data)
        if (localStorage.getItem('current user')) {
          setActiveUser(true)
        }
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
        setComments(data)
      } catch (error) {
        setError(error.response.data.message)
      }
    }
    getComments()
  }, [])

  return (
    <main className='main-container'>
      {musical ?
        <>
          <div className='title-logo-container' style={{ backgroundImage: `url(${musical.picture_2})` }}>
            <div className='title-container'>
              <h1 className='musical-name'>{musical.name}</h1>
              <h2 className='musical-location'>{musical.theatre}</h2>
              <a className='tickets-button' href={musical.website}>
                <button className='button-common'>Book tickets here!</button>
              </a>
            </div>
            <a className='tickets-button' href={musical.website}>
              <img className='logo-image' src={musical.picture_1} />
            </a>
          </div>
          <BackButton />
          <div className='video-comments-container'>
            <ReactPlayer className='musical-video' url={musical.video} width='100%' />
            <div className='comments-tickets-container'>
              <p className='musical-description'>{musical.description}</p>
              <p className='musical-description-author'>TheatreAddicts.com</p>
              <div className='tickets-button'>
              </div>
              <div className='log-out-container'>
                <button className='button-common' onClick={authenticatedUser() ? handleClick : navigateRegister}>Share your tips!</button>
                {(authenticatedUser() && activeUser) && <button className='button-common' onClick={goProfile}>Edit profile</button>}
                {(authenticatedUser() && activeUser) && <button className='button-common' onClick={handleLogout}>Log out</button>}
              </div>
              <div className='comments'>
                <div className={isActive ? 'add-comment' : 'add-comment hidden'}>
                  <EditComment />
                </div>
                {comments.length > 0 ?
                  <>
                    <Comment comments={comments} />
                    <button className='button-common add-comment' onClick={handleClick}>Add your comments here...</button>
                  </>
                  :
                  <div className='log-out-container'>
                    <button className='button-common join-conversation' onClick={handleClick}>Be the first to comment.</button>
                  </div>
                }
              </div>
            </div>
            <div className='genres-pricing-container'>
              {musical.genre ?
                <div className='musical-genres'>
                  <h4>Genres:</h4>
                  {musical.genre.length > 0 ?
                    musical.genre.map(item => {
                      const { category } = item
                      return (
                        <>
                          <GenresSingle category={category} />
                        </>
                      )
                    })
                    :
                    <></>
                  }
                </div>
                :
                <></>
              }
              {musical.price_range ?
                <div className='musicals-pricing'>
                  <h4>Pricing:</h4>
                  {musical.price_range.length > 0 ?
                    musical.price_range.map(item => {
                      const { cost } = item
                      return (
                        <>
                          <PricesSingle cost={cost} />
                        </>
                      )
                    })
                    :
                    <></>
                  }
                </div>
                :
                <></>
              }
            </div>
          </div>
        </>
        :
        <Spinner />
      }
    </main>
  )
}

export default SingleMusical