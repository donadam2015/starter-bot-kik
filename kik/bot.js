import recastai from 'recastai'
import Kik from '@kikinteractive/kik'
import http from 'http'
import config from './config.js'

const client = new recastai.Client(config.recast.request_token, config.recast.language)

const bot = new Kik({
  username: config.kik.username,
  apiKey: config.kik.apiKey,
  baseUrl: config.kik.baseUrl,
})

function getRecast(message) {
  return new Promise((resolve, reject) => {
    client.textRequest(message, (res, err) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

bot.updateBotConfiguration()

bot.onTextMessage((message) => {
  getRecast(message.body).then((res) => {
    const intent = res.intent()
    if (intent === undefined) {
      message.reply('no intent match')
    } else {
      message.reply(intent)
    }
  })
})

let server = http
.createServer(bot.incoming())
.listen(process.env.PORT || 8080)
