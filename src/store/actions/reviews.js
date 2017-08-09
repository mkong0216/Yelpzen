import { ADD_REVIEW } from '../actions'

export function addReview(id, review) {
	return {
		type: ADD_REVIEW,
		id,
		review
	}
}