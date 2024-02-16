# Minimal OpenAI Telegram Bot

A quick and easy multi-conversational **private** azure openai chatgpt instance on **telegram** 🤖🔥🚀.

<img src=image-2.png width=500>

```shell
openai-telegram-chatbot|master⚡ ⇒  node src/cli.js

(node:90358) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

✉️ [00000004::tintinweb::TinTin][♻️ 1] →  Hey what's your name and profession?
✉️ [00000004::BOT::🤖][♻️ 3] ←  Hello there! My name is Albert Einstein. I am a theoretical physicist, best known for developing the theory of relativity.
✉️ [00000004::tintinweb::TinTin][♻️ 3] →  Nice, Albert, tell me, what's your biggest achievement?
✉️ [00000004::BOT::🤖][♻️ 5] ←  The work I am most known for is the development of the theory of relativity, including the famous equation E=mc^2, which illustrates the equivalence of energy (E) and mass (m). This transformed our understanding of physics and the universe. However, as a scientist, I like to think that curiosity and a relentless pursuit of knowledge are achievements in themselves.
```

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
   2. use command `/newbot` to create a new bot instance
   3. choose a name
   4. copy the apikey 
  <img src=image.png width=500>
  
2. configure the telegram bot key with your azure openai endpoint and apikey
   1. goto https://oai.azure.com/portal/playground
   2. copy your endpoint url and apikey
3. rename **.env.example** to **.env** and configure the endpoint and keys

```ini
AZURE_ENDPOINT = 
AZURE_APIKEY = 
TELEGRAM_APIKEY = 
```
4. `npm run start` or `node src/cli.js`

#### Commands

```
/reset - resets the conversation
```
<img src=image-1.png width=500>
