import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound'

const PricesSingle = ({ cost }) => {
  return (
    <>
      {cost === '£10-30' && <p>{cost} <span><CurrencyPoundIcon sx={{ color: 'white', fontSize: 15 }} className='icon' /></span></p>}
      {cost === '£31-50' && <p>{cost} <span><CurrencyPoundIcon sx={{ color: 'white', fontSize: 20 }} className='icon' /></span></p>}
      {cost === '£51-70' && <p>{cost} <span><CurrencyPoundIcon sx={{ color: 'white', fontSize: 25 }} className='icon' /></span></p>}
      {cost === '£71-90' && <p>{cost} <span><CurrencyPoundIcon sx={{ color: 'white', fontSize: 30 }} className='icon' /></span></p>}
      {cost === '£91-110' && <p>{cost} <span><CurrencyPoundIcon sx={{ color: 'white', fontSize: 35 }} className='icon' /></span></p>}
      {cost === '£111-150' && <p>{cost} <span><CurrencyPoundIcon sx={{ color: 'white', fontSize: 40 }} className='icon' /></span></p>}
      {cost === '£151-200' && <p>{cost} <span><CurrencyPoundIcon sx={{ color: 'white', fontSize: 45 }} className='icon' /></span></p>}
      {cost === '£201-250' || cost === '£251-300' || cost === '£301-350' || cost === '£351-400' || cost === '£401-500' && <p>Could be a bit pricey... <span><CurrencyPoundIcon sx={{ color: 'white', fontSize: 50 }} className='icon' /></span></p>}
    </>
  )
}

export default PricesSingle