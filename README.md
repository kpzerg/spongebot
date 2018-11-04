# spongebot
This is a pair of Discord bots that echo all posts made in one channel by a specific user to another channel, but with sPonGeBoB CapItAliZaTiOn. Very useful for mocking someone discreetly. 

I should mention that this project was not made in any sort of mean-spirited context and should not be used in one.

### setup

Run `npm install` and update the `auth.json` file with the appropriate Discord token in both the client and server folders. Also, change the `target_user` field in `client/bot.js` to the name of the user you want to target.

The server bot should be added to the primary server while the client should go on the secondary one. Instructions for setting up a Discord bot can be found [here](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token).

The server and client are set up to be run on one machine (they contact each other through sockets over loopback), but this could be changed by adjusting the `hostname` parameters at the top of each `bot.js` file.
