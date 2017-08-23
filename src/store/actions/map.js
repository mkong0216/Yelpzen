import { SET_MAP_VIEW, DISPLAY_DIRECTIONS, CLEAR_DIRECTIONS } from '../actions'

export function setMapView(latlng, zoom) {
	return {
		type: SET_MAP_VIEW,
		latlng,
		zoom
	}
}

export function displayDirections(directions, segments) {
	return {
		type: DISPLAY_DIRECTIONS,
		directions,
		segments
	}
}

export function clearDirections() {
	return {
		type: CLEAR_DIRECTIONS
	}
}