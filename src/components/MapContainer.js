import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Map from './Map'

class MapContainer extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		config: PropTypes.object.isRequired
	}

	render() {
		const { config, map } = this.props
		return(
			<div className={this.props.className}>
				<Map config={config} center={map.coordinates} zoom={map.zoom} />
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		map: state.map,
	}
}

export default connect(mapStateToProps)(MapContainer)