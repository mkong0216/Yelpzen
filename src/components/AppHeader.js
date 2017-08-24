import React from 'react'
import { Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FindSearchBar from './Searchbars/FindSearchBar'
import NearSearchBar from './Searchbars/NearSearchBar'
import Category from './Category'
import { clearDirections } from '../store/actions/map'
import { clearVenue } from '../store/actions/venue'
import { clearCategory } from '../store/actions/category'
 
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
					<Category content='Restaurants' icon='food' category='Restaurant'/>
					<Category content='Shopping' icon='shopping bag' category='Shopping' />
					<Category content='Entertainment' icon='film' category='Arts & Performance' />
					<Category content='Activities' icon='soccer' category='Recreation' />
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({clearDirections, clearVenue, clearCategory }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)
