class UserModel
{
	constructor(uid, username, firstname, lastname, email, password)
	{
        this.uid = uid;
        this.username = username;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.password = password;
	}
}

module.exports = UserModel;