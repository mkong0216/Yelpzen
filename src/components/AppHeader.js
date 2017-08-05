import React from 'react'
import { Header } from 'semantic-ui-react'
import FindSearchBar from './Searchbars/FindSearchBar'
import NearSearchBar from './Searchbars/NearSearchBar'
 
const AppHeader = (props) => {
	return (
		<div className={props.className}>
			<Header as='h1'> Yelpzen </Header>
			<div className='search-bars'>
				<FindSearchBar className='Find' config={props.config} />
				<NearSearchBar className='Near' config={props.config} />
			</div> 
		</div>
	)
}

export default AppHeader