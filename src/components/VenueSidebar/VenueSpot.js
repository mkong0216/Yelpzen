import React from 'react'
import { isEqual } from 'lodash'
import { Header, Label, List } from 'semantic-ui-react'
import { getInfo } from '../../wofMethods'

class VenueSpot extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			address: '',
			tags: [],
			categories: {},
			phone: '',
			website: '',
			addingTag: false
		}

		const endpoint = getInfo(this.props.id)
		this.makeRequest(endpoint)
	}

	componentWillReceiveProps(nextProps) {
		if (isEqual(nextProps.id, this.props.id)) { return }
		const endpoint = getInfo(nextProps.id)
		this.makeRequest(endpoint)
	}

	makeRequest(endpoint) {
		window.fetch(endpoint)
			.then(response => response.json())
			.then((results) => {
				console.log(results.place)
				const phone = results.place['sg:phone']
				const website = results.place['sg:website']
				this.setState({
					address: results.place['addr:full'],
					tags: results.place['wof:tags'],
					categories: results.place['sg:classifiers'][0],
					phone: (phone.length > 10) ? phone : 'N/A',
					website: (website !== undefined) ? website : 'N/A'
				})
			})
	}

	addTag(event) {
		console.log(event)
	}

	render() {
		const { name } = this.props
		const { address, tags, categories, phone, website } = this.state
		const link = (website !== 'N/A') ? 'https://' + website : ''

 		return(
			<div className='venue-spot'>
				<div className='venue-details'>
					<Header as='h3'> { name } </Header>
					<Label.Group className='categories-tags'>
						{Object.keys(categories).map((key, i) => {
							if (categories[key] !== '') {
								return <Label key={i}> { categories[key] } </Label>
							}
						})}
						{tags.map((tag,i) => 
							<Label key={i}> { tag } </Label>
						)}
					</Label.Group>
				</div>
				<div className='venue-contact'>
					<List> 
						<List.Item>
							<List.Icon name='marker' />
							<List.Content>  { address } </List.Content>
						</List.Item>
						<List.Item>
							<List.Icon name='phone' />
							<List.Content> { phone } </List.Content>
						</List.Item>
						<List.Item>
							<List.Icon name='external' />
							<List.Content> <a href={link}> {website} </a> </List.Content>
						</List.Item>
					</List>
				</div>
			</div>
		)
	}
}

export default VenueSpot