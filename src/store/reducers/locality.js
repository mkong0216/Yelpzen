import { SET_LOCALITY, SET_GEOLOCATION } from '../actions'

const initialState = {
	label: '',
	source: null,
	geolocation: {}
}

const locality = (state = initialState, action) => {
	switch (action.type) {
		case SET_LOCALITY:
			return {
				...state,
				label: action.label,
				source: action.source
			}
		case SET_GEOLOCATION:
			return {
				...state,
				geolocation: action.geolocation
			}
		default:
			return state
	}
}

export default locality