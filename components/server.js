const { WebSocketServer } = require('ws')

const wss = new WebSocketServer({ port: 8083 })

module.exports = class Server {
  constructor(event) {
    this.event = event

    wss.on('connection', (ws, request) => {
      ws.on('error', (err) => {
        console.error(`[server] error: ${err}`);
      })
      // ws.on('message', (data) => {
      //   console.log(`[] (${client}) send ${data}`);
      // })  
      this.event.on('alarm', (data) => {
        this.handleNotification(ws, data)
      })
    })

  }

  handleNotification(ws, data) {
    console.log('[server] data sent!');
    console.log(data);

    ws.send(JSON.stringify(data))
  }
}
