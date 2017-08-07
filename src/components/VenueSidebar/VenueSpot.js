import React from 'react'
import { Header } from 'semantic-ui-react'
import { getInfo } from '../../wofMethods'

class VenueSpot extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			address: '',
			tags: [],
			categories: null,
			phone: ''
		}

		const endpoint = getInfo(this.props.id)
		this.makeRequest(endpoint)
	}

	makeRequest(endpoint) {
		window.fetch(endpoint)
			.then(response => response.json())
			.then((results) => {
				console.log(results.place)
				const phone = results.place['sg:phone']
				this.setState({
					address: results.place['addr:full'],
					tags: results.place['wof:tags'],
					categories: results.place['sg:classifiers'][0],
					phone: (phone.length > 15) ? phone : ''
				})
			})
	}

	render() {
		const { name } = this.props
		const { address, tags, categories, phone } = this.state

 		return(
			<div className='venue-spot'>
				<div className='venue-details'>
					<Header as='h3'> { name } </Header>
					<i> { address } </i>
				</div>
			</div>
		)
	}
}

export default VenueSpot