import { combineReducers } from 'redux'
import locality from './locality'
import map from './map'
import reviews from './reviews'
import markers from './markers'
import venue from './venue'
import category from './category'

const reducers = combineReducers({
	locality,
	map,
	reviews,
	markers,
	venue,
	category
})

export default reducers