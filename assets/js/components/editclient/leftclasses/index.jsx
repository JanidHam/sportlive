import React from 'react'

class ClassesLeft extends React.Component {
	constructor(props) {
		super(props)
		this.state = { show: 'hide'}
	}

	componentWillMount() {

	}

	componentDidMount() {

	}

	render() {
		var show = "form-panel " + this.state.show
		
		if ( this.props.leftClasses.length === 0)
			return <p className={show}>No cuenta con clases pedientes..</p>
		return (
			<div className={show}>
				<form className="form-horizontal tasi-form" role="form">
					<h3> Días de clase pedientes.</h3>
					<div className="form-group">
						{
							this.props.leftClasses.map( (classLeft) => {
								return (
									<div className="row showback selected-class" key={classLeft.id} data-date={classLeft.date} data-id={classLeft.id}>
										<span className="glyphicon glyphicon-ok-sign cursor-pointer font-size-15" aria-hidden="true" onClick={this.props._handleClassAsist}></span>
										&nbsp;&nbsp;&nbsp;
										<span className="glyphicon glyphicon-remove-sign cursor-pointer font-size-15" aria-hidden="true" onClick={this.props._handleClassInAsist}></span>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										Día de la clase: {classLeft.date}
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

export default ClassesLeft