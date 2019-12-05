// setup
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup');
const fetch = require('node-fetch');
const bot = new Telegraf('911945400:AAFfi9iLUltUpqZ0Q5UjJWh3tC60RkeBuro');

const keyboard = Markup.inlineKeyboard([
    Markup.urlButton('❤️', 'http://telegraf.js.org'),
    Markup.callbackButton('Delete', 'delete')
])

bot.start((ctx) => ctx.reply('Hello'))
bot.help((ctx) => ctx.reply('Help message'))
// bot.hears(('Woof'), (ctx) => ctx.reply(test()))  
bot.on('text', (ctx) => {
    let userInput = ctx.message.text;
    if (userInput.toLowerCase() === 'woof' || userInput.toLowerCase() === 'cukini') {
        dogAPI().then(data => ctx.reply(data.message))
    }
    if (userInput.toLowerCase().indexOf('lisabon') > -1) {
        ctx.reply(tripTime())
    }
});

bot.action('delete', ({ deleteMessage }) => deleteMessage());
bot.launch();

async function dogAPI() {
    try {
        let url = 'https://dog.ceo/api/breeds/image/random';
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}

function tripTime() {
    let dt1 = new Date(2019, 09, 06, 19, 50);
    let dt2 = new Date();
    let seconds = (((dt1 - (dt2)) / 1000))
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds - (days * 24 * 60) - (hours * 60 * 60) - (minutes * 60)
    // return Math.round((a-b)/(24*3600*1000)) + ' days left to Lisabon'
    if (days < 0) {
        return `You went to Lisbon already :(`
    } else {
        return `You are going to Lisabon in ${days}  days, ${hours} hours and ${minutes} minutes.`
    }
}

