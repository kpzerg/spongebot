var Discord = require('discord.io');
var auth = require('./auth.json');
var net = require('net')

const hostname = '127.0.0.1';

const port = 3000;
var target_user = 'kpzerg';


var socket = new net.Socket();
socket.connect(port, hostname, function (conn) {
    console.log("client: connected to server");
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
        console.log("client: message %s>%s" % message, spongebob_message)

        for (var key in bot.channels) {
            if (bot.channels[key].name == 'general') {
                gen_id = bot.channels[key].id;
            }
        }

        bot.sendMessage({
            to: gen_id,
            message: user+": "+spongebob_message
        });
    }
});

function spongify(message) {
    spongebob_message = '';
    for (var i = 0; i < message.length; i++) {
        if (Math.random() > 0.5) {
            spongebob_message += message.charAt(i).toUpperCase();
        } else {
            spongebob_message += message.charAt(i).toLowerCase();
        }
    }
    return spongebob_message;
}

bot.on('message', function (user, userID, channelID, message, evt) {
    if (message[0]=='!') {
        command_arg = message.slice(1).trim().split(' ');
        process_command_arg(command_args[0], command_args[1]);
    }
});

function process_command_args(command, arg) { 
    switch(command) {
    case "target_user":
        target_user = arg;
        break;
    }
}
