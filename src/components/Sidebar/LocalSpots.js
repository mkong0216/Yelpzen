import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { isEqual } from 'lodash'
import L from 'leaflet'
import { Header, Loader, Dimmer, List, Label } from 'semantic-ui-react'
import { getDescendants, compare, getVenuesByCategory } from '../../wofMethods'
import { parseQueryString } from '../../url-state'
import { addWaypoints } from '../../store/actions/markers'
import * as mapActionCreators from '../../store/actions/map'
import * as appActionCreators from '../../store/actions/app'


class LocalSpots extends React.Component {
	static propTypes = {
		source: PropTypes.object,
		addWaypoints: PropTypes.func.isRequired,
		setMapView: PropTypes.func.isRequired,
		clearDirections: PropTypes.func.isRequired
	}
	
	constructor(props) {
		super(props)

		this.state = {
			isLoading: true,
			localSpots: []
		}

		this.makeRequest = this.makeRequest.bind(this)
		this.renderLocalSpot = this.renderLocalSpot.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		// If source is still the same and venue a venue is not clicked, return
		if (isEqual(this.props.source, nextProps.source) && nextProps.app.venue) { return }
		if (!nextProps.source) { return }
		// 
		const id = nextProps.source.id
		const endpoint = getDescendants(id)
		this.makeRequest(endpoint, nextProps.app.category)
	}

	// Getting all local spots and adding markers to map of local spots
	// If category was selected, list only local spots of that specific category
	makeRequest(endpoint, categorySet) {
		window.fetch(endpoint)
			.then(response => response.json())
			.then((results) => {
				const venues = results.places
				const localSpots = (!categorySet) ? venues.sort(compare) : getVenuesByCategory(parseQueryString('category'), venues)
				this.setState({
					localSpots: localSpots.slice(0,10),
					isLoading: false
				})
				this.addWaypoints(this.state.localSpots)
			})
	}

	// Adding local spots markers to map
	addWaypoints(localSpots) {
		const waypoints = []
		localSpots.map((key, i) => {
			const point = L.latLng(
				Number(key['geom:latitude']),
				Number(key['geom:longitude'])
			)
			const name = key['wof:name']
			const waypoint = {
				latlng: point,
				label: name
			}
			return waypoints.push(waypoint)
		})
		this.props.addWaypoints(waypoints)
	}

	// If a venue is selected, set category to false and set venue to true
	handleClick(event) {
		this.props.clearCategory()
		this.props.setVenue()
	}

	renderLocalSpot(venue, i) {
		return (
			<List.Item className='venue' key={i}>
				<List.Content>
					<List.Header>  
						<List.Icon name='marker' />
						<Link to={`/venue/${venue['wof:id']}/${venue['wof:name']}`}>
							<span onClick={this.handleClick}> { venue['wof:name'] } </span>
						</Link>
					</List.Header>
					<List.Description className='address'> { venue['addr:full'] } </List.Description>
					<List.Description className='tags'> 
						{ venue['wof:tags'].map((tag, i) => 
							<Label key={i} tag size='small'> { tag } </Label>
						)}
					</List.Description>
				</List.Content>
			</List.Item>
		)
	}
	
	render() {
		const venues = this.state.localSpots
		const category = parseQueryString('category')
		return(
			<div className='local-spots'>
				<Header as='h3'> 
					Great spots near <i> {this.props.label} </i> 
				</Header>
				<p> <center> { this.props.app.category ? 'Tagged ' + category : '' } </center> </p>
				<Dimmer active={this.state.isLoading}>
					<Loader> 
						Finding spots near you 
					</Loader>
				</Dimmer>
				{ venues.map(this.renderLocalSpot) }
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		label: state.locality.label,
		source: state.locality.source,
		app: state.app
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({...mapActionCreators, ...appActionCreators, addWaypoints }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LocalSpots)