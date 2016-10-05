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
  client.textConverse(message.body, { converseToken: message.chatid }).then((res) => {
    const reply = res.reply()              /* To get the first reply of your bot. */
    const replies = res.replies            /* An array of all your replies */
    const action = res.action              /* Get the object action. You can use 'action.done' to trigger a specification action when it's at true. */

    console.log(`reply: ${reply}`)
    console.log(`replies: ${replies}`)
    console.log(`action: ${action}`)
    if (reply) {
      message.reply(reply)
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
