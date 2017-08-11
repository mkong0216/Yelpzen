import { combineReducers } from 'redux'
import locality from './locality'
import map from './map'
import reviews from './reviews'
import markers from './markers'

const reducers = combineReducers({
	locality,
	map,
	reviews,
	markers
})

export default reducers