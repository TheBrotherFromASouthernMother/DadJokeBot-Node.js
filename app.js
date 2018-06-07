const Nexmo = require('nexmo');
const cronJob = require('cron').CronJob;
const mongoose = require('mongoose')
const VIRTUAL_NUMBER = 12109619227;
const TARGET_NUMBER = 14015590028;
const nexmo = new Nexmo({
  apiKey: process.env.nexmo_key,
  apiSecret: process.env.nexmo_secret
})


mongoose.connect(process.env.db_connection);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {console.log('connection to database sucessful')});

const Schema = mongoose.Schema;
const jokeScehma = new Schema({
  joke: String
})

let Joke = mongoose.model('Joke', jokeScehma)


function getJoke() {
  let msg = "";
  //inspired by CyberWombat's answer on stackoverflow for getting a semi-random record
  //https://stackoverflow.com/questions/39277670/how-to-find-random-record-in-mongoose

  Joke.count().exec(function (err, count) {
    // Get a random entry
    var random = Math.floor(Math.random() * count)
    // Again query all users but only fetch one offset by our random #
    Joke.findOne().skip(random).exec(
      function (err, result) {
        // Tada! random user
        msg = result.joke
        mongoose.connection.close()
        sendDadJoke(msg)
      })
  })
}

function sendDadJoke(msg) {
  console.log('sending....', msg)
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
  process.exit()
}




let textJob = new cronJob('* * * * 1-5', () => {
  getJoke()
}, null, true, 'America/Chicago');
