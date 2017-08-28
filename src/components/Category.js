import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActionCreators from '../store/actions/app'
import { clearDirections } from '../store/actions/map'

class Category extends React.Component {
	constructor(props) {
		super(props)

		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(event) {
		// When a category is selected, set category to true and clear directions if any
		// Also set venue to false since we are rendering local spots now
		this.props.setCategory()
		this.props.clearDirections()
		this.props.clearVenue()
	} 

	render() {
		const local = (this.props.source) ? this.props.source.name : ''
		return (
			<Link to={`/?local=${local}&category=${this.props.category}`}>
				<Button content={this.props.content} icon={this.props.icon} compact onClick={this.handleClick} className='category'/>
			</Link>
		)
	}
}

function mapStateToProps(state) {
	return {
		source: state.locality.source
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({...appActionCreators, clearDirections}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
