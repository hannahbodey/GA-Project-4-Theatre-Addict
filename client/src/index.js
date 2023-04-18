import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import App from './App'

createRoot(document.getElementById('root')).render(<App />)