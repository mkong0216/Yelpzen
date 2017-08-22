/* global Tangram */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Map as Leaflet } from 'react-leaflet'
import L from 'leaflet'
import { isEqual } from 'lodash'
import 'leaflet-extra-markers'
import Route from './Route'
import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css'
import 'leaflet/dist/leaflet.css'
import './Map.css'

const ATTRIBUTION = '<a href="https://mapzen.com/">Mapzen</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, <a href="https://whosonfirst.mapzen.com#License">Who’s on First</a>'

class Map extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		center: PropTypes.array,
		zoom: PropTypes.number,
		config: PropTypes.object.isRequired,
		waypoints: PropTypes.array,
		segments: PropTypes.array
	}

	constructor(props) {
		super(props)

		this.state = {
			markersLayer: new L.LayerGroup() 
		}
	}
	
	componentDidMount() {
		const layer = Tangram.leafletLayer({
      		scene: {
        		import: [
        			`https://mapzen.com/carto/bubble-wrap-style-more-labels/7/bubble-wrap-style-more-labels.zip`
        		],
        		global: {
          			'sdk_mapzen_api_key': this.props.config.mapzen.apiKey
        		}
      		},
      		attribution: ATTRIBUTION
    	})

    	layer.addTo(this.map.leafletElement)
	}

	componentWillReceiveProps(nextProps) {
		if (isEqual(this.props.waypoints, nextProps.waypoints) && isEqual(this.props.segments, nextProps.segments)) { return }
		const layer = this.state.markersLayer
		layer.clearLayers()
		this.createMarkers(nextProps.waypoints)
	}

	createMarkers(waypoints) {
		const icon = L.ExtraMarkers.icon({
			icon: 'circle',
			prefix: 'map-marker icon',
			markerColor: 'purple'
		})
		const layer = this.state.markersLayer
		waypoints.map((key, i) => {
			const marker = L.marker(key.latlng, {icon})
			marker.bindPopup(key.label).openPopup()
			return layer.addLayer(marker)
		})
		layer.addTo(this.map.leafletElement)
	}

	render() {
		const { className, center, zoom } = this.props
		return(
			<Leaflet
				className={className}
				center={center}
				zoom={zoom}
				ref={(ref) => { this.map = ref}}
			>
				<Route />
			</Leaflet>
		)
	}
}

function mapStateToProps(state) {
	return {
		waypoints: state.markers.waypoints
	}
}

export default connect(mapStateToProps)(Map)