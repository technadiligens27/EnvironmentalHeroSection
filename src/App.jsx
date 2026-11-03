import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Experience from './Experience/Experience'
import HoverMeButton from './HoverMeButton/HoverMeButton'
import HeroSection from './HeroSection/HeroSection'
import Navbar from './Navbar/Navbar'

function App() {

  return (
    <div className='app'>
      {/* <Experience/> */}
      {/* <HoverMeButton/> */}
      <Navbar/>
      <HeroSection/>
               {/* <Experience/> */}

    </div>
  )
}

export default App
