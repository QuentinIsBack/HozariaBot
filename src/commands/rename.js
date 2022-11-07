const Discord = require("discord.js");
const client = require("../../index");
const { joinVoiceChannel } = require('@discordjs/voice');

client.on("messageCreate", async message => {


    if (message.author.bot) return;

    if (message.content.indexOf(client.config.prefix) !== 0) return;
  
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Channel Changement de Pseudo
    if(message.channelId !== client.config.channelsID.changeNickName) return

    if(command === "rename"){
        message.delete();

        if(args.length <= 0){
            return message.member.send("Tu as oublié de marquer ton pseudo :(")
        } else {
            try {
                if(message.member.id === client.config.ownerID) {
                    return message.member.send("Désolé "+"<@"+message.member.id+">"+" ! Je n'ai pas les autorisations de faire cela avec vous :(");
                }
                (await message.guild.members.fetch(message.member.id)).setNickname(args[0]);
              } catch(err) {
                console.error(err);
              }
            return message.member.send("GG "+"<@"+message.member.id+">"+" ! Ton pseudo sur le serveur de **Reverb** est maintenant : "+ args[0]);
        }
    }

})
