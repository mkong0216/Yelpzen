import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Header, Segment, Rating } from 'semantic-ui-react'

class VenueReviews extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		venues: PropTypes.object.isRequired
	}
	
	renderReview(key, i) {
		const month = key.date.getMonth() + 1
		const day = key.date.getDate()
		const year = key.date.getFullYear()
		const date = month + '/' + day + '/' + year
		return (
			<Segment className='single-review' key={i}>
				<div className='user-info'> 
					<b> { key.name } </b>
					<span className='review-date'> { date } </span>
				</div>
				<div className='review-info'> 
					<Rating maxRating={5} rating={key.rating} disabled /> 
					<p> { key.comment } </p>
				</div>
			</Segment>
		)
	}

	render() {
		const venueID = this.props.id
		const reviews = this.props.venues[venueID]

		if (typeof reviews === 'undefined') {
			return (
				<div className='reviews'>
					<Header as='h3'> Reviews </Header>
					<i> No reviews available. </i>
				</div>
			)
		} else {
			return (
				<div className='reviews'>
					<Header as='h3'> Reviews </Header>
					<Segment.Group>
						{reviews.map(this.renderReview)}
					</Segment.Group>
				</div>
			)
		}
	}
}

function mapStateToProps(state) {
	return {
		venues: state.reviews.venues
	}
}

export default connect(mapStateToProps)(VenueReviews)