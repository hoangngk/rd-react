import React from 'react'
import './App.css'
import { Logo } from './components/Logo/Logo'
import { Footer } from './components/Footer/Footer'
import { Main } from './components/Main/Main'

function App() {
  return (
    <div className="app">
      <Logo />
      <main className="app-content">
        <Main />
      </main>
      <Footer />
    </div>
  )
}

export default App
