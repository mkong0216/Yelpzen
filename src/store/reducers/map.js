import config from '../../config'
import { SET_MAP_VIEW, DISPLAY_DIRECTIONS, CLEAR_DIRECTIONS } from '../actions'

const initialState = {
	coordinates: config.map.center,
	zoom: config.map.zoom,
	directions: [],
	location: ''
}

const map = (state = initialState, action) => {
	switch (action.type) {
		case SET_MAP_VIEW:
			console.log('setting map view')
			return {
				...state,
				coordinates: action.latlng,
				zoom: action.zoom
			}
		case DISPLAY_DIRECTIONS:
			return {
				...state,
				directions: action.directions,
				location: action.name
			}
		case CLEAR_DIRECTIONS:
			return {
				...state,
				directions: [],
				location: ''
			}
		default:
			return state
	}
}

export default map