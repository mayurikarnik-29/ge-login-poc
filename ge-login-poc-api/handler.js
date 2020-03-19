const jwt = require('jsonwebtoken')

const jwtKey = 'my_secret_key'
const jwtExpirySeconds = 300

const signIn = (req, res) => {
  // Get credentials from JSON body
  const { username, password } = req.body
  if (!username || !password) {
    // return 401 error is username or password doesn't exist
    return res.status(401).end()
  }

  // Create a new token with the username in the payload
  // and which expires 300 seconds after issue
  const token = jwt.sign({ username }, jwtKey, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds
  })
  console.log('token:', token)

  // set the cookie as the token string, with a similar max age as the token
  // here, the max age is in milliseconds, so we multiply by 1000
  res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 })
  res.end()
}