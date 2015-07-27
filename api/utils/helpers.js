module.exports = {

	fail: function (err, res) {
		res.statusCode = 500
		res.setHeader('Content-Type', 'text/plain')
		res.end(err.message)
	},

	jsonfy: function (message, data) {  
		return {
			message : message,
			data    : data
		}
	},

	diaToDay: function (dia) {
		if ( dia.toLowerCase() === 'lunes' )
			return 'monday'
		else if ( dia.toLowerCase() === 'martes' )
			return 'tuesday'
		else if ( dia.toLowerCase() === 'miércoles' || dia.toLowerCase() === 'miercoles')
			return 'wednesday'
		else if ( dia.toLowerCase() === 'jueves' )
			return 'thursday'
		else if ( dia.toLowerCase() === 'viernes' )
			return 'friday'
		else if ( dia.toLowerCase() === 'sábado' || dia.toLowerCase() === 'sabado' )
			return 'saturday'
		else
			return 'unknow'
	},

	dayToNumber: function (day) {
		if ( day.toLowerCase() === 'lunes' )
			return 1
		else if ( day.toLowerCase() === 'martes' )
			return 2
		else if ( day.toLowerCase() === 'miércoles' || day.toLowerCase() === 'miercoles')
			return 3
		else if ( day.toLowerCase() === 'jueves' )
			return 4
		else if ( day.toLowerCase() === 'viernes' )
			return 5
		else if ( day.toLowerCase() === 'sábado' || day.toLowerCase() === 'sabado' )
			return 6
		else
			return -1
	},

}