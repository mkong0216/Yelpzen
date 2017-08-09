import React from 'react'
import { Segment } from 'semantic-ui-react'
import VenueSpot from './VenueSpot'
import VenueReviews from './VenueReviews'
import ReviewForm from './ReviewForm'
import './VenueSidebar.css'

class VenueSidebar extends React.Component {
	render() {
		const { venueID, venueName } = this.props.match.params
		return (
			<div className={this.props.className + ' venue-sidebar'}>
				<Segment>
					<VenueSpot id={venueID} name={venueName} />
				</Segment> 
				<Segment>
					<VenueReviews id={venueID} name={venueName} />
				</Segment>
				<Segment>
					<ReviewForm id={venueID} name={venueName} />
				</Segment>
			</div>
		)
	}
}

export default VenueSidebar