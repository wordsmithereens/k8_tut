const bodyParser = require("body-parser")
const express = require("express")
const pino = require('pino')

const config = require("./config")()
const logger = pino(pino.destination(config.log_file))

const app = express();

app.use(bodyParser.json());

const loadRepositories = require("./repositories")
const loadControllers = require("./controllers")

const repositories = loadRepositories(config)
loadControllers(app, repositories, logger)

const server_port = config.server_port
app.listen(server_port, () => {
    logger.info(`Server is running on port ${server_port}.`)
})
