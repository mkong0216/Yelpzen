import { SET_VENUES } from '../actions'

const initialState = {
	venues: []
}

const venues = (state = initialState, action) => {
	switch (action.type) {
		case SET_VENUES:
			console.log('storing venues')
			return {
				...state,
				venues: action.venues
			}
		default:
			return state
	}
}

export default venues