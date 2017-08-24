import React from 'react'
import { Segment } from 'semantic-ui-react'
import LocalSpots from './LocalSpots'
import './Sidebar.css'

class Sidebar extends React.Component {
	render() {
		const category = (this.props.match) ? this.props.match.params.categories : ''
		return(
			<div className={this.props.className + ' Sidebar'}>
				<Segment> 
					<LocalSpots categories={category} />
				</Segment>
			</div>
		)
	}
}

export default Sidebar