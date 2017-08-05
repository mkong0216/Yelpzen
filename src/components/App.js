import React, { Component } from 'react'
import AppHeader from './AppHeader'
import config from '../config'
import Sidebar from './Sidebar'
import MapContainer from './MapContainer'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <AppHeader className='App-header' config={config} />
        <Sidebar className='sidebar-container' />
        <MapContainer className='map-container' config={config} />
      </div>
    )
  }
}

export default App
