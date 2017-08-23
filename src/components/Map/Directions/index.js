import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { List, Icon, Button } from 'semantic-ui-react'
import polyline from '@mapbox/polyline'
import L from 'leaflet'
import { isEqual } from 'lodash'
import config from '../../../config'
import { displayDirections } from '../../../store/actions/map'
import { addWaypoints } from '../../../store/actions/markers'
import { search } from '../../../wofMethods'
import './Directions.css'

class Directions extends React.Component {
	static propTypes = {
		venue: PropTypes.string,
		addWaypoints: PropTypes.func.isRequired,
		markers: PropTypes.array,
		coordinates: PropTypes.array,
		geolocation: PropTypes.object,
		displayDirections: PropTypes.func.isRequired,
		directions: PropTypes.array
	}
	
	constructor(props) {
		super(props)
		this.state = {
			isEditing: false,
			startInput: '',
			isVisible: true
		}

		this.toggleVisibility = this.toggleVisibility.bind(this)
		this.renderStartPoint = this.renderStartPoint.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentWillUpdate(nextProps) {
		if (isEqual(this.props.venue, nextProps.venue)) { return } 
		this.setState({startInput: ''})
	}

	// Handles user changing start point for directions
	handleSubmit(event) {
		event.preventDefault()
		const endpoint = search(this.refs.startInput.value)
		this.makeRequest(endpoint)
	}

	makeRequest(endpoint) {
		window.fetch(endpoint)
			.then(response => response.json())
			.then((results) => {
				// Getting the new start point's latlng
				const label = results.features[0].properties.label
				const startPoint = results.features[0].geometry.coordinates
				const start = {
					latlng: L.latLng(startPoint[1], startPoint[0]),
					label: 'You are here'
				}

				// Adding a marker for the new start point, and removing the old one
				this.props.addWaypoints([start, this.props.markers[1]])
				this.setState({
					startInput: label,
					isEditing: false
				})
				const { coordinates } = this.props
				const directions = `https://valhalla.mapzen.com/route?json={"locations":[{"lat":${startPoint[1]},"lon":${startPoint[0]}},{"lat":${coordinates[0]},"lon":${coordinates[1]}}],"costing":"multimodal"}&api_key=${config.mapzen.apiKey}`
				this.getDirections(directions)
			})
	}

	// If not editing, return a simple list header
	// If editing, return form component
	renderStartPoint() {
		if (this.state.isEditing) {
			return (
				<form onSubmit={this.handleSubmit}> 
					<input className='start_input' ref='startInput' />
				</form>
			)
		} else {
			return (
				<List.Header className='point'>
					{ this.state.startInput === '' ? this.props.geolocation.label : this.state.startInput }
					<Icon name='edit' className='edit' onClick={this.handleClick} />
				</List.Header>
			)
		}
	}

	// When edit button is clicked, set isEditing to true
	handleClick(event) {
		this.setState({ isEditing: true })
	}

	renderDirections(key, i) {
		return (
			<List.Item key={i}> 
				<List.Content> { key.instruction } </List.Content>
			</List.Item>
		)
	}

	toggleVisibility(event) {
		const directions = event.target.nextSibling
		this.setState({ isVisible: !this.state.isVisible })
		directions.classList.toggle('hidden')
	}

	getDirections(endpoint) {
		window.fetch(endpoint) 
			.then(response => response.json())
			.then((results) => {
				const segments = polyline.decode(results.trip.legs[0].shape, 6)
				this.props.displayDirections(results.trip.legs[0].maneuvers, segments)
			})
	}

	render() {
		const { directions } = this.props
		if (directions.length !== 0) { 
			return (
				<div className='direction-container'>
					<Icon name='bars' className='tab' onClick={this.toggleVisibility} />
					<List divided className='directions'>
						<List.Item> 
							<Icon name='map pin' />
							<List.Content>
								{ this.renderStartPoint() }
							</List.Content>
						</List.Item>
						{directions.map(this.renderDirections)}
						<List.Item> 
							<Icon name='map pin' />
							<List.Content>
								<List.Header className='point'> {this.props.venue} </List.Header>
							</List.Content>
						</List.Item>
					</List>
				</div>
			)
		} return null
	}
}

function mapStateToProps(state) {
	return {
		directions: state.map.directions,
		geolocation: state.locality.geolocation,
		coordinates: state.map.coordinates,
		markers: state.markers.waypoints,
		venue: state.venue
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({displayDirections, addWaypoints}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Directions)