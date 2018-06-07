const Nexmo = require('nexmo');
const config = require('./config.js');
const cronJob = require('cron').CronJob;
const jokes = require('./data.js').arr;
const mongoose = require('mongoose')

mongoose.connect(process.env.db_connection);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {console.log('connection to database sucessful')});

const Schema = mongoose.Schema;
const jokeScehma = new Schema({
  joke: String
})

let Joke = mongoose.model('Joke', jokeScehma)


Joke.count().exec(function (err, count) {
  // Get a random entry
  var random = Math.floor(Math.random() * count)
  // Again query all users but only fetch one offset by our random #
  Joke.findOne().skip(random).exec(
    function (err, result) {
      // Tada! random user
      console.log(result)
      mongoose.connection.close()
    })
})


// Joke.collection.insert(jokes, (err, docs) => {
//   if (err) {
//        // TODO: handle error
//    } else {
//        console.info('%d potatoes were successfully stored.', docs.length);
//    }
// });
//
// let currentJoke = new Joke({ joke: "What do you call a salt shaker with a gun? \n\n\n Assault with a deadly weapon\n"})
//
// currentJoke.save( (err, currentJoke) => {
//   if (err) return console.error(err);
//   console.log(currentJoke);
//   mongoose.connection.close()
// })

const nexmo = new Nexmo({
  apiKey: process.env.nexmo_key,
  apiSecret: process.env.nexmo_secret
})

const VIRTUAL_NUMBER = 12109619227;
const TARGET_NUMBER = 14015590028;

let msg = "";
let countingVariable = Math.floor((Math.random() * jokes.length) + 1);
console.log(countingVariable);

console.log(process.env.nexmo_key)
// let textJob = new cronJob('0 7 * * 1-5', () => {
//     msg = jokes[countingVariable].joke;
//     console.log(msg);
//     nexmo.message.sendSms(VIRTUAL_NUMBER, TARGET_NUMBER, msg,
//         (err, responseData) => {
//             console.log("Message Sending...");
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.dir(responseData.messages[0]['remaining-balance']);
//             }
//         }
//     ) //end
//
// }, null, true, 'America/Chicago');
