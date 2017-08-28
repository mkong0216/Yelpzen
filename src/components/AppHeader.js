import React from 'react'
import { Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FindSearchBar from './Searchbars/FindSearchBar'
import NearSearchBar from './Searchbars/NearSearchBar'
import Category from './Category'
import { clearDirections, setMapView } from '../store/actions/map'
import { clearApp } from '../store/actions/app'
 
class AppHeader extends React.Component {
	constructor(props) {
		super(props)

		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(event) {
		// When header is clicked, return back to local spots of current value of locality
		// Clear the directions if any and set venue and category back to false
		this.props.clearDirections()
		this.props.clearApp()
		// Also return back to map view of locality 
		if (this.props.source) { setMapView(this.props.source.latlng, 10) }
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
					<Category content='Food' icon='food' category='Food' />
					<Category content='Shopping' icon='shopping bag' category='Shopping' />
					<Category content='Entertainment' icon='film' category='Entertainment' />
					<Category content='Services' icon='configure' category='Services' />
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		source: state.locality.source
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({clearDirections, clearApp, setMapView}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)
