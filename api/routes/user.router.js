const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const { db } = require('../database/db')
const { secret, validatePermission } = require('../handlers/authentication.handler')

const router = express.Router()

const secure = [
  passport.authenticate('jwt', { session: false }),
  validatePermission
]

/* ===== GET ALL USERS ===== */
router.get('/',
  secure,
  (req, res, next) => {
    db.query('SELECT * FROM user', (err, results) => {
      if (err) {
        return next(err)
      }
      res.send(results)
    })
  })

/* ===== CREATE USER ===== */
router.post('/', (req, res, next) => {
  const user = req.body
  const { name, email, password, gender, age } = user

  db.getConnection((err, connection) => {
    if (err) {
      return next(err)
    }

    const rollback = () => {
      connection.rollback(() => {
        connection.release()
        next(err)
      })
    }

    // Creates a rollback point
    connection.beginTransaction(err => {
      if (err) {
        return rollback
      }

      // Inserts the user
      connection.query(
        'INSERT INTO user(name, email, password, gender, age) VALUES(?, ?, ?, ?, ?)',
        [name, email, password, gender || 0, age || 0],
        (err, results) => {
          if (err) {
            return rollback
          }

          user.id = results.insertId
          user.roles = [1]

          // Inserts the user role
          connection.query(
            `INSERT INTO user_has_role(user_id, role_id) VALUES(${user.id}, 1)`,
            err => {
              if (err) {
                return rollback
              }

              connection.commit(err => {
                if (err) {
                  return rollback
                }

                // Login
                jwt.sign(user, secret, (err, token) => {
                  if (err) {
                    return next(err)
                  }

                  user.accessToken = `bearer ${token}`
                  res.status(201).json(user)
                })
              })
            }
          )
        }
      )
    })
  })
})

/* ===== USER PROFILE ===== */
router.get('/profile',
  secure,
  (req, res, next) => {
    db.query(`
      SELECT u.name, u.email, u.gender, u.age, r.id AS roleId FROM user u
        LEFT JOIN user_has_role hr ON u.id = hr.user_id
        LEFT JOIN role r ON r.id = hr.role_id
        WHERE u.id = ?`,
      [req.user.id],
      (err, results) => {
        if (err) {
          return next(err)
        }

        if (results.length === 0) {
          return res.status(404).send('Usuário não encontrado')
        }

        const { name, email, gender, age } = results[0]
        const user = { name, email, gender, age }
        user.roles = []

        results.forEach(result => {
          user.roles.push(result.roleId)
        })

        res.json(user)
      }
    )
  }
)

/* ===== USER LOGIN ===== */
router.post('/login',
  passport.authenticate('local', { session: false }),
  (req, res, next) => {
    jwt.sign(req.user, secret, (err, token) => {
      if (err) {
        return next(err)
      }

      res.send(`bearer ${token}`)
    })
  }
)

module.exports = router