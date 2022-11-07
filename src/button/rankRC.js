const Discord = require("discord.js");
const client = require("../../index");
const { MessageEmbed } = require('discord.js');

client.on("messageCreate", async message => {

    if (message.author.bot) return;
    if (message.content.indexOf(client.config.prefix) !== 0) return;
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Channel Roles
    if(message.channelId !== client.config.channelsID.rankrc) return

    // Has Permission
    if(!message.member.roles.cache.some(role => role.id === client.config.managerRoleID)) return


    switch(command) {
        case "createrankrc": {

            // Del Input
            message.delete()

            // Create Embed
            const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Roller Champions Rôles - Réagissez ci-dessous pour obtenir votre rôle')
            .setURL('https://twitch.tv/reverbrc')
            .setDescription(
                "**Les rôles** \n"+
                "\n"+
                "Tous les rôles ouvriront des canaux spécifiques pour les jeux que vous sélectionnez. Dans ces canaux, vous pouvez demander de l'aide et recevoir également des annonces et des mises à jour spécifiques. \n"+
                "\n"+
                "Allez-y et sélectionnez votre (vos) rôle(s) maintenant en sélectionnant l'emoji approprié ci-dessous."
                )
            .setThumbnail('https://static-cdn.jtvnw.net/jtv_user_pictures/d77ee138-4798-4ca1-b1a1-25d588b0fba0-profile_image-70x70.png')
            .setImage("https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2rCZgoCWV0znVcHcs9FVOa/9146861dc26fd503a597fdafeda9c9af/RollerChampions_Ranks.png")

            const rank = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("rankGarage")
                .setLabel("Garage")
                .setStyle("SUCCESS")
                .setDisabled(false)
            )
            .addComponents(new Discord.MessageButton()
                .setCustomId("rankLocal")
                .setLabel("Local")
                .setStyle("SUCCESS")
                .setDisabled(false)
            )
            .addComponents(new Discord.MessageButton()
                .setCustomId("rankIntercity")
                .setLabel("Intercité")
                .setStyle("SUCCESS")
                .setDisabled(false)
            )
            .addComponents(new Discord.MessageButton()
                .setCustomId("rankRegional")
                .setLabel("Régional")
                .setStyle("SUCCESS")
                .setDisabled(false)
            )
            .addComponents(new Discord.MessageButton()
                .setCustomId("rankNational")
                .setLabel("National")
                .setStyle("SUCCESS")
                .setDisabled(false)
            )
            const rankHight = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("rankWorld")
                .setLabel("World")
                .setStyle("SUCCESS")
                .setDisabled(false)
            )
            .addComponents(new Discord.MessageButton()
                .setCustomId("rankChampions")
                .setLabel("Champions")
                .setStyle("SUCCESS")
                .setDisabled(false)
            )
        
            message.channel.send({embeds: [exampleEmbed], components: [rank, rankHight]})
            break;
        }
    }

})


client.on("interactionCreate", async interaction => {

    // Channel Roles
    if(interaction.channelId !== client.config.channelsID.rankrc) return

    if(interaction.isButton()){

        for (const element of client.config.rankRC) {
            console.log(element);
        }
          


/*
        if(interaction.customId === "rankGarage"){
            for(var i=0; i < client.config.rankRC.length; i++){
                if(interaction.member.roles.cache.has(client.config.rankRC[i].role)) {
                    interaction.member.roles.remove(client.config.rankRC[i].role)
                }
            }
            interaction.member.roles.add(client.config.rankRC[0].role)
            interaction.deferUpdate()
        }*/
    }
})