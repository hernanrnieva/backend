/* Module imports */
require('dotenv').config()
const express = require('express')
const handlebars = require('express-handlebars')
const mongoose = require('mongoose')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cluster = require('cluster')
const os = require('os')

/* File imports */
const router = require('./routes/index')
const passport = require('./passport/passport')
const logInfo = require('./logs/loggers').logInfo
const logWarn = require('./logs/loggers').logWarn
const logError = require('./logs/loggers').logError

/* Initializations */
if(process.env.MODE == 'cluster' && cluster.isPrimary) {
    const numCPUs = os.cpus().length / 2
    logInfo(`Processors number: ${numCPUs}`)
    logInfo(`PID Master: ${process.pid}`)

    for(let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker) => {
        const date = new Date().toLocaleString()
        logWarn(`Worker: ${worker.process.pid} died at ${date}`)

        cluster.fork()
    })
} else {
    const app = express()
    app.use(express.static('src/public'))
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.set('port', process.env.PORT || 8080);
    app.use(cookieParser())
    app.use(session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 600000
        }
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    /* Template configuration */
    app.engine('hbs', handlebars({
        extname: 'hbs',
        layoutsDir: __dirname + '/public/views/layouts',
        defaultLayout: ''
    }))
    app.set('views', __dirname + '/public/views')
    app.set('view engine', 'hbs')

    /* Server initialization */
    const server = app.listen(app.get('port'), () => {
        logInfo(`Server up listening at PORT: ${app.get('port')} with PID: ${process.pid}`)
    });

    server.on('error', (error) => logError(`Error encountered: ${error}`))
    /* ### Server up ### */

    app.use('/api', router)

    app.use('/', (req, res) => {
        logWarn(`Unexisting route attempt: ${req.url}`)
        res.render('layouts/route-fail', {url: req.url})
    })
}