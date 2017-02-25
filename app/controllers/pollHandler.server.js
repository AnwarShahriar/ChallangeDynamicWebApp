'use strict';

var Users = require('../models/users.js');

function PollHandler () {

	this.newPoll = function (req, res) {
	    console.log('inside new poll');
		Users
			.findOne({ 'twitter.id': req.user.twitter.id })
			.exec(function (err, user) {
					
					if (err) { throw err; }
                    
                    var poll = {
                        title: "Surprise",
                        options: [
                            {
                                name: "Option1",
                                voteCount: 100
                            },
                            {
                                name: "Option2",
                                voteCount: 100
                            },
                            {
                                name: "Option3",
                                voteCount: 100
                            }
                        ]
                    };
                    
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