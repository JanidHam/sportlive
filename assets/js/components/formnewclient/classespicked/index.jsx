import React from 'react'

class ClassesPicked extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = { classesPicked: [] }//[{day: 'Lunes', discipline: -1, disciplineText: 'TRX', hour: -1, hourText: '10:10'}, {day: 'Lunes', discipline: -1, disciplineText: 'TRX', hour: 0, hourText: '11:10'}] }
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
		
  	}

	render() {
		
		var classesPicked = this.state.classesPicked
		return (
			<div className="form-panel">
				<form className="form-horizontal tasi-form" role="form">
					<div className="form-group">
						{
							classesPicked.map( (classPicked) => {
								var id = classPicked.hour + classPicked.day + classPicked.discipline
								return (
									<div className="row showback selected-class" key={id} data-hour={classPicked.hour} data-day={classPicked.day} data-disciplina={classPicked.discipline}>
										<span className="glyphicon glyphicon-trash cursor-pointer" aria-hidden="true" onClick={this.props.handleClickRemoveClass}></span>
										{classPicked.day} a la(s) {classPicked.hourText} - {classPicked.disciplineText}
									</div>
								)
							})
						}
					</div>
				</form>
			</div>
		)
	}
}

export default ClassesPicked