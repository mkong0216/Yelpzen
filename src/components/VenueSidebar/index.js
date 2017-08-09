import React from 'react'
import { Segment } from 'semantic-ui-react'
import VenueSpot from './VenueSpot'
import ReviewForm from './ReviewForm'
import './VenueSidebar.css'

class VenueSidebar extends React.Component {
	render() {
		return (
			<div className={this.props.className + ' venue-sidebar'}>
				<Segment>
					<VenueSpot id={this.props.match.params.venueID} name={this.props.match.params.venueName} />
				</Segment> 
				<Segment>
					<ReviewForm id={this.props.match.params.venueID} name={this.props.match.params.venueName} />
				</Segment>
			</div>
		)
	}
}

export default VenueSidebar