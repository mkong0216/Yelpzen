import { combineReducers } from 'redux'
import locality from './locality'
import map from './map'

const reducers = combineReducers({
	locality,
	map,
})

export default reducers