const Nexmo = require('nexmo');
const config = require('./config.js');
const cronJob = require('cron').CronJob;
const jokes = require('./data.js').arr;

const nexmo = new Nexmo({
  apiKey: config.key,
  apiSecret: config.secret
})

const VIRTUAL_NUMBER = 12109619227;
const TARGET_NUMBER = 14015590028;

let msg = "";
let countingVariable = Math.floor((Math.random() * jokes.length) + 1);
console.log(countingVariable);

let textJob = new cronJob('0 7 * * 1-5', () => {
    msg = jokes[countingVariable].joke;
    console.log(msg);
    nexmo.message.sendSms(VIRTUAL_NUMBER, TARGET_NUMBER, msg,
        (err, responseData) => {
            console.log("Message Sending...");
            if (err) {
                console.log(err);
            } else {
                console.dir(responseData.messages[0]['remaining-balance']);
            }
        }
    ) //end

}, null, true, 'America/Chicago');
