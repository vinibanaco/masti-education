const { db } = require('../database/db')

exports.secret = 'pudim'

exports.validateBasic = (username, password, done) => {
  db.query(
    'SELECT id FROM user WHERE email=? AND password=?',
    [username, password],
    (err, results) => {
      if (err) {
        return done(err)
      }

      if (results.length === 0) {
        return done(null, false)
      }

      const user = {
        id: results[0].id
      }

      return done(null, user)
    }
  )
}

exports.validateJwt = (jwt_payload, done) => {
  return done(null, {
    id: jwt_payload.id
  })
}