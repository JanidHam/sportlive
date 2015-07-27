/**
* Disciplina.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	
  	discipline: {
  		type: 'string',
  		size: 80,
  		required: true
  	},

  	limitClients: {
  		type: 'integer',
  		size: 2,
  		required: true
  	},

  	isActive: {
  		type: 'boolean',
  		defaultsTo: true
  	}
  },

  afterCreate: function(discipline, next) {
    sails.io.sockets.emit('new discipline', discipline);
    next();
  }
};

