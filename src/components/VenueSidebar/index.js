import React from 'react'
import { Segment } from 'semantic-ui-react'
import './VenueSidebar.css'

class VenueSidebar extends React.Component {
	render() {
		return (
			<div className={this.props.className + ' venue-sidebar'}>
				<Segment>
				</Segment>
			</div>
		)
	}
}

export default VenueSidebar