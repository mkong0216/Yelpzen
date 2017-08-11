import { ADD_WAYPOINTS } from '../actions'

const initialState = {
	waypoints: []
}

const markers = (state = initialState, action) => {
	switch (action.type) {
		case ADD_WAYPOINTS:
			return {
				...state,
				waypoints: action.waypoints
			}
		default:
			return state
	}
}

export default markers