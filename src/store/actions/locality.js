import { SET_LOCALITY } from '../actions'

export function setLocality(label, source) {
	return {
		type: SET_LOCALITY,
		label,
		source
	}
}