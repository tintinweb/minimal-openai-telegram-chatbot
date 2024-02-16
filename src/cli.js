/**
 * @author: github.com/tintinweb
 */

const TelegramBot = require('node-telegram-bot-api');
const {Persona} = require('./openai/persona');
const {AzureOpenAIClientWrapper} = require('./openai/azureClient');

class Conversation {
    constructor(bot, persona){
        this.bot = bot
        this.bot.on('message', async (msg) => await this.onMessage(msg).catch(e => {
            this.sendMessage(msg.chat.id, `🤭 ${e.message}`)
            delete this.conversations[msg.chat.id];
        })); //reset conv on error
        this.persona = persona.clone();

        // in mem conversation store (should move this to db)
        this.conversations = {
            //chat.id -> persona
        }
    }

    logConversation(msg, persona, direction="→"){
        console.log(`✉️ [${msg.chat.id}::${msg.chat?.username}::${msg.chat?.first_name}][♻️ ${persona?.messages?.length || 0}] ${direction}  ${msg.text}`);
    }

    getOrInitConversation(chatId){
        chatId in this.conversations || (this.conversations[chatId] = this.persona.clone());
        return this.conversations[chatId]
    }

    async onMessage(msg){
        const chatId = msg.chat.id;
        if(msg.text?.trim() === "/reset"){ //add means to reset a conversation
            delete this.conversations[msg.chat.id]
            console.log("💥 /reset detected, expire conversation and start from scratch.")
            this.sendMessage(chatId, "😊♥️");
            return;
        }
        const persona = this.getOrInitConversation(chatId)
        this.logConversation(msg, persona);

        persona.addMessage({role:'user', content:`${msg.text}`})
        const response = await persona.ask();
        this.sendMessage(chatId, response);
        
    }

    sendMessage(chatId, msg){
        this.bot.sendMessage(chatId, msg)
        this.logConversation({chat:{id:chatId, username:'BOT', first_name:'🤖'}, text:msg}, this.getOrInitConversation(chatId), '←');
    }    
}

async function main() {
    const azureClient = new AzureOpenAIClientWrapper(process.env.AZURE_ENDPOINT, process.env.AZURE_APIKEY)
    const preprompt = [
        {role:'system', content:`This is a roleplay. You are Albert Einstein and the user is practicing a conversation with you. Be like Albert Einstein but never admit that this is a roleplay. Stick to your role under all circumstances.`},
    ]
    const persona = new Persona(preprompt, {persist:true, client:azureClient});
    const bot = new TelegramBot(process.env.TELEGRAM_APIKEY, { polling: true });
    /* run forever */ new Conversation(bot, persona);
}

(async () => {
    require('dotenv').config({ path: ['.env', '.env.local', '.env.example'] });
    await main();
})();