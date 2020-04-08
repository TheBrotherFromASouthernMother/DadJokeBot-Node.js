const cronJob = require('cron').CronJob;
const jokes = require('./data.js');

const TWILIO_ACCOUNT_SID = null;
const TWILIO_SENDER_NUMBER = null;
const TWILIO_AUTH_TOKEN = null;
const RECIPIENT = null;

const Twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

function sendDadJoke() {
  const randomNumber = Math.floor(Math.random() * jokes.length - 1);
  const msg = {
    body: jokes[randomNumber].joke,
    from: TWILIO_SENDER_NUMBER,
    to: RECIPIENT,
  };
  console.log('sending....', msg)
  const messageResponse = Twilio.messages.create(messageAttributes);

  process.exit()
}

// https://crontab.guru/#*_*_*_*_*

let textJob = new cronJob('* * * * *', () => {
  getJoke()
}, null, true, 'America/Los_Angeles');
