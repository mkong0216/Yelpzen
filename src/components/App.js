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
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className='App'>
            <AppHeader className='App-header' config={config} />
            <Route path = '/' render={() => <Sidebar className='sidebar-container' /> } />
            <Route exact path = '/venue/:venueName/:venueID' render={(match) => <VenueSidebar className='sidebar-container' {...match} /> }/>
            <MapContainer className='map-container' config={config} />
          </div>
        </Provider>
      </BrowserRouter>
    )
  }
}

export default App
