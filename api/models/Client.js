/**
* Client.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	firstName: {
  		type: 'string',
  		size: 80,
  		required: true
  	},

  	lastName: {
  		type: 'string',
  		size: 80,
  		required: true
  	},

  	phoneNumber: {
	    type: 'string',
      defaultsTo: 'No tiene',
	    size: 15
  	},

  	userName: {
	    type: 'string',
	    unique: true
  	},

    observations: 'text',

    dateBegin: 'date',

    dateEnd: 'date',

  	isActive: {
  		type: 'boolean',
  		defaultsTo: true
  	},

    activePackage: {
      model: 'Paquete',
      required: true
    }
    
  },

  afterCreate: function(client, next) {
    sails.io.sockets.emit('new client', client);
    next();
  }

};

