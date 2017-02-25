'use strict';

var Users = require('../models/users.js');

function PollHandler () {

	this.newPoll = function (req, res) {
		Users
			.findOne({ 'twitter.id': req.user.twitter.id })
			.exec(function (err, user) {
					
					if (err) { throw err; }
                    
                    var poll = {
                        title: "hello",
                        options: [
                            {
                                name: "Option1",
                                voteCount: 2
                            },
                            {
                                name: "Option2",
                                voteCount: 5
                            },
                            {
                                name: "Option3",
                                voteCount: 10
                            }
                        ]
                    };
                    
                    var newPoll = user.polls.create(poll);
                    
                    user.save(function (err) {
                        if (err) { throw err; }
                    });
					
					res.json({id: newPoll._id, redirectPath: '/'});
				}
			);
	};

}

module.exports = PollHandler;