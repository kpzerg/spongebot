var Discord = require('discord.io');
var auth = require('./auth.json');
var net = require('net');
var logger = require('../log_verbose.js');

const hostname = '127.0.0.1';
const port = 2345;

var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

var server = net.createServer(function (conn) {
    logger.log_v("server: client connected");

    conn.on('end', () => {
        logger.log_v("server: client disconnected");
        server.close();
        process.exit(0);
    });

    bot.on('message', function (user, userID, channelID, message, evt) {
        logger.log_v("server: sending message %s" % message)
        conn.write(JSON.stringify({ response: message , user: user}))
       
    });    
});

server.listen(port, hostname, () => {
    logger.log_v("server: listening at %s:%s", hostname, port);
});
