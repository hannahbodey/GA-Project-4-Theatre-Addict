import { useState } from 'react'
import { useNavigate } from 'react-router'

const Home = () => {
  const navigate = useNavigate()
  const [isActive, setActive] = useState(true)
  
  const handleClick = () => {
    setActive(!isActive)
  }

  const handleMusicalLoad = () => {
    navigate('/musicals')
  }

  return (
    <div className='curtain'>
      <div className='curtain-wrapper'>
        <input type='checkbox' className={isActive ? 'checkbox checked' : 'hidden'} onClick={handleClick} checked={true} />
        <div className='curtain-panel curtain-panel-left'></div>
        <div className='curtain-prize'>
          <div className='curtain-prize-one'></div>
          <div className='curtain-invitation'>
            <div className='button-container'>
              <button className='entry-button' onClick={handleMusicalLoad}>Come on in!</button>
            </div>
          </div>
        </div>
        <div className='curtain-panel curtain-panel-right'>
        </div>
      </div>
    </div>
  )
}

export default Home