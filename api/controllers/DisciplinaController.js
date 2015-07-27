/**
 * DisciplinaController
 *
 * @description :: Server-side logic for managing disciplinas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
helpers = require('../utils/helpers')

module.exports = {
	
	getActiveDisciplines: function (req, res) {

	    Disciplina.find()
	    .where( { isActive: true } )
	    .exec(function (err, disciplines) {
        	if (err) return helpers.fail(err, res)

        	res.statusCode = 200
        	return res.json(helpers.jsonfy('ok', disciplines))
        	
    	})
    
	},

	getAllDisciplines: function (req, res) {
		Disciplina.find()
		.exec(function (err, disciplines) {
			if (err) return helpers.fail(err, res)

			res.statusCode = 200
			return res.json(helpers.jsonfy('ok', disciplines))
		})
	},
};

