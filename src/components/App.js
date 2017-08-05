import React, { Component } from 'react'
import { Provider } from 'react-redux'
import AppHeader from './AppHeader'
import config from '../config'
import Sidebar from './Sidebar'
import MapContainer from './MapContainer'
import store from '../store'
import './App.css'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <AppHeader className='App-header' config={config} />
          <Sidebar className='sidebar-container' />
          <MapContainer className='map-container' config={config} />
        </div>
      </Provider>
    )
  }
}

export default App
