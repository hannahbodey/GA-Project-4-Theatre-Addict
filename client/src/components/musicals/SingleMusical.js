import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ReactPlayer from 'react-player/youtube'
import Comment from './Comments'
import EditComment from './EditComment'
import Spinner from '../common/Spinner'
import { authenticatedUser, removeToken } from '../../helpers/auth'
import BackButton from '../common/BackArrow'
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import MovieIcon from '@mui/icons-material/Movie'
import ElderlyIcon from '@mui/icons-material/Elderly'
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly'
import FiberNewIcon from '@mui/icons-material/FiberNew'
import PaymentIcon from '@mui/icons-material/Payment'
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound'

const SingleMusical = () => {
  const [musical, setMusical] = useState([])
  const [comments, setComments] = useState([])
  const [error, setError] = useState('')
  const [isActive, setActive] = useState(false)
  const [activeUser, setActiveUser] = useState(false)

  const location = useLocation()
  const { musicalid } = useParams()
  const navigate = useNavigate()
  const isAuthenticated = authenticatedUser()

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
        console.log(data)
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
              <div className='tickets-button'>
              </div>
              <div className='log-out-container'>
                <button className='button-common' onClick={authenticatedUser() ? handleClick : navigateRegister}>Got advice for other theatre-goers?</button>
                {(authenticatedUser() && activeUser) && <button className='button-common' onClick={goProfile}>Edit your profile</button>}
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
                          {category === 'Comedy' && <p>{category} <span><SentimentSatisfiedAltIcon sx={{ color: 'white', fontSize: 20 }} className='icon' /></span></p>}
                          {category === 'Tragedy' && <p>{category} <span><SentimentVeryDissatisfiedIcon sx={{ color: 'white', fontSize: 20 }} className='icon' /></span></p>}
                          {category === 'Romance' && <p>{category} <span><FavoriteIcon sx={{ color: 'white', fontSize: 20 }} className='icon' /></span></p>}
                          {category === 'Historical' && <p>{category} <span><HistoryEduIcon sx={{ color: 'white', fontSize: 20 }} className='icon' /></span></p>}
                          {category === 'Dramatic' && <p>{category} <span><MovieIcon sx={{ color: 'white', fontSize: 20 }} className='icon' /></span></p>}
                          {category === 'Revival' && <p>{category} <span><ElderlyIcon sx={{ color: 'white', fontSize: 20 }} className='icon' /></span></p>}
                          {category === 'New' && <p>{category} <span><ChildFriendlyIcon sx={{ color: 'white', fontSize: 20 }} className='icon' /></span></p>}
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
                          {cost === '£10-30' && <p>{cost} <span><CurrencyPoundIcon sx={{ color: 'white', fontSize: 15 }} className='icon' /></span></p>}
                          {cost === '£31-50' && <p>{cost} <span><CurrencyPoundIcon sx={{ color: 'white', fontSize: 20 }} className='icon' /></span></p>}
                          {cost === '£51-70' && <p>{cost} <span><CurrencyPoundIcon sx={{ color: 'white', fontSize: 25 }} className='icon' /></span></p>}
                          {cost === '£71-90' && <p>{cost} <span><CurrencyPoundIcon sx={{ color: 'white', fontSize: 30 }} className='icon' /></span></p>}
                          {cost === '£91-110' && <p>{cost} <span><CurrencyPoundIcon sx={{ color: 'white', fontSize: 35 }} className='icon' /></span></p>}
                          {cost === '£111-150' && <p>{cost} <span><CurrencyPoundIcon sx={{ color: 'white', fontSize: 40 }} className='icon' /></span></p>}
                          {cost === '£151-200' && <p>{cost} <span><CurrencyPoundIcon sx={{ color: 'white', fontSize: 45 }} className='icon' /></span></p>}
                          {cost === '£201-250' || cost === '£251-300' || cost === '£301-350' || cost === '£351-400' || cost === '£401-500' && <p>Could be a bit pricey... <span><CurrencyPoundIcon sx={{ color: 'white', fontSize: 50 }} className='icon' /></span></p>}
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
          {/* <img className='action-image' src={musical.picture_2} />
          <img className='action-image' src={musical.picture_3} /> */}
        </>
        :
        <Spinner />
      }
    </main>
  )
}

export default SingleMusical