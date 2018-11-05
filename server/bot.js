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
    console.log("Server: Client connected");

    conn.on('end', function () {
        console.log("Server: Client disconnected");
        server.close();
        process.exit(0);
    });

    bot.on('message', function (user, userID, channelID, message, evt) {
        console.log(message)
        conn.write(JSON.stringify({ response: message , user: user}))
       
    });    
});

server.listen(port, hostname, () => {
    console.log("Server running at %s:%s", hostname, port);
});
