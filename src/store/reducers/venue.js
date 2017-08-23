import { SET_VENUE, CLEAR_VENUE } from '../actions'

const venue = (state = '', action) => {
	switch (action.type) {
		case SET_VENUE:
			return action.label
		case CLEAR_VENUE:
			return ''
		default: 
			return state
	}
}

export default venue