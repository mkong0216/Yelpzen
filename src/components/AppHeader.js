import React from 'react'
import { Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FindSearchBar from './Searchbars/FindSearchBar'
import NearSearchBar from './Searchbars/NearSearchBar'
import { clearDirections } from '../store/actions/map'
import { clearVenue } from '../store/actions/venue'
 
class AppHeader extends React.Component {
	constructor(props) {
		super(props)

		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(event) {
		this.props.clearDirections()
		this.props.clearVenue()
	}

	render() {
		return (
			<div className={this.props.className}>
				<Link to={`/local`}>
					<Header as='h1' onClick={this.handleClick}> Yelpzen </Header>
				</Link>
				<div className='search-bars'>
					<FindSearchBar className='Find' config={this.props.config} />
					<NearSearchBar className='Near' config={this.props.config} />
				</div> 
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({clearDirections, clearVenue}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)
