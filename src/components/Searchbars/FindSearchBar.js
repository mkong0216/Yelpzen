import React from 'react'
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
		this.autocomplete = this.autocomplete.bind(this)

	}


	// Will be called every time you need to recalculate suggestions
  onSuggestionsFetchRequested ({value}) {
    if (value.length >= 2) {
    	this.autocomplete(value)
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
  	 return suggestion.properties.label
	}

	// Will be called every time suggestion is selected via mouse or keyboard
	onSuggestionSelected (event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}) {
	}

	renderSuggestion (suggestion, {query, isHighlighted}) {
  	const label = suggestion.properties.label

  	// Highlight the input query
  	const r = new RegExp(`(${query})`, 'gi')
  	const highlighted = label.split(r)
  	for (let i = 0; i < highlighted.length; i++) {
    		if (highlighted[i].toLowerCase() === query.toLowerCase()) {
      		highlighted[i] = <strong key={i}>{highlighted[i]}</strong>
    		}
  	}

  	return (
    		<div className="map-search-suggestion-item">
      		<Icon name="marker" />{highlighted}
    		</div>
  	)
	}

	onChangeAutosuggest (event, {newValue, method}) {
  	this.setState({
    		value: newValue
  	})
	}

	// Makes autocomplete request to Mapzen Search based on what user has typed
	autocomplete (query) {
		// Store lat/lng of locality to use in this url  (focus.point.lat, focus.point.lon)
  	const endpoint = `https://search.mapzen.com/v1/autocomplete?text=${query}&api_key=${this.props.config.mapzen.apiKey}&layers=venue`
  	this.throttleMakeRequest(endpoint)
	}

  	// Makes search request based on what user has entered
 	search (query) {
 		// Store lat/lng of locality to use in this url  (focus.point.lat, focus.point.lon)
    	const endpoint = `https://search.mapzen.com/v1/search?text=${query}&api_key=${this.props.config.mapzen.apiKey}&layers=venue`
    	this.throttleMakeRequest(endpoint)
  	}

	makeRequest (endpoint) {
  	window.fetch(endpoint)
    		.then(response => response.json())
    		.then((results) => {
      		this.setState({
        			suggestions: results.features
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
						onSuggestionsSelected={this.onSuggestionsSelected}
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

export default FindSearchBar