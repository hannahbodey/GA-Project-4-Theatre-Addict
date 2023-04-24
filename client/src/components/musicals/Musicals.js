import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy'
import PaymentIcon from '@mui/icons-material/Payment'
import { Carousel } from 'react-responsive-carousel'
import Spinner from '../common/Spinner'
import Prices from '../common/Prices'
import Genres from '../common/Genres'

const Musicals = () => {
  const [musicals, setMusicals] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const getMusicals = async () => {
      try {
        const { data } = await axios.get('/api/musicals/')
        setMusicals(data)
      } catch (error) {
        setError(error.response.data.message)
      }
    }
    getMusicals()
  }, [])

  return (
    <main className='main-container'>
      <Carousel className='musicals-container' infiniteLoop={true} showStatus={false} useKeyboardArrows={true} showThumbs={false} transitionTime={800}>
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
                              <Prices cost={cost} />
                            </>
                          )
                        })
                        :
                        <></>
                      }
                    </div>
                    <div className='genres-container'>
                      {genre.length > 0 ?
                        genre.map(item => {
                          const { category } = item
                          return (
                            <>
                              <Genres category={category} />
                            </>
                          )
                        })
                        :
                        <></>
                      }
                      <TheaterComedyIcon sx={{ color: 'white', fontSize: 50 }} className='icon' />
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
