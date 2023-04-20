import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/musicals')
  }

  return (
    <button className='button-common' onClick={handleClick}>⬅Back</button>
  )
}

export default BackButton