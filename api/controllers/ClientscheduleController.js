/**
 * ClientscheduleController
 *
 * @description :: Server-side logic for managing clientschedules
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
helpers       = require('../utils/helpers')
classSchedule = require('./ClassscheduleController')

module.exports = {
	
	addClientSchedule: function (clientID, classesSelected, dateBegin, dateEnd) {
		console.log('Empieza..')
		console.log(Date.now())
		var datesArray     = [],
			daysToSchedule     = [],
			controller         = this,
			tempDateBegin      = new Date(dateBegin),
			tempDateEnd        = new Date(dateEnd),
			indexBeginDay      = 0,
			foundIndexBegin    = false,
			isOkClientSchedule = true,
			isFirstRegister    = true

		for (var i = 0; i < classesSelected.length; i++) {
			var tempDayNumber = helpers.dayToNumber( classesSelected[i].day )
			if ( tempDayNumber !== -1 )
				datesArray.push( { dayNumber: tempDayNumber, discipline: classesSelected[i].discipline,
					clientID: clientID, hour: classesSelected[i].hour
				} )
		}
		
		//Si hay valores mayores a 9 se ordena de otra manera ejemplo:
		//[1,10,2,40,3,100] resultado seria -> 1,10,100,2,3,40
		//solucion poner esto como parametro function(a, b){return a-b}
		datesArray.sort(this.sortByDayNumber)
		
		datesArray.some(function(element, index, array) {
			if ( element.dayNumber === tempDateBegin.getDay() ) {
				indexBeginDay   = index
				foundIndexBegin = true
				return true
			}
		})
		
		//isOkClientSchedule = false
		//return isOkClientSchedule
		
		while( true ) {
			if ( tempDateBegin.getMonth() > tempDateEnd.getMonth() ||  
				 (tempDateBegin.getDate() > tempDateEnd.getDate() && tempDateBegin.getMonth() == tempDateEnd.getMonth()))
				break
			
			daysToSchedule.push( 
				this.createSchedule( tempDateBegin.toLocaleDateString(), clientID, datesArray[indexBeginDay], tempDateBegin.getMonth() ) 
			)
			
			if ( isFirstRegister )
				daysToSchedule[0].asist = true

			while ( true ) {

				if ( typeof datesArray[indexBeginDay + 1] !== 'undefined' && 
				 datesArray[indexBeginDay].dayNumber === datesArray[indexBeginDay + 1].dayNumber) {

					++indexBeginDay

					daysToSchedule.push( 
						this.createSchedule( tempDateBegin.toLocaleDateString(), clientID, datesArray[indexBeginDay], tempDateBegin.getMonth() ) 
					)

					if ( isFirstRegister )
						daysToSchedule[daysToSchedule.length - 1].asist = true

				}
				else {
					isFirstRegister = false
					break
				}
			}
			

			var tempSumDayWhile = datesArray[indexBeginDay].dayNumber

			++indexBeginDay
			
			if ( typeof datesArray[indexBeginDay] === 'undefined' ) {
				tempSumDayWhile = datesArray[indexBeginDay - 1].dayNumber - 7
				if (tempSumDayWhile < 0) tempSumDayWhile *= -1
				indexBeginDay = 0
				tempSumDayWhile += (datesArray[indexBeginDay].dayNumber)

			}
			else
				tempSumDayWhile -= datesArray[indexBeginDay].dayNumber
			
			if ( tempSumDayWhile < 0)
				tempSumDayWhile *= -1

			tempDateBegin.setDate( tempDateBegin.getDate() + tempSumDayWhile )
		}

		Clientschedule.create(daysToSchedule)
		.exec(function (err, schedule) {

			if (err) isOkClientSchedule = false
		})
		console.log('Acaba..')
		console.log(Date.now())
		return isOkClientSchedule
		
	},

	findClassByDayAndHour: function (req, res) {
		var today = new Date(),
			isClass = false,
			mounthEnd = false
    	
    	Client.find()
    	.where({ id: req.param('clientID') })
    	.exec(function (err, client) {
    		if (err) return helpers.fail(err, res)

    		var dateEnd = new Date(client[0].dateEnd)
    		
    		if ( today.getMonth() > dateEnd.getMonth() ||
    			 (today.getMonth() === dateEnd.getMonth() && today.getDate() > dateEnd.getDate()) )
    			mounthEnd = true

    	})
		
		Clientschedule.find()
		.where({ client: req.param('clientID'), date: today.toLocaleDateString() })
		.populate('hour')
		.populate('client')
		.exec(function (err, schedule) {
        	if (err) return helpers.fail(err, res)

        	if ( mounthEnd ) {
	    		res.statusCode = 200
	        	return res.json(helpers.jsonfy('Mes acabo.', {}))
    		}

        	if (schedule.length === 0) {
        		res.statusCode = 200
        		return res.json(helpers.jsonfy('El cliente no tiene clases hoy.', {}))
        	}

        	schedule.some(function(element, index, array) {
				if ( element.hour.hour == today.getHours() ) {
					isClass = true
					return true
				}
			})
        	
			if ( ! isClass ) {
				res.statusCode = 200
        		return res.json(helpers.jsonfy('El cliente no tiene clase a esta hora.', {}))
			}

			if ( schedule[0].asist ) {
				res.statusCode = 200
        		return res.json(helpers.jsonfy('Ya se registró su asistencia del día y hora.', {}))
			}

			if ( schedule[0].id > 0 ) {
				
				Clientschedule.update({ id: schedule[0].id }, { asist: true })
				.exec(function (err, update) {
					if (err) return helpers.fail(err, res)

					res.statusCode = 200
        			return res.json(helpers.jsonfy('ok', schedule))
				})
			}
        	
    	})
		
	},

	getAsistByClient: function (req, res) {
		Clientschedule.find()
		.where({ client: req.param('clientID')})//, asist: { '!': null} })
		.populateAll()
		.exec({
			error: function (err) {
				return helpers.fail(err, res)
			},

			success: function (schedule) {
				return res.json(helpers.jsonfy('ok', schedule))
			}
		})
	},

	setAsistByClass: function (req, res) {
		var values = req.param('values')
		console.log(values)
		Clientschedule.update({ id: values[0].id }, { asist: values[0].asistValue})
		.exec({
			error: function (err) {
				return helpers.fail(err, res)
			},

			success: function (schedule) {
				return res.json(helpers.jsonfy('Clase actualizada con éxito.', schedule))
			}
		})
	},

	deleteClassesByClient: function (req, res) {
		var values = req.param('values')
		Clientschedule.destroy({ client: req.param('clientID'), asist: null })
		.exec({
			error: function (err) {
				return helpers.fail(err, res)
			},

			success: function (schedule) {
				Classschedule.destroy({ client: req.param('clientID') })
				.exec({
					error: function (err) {
						return helpers.fail(err, res)
					},

					success: function (schedule) {
						res.statusCode = 200
						return res.json(helpers.jsonfy('Clases liberadas con éxito.', {} ))
					}
				})
			}
		})
	},

	deleteAllClassessByClient: function (clientID) {
		Clientschedule.destroy({ client: clientID })
		.exec({
			error: function (err) {
				return false
			},

			success: function (schedule) {
				return true
			}
		})
	},

	deleteInAsistByID: function (req, res) {
		Clientschedule.destroy({ id: req.param('inAsistID'), asist: false })
		.exec({
			error: function (err) {
				return helpers.fail(err, res)
			},

			success: function () {
				res.statusCode = 200
				return res.json(helpers.jsonfy('Falta borrada.', {} ))
			}
		})
	},

	createSchedule: function (day, clientID, schedule, mes) {
		return {
			client    : clientID,
			date      : day,
			hour      : schedule.hour,
			discipline: schedule.discipline,
			asist     : null,
			mes       : mes
		}
	},

	sortByDayNumber: function (a,b) {
		
		if (a.dayNumber < b.dayNumber)
			return -1
		if (a.dayNumber > b.dayNumber)
			return 1
		return 0
	},
};

