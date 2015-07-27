/**
 * PaqueteController
 *
 * @description :: Server-side logic for managing paquetes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	getActivePackages: function (req, res) {

	    Paquete.find()
	    .where( { isActive: true } )
	    .exec(function (err, packages) {
        	if (err) return helpers.fail(err, res)

        	res.statusCode = 200
        	return res.json(helpers.jsonfy('ok', packages))
        	
    	})
    
	},

	getAllPackages: function (req, res) {
		Paquete.find()
		.exec(function (err, packages) {
			if (err) return helpers.fail(err, res)

			res.statusCode = 200
			return res.json(helpers.jsonfy('ok', packages))
		})
	},
};

