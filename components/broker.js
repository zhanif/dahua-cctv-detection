const Aedes = require('aedes')
const { createServer } = require('net')

const aedes = new Aedes();
const server = createServer(aedes.handle);

module.exports = class Broker {
  constructor(event) {
    this.event = event

    server.listen(process.env.AEDES_PORT, () => {
      console.log(`[broker] listening on port ${process.env.AEDES_PORT}`)
    })

    server.on('error', (err) => {
      console.log(`[broker] error: ${err}`)
    })

    aedes.on('subscribe', (subscription, client) => {
      console.log(`[client] (${client.id}) subscribed into topics: ${subscription}`)
    })

    aedes.on('unsubscribe', (subscription, client) => {
      console.log(`[client] (${client.id}) unsubscribed into topics: ${subscription}`)
    })

    this.event.on('alarm', (data) => {
      console.log('[broker] alarm received:');
      console.log(data);
    })
  }
}
