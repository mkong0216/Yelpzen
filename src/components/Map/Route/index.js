import React from 'react'
import { Polyline } from 'react-leaflet'
import { connect } from 'react-redux'

const Route = (props) => {
	if (!props.segments || props.segments.length === 0) { return null }
	return (
		<Polyline 
			positions={props.segments}
			color='#ff4947'
			weight={4}
		/>
	)
}

function mapStateToProps(state) {
	return {
		segments: state.map.segments
	}
}

export default connect(mapStateToProps)(Route)