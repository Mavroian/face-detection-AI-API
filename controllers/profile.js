const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
}

const handleProfileUpdate = (req, res ,db) => {
  const { id } = req.params
  const { name, age, pet } = req.body.formInput
  db('users')
    .where({ id })
    .update({ name ,age, pet})
    .then( response => response ? res.json('success') : res.status(400).json('unable to update'))
    .catch(error => res.status(400).json('error'))
}
module.exports = {
  handleProfileGet,
  handleProfileUpdate
}