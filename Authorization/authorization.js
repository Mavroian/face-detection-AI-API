const redisClient = require('../redis/redis-config').redisClient
const JWT = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers
    return !authorization ? 
      res.status(401).json('Unauthorized'): 
      redisClient.get(authorization, (err, reply)=>{
       return  err || !reply ? 
          res.status(401).json('Unauthorized') :
          next()
      })
}
const getAuthTokenId = (req,res) => {
  const { authorization } =  req.headers
  return redisClient.get(authorization, (err, reply) => {
    return  err || !reply ?  res.status(400).json('Unauthorized') : res.json({ id:reply })
  })
}
const signToken = (email) => {
  const jwtPayload = { email }
  return JWT.sign(jwtPayload, process.env.JWT_SECRET, {expiresIn: '2 days'})
}
const setToken = (token, id) => {
  return   Promise.resolve(redisClient.set(token, id))
}
const createSessions = (user) => {
  const  { email, id } = user

  const token = signToken(email)
  return setToken(token, id)
          .then(()=> ({success: 'true', userId: id, token}))
          .catch(error => console.log(error))
}
module.exports = {
  requireAuth,
  getAuthTokenId,
  createSessions
}