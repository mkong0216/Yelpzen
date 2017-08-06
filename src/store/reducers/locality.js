import { SET_LOCALITY, RESET_LOCALITY } from '../actions'

const initialState = {
	label: '',
	neighbourhoods: []
}

const locality = (state = initialState, action) => {
	switch (action.type) {
		case SET_LOCALITY:
			console.log('setting locality')
			return {
				...state,
				label: action.label,
				neighbourhoods: [...state.neighbourhoods, action.neighbourhood]
			}
		case RESET_LOCALITY: 
			return {
				...state,
				label: action.label,
				neighbourhoods: [action.neighbourhood]
			}
		default:
			return state
	}
}

export default locality