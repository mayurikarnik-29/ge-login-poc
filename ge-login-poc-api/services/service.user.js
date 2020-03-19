const UserModel = require("../models/model.user");
var lodash = require('lodash');

let users = {};
let counter = 0;
let uid = 'u0';
class UserService
{
	static create(data)
	{
		let user = new UserModel(uid, data.username, data.firstname, data.lastname, data.email, data.password);

		user.uid = 'u' + counter++;

		users[user.uid] = user;

		return user;
	}

	static retrieve(uid)
	{
		if(users[uid] != null)
		{
			return users[uid];
		}
		else
		{
			throw new Error('Unable to retrieve a user by (uid:'+ uid +')');
		}
	}

	static retrieveByUserName(username)
	{
		var user = lodash.filter(users, { 'username': username } );

		if(user) {
			return user;
		}
		else {
			throw new Error('Unable to retrieve a user by (username:'+ username +')');
		}

	}
}

module.exports = UserService;