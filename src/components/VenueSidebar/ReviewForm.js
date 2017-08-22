import React from 'react'
import PropTypes from 'prop-types'
import { Header, Rating, Form, Label, TextArea, Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addReview } from '../../store/actions/reviews'


class ReviewForm extends React.Component {
	static propTypes = {
		addReview: PropTypes.func.isRequired,
		id: PropTypes.string.isRequired
	}

	constructor(props) {
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(event) {
		event.preventDefault()
		const review = {
			name: this.name.inputRef.value,
			rating: this.rating.state.rating,
			comment: this.comment.ref.value,
			date: new Date()
		}
		this.props.addReview(this.props.id, review)
		this.rating.setState({ rating: 0 })
		event.target.reset()
	}

	render() {
		return (
			<div className='user-review'>
				<Header as='h3'> Add Your Review </Header>
				<div className='review-form'>
					<Form onSubmit={this.handleSubmit} ref={(input) => { this.reviewForm = input }}>
						<Form.Field className='name'>
							<Input ref={(input) => { this.name = input }} label='Name: ' placeholder='Your name...' />
						</Form.Field>
						<Form.Field className='rating'>
							<Rating maxRating={5} defaultRating={0} icon='star' size='huge' ref={(input) => { this.rating = input}}/>
							<Label pointing='left' className='rating-label'> Select your rating </Label>
						</Form.Field>
						<Form.Field className='comment'>
							<Header as='h4'> Your Review: </Header>
							<TextArea placeholder='Tell us about your experience at this business...' ref={(input) => this.comment = input} />
						</Form.Field>
						<Form.Button compact> Submit </Form.Button>
					</Form>
				</div>
			</div>
		)
	}
} 

function mapStateToProps(state) {
	return {}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({addReview}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)