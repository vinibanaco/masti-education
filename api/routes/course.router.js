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

/* ===== CREATE COURSE ===== */
router.post('/',
  secure,
  (req, res, next) => {
    const newCourse = req.body
    const {
      title, description, instructor, duration, thumbnail, preview_url: previewUrl
    } = newCourse

    db.getConnection((err, connection) => {
      if (err) {
        return next(err)
      }

      // Creates a rollback point
      connection.beginTransaction(err => {
        if (err) {
          return connection.rollback(() => {
            connection.release()
            next(err)
          })
        }

        // Inserts the course
        connection.query(
          'INSERT INTO course(title, description, instructor, duration, thumbnail, preview_url) VALUES(?, ?, ?, ?, ?, ?)',
          [title, description, instructor, duration, thumbnail, previewUrl],
          (err, results) => {
            if (err) {
              return connection.rollback(() => {
                connection.release()
                next(err)
              })
            }

            newCourse.id = results.insertId

            const classesValues = newCourse.classes.map(courseClass => {
              const { title, description, url } = courseClass
              return [title, description, url, newCourse.id]
            })

            // Inserts the classes of the course
            connection.query(
              'INSERT INTO class(title, description, url, course_id) VALUES ?',
              [classesValues],
              err => {
                if (err) {
                  return connection.rollback(() => {
                    connection.release()
                    next(err)
                  })
                }

                // Applies changes in database if has not any errors
                connection.commit(err => {
                  if (err) {
                    return connection.rollback(() => {
                      connection.release()
                      next(err)
                    })
                  }

                  res.status(201).json(newCourse)
                })
              }
            )
          }
        )
      })
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