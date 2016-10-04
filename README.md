# Integration Kik to Recast.AI bot

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
* All you need for you bot is in the bot.js file.

```javascript
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
```
* This code will get the message you sent on your Kik application and will return the intent they match, be sure to create intent, and do the proper training on Recast.AI before testing it.

## Author

Henri Floren, henri.floren@recast.ai

You can follow us on Twitter at [@recastai](https://twitter.com/recastai) for updates and releases.
