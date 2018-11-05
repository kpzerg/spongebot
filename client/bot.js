var Discord = require('discord.io');
var auth = require('./auth.json');
var net = require('net')

const hostname = '127.0.0.1';

const port = 3000;
var target_user = 'kpzerg';
var gen_id;

var socket = new net.Socket();
socket.connect(port, hostname, function() {

});

var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

socket.on("data", function (data) {
    data = JSON.parse(data);
    message = data.response;
    user = data.user;
    console.log("Client: Connected to server");
    for (var key in bot.channels) {
        if (bot.channels[key].name == 'general') {
            gen_id = bot.channels[key].id;
        }
    }
    if (user == target_user) {
        spongebob_message = spongify(message);

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
  console.log("Client: Connected to server");
  for (var key in bot.channels) {
      if (bot.channels[key].name == 'general') {
          gen_id = bot.channels[key].id;
      }
  }
  if(message[0]=='!')
  {
    bot_command(message.slice(1));
  }
});

function bot_command(command)
{
  switch(command.trim().split('=')[0]) {
    case "help":
      bot.sendMessage({
          to: gen_id,
          message: "```-!target_user=username to switch the spongification target.\n-!help for this message.\n-more upcoming features.```"
      });
      break;
    case "target_user":
      target_user=command.trim().split('=')[1];
      bot.sendMessage({
          to: gen_id,
          message: "```Target user set to "+target_user+"```"
      });
      break;
    default:
      bot.sendMessage({
          to: gen_id,
          message: "```Not a valid command. Type !help for list of all commands supported.```"
      });
      break;
  }
}
