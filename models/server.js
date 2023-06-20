const express = require('express')

const { dbConnection } = require('../database/config.js')
const cors = require('cors')
const bodyParser = require('body-parser')


class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.colegioPath = '/api/colegio'
        this.middlewares()
        this.routes()
        this.conectarDB()
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando el puerto ${this.port}`)
        })
    }

    middlewares() {
        this.app.use(express.static(__dirname + "/public"));
        this.app.use(cors());
        this.app.use(bodyParser.json())
    }

    routes() {
        this.app.use(this.colegioPath, require('../routes/colegios.js'))
    }


    async conectarDB() {
        await dbConnection()
    }
}

module.exports = Server
