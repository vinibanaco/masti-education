const cors = require('cors')
const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const userRouter = require('./routes/user.router')
const autHandler = require('./handlers/authentication.handler')
const courseRouter = require('./routes/course.router')

const app = express()
const port = 4000

/**
 * Corrige o problema do CORS, que é o quando tenta-se enviar os dados
 * para um endereço diferente de 'localhost', no caso é 'localhost:4000'
 */
app.use(cors())

app.use(express.json())
app.use(passport.initialize())

passport.use(new LocalStrategy(autHandler.validateBasic))

let options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: autHandler.secret
}
passport.use(new JwtStrategy(options, autHandler.validateJwt))

/* ===== HOME ===== */
app.get('/', (req, res) => res.send('Pudim!'))

// Import user routes
app.use('/users', userRouter)
app.use((req, res) => res.sendStatus(404))
app.use((err, req, res, next) => res.sendStatus(500))

// Import course routes
app.use('/courses', courseRouter)
app.use((req, res) => res.sendStatus(404))
app.use((err, req, res, next) => res.sendStatus(500))

// Execute
app.listen(port, () => console.log(`API rodando na porta ${port}`))