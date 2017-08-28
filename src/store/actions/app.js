import { CLEAR_APP, SET_CATEGORY, SET_VENUE, CLEAR_CATEGORY, CLEAR_VENUE } from '../actions'

export function clearApp() {
	return {
		type: CLEAR_APP
	}
}

export function setCategory() {
	return {
		type: SET_CATEGORY
	}
}

export function setVenue() {
	return {
		type: SET_VENUE
	}
}

export function clearCategory() {
	return {
		type: CLEAR_CATEGORY
	}
}

export function clearVenue() {
	return {
		type: CLEAR_VENUE
	}
}

