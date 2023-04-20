import { useEffect, useState, Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
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
import { Carousel } from 'react-responsive-carousel'
import Spinner from '../common/Spinner'

const Musicals = () => {
  const [musicals, setMusicals] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const getMusicals = async () => {
      try {
        const { data } = await axios.get('/api/musicals/')
        console.log(data)
        setMusicals(data)
      } catch (error) {
        setError(error.response.data.message)
      }
    }
    getMusicals()
  }, [])

  return (
    <main className='main-container'>
      <Carousel className='musicals-container' infiniteLoop={true} showStatus={false} useKeyboardArrows={true} transitionTime={800}>
        {musicals.length > 0 ?
          musicals.map((item, index) => {
            const { id, name, theatre, genre, website } = item
            return (
              <div key={id} className='musicals' value={index}>
                <Link to={`/musicals/${id}/`}>
                  <div className='musical-carousel' style={{ backgroundImage: `url(${musicals[index].picture_3})` }}>
                    <div className='musicals-title'>
                      <div className='titles'>
                        <h1 className='all-musicals'>{name}</h1>
                        <h2 className='all-musicals all-theatres'>{theatre}</h2>
                      </div>
                      <img className='logo-image' src={musicals[index].picture_1} />
                    </div>
                  </div>
                  <div className='icons-container'>
                    <div className='prices-container'>
                      <PaymentIcon sx={{ color: 'white', fontSize: 50 }} className='icon' />
                      {musicals[index].price_range.length > 0 ?
                        musicals[index].price_range.map(item => {
                          const { cost } = item
                          return (
                            <>
                              {cost === '£10-30' && <CurrencyPoundIcon sx={{ color: 'white', fontSize: 15 }} className='icon' />}
                              {cost === '£31-50' && <CurrencyPoundIcon sx={{ color: 'white', fontSize: 20 }} className='icon' />}
                              {cost === '£51-70' && <CurrencyPoundIcon sx={{ color: 'white', fontSize: 25 }} className='icon' />}
                              {cost === '£71-90' && <CurrencyPoundIcon sx={{ color: 'white', fontSize: 30 }} className='icon' />}
                              {cost === '£91-110' && <CurrencyPoundIcon sx={{ color: 'white', fontSize: 35 }} className='icon' />}
                              {cost === '£111-150' && <CurrencyPoundIcon sx={{ color: 'white', fontSize: 40 }} className='icon' />}
                              {cost === '£151-200' && <CurrencyPoundIcon sx={{ color: 'white', fontSize: 45 }} className='icon' />}
                              {cost === '£201-250' || cost === '£251-300' || cost === '£301-350' || cost === '£351-400' || cost === '£401-500' && <CurrencyPoundIcon sx={{ color: 'white', fontSize: 50 }} className='icon' />}
                            </>
                          )
                        })
                        :
                        <></>
                      }
                    </div>
                    <div className='genres-container'>
                      <TheaterComedyIcon sx={{ color: 'white', fontSize: 50 }} className='icon' />
                      {genre.length > 0 ?
                        genre.map(item => {
                          const { category } = item
                          return (
                            <>
                              {category === 'Comedy' && <SentimentSatisfiedAltIcon sx={{ color: 'white', fontSize: 50 }} className='icon' />}
                              {category === 'Tragedy' && <SentimentVeryDissatisfiedIcon sx={{ color: 'white', fontSize: 50 }} className='icon' />}
                              {category === 'Romance' && <FavoriteIcon sx={{ color: 'white', fontSize: 50 }} className='icon' />}
                              {category === 'Historical' && <HistoryEduIcon sx={{ color: 'white', fontSize: 50 }} className='icon' />}
                              {category === 'Dramatic' && <MovieIcon sx={{ color: 'white', fontSize: 50 }} className='icon' />}
                              {category === 'Revival' && <ElderlyIcon sx={{ color: 'white', fontSize: 50 }} className='icon' />}
                              {category === 'New' && <ChildFriendlyIcon sx={{ color: 'white', fontSize: 50 }} className='icon' />}
                            </>
                          )
                        })
                        :
                        <></>
                      }
                    </div>
                  </div>
                </Link>
              </div>
            )
          })
          :
          <Spinner />
        }
      </Carousel>
    </main>
  )
}

export default Musicals
