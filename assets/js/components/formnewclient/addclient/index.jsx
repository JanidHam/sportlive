import React from 'react'
import InfoClient from '../infoclient'
import ClassesPicked from '../classespicked'
import TableSchedule from '../tableclassschedule'
import ResponseMessages from '../responsemessages'

class AddClient extends React.Component {
	
	constructor(props) {
		super(props)
		this.classesSelected = 0
		this.classesLeft = 0
		this.packageCost = 0
		this.packageId = -1
		this.state = { discipline: -1, disciplineText: '' }
		this._bind('_handleChangeDiscipline', '_handleChangePackage', '_handleClickCell', '_handleRemoveClass',
			'_PrepareNewClient', '_handleReponseFromServer')
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

	_handleChangeDiscipline(e) {
		this.setState({ discipline: e.target.value, disciplineText: e.target.options[e.target.options.selectedIndex].text})
		this._reloadSchedule(e.target.value, e.target.options[e.target.options.selectedIndex].text)

	}

	_reloadSchedule( discipline, disciplineText ) {
		io.socket.post( this.props.urlSchedule , {discipline: discipline }, (resData) => {
      		this.refs.schedule.setState({ schedule: resData.data,  discipline: discipline, 
      			disciplinetext: disciplineText})
    	}.bind(this))
	}

	_handleChangePackage(e) {
		this.classesSelected = parseInt(e.target.options[e.target.options.selectedIndex].getAttribute('data-classes'))
		this.packageCost = parseInt(e.target.options[e.target.options.selectedIndex].getAttribute('data-cost'))
		this.packageId = e.target.value
		this.classesLeft = 0
		this.refs.classesPicked.setState({ classesPicked: [] })
	}

	_handleClickCell(e) {
		let day            = e.target.getAttribute('data-day'),
			discipline     = e.target.parentElement.getAttribute('data-discipline'),
			disciplineText = e.target.parentElement.getAttribute('data-disciplinetext'),
			hour           = e.target.parentElement.getAttribute('data-hour'),
			hourText       = e.target.parentElement.getAttribute('data-hourtext')

		if ( (this.classesSelected - this.classesLeft) === 0 ) {
			//alert('ya seleccionó las clases que ofrece el paqute.')
			this._drawMessages( 'Ya seleccionó las clases que ofrece el paqute.', 'danger')
			return
		}

		this.classesLeft -= 1
		let selectedClass = { day: this._dayToDia(day), discipline: discipline, disciplineText: disciplineText, hour: hour,
								hourText: hourText
							}
		let classesSchedule = this.refs.classesPicked.state.classesPicked
		classesSchedule.push(selectedClass)
		this.refs.classesPicked.setState({ classesPicked: classesSchedule })
	}

	_dayToDia(day) {
		if (day === 'monday')
			return 'Lunes'
		else if (day === 'tuesday')
			return 'Martes'
		else if (day === 'wednesday')
			return 'Miércoles'
		else if (day === 'thursday')
			return 'Jueves'
		else if (day === 'friday')
			return 'Viernes'
		else if (day === 'saturday')
			return 'Sábado'
		else 
			return 'Desconocido'
	}

	_handleRemoveClass(e) {
		this.classesLeft += 1

		let pickedClasses = this.refs.classesPicked.state.classesPicked,
			tempIndex = 0,
			hour = e.target.parentElement.getAttribute('data-hour'),
			day = e.target.parentElement.getAttribute('data-day'),
			index = 0
		
		pickedClasses.forEach( (pickedClass) => {
			if (pickedClass.hour == hour && pickedClass.day == day)
				index = tempIndex
			++tempIndex
		})
		pickedClasses.splice(index, 1)
		this.refs.classesPicked.setState({ classesPicked: pickedClasses })

	}

	_PrepareNewClient(e) {
		e.preventDefault()

		if ( !this._validFieldsNewClient() )
			return

		let selectedClasses = this.refs.classesPicked.state.classesPicked,
			dataToSend      = { 
				selectedClasses: selectedClasses, packageId: this.packageId,
				clientName: this.refs.client.state.name, clientLastName: this.refs.client.state.lastName,
				clientPhoneNumber: this.refs.client.state.phoneNumber, clientUserName: this.refs.client.state.userName,
				clientDateBegin: this.refs.client.dateBegin, clientDateEnd: this.refs.client.dateEnd 
			 }

		console.log(dataToSend)
		this._sendNewClientToServer(dataToSend)

	}

	_sendNewClientToServer(dataToSend) {
		io.socket.post( this.props.urlSaveClient , dataToSend, (resData, jwres) => {
			console.log(jwres)
      		console.log(resData)
      		this._handleReponseFromServer(jwres, resData)
    	}.bind(this))
	}

	_handleReponseFromServer(jwres, resData) {
		if ( jwres.statusCode === 500 )
			this._drawMessages('Que pena, tuvimos un error interno.', 'danger')
		else if ( jwres.statusCode === 400 )
			this._drawMessages('No se encontró la ruta solicitada, o el server esta caido.', 'danger')
		else if ( jwres.statusCode === 200 ) {
			if ( resData.message === 'ok')
				this._drawMessages( resData.data , 'success')
			else
				this._drawMessages( resData.message , 'danger')
		}

	}

	_validFieldsNewClient() {
		if ( this.refs.client.state.name !== '') {
			if ( this.refs.client.state.lastName !== '') {
				if ( this.refs.client.state.userName !== '') {
					if ( this.refs.client.state.dateBegin !== '') {
						if ( this.refs.client.state.dateEnd !== '') {
							if ( this.refs.classesPicked.state.classesPicked.length > 0) {
								return true
							} else
								this._drawMessages('Debe seleccionar al menos una clase.', 'warning')
						} else
							this._drawMessages('La fecha fin no puede ir vacía.', 'warning')
					} else
						this._drawMessages('La fecha inicio no puede ir vacía.', 'warning')
				} else
					this._drawMessages('El nombre de usuario no puede ir vacío.', 'warning')
			} else
				this._drawMessages('El apellido no puede ir vacío.', 'warning')
		} else
			this._drawMessages('El nombre no puede ir vacío.', 'warning')

		return false
	}

	_drawMessages(message, type) {
		let typeM = 'alert-' + type
		this.refs.messages.setState({ message: message, typeM: typeM })
	}

	render() {

		return (
			<div>
				<ResponseMessages ref="messages"/>
				<div className="col-lg-6">
					<InfoClient ref="client" urlDisciplines={this.props.urlDisciplines} urlPackages={this.props.urlPackages} 
					onChangeDiscipline={this._handleChangeDiscipline} onChangePackage={this._handleChangePackage}
					onSubmitNewClien={this._PrepareNewClient}/>
				</div>
				<div className="col-lg-6">
					<ClassesPicked ref="classesPicked" handleClickRemoveClass={this._handleRemoveClass}/>
				</div>
				<div className="col-lg-12">
					<TableSchedule ref="schedule" disciplinetext={this.state.disciplineText} discipline={this.state.discipline} urlSchedule={this.props.urlSchedule} 
					urlHours={this.props.urlHours} onClickCell={this._handleClickCell}/>
				</div>
			</div>
		)
	}
}

export default AddClient