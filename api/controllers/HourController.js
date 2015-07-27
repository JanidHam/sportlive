/**
 * HourController
 *
 * @description :: Server-side logic for managing hours
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	getAllHours: function (req, res) {
		Hour.find()
		.exec(function (err, hours) {
			if (err) return helpers.fail(err, res)

			res.statusCode = 200
			return res.json(helpers.jsonfy('ok', hours))
		})
	},
};

