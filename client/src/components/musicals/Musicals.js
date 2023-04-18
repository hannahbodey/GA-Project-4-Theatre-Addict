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
      <Carousel className='musicals-container'>
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
