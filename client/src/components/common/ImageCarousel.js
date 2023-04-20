import { Carousel } from 'react-responsive-carousel'
import { useEffect, useState } from 'react'
import axios from 'axios'

const ImageCarousel = () => {
  const [pictures, setPictures] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const getPictures = async () => {
      try {
        const { data } = await axios.get('/api/musicals/')
        console.log(data)
        setPictures(data)
      } catch (error) {
        setError(error.response.data.message)
      }
    }
    getPictures()
  }, [])

  return (
    <div className='form-carousel'>
      <Carousel autoPlay={true} infiniteLoop={true} showArrows={false} showStatus={false} showIndicators={false} showThumbs={false} interval={5000} >
        {pictures.length > 0 ?
          pictures.map((item, index) => {
            const { id } = item
            return (
              <div className='register-carousel' key={id}>
                <img className='register-carousel-image' src={pictures[index].picture_1} alt='musical logo' />
              </div>
            )
          })
          :
          <></>
        }
      </Carousel>
    </div>

  )
}

export default ImageCarousel