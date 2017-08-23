import React from 'react'
import { isEqual } from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import L from 'leaflet'
import { Header, Label, List, Button } from 'semantic-ui-react'
import polyline from '@mapbox/polyline'
import config from '../../config'
import { setMapView, displayDirections } from '../../store/actions/map'
import { addWaypoints } from '../../store/actions/markers'
import { setVenue } from '../../store/actions/venue'
import { getInfo } from '../../wofMethods'

class VenueSpot extends React.Component {
	static propTypes = {
		id: PropTypes.string,
		setMapView: PropTypes.func.isRequired,
		displayDirections: PropTypes.func.isRequired,
		addWaypoints: PropTypes.func.isRequired,
		name: PropTypes.string,
		coordinates: PropTypes.array,
		geolocation: PropTypes.object
	}

	constructor(props) {
		super(props)

		this.state = {
			address: '',
			tags: [],
			categories: {},
			phone: '',
			website: ''
		}

		const endpoint = getInfo(this.props.id)
		this.makeRequest(endpoint)

		this.makeRequest = this.makeRequest.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}

	componentWillMount() { this.props.setVenue(this.props.name) }
	
	componentWillReceiveProps(nextProps) {
		if (isEqual(nextProps.id, this.props.id)) { return }
		const endpoint = getInfo(nextProps.id)
		this.makeRequest(endpoint)
	}

	makeRequest(endpoint) {
		window.fetch(endpoint)
			.then(response => response.json())
			.then((results) => {
				const latlng = [results.place['geom:latitude'], results.place['geom:longitude']]
				this.props.setMapView(latlng, 13)
				const phone = results.place['sg:phone']
				const website = results.place['sg:website']
				this.setState({
					address: results.place['addr:full'],
					tags: results.place['wof:tags'],
					categories: results.place['sg:classifiers'][0],
					phone: (phone.length > 10) ? phone : 'N/A',
					website: (website !== undefined) ? website : 'N/A'
				})
				const waypoint = {
					latlng: latlng,
					label: this.props.name
				}
				this.props.addWaypoints([waypoint])
			})
	}

	handleClick(event) {
		const { coordinates, geolocation, name } = this.props
		const start = {
			latlng: L.latLng(geolocation.latlng[0], geolocation.latlng[1]),
			label: 'You are here'
		}

		const end = {
			latlng: L.latLng(coordinates[0], coordinates[1]),
			label: name
		}

		this.props.addWaypoints([start, end])
		const endpoint = `https://valhalla.mapzen.com/route?json={"locations":[{"lat":${geolocation.latlng[0]},"lon":${geolocation.latlng[1]}},{"lat":${coordinates[0]},"lon":${coordinates[1]}}],"costing":"multimodal"}&api_key=${config.mapzen.apiKey}`
		this.getDirections(endpoint)
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
		const { name } = this.props
		const { address, tags, categories, phone, website } = this.state
		const link = (website !== 'N/A') ? 'https://' + website : ''

 		return(
			<div className='venue-spot'>
				<div className='venue-details'>
					<Header as='h3'> { name } </Header>
					<Label.Group className='categories-tags'>
						{Object.keys(categories).map((key, i) => {
							if (categories[key] !== '') {
								return <Label key={i}> { categories[key] } </Label>
							} return null
						})}
						{tags.map((tag,i) => 
							<Label key={i}> { tag } </Label>
						)}
					</Label.Group>
				</div>
				<div className='venue-contact'>
					<List> 
						<List.Item>
							<List.Icon name='marker' />
							<List.Content>  { address } </List.Content>
						</List.Item>
						<List.Item>
							<List.Icon name='phone' />
							<List.Content> { phone } </List.Content>
						</List.Item>
						<List.Item>
							<List.Icon name='external' />
							<List.Content> <a href={link}> {website} </a> </List.Content>
						</List.Item>
					</List>
				</div>
				<Button content='Get Directions' compact fluid className='directions-button' onClick={this.handleClick} />
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		coordinates: state.map.coordinates,
		geolocation: state.locality.geolocation
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({setMapView, displayDirections, addWaypoints, setVenue}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VenueSpot)
