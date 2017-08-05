import React from 'react'
import { Header } from 'semantic-ui-react'
 
const AppHeader = (props) => {
	return (
		<div className={props.className}>
			<Header as='h1'> Yelpzen </Header>
		</div>
	)
}

export default AppHeader