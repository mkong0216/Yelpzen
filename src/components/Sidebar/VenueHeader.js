import React from 'react'
import { List, Label } from 'semantic-ui-react'

class VenueHeader extends React.Component {
	constructor(props) {
		super(props) 

	}
	render() {
		const { venue } = this.props
		return (
			<List.Item className='venue'>
				<List.Content>
					<List.Icon name='marker' />
					<List.Header as='a'>  { venue['wof:name'] } </List.Header>
					<List.Description className='address'> { venue['addr:full'] } </List.Description>
					<List.Description className='tags'> 
						{ venue['wof:tags'].map((tag,i) => 
							<Label key={i} tag size='small'> {tag} </Label>
						)}
					</List.Description>
				</List.Content>
			</List.Item>
		)
	}
}

export default VenueHeader