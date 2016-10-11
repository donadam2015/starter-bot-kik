# Start coding your bot: Recast.AI + Kik

* This is a small Tutorial to show you how to integrate Kik to a Recast.AI bot
* If you have no idea of how to use Recast.AI I advise you to check this SDK first:  [Recast.AI-nodejs-SDK](https://github.com/RecastAI/SDK-NodeJs)

## Requirements
* Create an account on [Recast.AI](https://recast.ai/signup)
* Create an account on [Kik](https://kik.com/)

## Set up your Recast.AI account

##### Create your bot

* Log in to your Recast.AI account
* Create a new bot

##### Get your token

* In your profile, click your bot
* In the tab-menu, click on the the little screw
* Here is the `request access token` you will need to configure your bot!

## Set up your Kik account

##### Set the Kik-bot account

* Log in to your Kik application on your phone
* Just follow the steps on the kik app, to create your account
* Go on this link https://dev.kik.com/#/home, you will find the code you need to scan to have access right to your bot
* Take your phone go on "Setting" > "Your Kik code" and use the picture icone to scan the code of your browser.
* Go on the page Configuration and copy your API Key

## Start your bot in local

#### Ngrok

* Download on your computer the appropriate version of [Ngrok](https://ngrok.com/download)
* Open a new tab in your terminal:
```
./ngrok http 8080
```
* Copy past the ``` https://*******ngrok.io``` you get, you will need it for the next step
* Leave your Ngrok serveur running

##### Complete the config.js

* Copy your Recast.AI `Recast.AI access token`
* Copy your kik.Username `Username of you Kik bot`
* Copy your kik.apiKey `Apikey of your BOt`
* Copy your kik.baseUrl  `ngrok https url`

```vim config.js```
```javascript
let config = {}
config.recast = {}
config.recast.request_token = 'RECAST-TOKEN'
config.recast.language = 'en' // to chose your language 'fr' or 'en'
config.kik = {}
config.kik.username = 'KIK-USERNAME'
config.kik.apiKey = 'KIK-APIKEY'
config.kik.baseUrl = 'NGROK-URL'

module.exports = config
```
## Launching your Bot
* make sure to have ngrok launched and the correct URL in you config file.
```
npm install
npm start
```

## Result

[logo]: https://blog.recast.ai/wp-content/uploads/2016/08/HcqvGX.gif "Result"

![alt text][logo]

### Your bot
* All you need for you bot is in the bot.js file. The call to Recast.AI is already done.
* ```client.textConverse(message.body, { conversation_token: message.chatid })``` To use this method you need to pass the user's input, and  a unique conversation token. This token can be the message.chatid of the messenger chat. This token will create for each users a specific conversation with your bot.
* ```res.reply()``` To get the first reply of your bot.
* ```res.replies``` To get an array of all your replies.
* ``` res.action``` Get the object action. When an action is complete you will have the ```action.done = true ``` and you will be able to trigger a specific behavior.

```javascript
bot.onTextMessage((message) => {
  client.textConverse(message.body, { conversationToken: message.chatid }).then((res) => {
    const reply = res.reply()               /* To get the first reply of your bot. */
    const replies = res.replies             /* An array of all your replies */
    const action = res.action               /* Get the object action. You can use 'action.done' to trigger a specification action when it's at true. */

    if (!reply) {
      message.reply('i dont\'t get it :(')
    } else {
      if (action && action.done === true) {
        console.log('action is done')
        // Use external services: use res.memory('knowledge') if you got a knowledge from this action
      }
      replies.forEach(rep => message.reply(rep))
    }
  }).catch((err) => {
    console.log(err)
  })
})

```

## Author

Henri Floren, henri.floren@recast.ai

You can follow us on Twitter at [@recastai](https://twitter.com/recastai) for updates and releases.

## License

Copyright (c) [2016] [Recast.AI](https://recast.ai)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
