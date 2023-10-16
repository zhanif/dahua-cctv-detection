require('dotenv').config();
const Camera = require('./components/camera')
const Server = require('./components/server')
const { EventEmitter } = require('events')

const eventEmitter = new EventEmitter()

const camera = new Camera(eventEmitter)
const server = new Server(eventEmitter)
