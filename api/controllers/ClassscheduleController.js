/**
 * ClassscheduleController
 *
 * @description :: Server-side logic for managing classschedules
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
helpers = require('../utils/helpers')

module.exports = {
	
	getClassSchedule: function (req, res) {

	    Classschedule.find()
	    .where({ discipline: req.param('discipline') })
	    .groupBy('hour', 'discipline')
	    .sum('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday')
	    .exec(function (err, schedule) {
        	if (err) return helpers.fail(err, res)

        	res.statusCode = 200
        	return res.json(helpers.jsonfy('ok', schedule))
        	
    	})
    
	},

	addSchedule: function (schedule, clientID) {

		var tempSchedule = [],
			isOk         = true,
			isScheduleOK = true,
			controller   = this

		schedule.forEach(function(element, index, array) {
			var tempS = controller.createSchedule(element, clientID)

			if ( tempS === -1) {
				isOk = false
				return
			}
			tempSchedule.push(tempS)
		})

		if ( ! isOk )
			return false

		Classschedule.create(tempSchedule)
		.exec(function (err, schedule) {

			if (err) isScheduleOK = false
		})

		return isScheduleOK
	},

	createSchedule: function (schedule, clientID) {
		var tempSchedule = {
			monday: 0,
			tuesday: 0,
			wednesday: 0,
			thursday: 0,
			friday: 0,
			saturday: 0,
			discipline: schedule.discipline,
			hour: schedule.hour,
			client: clientID
		}
		
		if ( helpers.diaToDay(schedule.day) === 'monday')
			tempSchedule.monday = 1
		else if ( helpers.diaToDay(schedule.day) === 'tuesday')
			tempSchedule.tuesday = 1
		else if ( helpers.diaToDay(schedule.day) === 'wednesday')
			tempSchedule.wednesday = 1
		else if ( helpers.diaToDay(schedule.day) === 'thursday')
			tempSchedule.thursday = 1
		else if ( helpers.diaToDay(schedule.day) === 'friday')
			tempSchedule.friday = 1
		else if ( helpers.diaToDay(schedule.day) === 'saturday')
			tempSchedule.saturday = 1
		else
			return -1

		return tempSchedule
	}

};

