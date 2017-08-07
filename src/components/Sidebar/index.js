import React from 'react'
import { Segment } from 'semantic-ui-react'
import LocalSpots from './LocalSpots'
import './Sidebar.css'

class Sidebar extends React.Component {
	render() {
		return(
			<div className={this.props.className + ' Sidebar'}>
				<Segment> 
					<LocalSpots />
				</Segment>
			</div>
		)
	}
}

export default Sidebar