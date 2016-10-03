import {Client} from 'recastai'
import Kik from '@kikinteractive/kik'
import http from 'http'
import config from './config.js'


const client = new Client(config.recast.request_token, config.recast.language)

const bot = new Kik({
  username: config.kik.username,
  apiKey: config.kik.apiKey,
  baseUrl: config.kik.baseUrl,
})


bot.updateBotConfiguration()

bot.onTextMessage((message) => {
  client.textRequest(message.body)
  .then((res) => {
    console.log('test')
    const intent = res.intent()
    console.log(intent)
    if (intent.slug === undefined) {
      message.reply('no intent match')
    } else {
      message.reply(intent.slug)
    }
  }).catch((err) => {
    console.log(err)
  })
})

let server = http
.createServer(bot.incoming())
.listen(process.env.PORT || 8080)
