import config from './config'
import store from './store'
import { setLocality } from './store/actions/locality'
import { setMapView } from './store/actions/map'

export function geolocateMe() {
	const geolocation = window.navigator.geolocation
	geolocation.getCurrentPosition(onGeolocateSuccess)
}

export function onGeolocateSuccess(position) {
	const latlng = [position.coords.latitude, position.coords.longitude]
	store.dispatch(setMapView(latlng, 10))
	getHierarchies(latlng)
}

export function getHierarchies(latlng) {
	const endpoint = `https://whosonfirst-api.mapzen.com/?method=whosonfirst.places.getHierarchiesByLatLon&api_key=${config.mapzen.apiKey}&latitude=${latlng[0]}&longitude=${latlng[1]}&placetype=neighbourhood&spr=1&extras=edtf:deprecated`
	window.fetch(endpoint)
		.then(response => response.json())
		.then((results) => {
			const hierarchies = results.hierarchies
			for (var i in hierarchies) {
				// Check if neighbourhood is deprecated on wof
				if (hierarchies[i].neighbourhood["edtf:deprecated"] !== '') {
					// If deprecated, remove from array (do not store in redux)
					hierarchies.splice(i, 1)
				} else {
					// If not, store locality name and neighbourhood name/id in redux
					const neighbourhood = {
						name: hierarchies[i].neighbourhood["wof:name"],
						id: hierarchies[i].neighbourhood["wof:id"]
					}
					const locality = hierarchies[i].locality["wof:name"]
					const label = neighbourhood.name + ', ' + locality
					store.dispatch(setLocality(label, neighbourhood))
				}
			}
		})
}