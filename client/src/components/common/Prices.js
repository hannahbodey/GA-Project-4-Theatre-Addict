import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound'

const Prices = ({ cost }) => {
  return (
    <>
      {cost === '£10-30' && <CurrencyPoundIcon sx={{ color: 'white', fontSize: 15 }} className='icon' />}
      {cost === '£31-50' && <CurrencyPoundIcon sx={{ color: 'white', fontSize: 20 }} className='icon' />}
      {cost === '£51-70' && <CurrencyPoundIcon sx={{ color: 'white', fontSize: 25 }} className='icon' />}
      {cost === '£71-90' && <CurrencyPoundIcon sx={{ color: 'white', fontSize: 30 }} className='icon' />}
      {cost === '£91-110' && <CurrencyPoundIcon sx={{ color: 'white', fontSize: 35 }} className='icon' />}
      {cost === '£111-150' && <CurrencyPoundIcon sx={{ color: 'white', fontSize: 40 }} className='icon' />}
      {cost === '£151-200' && <CurrencyPoundIcon sx={{ color: 'white', fontSize: 45 }} className='icon' />}
      {cost === '£201-250' || cost === '£251-300' || cost === '£301-350' || cost === '£351-400' || cost === '£401-500' && <CurrencyPoundIcon sx={{ color: 'white', fontSize: 50 }} className='icon' />}
    </>

  )
}

export default Prices