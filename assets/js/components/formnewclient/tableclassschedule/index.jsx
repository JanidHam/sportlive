import React from 'react'

class TableSchedule extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = { schedule: [], hours: [], noHours: true, discipline: this.props.discipline,
			disciplinetext: this.props.disciplinetext
		 }
	}

	componentWillMount() {
		io.socket.post( this.props.urlHours, {}, (resData) => {
      		this.setState({ hours: resData.data })
    	}.bind(this))

		io.socket.post( this.props.urlSchedule , {discipline: this.state.discipline }, (resData) => {
      		this.setState({ schedule: resData.data })
    	}.bind(this))
	}

	componentDidMount() {
		if ( this.state.hours.length > 0)
			this.setState({ noHours: false })
	}

	render() {
		if ( this.state.hours.length <= 0) {
			if ( this.state.noHours )
				return <p className="text-center">No se encontraron horas.</p>
			return <p className="text-center">Cargando horas..</p>
		}
		
		if ( this.state.discipline <= 0)
			return <p className="text-center">Seleccione una disciplina..</p>
		/*if ( this.state.schedule.length <= 0 ) {
			if ( this.state.noSchedule )
				return <p className="text-center">No se encontró ningún horario disponible.</p>
			return <p className="text-center">Cargando horarios..</p>
		}*/

		var schedules = this.state.schedule,
			hours     = this.state.hours,
			index     = 0

		return (
			<table className="table table-bordered">
	            <thead>
	              <tr>
	              	<th><strong>Hora</strong></th>
	                <th><strong>Lunes</strong></th>
	                <th><strong>Martes</strong></th>
	                <th><strong>Miércoles</strong></th>
	                <th><strong>Jueves</strong></th>
	                <th><strong>Viernes</strong></th>
	                <th><strong>Sábado</strong></th>
	              </tr>
	            </thead>
	            <tbody>
	              {
	              	hours.map( (hour)  => {
	              		let colorMonday    = 'cursor-pointer success text-center',
							colorTuesday   = 'cursor-pointer success text-center',
							colorWednesday = 'cursor-pointer success text-center',
							colorThursday  = 'cursor-pointer success text-center',
							colorFriday    = 'cursor-pointer success text-center',
							colorSaturday  = 'cursor-pointer success text-center',
							colorHour      = 'warning',
							keyHours       = hour.id + hour.hour,
							keyMonday      = hour.id + 'monday',
							keyTuesday     = hour.id + 'tuesday',
							keyWednesday   = hour.id + 'wednesday',
							keyThursday    = hour.id + 'thursday',
							keyFriday      = hour.id + 'friday',
							keySaturday    = hour.id + 'saturday',
							monday         = 0,
							tuesday        = 0,
							wednesday      = 0,
							thursday       = 0,
							friday         = 0,
							saturday       = 0,
							clickMonday    = this.props.onClickCell,
							clickTuesday   = this.props.onClickCell,
							clickWednesday = this.props.onClickCell,
							clickThursday  = this.props.onClickCell,
							clickFriday    = this.props.onClickCell,
							clickSaturday  = this.props.onClickCell,
							hourText = hour.hour

						if ( hourText < 10)
							hourText = '0' + hourText + ':00 am'
						else if ( hourText > 9 && hourText < 12 )
							hourText += ':00 am'
						else if ( hourText > 11 )
							hourText += ':00 pm'

	              		if (typeof schedules[index] !== 'undefined' && hour.id === schedules[index].hour ) {
							monday    = schedules[index].monday
							tuesday   = schedules[index].tuesday
							wednesday = schedules[index].wednesday
							thursday  = schedules[index].thursday
							friday    = schedules[index].friday
							saturday  = schedules[index].saturday
							//colorMonday = 'success text-center'
	              			++index
	              		}
	              		return (
              				<tr data-hour={hour.id} data-hourtext={hourText} data-disciplinetext={this.state.disciplinetext} data-discipline={this.state.discipline} key={hour.id}>
	          				   <td className={colorHour} key={keyHours}>{hourText}</td>
						       <td className={colorMonday} onClick={clickMonday} data-day="monday" key={keyMonday}>{monday}</td>
						       <td className={colorTuesday} onClick={clickTuesday} data-day="tuesday" key={keyTuesday}>{tuesday}</td>
						       <td className={colorWednesday} onClick={clickWednesday} data-day="wednesday" key={keyWednesday}>{wednesday}</td>
						       <td className={colorThursday} onClick={clickThursday} data-day="thursday" key={keyThursday}>{thursday}</td>
						       <td className={colorFriday} onClick={clickFriday} data-day="friday" key={keyFriday}>{friday}</td>
						       <td className={colorSaturday} onClick={clickSaturday} data-day="saturday" key={keySaturday}>{saturday}</td>
						     </tr>
	              		)
	              	})
	              }
	            </tbody>
          	</table>
		)
	}
}

export default TableSchedule