const express = require('express')
const { db } = require('../database/db')

const router = express.Router()

/* ===== GET ALL COURSES ===== */
router.get('/', (req, res, next) => {
  db.query('SELECT * FROM course', (err, results) => {
    if (err) {
      return next(err)
    }

    if (results.length === 0) {
      return res.status(404).send('Curso não encontrado')
    }

    res.json(results[0])
  })
})

/* ===== GET COURSE ===== */
router.get('/:id', (req, res, next) => {
  db.query(
    'SELECT * FROM course WHERE id=?',
    [req.course.id],
    (err, results) => {
      if (err) {
        return next(err)
      }
      res.send(results)
    }
  )
})

module.exports = router