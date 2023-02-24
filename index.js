//tutor
// https://www.youtube.com/watch?v=slcqnHIFrj8&ab_channel=UlbiTV

const TelegramApi = require ("node-telegram-bot-api");
const {againOptions ,gameOption} = require ('./options');


const token = '6022372469:AAFdIgiLV2Fs8MuZukEo-3ArlFgPHAsGjtw'

const bot = new TelegramApi(token, {polling: true});

const chats = {}



const startGame = async(chatId)=> {
    await bot.sendMessage(chatId, 'guess my number');
    const randomNumber = Math.floor(Math.random()*10);
    chats[chatId] = randomNumber;
    console.log(chats);

    await bot.sendMessage(chatId, 'your version', gameOption)
}


bot.setMyCommands([
    {command: '/start', description: 'welcome'},
    {command: '/info', description: 'info'},
    {command: '/game', description: 'game'}
])

const start = () => {
    bot.on('message',async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
        // console.log(msg);
        if (text === '/start') {
            await bot.sendPhoto(chatId, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Germany_%281935%E2%80%931945%29.svg/255px-Flag_of_Germany_%281935%E2%80%931945%29.svg.png')
            return bot.sendMessage(chatId, `hi, ${msg.from.username}`)
            // bot.sendMessage(chatId, `hi${msg.chat.id}`)
        }
    
        if (text === '/info') {
            return bot.sendMessage(chatId, 'this is a test bot')
        }

        if (text === '/game') {
            return startGame(chatId);
        }

        if (text === '/again') {
            return startGame(chatId)
        }

        return bot.sendMessage(chatId, 'cant get you')
        console.log(nsg);

    })

    bot.on("callback_query",async (msg) => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data == '/again') {
            return startGame(chatId)
        }
        if(data == chats[chatId]) {
             return await bot.sendMessage(chatId, `gj number ${chats[chatId]} is right `, againOptions);
        } else {
            return await bot.sendMessage(chatId, `u false number was ${chats[chatId]}`, againOptions)
        }

    })
}

start()