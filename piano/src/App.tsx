import React from 'react'
import './App.css'
import { Logo } from './components/Logo/Logo'
import { Footer } from './components/Footer/Footer'

function App() {
  return (
    <div className="app">
      <Logo />
      <main className="app-content"></main>
      <Footer />
    </div>
  )
}

export default App
