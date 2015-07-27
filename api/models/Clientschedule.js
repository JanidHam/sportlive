/**
* Clientschedule.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	
  	client: {
     	model: 'Client',
     	required: true
    },
    
    date: {
    	type: 'string',
    	required: true
    },
    
    hour: {
    	model: 'Hour',
    	required: true
    },

    discipline: {
    	model: 'Disciplina',
    	required: true
    },

    asist: {
    	type: 'boolean',
    	defaultsTo: null
    },
  }
};

