import React from 'react'
import { connect } from 'react-redux'
import { Header, Loader, Dimmer } from 'semantic-ui-react'
import { isEqual } from 'lodash'
import VenueHeader from './VenueHeader'
import { getDescendants } from '../wofMethods'

class LocalSpots extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoading: true,
			localSpots: []
		}

		this.makeRequest = this.makeRequest.bind(this)
	}

	componentDidUpdate(prevProps) {
		if (isEqual(this.props.neighbourhoods, prevProps.neighbourhoods)) { return }
		const neighbourhood_id = this.props.neighbourhoods[0].id
		const endpoint = getDescendants(neighbourhood_id)
		this.makeRequest(endpoint)
	}

	makeRequest(endpoint) {
		window.fetch(endpoint)
			.then(response => response.json())
			.then((results) => {
				const venues = results.places.slice(0,10)
				this.setState({
					localSpots: venues,
					isLoading: false
				})
			})
	}

	render() {
		console.log('mounting local spots')
		const venues = this.state.localSpots
		console.log(venues)
		return(
			<div className='local-spots'>
				<Header as='h3'> Great spots near <i> {this.props.label} </i> </Header>
				<Dimmer active={this.state.isLoading}>
					<Loader> Finding spots near you </Loader>
				</Dimmer>
				{venues.map((venue, i) =>
					<VenueHeader key={i} i={i} venue={venue} />
				)}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		label: state.locality.label,
		neighbourhoods: state.locality.neighbourhoods
	}
}

export default connect(mapStateToProps)(LocalSpots)