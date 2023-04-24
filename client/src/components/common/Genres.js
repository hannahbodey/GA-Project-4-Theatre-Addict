import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import MovieIcon from '@mui/icons-material/Movie'
import ElderlyIcon from '@mui/icons-material/Elderly'
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly'

const Genres = ({ category }) => {
  return (
    <>
      {category === 'Comedy' && <SentimentSatisfiedAltIcon sx={{ color: 'white', fontSize: 35 }} className='icon' />}
      {category === 'Tragedy' && <SentimentVeryDissatisfiedIcon sx={{ color: 'white', fontSize: 35 }} className='icon' />}
      {category === 'Romance' && <FavoriteIcon sx={{ color: 'white', fontSize: 35 }} className='icon' />}
      {category === 'Historical' && <HistoryEduIcon sx={{ color: 'white', fontSize: 35 }} className='icon' />}
      {category === 'Dramatic' && <MovieIcon sx={{ color: 'white', fontSize: 35 }} className='icon' />}
      {category === 'Revival' && <ElderlyIcon sx={{ color: 'white', fontSize: 35 }} className='icon' />}
      {category === 'New' && <ChildFriendlyIcon sx={{ color: 'white', fontSize: 35 }} className='icon' />}
    </>
  )
}

export default Genres