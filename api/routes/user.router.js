const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const { db } = require('../database/db')
const { secret, validatePermission } = require('../handlers/authentication.handler')

const router = express.Router()

/* ===== GET ALL USERS ===== */
router.get('/', (req, res, next) => {
  db.query('SELECT * FROM user', (err, results) => {
    if (err) {
      return next(err)
    }
    res.send(results)
  })
})

/* ===== CREATE USER ===== */
router.post('/', (req, res, next) => {
  const newUser = req.body
  const { name, email, password, gender, age } = newUser

  db.query(
    'INSERT INTO user(name, email, password, gender, age) VALUES(?, ?, ?, ?, ?)',
    [name, email, password, gender || 0, age || 0],
    (err, results) => {
      if (err) {
        return next(err)
      }

      newUser.id = results.insertId
      const user = {
        id: newUser.id
      }

      jwt.sign(user, secret, (err, token) => {
        if (err) {
          return next(err)
        }

        newUser.accessToken = `bearer ${token}`
        res.status(201).json(newUser)
      })
    }
  )
})

/* ===== USER PROFILE ===== */
router.get('/profile',
  passport.authenticate('jwt', { session: false }),
  validatePermission,
  (req, res, next) => {
    db.query(
      'SELECT name, email, gender, age FROM user WHERE id=?',
      [req.user.id],
      (err, results) => {
        if (err) {
          return next(err)
        }

        if (results.length === 0) {
          return res.status(404).send('Usuário não encontrado')
        }

        res.json(results[0])
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