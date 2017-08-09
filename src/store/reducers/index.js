import { combineReducers } from 'redux'
import locality from './locality'
import map from './map'
import reviews from './reviews'

const reducers = combineReducers({
	locality,
	map,
	reviews
})

export default reducers