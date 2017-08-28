import { CLEAR_APP, SET_CATEGORY, SET_VENUE, CLEAR_CATEGORY, CLEAR_VENUE } from '../actions'

const initialState = {
	category: false,
	venue: false
}

const app = (state = initialState, action) => {
	switch (action.type) {
		case CLEAR_APP:
			return {
				category: false,
				venue: false
			}
		case SET_CATEGORY:
			return {
				...state,
				category: true
			}
		case SET_VENUE:
			return {
				...state,
				venue: true
			}
		case CLEAR_CATEGORY:
			return {
				...state,
				category: false
			}
		case CLEAR_VENUE:
			return {
				...state,
				venue: false
			}
		default:
			return state
	}
}

export default app
