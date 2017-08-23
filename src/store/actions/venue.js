import { SET_VENUE, CLEAR_VENUE } from '../actions'

export function setVenue(label) {
	return {
		type: SET_VENUE,
		label
	}
}

export function clearVenue() {
	return {
		type: CLEAR_VENUE
	}
}