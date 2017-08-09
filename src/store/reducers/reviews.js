import { ADD_REVIEW } from '../actions'

const initialState = {
	venues: {}
}

function addReview(state = [], action) {
	return [...state, action.review]
}

const reviews = (state = initialState, action) => {
	switch (action.type) {
		case ADD_REVIEW: 
			return {
				...state,
				venues: {...state.venues, 
					[action.id]: addReview(state.venues[action.id], action)
				}
			}
		default:
			return state
	}
}

export default reviews