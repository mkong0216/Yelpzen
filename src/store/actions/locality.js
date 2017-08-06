import { SET_LOCALITY, RESET_LOCALITY } from '../actions'

export function setLocality(label, neighbourhood) {
	return {
		type: SET_LOCALITY,
		label,
		neighbourhood
	}
}

export function resetLocality(label, neighbourhood) {
	return {
		type: RESET_LOCALITY,
		label,
		neighbourhood
	}
}