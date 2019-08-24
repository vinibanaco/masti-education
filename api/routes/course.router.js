const express = require('express')
const passport = require('passport')

const { db } = require('../database/db')
const { validatePermission } = require('../handlers/authentication.handler')

const router = express.Router()

const secure = [
  passport.authenticate('jwt', { session: false }),
  validatePermission
]

/* ===== GET ALL COURSES ===== */
router.get('/',
  secure,
  (req, res, next) => {
    db.query('SELECT * FROM course', (err, results) => {
      if (err) {
        return next(err)
      }

      if (results.length === 0) {
        return res.status(404).send('Curso não encontrado')
      }

      res.json(results)
    })
  }
)

/* ===== GET COURSE ===== */
router.get('/:id',
  secure,
  (req, res, next) => {
    db.query(
      'SELECT * FROM course WHERE id=?',
      [req.params.id],
      (err, results) => {
        if (err) {
          return next(err)
        }
        res.send(results[0])
      }
    )
  }
)

module.exports = router