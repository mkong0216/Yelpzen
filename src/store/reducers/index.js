import { combineReducers } from 'redux'
import locality from './locality'
import map from './map'
import reviews from './reviews'
import markers from './markers'
import app from './app'

const reducers = combineReducers({
	locality,
	map,
	reviews,
	markers,
	app
})

export default reducers