import React from 'react'
import { Polyline } from 'react-leaflet'
import { connect } from 'react-redux'

class Route extends React.Component {
	render() {
		if (!this.props.segments || this.props.segments.length === 0) { return null }
		return (
			<Polyline 
				positions={this.props.segments}
				color='#ff4947'
				weight={4}
			/>
		)
	}
}

function mapStateToProps(state) {
	return {
		segments: state.map.segments
	}
}

export default connect(mapStateToProps)(Route)