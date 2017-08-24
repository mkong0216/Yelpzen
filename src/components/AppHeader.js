import React from 'react'
import { Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FindSearchBar from './Searchbars/FindSearchBar'
import NearSearchBar from './Searchbars/NearSearchBar'
import { clearDirections } from '../store/actions/map'
import { clearVenue } from '../store/actions/venue'
import * as categoryActionCreators from '../store/actions/category'
 
class AppHeader extends React.Component {
	constructor(props) {
		super(props)

		this.handleClick = this.handleClick.bind(this)
		this.getCategory = this.getCategory.bind(this)
	}

	handleClick(event) {
		this.props.clearDirections()
		this.props.clearVenue()
		this.props.clearCategory()
	}

	getCategory(event) {
		const classList = event.target.classList
		this.props.setCategory(classList[classList.length - 1])
	} 

	render() {
		return (
			<div className={this.props.className}>
				<Link to={`/`}>
					<Header as='h1' onClick={this.handleClick}> Yelpzen </Header>
				</Link>
				<div className='search-bars'>
					<FindSearchBar className='Find' config={this.props.config} />
					<NearSearchBar className='Near' config={this.props.config} />
				</div> 
				<div className='categories'>
					<Button content='Restaurants' icon='food' compact onClick={this.getCategory} className='category Restaurant'/>
					<Button content='Shopping' icon='shopping bag' compact onClick={this.getCategory} className='category Shopping' />
					<Button content='Entertainment' icon='film' compact onClick={this.getCategory} className='category Arts & Performance' />
					<Button content='Activities' icon='soccer' compact onClick={this.getCategory} className='category Recreation' />
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({clearDirections, clearVenue, ...categoryActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)
