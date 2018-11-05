var Discord = require('discord.io');
var auth = require('./auth.json');
var net = require('net')

const hostname = '127.0.0.1';

const port = 3000;
var target_user = 'kpzerg';


var socket = new net.Socket();
socket.connect(port, hostname, function() {
    console.log("Client: Connected to server");
});

var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

socket.on("data", function (data) {
    data = JSON.parse(data);
    message = data.response;
    user = data.user;

    if (user == target_user) {
        spongebob_message = spongify(message);

        for (var key in bot.channels) {
            if (bot.channels[key].name == 'general') {
                gen_id = bot.channels[key].id;
            }
        }

        console.log("%s>%s", message, spongebob_message);
        bot.sendMessage({
            to: gen_id,
            message: data.user+": "+spongebob_message
        });
    }
});

function spongify(message)
{
  spongedmessaged = '';
  for (var i = 0; i < message.length; i++) {
      if (Math.random() > 0.5) {
          spongedmessaged += message.charAt(i).toUpperCase();
      } else {
          spongedmessaged += message.charAt(i).toLowerCase();
      }
  }
  return spongedmessaged;
}

bot.on('message', function (user, userID, channelID, message, evt) {
  if(message[0]=='!')
  {
    set_bot_variable(message.slice(1));
  }
});

function set_bot_variable(command)
{
  switch(command.trim().split('=')[0]) {
    case "target_user":
      target_user=command.trim().split('=')[1];
      break;
  }
}
