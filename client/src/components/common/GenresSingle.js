import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import MovieIcon from '@mui/icons-material/Movie'
import ElderlyIcon from '@mui/icons-material/Elderly'
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly'

const GenresSingle = ({ category }) => {
  return (
    <>
      {category === 'Comedy' && <p>{category} <span><SentimentSatisfiedAltIcon sx={{ color: 'white', fontSize: 20 }} className='icon' /></span></p>}
      {category === 'Tragedy' && <p>{category} <span><SentimentVeryDissatisfiedIcon sx={{ color: 'white', fontSize: 20 }} className='icon' /></span></p>}
      {category === 'Romance' && <p>{category} <span><FavoriteIcon sx={{ color: 'white', fontSize: 20 }} className='icon' /></span></p>}
      {category === 'Historical' && <p>{category} <span><HistoryEduIcon sx={{ color: 'white', fontSize: 20 }} className='icon' /></span></p>}
      {category === 'Dramatic' && <p>{category} <span><MovieIcon sx={{ color: 'white', fontSize: 20 }} className='icon' /></span></p>}
      {category === 'Revival' && <p>{category} <span><ElderlyIcon sx={{ color: 'white', fontSize: 20 }} className='icon' /></span></p>}
      {category === 'New' && <p>{category} <span><ChildFriendlyIcon sx={{ color: 'white', fontSize: 20 }} className='icon' /></span></p>}
    </>
  )
}

export default GenresSingle