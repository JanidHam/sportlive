import React from 'react'
import ClassesLeft from '../leftclasses'
import InAsistClass from '../inasistclasses'

class InfoClient extends React.Component {
	constructor(props) {
		super(props)
		this._bind('_handleReponseFromServer', '_handleNameChange', '_handleLastNameChange',
					'_handleUserChange', '_handlePhoneChange', '_handleClickLeftClasses', 
					'_handleClassAsist', '_handleClassInAsist', '_handleClickReleaseClasses',
					'_handleShowInAsists', '_handleInAsistRemove', '_handleClickDeleteClient')
		this.state = { client: [], findClient: false, classDays: [], asists: [], leftClasses: [],
						inAsists: [] }
		this.clientID = -1
	}

	componentWillMount() {
		io.socket.get( this.props.urlFindClient , {}, (resData, jwres) => {
      		this._handleReponseFromServer(jwres, resData)
    	}.bind(this))
	}

	ComponentDidMount() {
		
	}

	_serchClassDays(clientID) {
		io.socket.post( '/classes-schedule-client' , { clientID: clientID }, (resData, jwres) => {
      		//this._handleReponseFromServer(jwres, resData)
      		this.setState({ classDays: resData.data })
    	}.bind(this))
	}

	_searchAsists(clientID) {
		io.socket.post( '/asist-client' , { clientID: clientID }, (resData, jwres) => {
      		//this._handleReponseFromServer(jwres, resData)
      		this.setState({ asists: resData.data })
      		this.setState({ leftClasses: resData.data.filter( (data) => { 
      			if ( data.asist === null )
      				return data
      			}
      		)})
      		this.setState({ inAsists: resData.data.filter( (data) => { 
      			if ( data.asist == false )
      				return data
      			}
      		)})

    	}.bind(this))
	}
 
	/**
	* [_bind Con este metodo creo una relacion con los metodos creados con este componente]
	* @param  {...[type]} methods [Recibe un numero indefinido de metodos para vincularlos]
	* @return {[type]}            [Retorna los metodos binculados]
	*/
	_bind(...methods) {
		methods.forEach( (method) => this[method] = this[method].bind(this) )
	}

	_handleReponseFromServer(jwres, resData) {
		if ( jwres.statusCode === 500 )
			this._drawMessages('Que pena, tuvimos un error interno.', 'danger')
		else if ( jwres.statusCode === 400 ) {
			this._drawMessages('No se encontró la ruta solicitada, o el server esta caido.', 'danger')
			this.setState({ findClient: false })
		}
		else if ( jwres.statusCode === 200 ) {
			this.clientID = resData.id
			this.setState({ client: resData })
			this._serchClassDays(resData.id)
			this._searchAsists(resData.id)
		}

	}

	_drawMessages(message, type) {
		let typeM = 'alert-' + type
		this.refs.messages.setState({ message: message, typeM: typeM })
	}

	_handleNameChange(e) {
		let tempCliente = this.state.client
		tempCliente.firstName = e.target.value
		this.setState({ client: tempCliente })
	}

	_handleLastNameChange(e) {
		let tempCliente = this.state.client
		tempCliente.lastName = e.target.value
		this.setState({ client: tempCliente })
	}

	_handleUserChange(e) {
		let tempCliente = this.state.client
		tempCliente.userName = e.target.value
		this.setState({ client: tempCliente })
	}

	_handlePhoneChange(e) {
		let tempCliente = this.state.client
		tempCliente.phoneNumber = e.target.value
		this.setState({ client: tempCliente })
	}

	_handleClickLeftClasses(e) {
		e.preventDefault()
		if ( this.refs.leftClasses.state.show === 'hide')
			this.refs.leftClasses.setState({ show: '' })
		else
			this.refs.leftClasses.setState({ show: 'hide' })
	}

	_handleClassInAsist(e) {
		let context = { values: [{id: e.target.parentElement.getAttribute('data-id'), asistValue: false}] }
		io.socket.post( '/class-update-id', context, (resData, jwres) => {
      		if (jwres.statusCode === 200) {
      			/*io.socket.post( '/asist-client' , { clientID: this.clientID }, (resData, jwres) => {
		      		this.setState({ asists: resData.data })
		      		this.setState({ leftClasses: resData.data.filter( (data) => { 
		      			if ( data.asist === null )
		      				return data
		      			}
		      		)})
		    	}.bind(this))*/
      			alert(resData.message)
      			location.reload()
      		}
    	}.bind(this))

	}

