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
var countingVariable = 1;

console.log(jokes.length);


let textJob = new cronJob('0 7 * * 1-5', function () {
    msg = jokes[countingVariable].joke;
    if (countingVariable < jokes.length) {
        countingVariable ++;
    } else {
        console.log('process ended');
        process.abort();
    }
    nexmo.message.sendSms(VIRTUAL_NUMBER, TARGET_NUMBER, msg,
        (err, responseData) => {
            console.log("Message Sending...");
            if (err) {
                console.log(err);
            } else {
                console.dir(responseData);
            }
        }
    ) //end
}, null, true, 'America/Chicago');



//
// var textJob = new cronJob( '0 18 * * *', function(){
//   client.messages.create( { to:'YOURPHONENUMBER', from:'YOURTWILIONUMBER', body:'Hello! Hope you’re having a good day!' }, function( err, data ) {});
// },  null, true);
