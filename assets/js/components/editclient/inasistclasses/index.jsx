import React from 'react'

class InAsistClasses extends React.Component {
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

		if ( this.props.inAsistClasses.length === 0)
			return <p className={show}>No tiene ninguna falta.</p>
		return (
				<div className={show}>
					<form className="form-horizontal tasi-form" role="form">
						<h3> Días a los que ha faltado.</h3>
						<div className="form-group">
							{
								this.props.inAsistClasses.map( (inAsist) => {
									return (
										<div className="row showback selected-class" key={inAsist.id} data-date={inAsist.date} data-id={inAsist.id}>
											<span className="glyphicon glyphicon-trash cursor-pointer font-size-15" aria-hidden="true" onClick={this.props._handleInAsistRemove}></span>
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											Día de la clase: {inAsist.date}
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

 export default InAsistClasses