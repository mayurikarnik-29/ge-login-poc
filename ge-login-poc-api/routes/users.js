var express = require('express');
var router = express.Router();
var UserService = require('../services/service.user');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', async function(req, res, next)
{
	res.json({error: "Invalid Customer UID."});
});

/* adds a new user to the list */
router.post('/register', async (req, res, next) =>
{
	const body = req.body;

	try
	{
		const user = await UserService.create(body);

		res.cookie('user', user, { maxAge: 100000000, httpOnly: true });

		// created the user 
		return res.status(201).json({ user: user });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

router.post('/login', async (req, res, next) =>
{	
	const body = req.body;

	try
	{
		const user = await UserService.retrieveByUserName(body.username);

		console.log(user)

		if(user){
			let token = jwt.sign({username: user.username}, 'secret', {expiresIn: '3h'});
			return res.status(200).json({token: token, user: user})
		}
		else {
			return res.status(501).json({message: 'Email is invalid'})
		}
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* retrieves a user by uid */
router.get('/:id', async (req, res, next) =>
{
	try
	{
		const user = await UserService.retrieve(req.params.id);

		return res.json({ user: user });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

module.exports = router;