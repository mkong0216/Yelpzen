import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import AppHeader from './AppHeader'
import config from '../config'
import Sidebar from './Sidebar'
import VenueSidebar from './VenueSidebar'
import MapContainer from './MapContainer'
import store from '../store'

import './App.css'

class App extends Component {
  render() {
    console.log('mounting app')
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className='App'>
            <AppHeader className='App-header' config={config} />
            <Route exact path='/' render={() => <Sidebar className='sidebar-container' />} />
            <Route path = '/venue/:venueName/:venueID' render={() => <VenueSidebar className='sidebar-container' />} />
            <MapContainer className='map-container' config={config} />
          </div>
        </Provider>
      </BrowserRouter>
    )
  }
}

export default App
