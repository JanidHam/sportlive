/**
* Classschedule.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	
  	monday: {
  		type: 'integer',
  		size: 2,
  		defaultsTo: 0
  	},

  	tuesday: {
  		type: 'integer',
  		size: 2,
  		defaultsTo: 0
  	},

  	wednesday: {
  		type: 'integer',
  		size: 2,
  		defaultsTo: 0
  	},

  	thursday: {
  		type: 'integer',
  		size: 2,
  		defaultsTo: 0
  	},

  	friday: {
  		type: 'integer',
  		size: 2,
  		defaultsTo: 0
  	},

  	saturday: {
  		type: 'integer',
  		size: 2,
  		defaultsTo: 0
  	},

  	discipline: {
  		model: 'Disciplina'
  	},

  	hour: {
  		model: 'Hour'
  	},

  	client: {
  		model: 'Client'
  	}

  }
};

