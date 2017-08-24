import config from './config'
import store from './store'
import { setLocality, setGeolocation } from './store/actions/locality'
import { setMapView } from './store/actions/map'

export function geolocateMe() {
	const geolocation = window.navigator.geolocation
	geolocation.getCurrentPosition(onGeolocateSuccess, error)
}

export function onGeolocateSuccess(position) {
	const latlng = [position.coords.latitude, position.coords.longitude]
	getHierarchies(latlng)
}

export function error() {
	alert('Could not find your geolocation')
}

export function getHierarchies(latlng) {
	const endpoint = `https://whosonfirst-api.mapzen.com/?method=whosonfirst.places.getHierarchiesByLatLon&api_key=${config.mapzen.apiKey}&latitude=${latlng[0]}&longitude=${latlng[1]}&placetype=neighbourhood&spr=1&extras=edtf:deprecated,geom:`
	window.fetch(endpoint)
		.then(response => response.json())
		.then((results) => {
			const hierarchies = results.hierarchies
			for (var i in hierarchies) {
				// Check if neighbourhood is deprecated on wof
				if (hierarchies[i].neighbourhood["edtf:deprecated"] !== '') {
					// If deprecated, remove from array (do not store in redux)
					hierarchies.splice(i, 1)
				}
			}
			const label = hierarchies[0].neighbourhood['wof:name'] + ', ' + hierarchies[0].locality['wof:name']
			const neighbourhood = {
				name: hierarchies[0].neighbourhood['wof:name'],
				id: hierarchies[0].neighbourhood['wof:id'],
				latlng: [hierarchies[0].neighbourhood['geom:latitude'], hierarchies[0].neighbourhood['geom:longitude']]
			}
			store.dispatch(setLocality(label, neighbourhood))
			const pathname = window.location.pathname
			if (!pathname.includes('venue')) { store.dispatch(setMapView(latlng, 12)) }
			store.dispatch(setGeolocation({latlng: latlng, label: label}))
		})
}

export function getVenuesByTag(category, venues) {
	return venues.filter(function(venue) {
		if (venue['sg:classifiers'].length !== 0 && venue['sg:classifiers'][0].category === category) {
			return venue
		} 
	})
}

export function compare(a, b) {
	const categories = {
		'Restaurant': 1,
		'Bars & Pubs': 1,
		'Food & Beverages': 1,
		'Coffee & Tea': 1,
		'Food & Drink': 1,
		'Deli': 1,
		'Fast Food': 1,
		'Cafe': 1,
		'Bakery': 1,
		'Cinema': 2,
		'Museum': 2,
		'Arts & Performances': 2,
		'Recreation': 2,
		'Shopping': 2
	}
	const categoryA = (a['sg:classifiers'].length === 0) ? '' : a['sg:classifiers'][0].category 
	const categoryB = (b['sg:classifiers'].length === 0) ? '' : b['sg:classifiers'][0].category 
	if (!(categoryA in categories)) { 
		categories[categoryA] = 3
	}
	if (!(categoryB in categories)) {
		categories[categoryB] = 3
	}
	return categories[categoryA] - categories[categoryB]
}

export function getDescendants(id) {
	const endpoint = `https://whosonfirst-api.mapzen.com/?method=whosonfirst.places.getDescendants&api_key=${config.mapzen.apiKey}&id=${id}&placetype=venue&iscurrent=1&exclude=nullisland&per_page=500&extras=wof:tags,addr:,sg:classifiers,geom:latitude,geom:longitude`
	return endpoint
}

export function getInfo(id) {
	const endpoint = `https://whosonfirst-api.mapzen.com/?method=whosonfirst.places.getInfo&api_key=${config.mapzen.apiKey}&id=${id}&extras=wof:tags,addr:,sg:,geom:latitude, geom:longitude`
	return endpoint
}

export function search(query) {
	const endpoint = `https://search.mapzen.com/v1/search?text=${query}&api_key=${config.mapzen.apiKey}`
	return endpoint
}
