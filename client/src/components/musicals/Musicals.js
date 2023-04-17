import { useEffect } from 'react'
import axios from 'axios'

const Musicals = () => {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/musicals/')
      console.log(data)
    }
    getData()
  })
  return (
    <p>Musicals page</p>
  )
}

export default Musicals
