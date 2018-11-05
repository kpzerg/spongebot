var Discord = require('discord.io');
var auth = require('./auth.json');
var net = require('net');

const hostname = '127.0.0.1';
const port = 2345;
var target_user = 'kpzerg';

function log_v(message) {
    var dt = new Date();
    var date = dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate();
    var time = dt.getHours()+':'+dt.getMinutes()+':'+dt.getSeconds();
    console.log(date+' '+time+' client: '+message);
}

var socket = new net.Socket();
socket.connect(port, hostname, function (conn) {
    log_v("connected to server");
});

var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

socket.on('data', function (data) {
    data = JSON.parse(data);
    message = data.response;
    user = data.user;

    if (user == target_user) {
        spongebob_message = spongify(message);
        log_v('message: '+message+'>'+spongebob_message)

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
    log_v('processing message '+message+' from user '+user)
    if (message[0]=='!') {
        command_args = message.slice(1).trim().split('=');
        bot.sendMessage({
            to: channelID,
            message: process_command_arg(command_args[0], command_args[1])
        });
    }
});

function process_command_arg(command, arg) { 
    switch(command) {
    case "target_user":
        target_user = arg;
        return "target user set to "+arg;
    }
}
