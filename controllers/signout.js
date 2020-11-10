const redisClient = require('../redis/redis-config').redisClient

const handleSignout = (req, res) => {
  const { authorization } = req.headers
  redisClient.del(authorization, (err, reply)=>{
    return  err || !reply ? 
      res.status(404).json('Something went wrong!') :
      res.json('Successfully singed out!')
  })
}
module.exports = {
  handleSignout
}