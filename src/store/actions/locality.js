import { SET_LOCALITY, SET_GEOLOCATION } from '../actions'

export function setLocality(label, source, latlng) {
	return {
		type: SET_LOCALITY,
		label,
		source
	}
}

export function setGeolocation(geolocation) {
	return {
		type: SET_GEOLOCATION,
		geolocation
	}
}