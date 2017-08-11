import { ADD_WAYPOINTS } from '../actions'

export function addWaypoints(waypoints) {
	return {
		type: ADD_WAYPOINTS,
		waypoints
	}
}
