import React from 'react'

class SearchInput extends React.Component {
	constructor(props) {
		super(props)
    	this.state = { searchString: '' }
	}

	handleChange(e) {
    	this.setState({ searchString:e.target.value })
    	console.log(this)
  	}

  	render() {
  		return (
  			<input className="form-control" type="search" value={this.state.searchString} onChange={this.handleChange} placeholder="Buscar.." />
  		)
  	}
}

export default SearchInput