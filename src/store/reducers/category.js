import { SET_CATEGORY, CLEAR_CATEGORY } from '../actions'

const category = (state = '', action) => {
	switch (action.type) {
		case SET_CATEGORY:
			return action.category
		case CLEAR_CATEGORY: 
			return ''
		default:
			return state
	}
}

export default category