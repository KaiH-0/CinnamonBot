const Discord = require('discord.js');
const bot = new Discord.Client();

const ytdl = require("ytdl-core");

//const token = 'NzI5Nzk3NjAyNTU5Nzg3MDE4.XwOLCA.oXGMPCvWFkRpdn4infn16eKr9IM';

//Variables
const PREFIX = '!';

var servers = {};

bot.on('ready', () =>{
  console.log('Online')
})

bot.on('message', msg=>{
  if(msg.content === "Hey cinnamon"){
    msg.reply('STOP TALKING TO ME!! <:UBETTERSTOPSTOP:729811295246745670>');
  }

  if(msg.content === "Do you like kais games?"){
    msg.reply('NOOOOOOOOOOOOOOOO! <:UBETTERSTOPSTOP:729811295246745670>');
  }

  if(msg.content === "Do you wanna build a snowman?"){
    msg.reply('NO! NO SINGING ALOUD! YOU DO IT AGAIN AND ILL BAN YOU! <:UBETTERSTOPSTOP:729811295246745670>');
  }

  if(msg.content === "hey cinnamon"){
    msg.reply('STOP TALKING TO ME!! <:UBETTERSTOPSTOP:729811295246745670>');
  }

  if(msg.content === "Hey Cinnamon"){
    msg.reply('STOP TALKING TO ME!! <:UBETTERSTOPSTOP:729811295246745670>');
  }

  if(msg.content === "hey cinnamen"){
    msg.reply('STOP TALKING TO ME!! <:UBETTERSTOPSTOP:729811295246745670>');
  }

  if(msg.content === "Hey cinnamen"){
    msg.reply('STOP TALKING TO ME!! <:UBETTERSTOPSTOP:729811295246745670>');
  }
})

bot.on('message', message => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch(args[0]) {
    case 'play':
      function play(connection, message){
        var server = servers[message.guild.id];
        if(!server.queue[1]){
        server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audio"}))}

        server.dispatcher.on("finish", function(){
          server.queue.shift();
          if(server.queue[0]){
            play(connection, message);
          }else{
            server.queue.push(args[1]);
            //connection.disconnect();
        }
      });
    }
      if(!args[1]){
        message.channel.send("Include a link, you dummy!")
        return;
      }

      if(!message.member.voice.channel){
        message.channel.send("You have to be in a voice channel, dummy!");
        return;
      }

      if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
      }

      var server = servers[message.guild.id];

      server.queue.push(args[1]);

      if(!message.member.voice.connection) message.member.voice.channel.join().then(function(connection){
        play(connection, message);
      })
    break;

    case 'skip':
      var server = servers[message.guild.id];
      if(server.dispatcher) server.dispatcher.end();
      message.channel.send("Skipped the song!")
    break;

    case 'stop':
      var server = servers[message.guild.id];
      if(message.guild.voice.connection){
        for(var i = server.queue.length -1; i >= 0; i--){
          server.queue.splice(i,1);
        }

        server.dispatcher.end();
        message.channel.send("I see how it is! You don't need me anymore!")
        message.member.voice.channel.leave()
        console.log('Stopped the queue')
      }

      if(message.guild.connection) message.guild.voice.connection.disconnect();
      break;

    case 'help':
      message.reply('Commands:\n!play [Link to song] - Plays a song\n!skip - Skips the current song in the queue\n!stop - Stops the whole queue\nHey cinnamon - Do not use this command!\nDo you like kais games? - Do not use this command!\nDo you wanna build a snowman? - Do not use this command!');
      break;
  }
})

//bot.login(token);
bot.login(process.env.token);
