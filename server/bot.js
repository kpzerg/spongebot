var Discord = require('discord.io');
var auth = require('./auth.json');
var net = require('net');

const hostname = '127.0.0.1';
const port = 2345;
var cid;

function log_v(message) {
    var dt = new Date();
    var date = dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate();
    var time = dt.getHours()+':'+dt.getMinutes()+':'+dt.getSeconds();
    console.log(date+' '+time+' server: '+message);
}

var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

var server = net.createServer(function (conn) {
    log_v("client connected");

    conn.on('end', () => {
        log_v("client disconnected");
        server.close();
        process.exit(0);
    });

    bot.on('message', function (user, userID, channelID, message, evt) {
        log_v('sending message '+message)
        cid=channelID;
        conn.write(JSON.stringify({ response: message , user: user}))
        if (message[0]=='!') {
            command_args = message.slice(1).replace(/\s/g,'').split('=');
            process_command_arg(command_args[0], command_args[1]);
        }
        var ran = Math.floor(Math.random() * 7);
        if(message.toLowerCase().includes("pikachu"))
        {
          var pikachu_kaomoji;
          switch(ran)
          {
            case 0:
              pikachu_kaomoji="\\**ヽ▼o・ェ・o▼ノ** pika!";
              break;
            case 1:
              pikachu_kaomoji="▼o･∇･o▼ pika pika!";
              break;
            case 2:
              pikachu_kaomoji="≦(o・⊥・o)≧ pikaa!";
              break;
            case 3:
              pikachu_kaomoji="\\**ヽ▼o・▽・o▼ノ** pika pika!";
              break;
            case 4:
              pikachu_kaomoji="▼o･∀･o▼ pika...";
              break;
            case 5:
              pikachu_kaomoji="\\**ヽ▼o・∀・o▼ノ** pika!";
              break;
            case 6:
              pikachu_kaomoji="▼o･◇･o▼ pika!?";
              break;
            case 7:
              pikachu_kaomoji="\\**ヽ▼o・◇・o▼ノ** pika pikaa!";
              break;
          }
          bot.sendMessage({
              to: channelID,
              message: pikachu_kaomoji
          });
        }

        if(message.toLowerCase().includes("rosalina"))
        {
          bot.sendMessage({
              to: channelID,
              message: "☆"
          });
        }
        if(message.toLowerCase().includes("better nerf"))
        {
          bot.sendMessage({
              to: channelID,
              message: "greninja"
          });
        }
        if(message.toLowerCase().includes("fox"))
        {
          bot.sendMessage({
              to: channelID,
              message: "mcloud"
          });
        }

    });
});

server.listen(port, hostname, () => {
    log_v('listening at '+hostname+':'+port);
});


function process_command_arg(command, arg) {
    switch(command) {
        case 'help':
            bot.sendMessage({
                to: cid,
                message: '```-!help for this message.\n-the bot will respond to any sentence with pikachu, including this\n-more upcoming features.```'
            });
            break;
        case 'tierlist':
            bot.sendMessage({
                to: cid,
                message: '**S+: Piranha Plant**'
            });
            break;
        default:
            bot.sendMessage({
                to: cid,
                message: '```Not a valid command. Type !help for list of all commands supported.```'
            });
            break;
    }
}
