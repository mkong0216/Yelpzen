import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import { Icon } from 'semantic-ui-react'
import { throttle } from 'lodash'
import './Searchbar.css'

class FindSearchBar extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		config: PropTypes.object.isRequired,
		//locality: PropTypes.array.isRequired
	}

	constructor(props) {
		super(props)

		this.state = {
			value: '',
			suggestions: [],
			placeholder: 'Search for a restaurant, salon, etc.'
		}

		this.throttleMakeRequest = throttle(this.makeRequest)
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
		this.getSuggestionValue = this.getSuggestionValue.bind(this)
		this.renderSuggestion = this.renderSuggestion.bind(this)
		this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
		this.onChangeAutosuggest = this.onChangeAutosuggest.bind(this)
		this.renderInputComponent = this.renderInputComponent.bind(this)
		this.makeRequest = this.makeRequest.bind(this)
		this.clearSearch = this.clearSearch.bind(this)
		this.renderClearButton = this.renderClearButton.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.search = this.search.bind(this)
	}


	// Will be called every time you need to recalculate suggestions
	onSuggestionsFetchRequested ({value}) {
		if (value.length >= 2) {
	    	this.search(value)
	    }
	}

  	// Will be called every time you need to set suggestions to []
	onSuggestionsClearRequested () {
		this.setState({
	      	suggestions: []
	    })
	}

	// Teach Autosuggest what should be input value when suggestion is clicked
	getSuggestionValue (suggestion) {
		return suggestion['wof:name']
	}

	// Will be called every time suggestion is selected via mouse or keyboard
	onSuggestionSelected (event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}) {
		console.log(suggestion)
	}

	renderSuggestion (suggestion, {query, isHighlighted}) {
	  	const label = suggestion['wof:name']
	  	const cityState = suggestion['sg:city'] + ', ' + suggestion['sg:province']
	  	const id = suggestion['wof:id']
	  	// Highlight the input query
	  	const r = new RegExp(`(${query})`, 'gi')
	  	const highlighted = label.split(r)
	  	for (let i = 0; i < highlighted.length; i++) {
	    	if (highlighted[i].toLowerCase() === query.toLowerCase()) {
	      		highlighted[i] = <strong key={i}>{highlighted[i]}</strong>
	    	}
	  	}

	  	return (
	  		<Link to={`/venue/${label}/${id}`}>
		    	<div className="map-search-suggestion-item">
		      		<Icon name="marker" /> {highlighted}{', ' + cityState}
		    	</div>
		    </Link>
	  	)
	}

	onChangeAutosuggest (event, {newValue, method}) {
	  	this.setState({
	    	value: newValue
	  	})
	}

	// Makes autocomplete request to Mapzen Search based on what user has typed
	search (query) {
		// Store lat/lng of locality to use in this url  (focus.point.lat, focus.point.lon)
  		//const endpoint = `https://search.mapzen.com/v1/autocomplete?text=${query}&api_key=${this.props.config.mapzen.apiKey}&focus.point.lat=${this.props.coordinates[0]}&focus.point.lon=${this.props.coordinates[1]}&layers=venue`
  		const endpoint = `https://whosonfirst-api.mapzen.com/?method=whosonfirst.places.search&api_key=${this.props.config.mapzen.apiKey}&q=${query}&neighbourhood_id=${this.props.source.id}&layers=venue&extras=geom:latitude,geom:longitude,sg:,addr:full,wof:tags`
  		this.throttleMakeRequest(endpoint)
	}

	makeRequest (endpoint) {
  		window.fetch(endpoint)
    		.then(response => response.json())
    		.then((results) => {
      			this.setState({
        			suggestions: results.places
      			})
    		})
	}

	// Clear button only appears when there's more than two characters in input
	renderClearButton (value) {
	  	if (value.length > 2) {
	    	return (
	      		<Icon name="close" className="clear-search" onClick={this.clearSearch} />
	    	)
	  	}
	}

	clearSearch (event) {
  		// Set state value back to empty string
  		this.setState({
    		value: ''
  		})
  	}

  	// Now Autosuggest component is wrapped in a form so that when 'enter' is pressed, suggestions container is not closed automatically
	// Instead search results are returned in suggestions container
	handleSubmit (event) {
  		event.preventDefault()
  		const inputValue = this.autosuggestBar.input.value
  		if (inputValue !== '') {
    		this.search(inputValue)
  		}
	}

	renderInputComponent(inputProps) {
    	return (
      		<div className='input-container'>
        		<Icon name='search' className='search-icon' />
        		<input {...inputProps} />
        		{this.renderClearButton(this.state.value)}
      		</div>
    	)
  	} 	

	render() {
		const inputProps = {
			placeholder: this.state.placeholder,
			value: this.state.value,
			onChange: this.onChangeAutosuggest
		}

		return(
			<div className={this.props.className + ' map-search-panel'}>
				<form ref='searchBar' onSubmit={this.handleSubmit}>
					<Autosuggest
						ref={(ref) => { this.autosuggestBar = ref }}
						suggestions={this.state.suggestions}
						onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
						onSuggestionSelected={this.onSuggestionSelected}
						onSuggestionsClearRequested={this.onSuggestionsClearRequested}
						getSuggestionValue={this.getSuggestionValue}
						renderSuggestion={this.renderSuggestion}
						inputProps={inputProps}
						renderInputComponent={this.renderInputComponent}
					/>
				</form>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		source: state.locality.source
	}
}

export default connect(mapStateToProps)(FindSearchBar)