	_handleClassAsist(e) {
		let context = { values: [{id: e.target.parentElement.getAttribute('data-id'), asistValue: true}] }
		io.socket.post( '/class-update-id', context, (resData, jwres) => {
      		if (jwres.statusCode === 200) {
      			/*io.socket.post( '/asist-client' , { clientID: this.clientID }, (resData, jwres) => {
		      		this.setState({ asists: resData.data })
		      		this.setState({ leftClasses: resData.data.filter( (data) => { 
		      			if ( data.asist === null )
		      				return data
		      			}
		      		)})
		    	}.bind(this))*/
      			alert(resData.message)
      			location.reload()
      		}
    	}.bind(this))

	}

	_handleInAsistRemove(e) {
		io.socket.post( '/remove-inAsist-client' , { inAsistID:  e.target.parentElement.getAttribute('data-id')}, (resData, jwres) => {
			if (jwres.statusCode === 200) {
				alert(resData.message)
				location.reload()
			}
    	}.bind(this))
	}

	_handleClickReleaseClasses(e) {
		e.preventDefault()
		if ( confirm('¿Desea liberar el horario de clases del cliente?') ) {
			io.socket.post( '/release-schedule-client' , { clientID: this.clientID }, (resData, jwres) => {
	      		if ( jwres.statusCode === 200 ) {
	      			console.log(resData.data)
	      			location.reload()
	      			/*io.socket.post( '/asist-client' , { clientID: this.clientID }, (resData, jwres) => {
	      				console.log(resData.data)
			      		this.setState({ leftClasses: resData.data.filter( (data) => { 
			      			if ( data.asist === null )
			      				return data
			      			}
			      		)})
			    	}.bind(this))*/
	      		}
	    	}.bind(this))
		}
			
	}

	_handleShowInAsists(e) {
		e.preventDefault()
		if ( this.refs.inAsistClasses.state.show === 'hide')
			this.refs.inAsistClasses.setState({ show: '' })
		else
			this.refs.inAsistClasses.setState({ show: 'hide' })
	}

	_handleClickDeleteClient(e) {
		e.preventDefault()
		if ( confirm('¿Desea eliminar al cliente?') ) {
			io.socket.post( '/delete-client' , { clientID: this.clientID}, (resData, jwres) => {
				if (jwres.statusCode === 200) {
					alert(resData.message)
					window.location.href = "/"
				}
	    	}.bind(this))
		}
	}

