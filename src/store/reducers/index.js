import { combineReducers } from 'redux'
import locality from './locality'
import map from './map'
import reviews from './reviews'
import markers from './markers'
import venue from './venue'

const reducers = combineReducers({
	locality,
	map,
	reviews,
	markers,
	venue
})

export default reducers