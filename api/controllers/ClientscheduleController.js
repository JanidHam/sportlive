/**
 * ClientscheduleController
 *
 * @description :: Server-side logic for managing clientschedules
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
helpers = require('../utils/helpers')

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
		console.log(datesArray)
		//Si hay valores mayores a 9 se ordena de otra manera ejemplo:
		//[1,10,2,40,3,100] resultado seria -> 1,10,100,2,3,40
		//solucion poner esto como parametro function(a, b){return a-b}
		datesArray.sort(this.sortByDayNumber)
		console.log(datesArray)
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

			if ( tempDateBegin.getMonth() >= tempDateEnd.getMonth() &&  
				 tempDateBegin.getDate() > tempDateEnd.getDate())
				break
			
			daysToSchedule.push( 
				this.createSchedule( tempDateBegin.toLocaleDateString(), clientID, datesArray[indexBeginDay] ) 
			)
			
			if ( isFirstRegister )
				daysToSchedule[0].asist = true

			while ( true ) {

				if ( typeof datesArray[indexBeginDay + 1] !== 'undefined' && 
				 datesArray[indexBeginDay].dayNumber === datesArray[indexBeginDay + 1].dayNumber) {

					++indexBeginDay

					daysToSchedule.push( 
						this.createSchedule( tempDateBegin.toLocaleDateString(), clientID, datesArray[indexBeginDay] ) 
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

	createSchedule: function (day, clientID, schedule) {
		return {
			client    : clientID,
			date      : day,
			hour      : schedule.hour,
			discipline: schedule.discipline,
			asist     : null,
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