	render() {

		if ( this.state.client.length === 0) {
			if ( ! this.state.findClient )
				return <p className="text-center">No se encontró al cliente.</p>
			return <p className="text-center">Cargando Cliente...</p>
		}

		var dateBegin = new Date(this.state.client.dateBegin).toLocaleDateString(),
			dateEnd = new Date(this.state.client.dateEnd).toLocaleDateString(),
			classDays = this.state.classDays,
			textclassDays = ""
		classDays.forEach(function(element, index, array) {
			if ( element.monday !== 0)
				textclassDays += 'Lunes a la(s) ' + element.hour.hour + ' '
			else if ( element.tuesday !== 0)
				textclassDays += 'Martes a la(s) ' + element.hour.hour + ' '
			else if ( element.wednesday !== 0)
				textclassDays += 'Miércoles a la(s) ' + element.hour.hour + ' '
			else if ( element.thursday !== 0)
				textclassDays += 'Jueves a la(s) ' + element.hour.hour + ' '
			else if ( element.friday !== 0)
				textclassDays += 'Viernes a la(s) ' + element.hour.hour + ' '
			else if ( element.saturday !== 0)
				textclassDays += 'Sábado a la(s) ' + element.hour.hour + ' '
		})
		if ( textclassDays === '' )
			textclassDays = 'No se encontraron los días de clases.'

		var asists = 0,
			inAsists = 0

		this.state.asists.map( (classes) => {
			if ( classes.asist )
				asists += 1
			else if ( classes.asist !== null )
				inAsists += 1
		})

		return (
			<div>
				<div className="form-panel">
					<form className="form-horizontal tasi-form" role="form">
						<div className="form-group">
							<div className="col-sm-4 margin-bottom-15">
								<label className="control-label">Nombre:</label>
								<input type="text" className="form-control text-uppercase" id="clientName" placeholder="Nombre" value={this.state.client.firstName} onChange={this._handleNameChange}/>
							</div>
							<div className="col-sm-4 margin-bottom-15">
								<label className="control-label">Apellidos:</label>
								<input type="text" className="form-control text-uppercase" id="clientLastName" placeholder="Apellido" value={this.state.client.lastName} onChange={this._handleLastNameChange}/>
							</div>
							<div className="col-sm-4 margin-bottom-15">
								<label className="control-label">Usuario:</label>
								<input type="text" className="form-control text-uppercase" id="clientUserName" placeholder="Usuario" value={this.state.client.userName} onChange={this._handleUserChange}/>
							</div>
						</div>
						<div className="form-group">
							<div className="col-sm-4 margin-bottom-15">
								<label className="control-label">Teléfono:</label>
								<input type="text" className="form-control text-uppercase" id="clientPhone" placeholder="Teléfono" value={this.state.client.phoneNumber} onChange={this._handlePhoneChange}/>
							</div>
							<div className="col-sm-4 margin-bottom-15">
								<label className="control-label">F. Inicio:</label>
								<input type="text" className="form-control text-uppercase" id="clientDateBegin" placeholder="F. Inicio" value={dateBegin} disabled/>
							</div>
							<div className="col-sm-4 margin-bottom-15">
								<label className="control-label">F. Fin:</label>
								<input type="text" className="form-control text-uppercase" id="clientDateEnd" placeholder="F. Fin" value={dateEnd} disabled/>
							</div>
						</div>
						<div className="form-group">
							<div className="col-sm-2 margin-bottom-15">
								<label className="control-label">Asistencias:</label>
								<input type="text" className="form-control text-uppercase" id="clientAsists" placeholder="Asistencias" value={asists} disabled/>
							</div>
							<div className="col-sm-2 margin-bottom-15">
								<label className="control-label">Faltas:</label>
								<input type="text" className="form-control text-uppercase" id="clientFalts" placeholder="Faltas" value={inAsists} disabled/>
							</div>
							<div className="col-sm-8 margin-bottom-15">
								<label className="control-label">Días de Clases:</label>
								<input type="text" className="form-control text-uppercase" id="clientFalts" placeholder="Días clases" value={textclassDays} disabled/>
							</div>
						</div>
						<div className="form-group">
							<div className="col-sm-4 margin-bottom-15">
								<label className="control-label">Paquete:</label>
								<input type="text" className="form-control text-uppercase" id="clientPackage" placeholder="Paquete" value={this.state.client.activePackage.packageName} disabled/>
							</div>
							<div className="col-sm-8">
								<label className="control-label">Observaciones:</label>
								<textarea className="form-control text-uppercase" id="clientObservations" placeholder="Observaciones" rows="2">{this.state.client.observations}</textarea>
							</div>
						</div>
						<div className="form-group">
	                        <div className="col-lg-2 margin-bottom-15">
	                            <button className="btn btn-success btn-sm" onClick={this._handleClickLeftClasses} >Ver Clases Restantes</button>
	                        </div>
	                        <div className="col-lg-2 margin-bottom-15">
	                            <button className="btn btn-info btn-sm" onClick={this._handleShowInAsists} >Mostrar Faltas</button>
	                        </div>
							<div className="col-lg-6 margin-bottom-15 goright">
	                            <button className="btn btn-warning btn-sm" onClick={this._handleClickReleaseClasses} >Liberar Horarios</button>
	                        </div>
	                        <div className="col-lg-2 margin-bottom-15">
	                            <button className="btn btn-danger btn-sm" onClick={this._handleClickDeleteClient} >Eliminar Cliente</button>
	                        </div>
						</div>
					</form>
				</div>
				<ClassesLeft ref="leftClasses" leftClasses={this.state.leftClasses} 
					_handleClassInAsist={this._handleClassInAsist}
					_handleClassAsist={this._handleClassAsist}
				/>
				<InAsistClass ref="inAsistClasses" inAsistClasses={this.state.inAsists}
				_handleInAsistRemove={this._handleInAsistRemove}
				/>
			</div>
		)
	}

}

export default InfoClient