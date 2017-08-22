import { SET_LOCALITY, SET_GEOLOCATION } from '../actions'

export function setLocality(label, source) {
	return {
		type: SET_LOCALITY,
		label,
		source
	}
}

export function setGeolocation(geolocation, label) {
	return {
		type: SET_GEOLOCATION,
		geolocation,
		label
	}
}