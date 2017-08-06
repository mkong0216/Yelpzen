import React from 'react'
import { List, Label } from 'semantic-ui-react'

class VenueHeader extends React.Component {
	constructor(props) {
		super(props) 

		const { venue } = this.props

		this.state = {
			venueName: venue['wof:name'],
			address: venue['addr:full'],
			tags: venue['wof:tags']
		}
	}
	render() {
		const { venueName, address, tags } = this.state
		return (
			<List.Item className='venue'>
				<List.Content>
					<List.Icon name='marker' />
					<List.Header as='a'>  { venueName } </List.Header>
					<List.Description className='address'> { address } </List.Description>
					<List.Description className='tags'> 
						{ tags.map((tag,i) => 
							<Label key={i} tag size='small'> {tag} </Label>
						)}
					</List.Description>
				</List.Content>
			</List.Item>
		)
	}
}

export default VenueHeader