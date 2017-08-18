import React from 'react'
import { connect } from 'react-redux'
import { List, Icon } from 'semantic-ui-react'
import './Directions.css'

class Directions extends React.Component {
	renderDirections(key, i) {
		return (
			<List.Item key={i}> 
				<List.Content> { key.instruction } </List.Content>
			</List.Item>
		)
	}

	render() {
		const { directions } = this.props
		if (directions.length !== 0) { 
			return (
				<div className='directions'>
					<List divided>
						<List.Item> 
							<Icon name='map pin' />
							<List.Content>
								<List.Header> {this.props.geolocation} </List.Header>
							</List.Content>
						</List.Item>
						{directions.map(this.renderDirections)}
						<List.Item> 
							<Icon name='map pin' />
							<List.Content>
								<List.Header> {this.props.location} </List.Header>
							</List.Content>
						</List.Item>
					</List>
				</div>
			)
		} return null
	}
}

function mapStateToProps(state) {
	return {
		directions: state.map.directions,
		geolocation: state.locality.geoLabel,
		location: state.map.location
	}
}

export default connect(mapStateToProps)(Directions)