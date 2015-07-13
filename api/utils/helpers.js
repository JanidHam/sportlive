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

}