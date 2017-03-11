'use strict';

var Users = require('../models/users.js');
var _ = require('lodash');

function PollHandler () {

	this.newPoll = function (req, res) {
		
	    var title = req.body.title;
	    var options = _.map(req.body.options, (option) => { 
	    		return { name: option, voteCount: 0 };
	    	});
	    var poll = { title: title, options: options };
	    
		Users
			.findOne({ 'twitter.id': req.user.twitter.id })
			.exec(function (err, user) {
					
					if (err) { throw err; }
                    
                    var newPoll = user.polls.create(poll);
                    
                    user.polls.push(newPoll);
                    
                    user.save(function (err) {
                        if (err) { throw err; }
                    });
					
					res.json({id: newPoll._id, redirectPath: '/'});
				}
			);
	};
	
	this.getPoll = function (req, res) {
	    Users
	        .findOne({ 'twitter.id': req.user.twitter.id })
	        .exec(function (err, user) {
	           if (err) throw err;
	           
	           var pollId = req.params.id;
	           
	           var match = null;
	           for (var i = 0; i < user.polls.length; i++) {
	        	   var poll = user.polls[i];
	               if (pollId === poll._id.toString()) {
	                   match = user.polls[i];
	                   break;
	               }
	           }
	           
	           res.json(match);
	        });
	};

}

module.exports = PollHandler;