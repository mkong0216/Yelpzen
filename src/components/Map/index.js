/* global Tangram */
import React from 'react'
import PropTypes from 'prop-types'
import { Map as Leaflet } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './Map.css'

const ATTRIBUTION = '<a href="https://mapzen.com/">Mapzen</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, <a href="https://whosonfirst.mapzen.com#License">Who’s on First</a>'

class Map extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		center: PropTypes.array,
		zoom: PropTypes.number,
		config: PropTypes.object.isRequired
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

	render() {
		const { className, center, zoom } = this.props
		return(
			<Leaflet
				className={className}
				center={center}
				zoom={zoom}
				ref={(ref) => { this.map = ref}}
			/>
		)
	}
}

export default Map