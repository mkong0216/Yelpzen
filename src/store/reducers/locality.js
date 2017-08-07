import { SET_LOCALITY } from '../actions'

const initialState = {
	label: '',
	source: null
}

const locality = (state = initialState, action) => {
	switch (action.type) {
		case SET_LOCALITY:
			console.log('setting locality')
			return {
				...state,
				label: action.label,
				source: action.source
			}
		default:
			return state
	}
}

export default locality