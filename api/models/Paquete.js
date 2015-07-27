/**
* Paquete.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	packageName: {
  		type: 'string',
  		size: 80,
  		required: true
  	},

  	cost: {
  		type: 'float',
  		required: true
  	},

  	days: {
  		type: 'integer',
  		size: 2,
  		required: true
  	},

  	isActive: {
  		type: 'boolean',
  		defaultsTo: true
  	}
  }
};

