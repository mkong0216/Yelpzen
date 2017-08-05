import React from 'react'
import PropTypes from 'prop-types'
import Map from './Map'

class MapContainer extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		config: PropTypes.object.isRequired
	}

	render() {
		const { config } = this.props
		return(
			<div className={this.props.className}>
				<Map 
					config={config}
					center={config.map.center}
					zoom={config.map.zoom}
				/>
			</div>
		)
	}
}

export default MapContainer