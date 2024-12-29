const telegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const bot = new telegramBot(process.env.TELEGRAM_TOKEN, {polling: true});

bot.onText(/\/start/, (msg) => {
    console.log(msg);

    bot.sendMessage(msg.chat.id, "Welcome! 🌟 Need inspiration? Type /q for a new quote to brighten your day!")
});

bot.onText(/\/q/, async (msg) => {
    const res = await axios.get('https://zenquotes.io/api/quotes/');

    const quote = res.data[0];


    bot.sendMessage(msg.chat.id, `${quote.q} \n BY ${quote.a.toUpperCase()}`);
})