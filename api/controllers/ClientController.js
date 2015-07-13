/**
 * ClientController
 *
 * @description :: Server-side logic for managing clients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
helpers = require('../utils/helpers')

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

};

