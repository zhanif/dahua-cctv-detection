const ipcamera = require('../dahua')

module.exports = class Camera {
  constructor(event) {
    const options = {
      host: process.env.DAHUA_HOST,
      port: process.env.DAHUA_PORT,
      user: process.env.DAHUA_USERNAME,
      pass: process.env.DAHUA_PASSWORD,
      log: process.env.DAHUA_LOG === 'true'
    }

    this.dahua = new ipcamera.dahua(options)
    this.event = event

    this.dahua.on('connect', () => {
      console.log('[camera] connected to CCTV!')
    })

    this.dahua.on('error', (error) => {
      console.log(`[camera] error: ${error}`)
    })

    this.dahua.on('alarm', (code, action, index) => {
      this.event.emit('alarm', {
        code: code,
        action: action,
        cctv: parseInt(index) + 1
      })
    })
  }
}