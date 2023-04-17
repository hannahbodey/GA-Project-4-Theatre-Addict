import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

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
      <div className='musicals-container'>
        {musicals.length > 0 ?
          musicals.map(item => {
            const { id, name, theatre, genre } = item
            return (
              <div key={id} className='musicals'>
                <Link to={`/musicals/${id}/`}>
                  <Card>
                    <Card.Body>
                      <Card.Text>{name}</Card.Text>
                      <Card.Text>{theatre}</Card.Text>
                      {/* font awesome icons to represent the different genres */}
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            )
          })
          :
          <p>This is a musicals page.</p>
        }
      </div>
    </main>
  )
}

export default Musicals
