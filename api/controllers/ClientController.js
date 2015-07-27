/**
 * ClientController
 *
 * @description :: Server-side logic for managing clients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
helpers        = require('../utils/helpers')
schedule       = require('./ClassscheduleController')
clientSchedule = require('./ClientscheduleController')

module.exports = {
	
	getActiveClients: function (req, res) {

	    // If not logged in, show the public view.
	    //if (!req.session.me) {
	    //  return res.view('homepage');
	    //}
	    Client.find()
	    .where( { isActive: true } )
	    .exec(function (err, clients) {
        	// do stuff
        	if (err) return helpers.fail(err, res)//res.json({ res: 'Ocurrió un error'})

        	res.statusCode = 200
        	return res.json(helpers.jsonfy('ok', clients))
        	
    	})
    
	},

	getAllClients: function (req, res) {
		Client.find()
		.exec(function (err, clients) {
			if (err) return helpers.fail(err, res)//res.json({ res: 'Ocurrió un error'})

			res.statusCode = 200
			return res.json(helpers.jsonfy('ok', clients))
		})
	},

	addNewClient: function (req, res) {

		var newClient = this.createClient(req.param('clientName'), req.param('clientLastName'), req.param('clientPhoneNumber'),
					req.param('clientUserName'), '', req.param('packageId'), req.param('clientDateBegin'),
					req.param('clientDateEnd'))

		Client.findOrCreate({ userName: req.param('clientUserName') }, newClient)
		.exec(function (err, client) {
			if (err) return helpers.fail(err, res)

			var dif = Date.now() - client.createdAt.valueOf()

			if ( dif > 20 ) {
				res.statusCode = 200
        		return res.json(helpers.jsonfy('El nombre de usuario ya existe', {}))
			}

			var isOkClientSchedule = clientSchedule.addClientSchedule( client.id, req.param('selectedClasses'),
				req.param('clientDateBegin'), req.param('clientDateEnd')
			)

			if ( ! isOkClientSchedule ) {
				
				Client.destroy({ id: client.id })
				.exec(function (err) {
					if (err) return helpers.fail(err, res)
				})

				res.statusCode = 200
        		return res.json(helpers.jsonfy('Hubo un error agregando al client', {}))
			}

			res.statusCode = 200
        	return res.json(helpers.jsonfy('ok', req.param('clientName') + ' agregado con exito.'))

			var isOkSchedule = schedule.addSchedule( req.param('selectedClasses'), client.id )

			
			if ( ! isOkSchedule ) {
				
				Client.destroy({ id: client.id })
				.exec(function (err) {
					if (err) return helpers.fail(err, res)
				})

				res.statusCode = 200
        		return res.json(helpers.jsonfy('Hubo un error agregando al client', {}))
			}

			res.statusCode = 200
        	return res.json(helpers.jsonfy('ok', req.param('clientName') + ' agregado con exito.'))
		})

		
	},

	createClient: function (name, lastName, phoneNumber, userName, observations, activePackage, dateBegin, dateEnd) {
		return {
			firstName    : name,
			lastName     : lastName,
			phoneNumber  : phoneNumber,
			userName     : userName,
			observations : observations,
			activePackage: activePackage,
			dateBegin    : dateBegin,
			dateEnd      : dateEnd
		}
	}

};

