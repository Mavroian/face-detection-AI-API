const  { getAuthTokenId, createSessions } = require('../Authorization/authorization')

const handleSignin = (db, bcrypt, req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }
  return db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => user[0])
          .catch(err => Promise.reject('unable to get user'))
      } else {
        Promise.reject('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
}

const signinAuthentication = (db, bcrypt) => (req, res) => {
  const { authorization } = req.headers
  return authorization ? 
    getAuthTokenId(req, res) : 
    handleSignin(db, bcrypt, req, res)
      .then(data => {
        console.log(data)
        return data.id && data.email ? createSessions(data) : Promise.reject(data)
      })
      .then(session => res.json(session) )
      .catch(error => {
        console.log(error)
        res.status(400).json(error)
      })
}
module.exports = {
  signinAuthentication
}