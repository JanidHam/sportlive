import React from 'react'

class ComboPackages extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = { packages: [], noPackages: true }
		this._bind('_handleNewPackage', '_listenServer')
	}

	loadDisciplinesFromServer() {
	    io.socket.post( this.props.url , {}, (resData) => {
      		this.setState({ packages: resData.data })
    	}.bind(this))
  	}

	componentWillMount() {
		this.loadDisciplinesFromServer()
	}

	componentDidMount() {
		if ( this.state.packages.length > 0)
      		this.setState({ noPackages: false })
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
		io.socket.on('new package', this._handleNewPackage )
	}

	_handleNewPackage(newPackage) {
		this.setState({ packages: this.state.packages.concat( [newPackage] ) })
	}

	render() {
		if ( this.state.packages.length <= 0) {
			if ( this.state.noPackages )
				return <p className="text-center">No hay paquetes.</p>
			return <p className="text-center">Cargando Paquetes...</p>
		}
		
		var packages = this.state.packages
		return (
				<select className="form-control text-uppercase" id="clientPackages" onChange={this.props.onChangePackage}>
					<option value="-1" data-classes="0" data-cost="0">Seleccione paquete..</option>
					{ 
						packages.map( (pack) => {
							return (
								<option value={pack.id} data-classes={pack.days} data-cost={pack.cost} key={pack.id}>{pack.packageName}</option>
								)
						}) 
					}
	            </select>
			)
	}
}

export default ComboPackages