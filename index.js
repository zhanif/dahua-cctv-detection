require('dotenv').config();
const Camera = require('./components/camera')
const Broker = require('./components/broker')
const { EventEmitter } = require('events')

const eventEmitter = new EventEmitter()

const camera = new Camera(eventEmitter)
const broker = new Broker(eventEmitter)
