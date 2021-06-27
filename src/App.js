import React from 'react'
import './App.scss'
import Hero from './components/Hero'

class App extends React.Component {
  state = {}
  render() {
    return (
      <div className="app">
        <Hero />
      </div>
    )
  }
}

export default App
