var Discord = require('discord.io');
var auth = require('./auth.json');
var net = require('net');

const hostname = '127.0.0.1';
const port = 2345;

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
        log_v(("sending message %s" % message))
        conn.write(JSON.stringify({ response: message , user: user}))
       
    });    
});

server.listen(port, hostname, () => {
    log_v(("listening at %s:%s" % (hostname, port)));
});
