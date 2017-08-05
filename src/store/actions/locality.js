import { SET_LOCALITY } from '../actions'

export function setLocality(label, neighbourhood) {
	return {
		type: SET_LOCALITY,
		label,
		neighbourhood
	}
}