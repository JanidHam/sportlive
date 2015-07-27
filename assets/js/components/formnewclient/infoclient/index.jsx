import React from 'react'
import ComboDisciplines from '../combodisciplines'
import ComboPackages from '../combopackages'

class NewClient extends React.Component {
	
	constructor(props) {
		super(props)
		this.dateEnd   = new Date()
		this.dateBegin = new Date()
		this.dateEnd.setMonth(this.dateEnd.getMonth() + 1)
		this.state = { dateBegin: this.dateBegin.toLocaleDateString(), dateEnd: this.dateEnd.toLocaleDateString(), name:'', lastName: '', 
			phoneNumber: '', userName: ''
		}
		this._bind('_handleChange')
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

	_handleChange(e) {
		if ( e.target.id === 'clientName' )
			this.setState({ name: e.target.value.toUpperCase() })
    	else if ( e.target.id === 'clientLastName' )
    		this.setState({ lastName: e.target.value.toUpperCase() })
    	else if ( e.target.id === 'clientPhoneNumber' )
    		this.setState({ phoneNumber: e.target.value })
    	else if ( e.target.id === 'clientUserName' )
    		this.setState({ userName: e.target.value.toUpperCase() })
  	}

	render() {
		return (
			<div className="form-panel">
				<form className="form-horizontal tasi-form" role="form">
					<div className="form-group">
						<div className="col-sm-6">
                            <input type="text" className="form-control text-uppercase" id="clientName" placeholder="Nombre" value={this.state.name} onChange={this._handleChange}/>
                        </div>
                        <div className="col-sm-6">
                            <input type="text" className="form-control text-uppercase" id="clientLastName" placeholder="Apellidos" value={this.state.lastName} onChange={this._handleChange}/>
                        </div>
					</div>
					<div className="form-group">
						<div className="col-sm-6">
                            <input type="tel" className="form-control text-uppercase" id="clientPhoneNumber" placeholder="Teléfono" value={this.state.phoneNumber} onChange={this._handleChange}/>
                        </div>
                        <div className="col-sm-6">
                            <input type="text" className="form-control text-uppercase" id="clientUserName" placeholder="UserName" value={this.state.userName} onChange={this._handleChange}/>
                        </div>
					</div>
					<div className="form-group">
						<div className="col-sm-6">
                            <input type="text" className="form-control text-uppercase" id="clientDateBegin" placeholder="Fecha Inicio" value={this.state.dateBegin} disabled/>
                        </div>
                        <div className="col-sm-6">
                            <input type="text" className="form-control text-uppercase" id="clientDateEnd" placeholder="Fecha Fin" value={this.state.dateEnd}/>
                        </div>
					</div>
					<div className="form-group">
						<div className="col-lg-12">
                            <ComboDisciplines url={this.props.urlDisciplines} ref="combo" onChange={this.props.onChangeDiscipline}/>
                        </div> 
					</div>
					<div className="form-group">
						<div className="col-lg-12">
                            <ComboPackages url={this.props.urlPackages} ref="pack" onChangePackage={this.props.onChangePackage}/>
                        </div> 
					</div>
					<div className="form-group">
						<div className="col-lg-12">
                            <button type="submit" className="btn btn-success btn-sm" onClick={this.props.onSubmitNewClien} >Agregar cliente</button>
                        </div> 
					</div>
				</form>
			</div>
		)
	}
}

export default NewClient