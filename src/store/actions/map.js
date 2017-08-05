import { SET_MAP_VIEW } from '../actions'

export function setMapView(latlng, zoom) {
	return {
		type: SET_MAP_VIEW,
		latlng,
		zoom
	}
}