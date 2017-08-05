import config from '../../config'
import { SET_MAP_VIEW } from '../actions'

const initialState = {
	coordinates: config.map.center,
	zoom: config.map.zoom
}

const map = (state = initialState, action) => {
	switch (action.type) {
		case SET_MAP_VIEW:
			return {
				...state,
				coordinates: action.latlng,
				zoom: action.zoom
			}
		default:
			return state
	}
}

export default map