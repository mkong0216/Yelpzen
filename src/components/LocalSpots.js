import React from 'react'
import { connect } from 'react-redux'
import { Header, Loader, Dimmer } from 'semantic-ui-react'
import VenueSpot from './VenueSpot'
import { getDescendants } from '../wofMethods'

class LocalSpots extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoading: true,
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.neighbourhoods.length !== this.props.neighbourhoods.length) {
			const neighbourhood_id = nextProps.neighbourhoods[0].id
			getDescendants(neighbourhood_id)
			this.setState({ isLoading: false })
		}
	}
	
	render() {
		console.log('mounting local spots')
		const { venues } = this.props
		return(
			<div className='local-spots'>
				<Header as='h3'> Great spots near you </Header>
				<Dimmer active={this.state.isLoading}>
					<Loader> Finding spots near you </Loader>
				</Dimmer>
				{venues.map((venue, i) =>
					<VenueSpot key={i} i={i} venue={venue} />
				)}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		neighbourhoods: state.locality.neighbourhoods,
		venues: state.venues.venues,
		coordinates: state.map.coordinates
	}
}

export default connect(mapStateToProps)(LocalSpots)