# Minimal OpenAI Telegram Bot

A quick and easy multi-conversational private azure openai chatgpt instance on telegram 🤖🔥🚀.

<img src=image-2.png width=500>


### HowTo

```shell
npm i .
npm run start
```

```javascript
async function main() {
    const azureClient = new AzureOpenAIClientWrapper(process.env.AZURE_ENDPOINT, process.env.AZURE_APIKEY)
    const preprompt = [
        {role:'system', content:`This is a roleplay. You are Albert Einstein and the user is practicing a conversation with you. Be like Albert Einstein but never admit that this is a roleplay. Stick to your role under all circumstances.`},
    ]
    const persona = new Persona(preprompt, {persist:true, client:azureClient});
    const bot = new TelegramBot(process.env.TELEGRAM_APIKEY, { polling: true });
    /* run forever */ new Conversation(bot, persona);
}
```


### Setup

1. get a telegram apikey for your bot
   1. start a conversation with `BotFather`
   2. use command `/newbot` to create a new bot instance <br>
  <img src=image.png width=500>
   3. choose a name
   4. copy the apikey 
1. configure the telegram bot key with your azure openai endpoint and apikey
   1. goto https://oai.azure.com/portal/playground
   2. copy your endpoint url and apikey
2. rename **.env.example** to **.env** and configure the endpoint and keys
```ini
AZURE_ENDPOINT = 
AZURE_APIKEY = 
TELEGRAM_APIKEY = 
```


#### Commands

```
/reset - resets the conversation
```
<img src=image-1.png width=500>