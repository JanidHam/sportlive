import React from 'react'

class ComboDisciplines extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = { disciplines: [], noDisciplines: true }
		this._bind('_handleNewDiscipline', '_listenServer')
	}

	loadDisciplinesFromServer() {
	    io.socket.post( this.props.url , {}, (resData) => {
      		this.setState({ disciplines: resData.data })
    	}.bind(this))
  	}

	componentWillMount() {
		this.loadDisciplinesFromServer()
	}

	componentDidMount() {
		if ( this.state.disciplines.length > 0)
      		this.setState({ noDisciplines: false })
      	this._connectAndListenServer()
	}

	/**
	* [_bind Con este metodo creo una relacion con los metodos creados con este componente]
	* @param  {...[type]} methods [Recibe un numero indefinido de metodos para vincularlos]
	* @return {[type]}            [Retorna los metodos binculados]
	*/
	_bind(...methods) {
		methods.forEach( (method) => this[method] = this[method].bind(this) )
	}

	_connectAndListenServer() {
		io.socket.on('connect', this._listenServer )
	}

	_listenServer() {
		io.socket.on('new discipline', this._handleNewDiscipline )
	}

	_handleNewDiscipline(newDiscipline) {
		this.setState({ disciplines: this.state.disciplines.concat( [newDiscipline] ) })
	}

	render() {
		if ( this.state.disciplines <= 0) {
			if ( this.state.noDisciplines )
				return <p className="text-center">No hay disciplinas.</p>
			return <p className="text-center">Cargando Disciplinas...</p>
		}

		var disciplines = this.state.disciplines
		return (
				<select className="form-control text-uppercase" id="clientDiscipline" onChange={this.props.onChange}>
					<option value="-1" >Seleccione disciplina..</option>
					{ disciplines.map( (discipline) => <option value={discipline.id} key={discipline.id}> {discipline.discipline} </option> ) }
	            </select>
			)
	}
}

export default ComboDisciplines