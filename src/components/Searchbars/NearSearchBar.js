import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import Autosuggest from 'react-autosuggest'
import { Icon } from 'semantic-ui-react'
import { throttle } from 'lodash'
import { setMapView, clearDirections } from '../../store/actions/map'
import { setLocality } from '../../store/actions/locality'
import './Searchbar.css'

class NearSearchBar extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		config: PropTypes.object.isRequired,
		label: PropTypes.string,
		setMapView: PropTypes.func.isRequired, 
		setLocality: PropTypes.func.isRequired,
		clearDirections: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props)

		this.state = {
			value: '',
			suggestions: [],
			placeholder: 'Enter a city, state',
			placetype: ''
		}

		this.throttleMakeRequest = throttle(this.makeRequest, 200)
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
		this.getSuggestionValue = this.getSuggestionValue.bind(this)
		this.renderSuggestion = this.renderSuggestion.bind(this)
		this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
		this.onChangeAutosuggest = this.onChangeAutosuggest.bind(this)
    	this.renderInputComponent = this.renderInputComponent.bind(this)
		this.makeRequest = this.makeRequest.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.search = this.search.bind(this)
		this.autocomplete = this.autocomplete.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.label !== this.props.label) {
			this.setState({ value: nextProps.label})
		}
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
		const latlng = [suggestion.geometry.coordinates[1], suggestion.geometry.coordinates[0]]
		const label = suggestion.properties.label
		const source_id = suggestion.properties.source_id
		const source = {
			name: suggestion.properties.name,
			id: Number(source_id),
			latlng: latlng
		}
		this.props.setMapView(latlng, 10)
		this.props.setLocality(label, source)
		this.props.clearDirections()
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
	  		<Link to={`/local/${suggestion.properties.name}`}>
		  		<div className="map-search-suggestion-item">
		      		<Icon name="map pin" />{highlighted}
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
	autocomplete (query) {
  		const endpoint = `https://search.mapzen.com/v1/autocomplete?text=${query}&api_key=${this.props.config.mapzen.apiKey}&layers=coarse&sources=wof`
  		this.throttleMakeRequest(endpoint)
	}

	// Makes search request based on what user has entered
	search (query) {
  		const endpoint = `https://search.mapzen.com/v1/search?text=${query}&api_key=${this.props.config.mapzen.apiKey}&layers=coarse&sources=wof`
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

  	// Now Autosuggest component is wrapped in a form so that when 'enter' is pressed, suggestions container is not closed automatically
	// Instead search results are returned in suggestions container
	handleSubmit (event) {
  		event.preventDefault()
  		const inputValue = this.autosuggestBar.input.value
  		if (inputValue !== '') {
    		this.search(inputValue)
  		}
	}

  	handleClick (event) {
    	this.autosuggestBar.input.select()
  	}

  	renderInputComponent(inputProps) {
    	return (
      		<div className='input-container'>
        		<Icon name='location arrow' className='locate-icon' />
        		<input {...inputProps} />
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
				<form ref='searchBar' onSubmit={this.handleSubmit} onClick={this.handleClick}>
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
		label: state.locality.label
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({setLocality, setMapView, clearDirections}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NearSearchBar)