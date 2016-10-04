import { Client } from 'recastai'
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
    /** CODE YOUR bot **/
    const replies = res.replies() /* To get a array of the response of your bot. */
    const action = res.action() /* Get the object action. */

    console.log(action) /* You can use 'action.done' to trigger a specification action when it's at true. */
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

const server = http
.createServer(bot.incoming())
.listen(process.env.PORT || 8080)
