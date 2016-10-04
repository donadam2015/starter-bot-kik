import {Client} from 'recastai'
import Kik from '@kikinteractive/kik'
import http from 'http'
import config from '../config.js'


const client = new Client(config.recast.request_token, config.recast.language)

const bot = new Kik({
  username: config.kik.username,
  apiKey: config.kik.apiKey,
  baseUrl: config.kik.baseUrl,
})

bot.updateBotConfiguration()

bot.onTextMessage((message) => {
  console.log(message) // voir ou est stoker l'id du messsage
  client.converse(message.body, message.id).then((res) => {
    //  let replies =//mhetdoe to get the replies
    let action = action()
    console.log(action)
    if (!replies) {
      replies.forEach(replie => {
        message.reply(replie)
      })
    } else {
      message.reply('no reply to send')
    }
  }).catch((err) => {
    console.log(err)
  })
})

let server = http
.createServer(bot.incoming())
.listen(process.env.PORT || 8080)
