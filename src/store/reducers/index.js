import { combineReducers } from 'redux'
import locality from './locality'
import map from './map'
import venues from './venues'

const reducers = combineReducers({
	locality,
	map,
	venues
})

export default reducers