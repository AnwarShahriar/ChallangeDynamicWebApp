'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var PollHandler = require(path + '/app/controllers/pollHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();
	var pollHandler = new PollHandler();

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});
	
	function redirectToCreatePoll(req, res, next) {
		
	}
	
	app.route('/createpoll')
		.get(function(req, res, next) {
			req.session.redirectTo = '/createpoll';
			next();	
		}, isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/createpoll.html');	
		})

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});
		
	app.route('/polldetail/:id')
		.get(function(req, res) {
			res.sendFile(path + '/public/poll.html'); 
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.twitter);
		});

	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(function(req, res, next) {
			passport.authenticate('twitter', {
				successRedirect: req.session.redirectTo ? req.session.redirectTo : '/',
				failureRedirect: '/login'
			})(req, res, next);
		});

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
		
	app.route('/api/polls')
		.post(isLoggedIn, pollHandler.newPoll);
		
	app.route('/api/polls/:id')
		.get(function(req, res) {
			if (req.isAuthenticated()) {
				return pollHandler.authenticatedPollById(req, res);
			} else {
				return pollHandler.pollById(req, res);
			}
		});
	
};
