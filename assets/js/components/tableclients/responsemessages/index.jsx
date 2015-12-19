import React from 'react'

class ResponseMessages extends React.Component {
	constructor(props) {
		super(props)
		this.state = { message: '', typeM: '' }
		this._bind('_handleClick')
	}

	componentWillMount() {

	}

	componentDidMount() {

	}

	/**
	* [_bind Con este metodo creo una relacion con los metodos creados con este componente]
	* @param  {...[type]} methods [Recibe un numero indefinido de metodos para vincularlos]
	* @return {[type]}            [Retorna los metodos binculados]
	*/
	_bind(...methods) {
		methods.forEach( (method) => this[method] = this[method].bind(this) )
	}

	_handleClick(e) {
		this.setState({ message: '', typeM: '' })
	}

	render() {

		var typeMessage = "alert alert-dismissible " + this.state.typeM
		if ( this.state.message === '')
			return <div></div>

		return (
			<div>
				<div className={typeMessage} role="alert" id="response-messages">
					<button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this._handleClick}><span aria-hidden="true">&times;</span></button>
					<strong>{this.state.message}</strong>
				</div>
			</div>
		)
	}
}

export default ResponseMessages