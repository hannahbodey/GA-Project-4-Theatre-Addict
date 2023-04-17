import { useNavigate } from 'react-router'

const Home = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/musicals')
  }
  
  return (
    <>
      <button className='button' onClick={handleClick}>happy musicals</button>
      <button className='button' onClick={handleClick}>sad musicals</button>
    </>
  )
}

export default Home