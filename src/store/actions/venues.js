import { SET_VENUES } from '../actions'

export function setVenues(venues) {
	return {
		type: SET_VENUES,
		venues
	}
}