require('dotenv').config()
const ipcamera = require('./dahua')

const options = {
  host: process.env.DAHUA_HOST,
  port: process.env.DAHUA_PORT,
  user: process.env.DAHUA_USERNAME,
  pass: process.env.DAHUA_PASSWORD,
  log: process.env.DAHUA_LOG
}

const dahua = new ipcamera.dahua(options)

dahua.on('connect', () => {
  console.log('connected!')
})

dahua.on('error', (error) => {
  console.log(error)
})

dahua.on('alarm', (code, action, index) => {
  console.log(`code: ${code}\naction: ${action}\ncctv: ${index} (CAM ${parseInt(index) + 1})`);
});