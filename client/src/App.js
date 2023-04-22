import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/auth/Register'
import LogIn from './components/auth/Login'
import Profile from './components/auth/ProfileView'
import Musicals from './components/musicals/Musicals'
import SingleMusical from './components/musicals/SingleMusical'
import Comment from './components/musicals/Comments'
import EditComment from './components/musicals/EditComment'
import Home from './components/Home'
import Footer from './components/common/Footer'
import Messages from './components/auth/Messages'

const App = () => {
  return (
    <div className='site-wrapper'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/musicals' element={<Musicals />}/>
          <Route path='/musicals/:musicalid' element={<SingleMusical />}/>
          <Route path='/musicals/:musicalid/comments' element={<Comment />}/>
          <Route path='/musicals/:musicalid/comments/:commentid' element={<EditComment />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<LogIn />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/messages' element={<Messages />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
