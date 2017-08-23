import config from '../../config'
import { SET_MAP_VIEW, DISPLAY_DIRECTIONS, CLEAR_DIRECTIONS } from '../actions'

const initialState = {
	coordinates: config.map.center,
	zoom: config.map.zoom,
	directions: [],
	segments: []
}

const map = (state = initialState, action) => {
	switch (action.type) {
		case SET_MAP_VIEW:
			return {
				...state,
				coordinates: action.latlng,
				zoom: action.zoom
			}
		case DISPLAY_DIRECTIONS:
			return {
				...state,
				directions: action.directions,
				segments: action.segments
			}
		case CLEAR_DIRECTIONS:
			return {
				...state,
				directions: [],
				segments: []
			}
		default:
			return state
	}
}

export default map