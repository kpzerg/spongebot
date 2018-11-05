var Discord = require('discord.io');
var auth = require('./auth.json');
var net = require('net');

const hostname = '127.0.0.1';
const port = 2345;

var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

var server = net.createServer(function (conn) {
    console.log("server: client connected");

    conn.on('end', () => {
        console.log("server: client disconnected");
        server.close();
        process.exit(0);
    });

    bot.on('message', function (user, userID, channelID, message, evt) {
        console.log("server: sending message %s" % message)
        conn.write(JSON.stringify({ response: message , user: user}))
       
    });    
});

server.listen(port, hostname, () => {
    console.log("server: listening at %s:%s", hostname, port);
});
