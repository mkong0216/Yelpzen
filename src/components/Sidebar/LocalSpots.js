import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Header, Loader, Dimmer, List, Label } from 'semantic-ui-react'
import { isEqual } from 'lodash'
import { getDescendants, compare } from '../../wofMethods'

class LocalSpots extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoading: true,
			localSpots: []
		}

		this.makeRequest = this.makeRequest.bind(this)
		this.renderLocalSpot = this.renderLocalSpot.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		if (isEqual(this.props.source, nextProps.source)) { return }
		console.log('receiving new props')
		const neighbourhood_id = nextProps.source.id
		const endpoint = getDescendants(neighbourhood_id)
		this.makeRequest(endpoint)
	}

	makeRequest(endpoint) {
		window.fetch(endpoint)
			.then(response => response.json())
			.then((results) => {
				const venues = results.places
				venues.sort(compare)
				const localSpots = venues.slice(0,10)
				this.setState({
					localSpots: localSpots,
					isLoading: false
				})
			})
	}

	renderLocalSpot(venue, i) {
		return (
			<List.Item className='venue' key={i}>
				<List.Content>
					<List.Header>  
						<List.Icon name='marker' />
						<Link to={`/venue/${venue['wof:name']}/${venue['wof:id']}`}>
							{ venue['wof:name'] } 
						</Link>
					</List.Header>
					<List.Description className='address'> { venue['addr:full'] } </List.Description>
					<List.Description className='tags'> 
						{ venue['wof:tags'].map((tag, i) => 
							<Label key={i} tag size='small'> { tag } </Label>
						)}
					</List.Description>
				</List.Content>
			</List.Item>
		)
	}
	render() {
		console.log('mounting local spots')
		const venues = this.state.localSpots
		return(
			<div className='local-spots'>
				<Header as='h3'> Great spots near <i> {this.props.label} </i> </Header>
				<Dimmer active={this.state.isLoading}>
					<Loader> Finding spots near you </Loader>
				</Dimmer>
				{venues.map(this.renderLocalSpot)}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		label: state.locality.label,
		source: state.locality.source
	}
}

export default connect(mapStateToProps)(LocalSpots)