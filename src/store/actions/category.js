import { SET_CATEGORY, CLEAR_CATEGORY } from '../actions'

export function setCategory(category) {
	return {
		type: SET_CATEGORY,
		category
	}
} 

export function clearCategory() {
	return {
		type: CLEAR_CATEGORY
	}
}