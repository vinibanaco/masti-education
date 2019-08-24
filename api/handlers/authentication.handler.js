const { db } = require('../database/db')

exports.secret = 'pudim'

exports.validateBasic = (username, password, done) => {
  db.query(`
    SELECT user.id, role.id AS roleId FROM user
    	LEFT JOIN user_has_role ON user.id = user_has_role.user_id
      LEFT JOIN role ON role.id = user_has_role.role_id
      WHERE user.email=? AND user.password=?`,
    [username, password],
    (err, results) => {
      if (err) {
        return done(err)
      }

      if (results.length === 0) {
        return done(null, false)
      }

      const user = {
        id: results[0].id,
        roleId: results[0].roleId
      }

      return done(null, user)
    }
  )
}

exports.validateJwt = (jwt_payload, done) => {
  return done(null, jwt_payload)
}

exports.validatePermission = (req, res, next) => {
  const { roleId } = req.user
  const { method } = req
  const url = req.baseUrl + req.route.path

  db.query(`
    SELECT * FROM role_has_permission AS rhp
      INNER JOIN permission ON permission.id = rhp.permission_id
      WHERE rhp.role_id=? AND permission.method=? AND permission.url=?`,
    [roleId, method, url],
    (err, results) => {
      if (err) {
        return next(err)
      }

      if (results.length === 0) {
        return res.sendStatus(403)
      }

      return next()
    }
  )
}