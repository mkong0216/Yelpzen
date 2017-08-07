import React from 'react'
import { connect } from 'react-redux'
import { Header, Loader, Dimmer } from 'semantic-ui-react'
import { isEqual } from 'lodash'
import VenueHeader from './VenueHeader'
import { getDescendants, compare } from '../../wofMethods'

class LocalSpots extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoading: true,
			localSpots: []
		}

		this.makeRequest = this.makeRequest.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		if (isEqual(this.props.source, nextProps.source)) { return }
		console.log('receiving new props')
		const neighbourhood_id = nextProps.source.id
		const endpoint = getDescendants(neighbourhood_id)
		this.makeRequest(endpoint)
	}

	makeRequest(endpoint) {
		window.fetch(endpoint)
			.then(response => response.json())
			.then((results) => {
				const venues = results.places
				venues.sort(compare)
				const localSpots = venues.slice(0,10)
				this.setState({
					localSpots: localSpots,
					isLoading: false
				})
			})
	}

	render() {
		console.log('mounting local spots')
		const venues = this.state.localSpots
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
		source: state.locality.source
	}
}

export default connect(mapStateToProps)(LocalSpots)