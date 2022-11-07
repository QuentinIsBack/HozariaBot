const Discord = require("discord.js");
const client = require("../../index");
const { MessageEmbed } = require('discord.js');

client.on("messageCreate", async message => {

    if (message.author.bot) return;
    if (message.content.indexOf(client.config.prefix) !== 0) return;
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Channel Roles
    if(message.channelId !== client.config.channelsID.getRoles) return

    // Has Permission
    if(!message.member.roles.cache.some(role => role.id === client.config.managerRoleID)) return


    switch(command) {
        case "createroles": {

            // Del Input
            message.delete()

            // Create Embed
            const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Attribution de rôle - Réagissez ci-dessous pour obtenir vos rôles')
            .setDescription(
                "**Les rôles** \n"+
                "\n"+
                "Tous les rôles ouvriront des canaux spécifiques pour les jeux que vous sélectionnez. Dans ces canaux, vous pouvez demander de l'aide et recevoir également des annonces et des mises à jour spécifiques. \n"+
                "\n"+
                "Allez-y et sélectionnez votre (vos) rôle(s) maintenant en sélectionnant l'emoji approprié ci-dessous."
                )
            .setThumbnail('https://static-cdn.jtvnw.net/jtv_user_pictures/d77ee138-4798-4ca1-b1a1-25d588b0fba0-profile_image-70x70.png');

            var RLLIST = []
            for(var i=0; i < client.config.rolesList.length; i++){
                RLLIST.push({
                    label: client.config.rolesList[i].name, 
                    description: client.config.rolesList[i].desc, 
                    emoji: client.emojis.cache.find(emoji => emoji.name === client.config.rolesList[i].badge), 
                    value: client.config.rolesList[i].role,
                })
            }

            const row = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("editRoles")
                .setLabel("Modifier vos rôles")
                .setStyle("PRIMARY")
                .setDisabled(false)
            )
        
            message.channel.send({embeds: [exampleEmbed], components: [row]})

            break;
        }
    }

})














const wait = require('node:timers/promises').setTimeout;
client.on('interactionCreate', async interaction => {
    if (interaction.isSelectMenu()){

        if(interaction.customId === "menuRoles") {
            for(let i = 0; i < interaction.values.length; i++) {
                if(!interaction.member.roles.cache.has(interaction.values[i]+"")) interaction.member.roles.add(interaction.values[i]+"")
                if(interaction.member.roles.cache.has(interaction.values[i]+"") && !interaction.values.includes(interaction.values[i]+"")) interaction.member.roles.remove(interaction.values[i]+"")
            }
        
            for(let i = 0; i < client.config.gamesRolesList.length; i++) {
                if(interaction.member.roles.cache.has(client.config.gamesRolesList[i].role) && !interaction.values.includes(client.config.gamesRolesList[i].role)) interaction.member.roles.remove(client.config.gamesRolesList[i].role)
            }
        

            await interaction.reply({ 
                content: "Vos rôles ont été mis à jour !",
                ephemeral: true 
              })
        }

    }

    if (interaction.isButton()){
        if(interaction.customId === "editRoles") {

                // Create MultiRoles
                var RLLIST = []
                for(var i=0; i < client.config.gamesRolesList.length; i++){
                    RLLIST.push({
                        label: client.config.gamesRolesList[i].name, 
                        description: client.config.gamesRolesList[i].desc, 
                        emoji: client.emojis.cache.find(emoji => emoji.name === client.config.gamesRolesList[i].badge), 
                        value: client.config.gamesRolesList[i].role,
                        default: interaction.member.roles.cache.has(client.config.gamesRolesList[i].role),
                    })
                }

                const row = new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton()
                    .setCustomId("editRoles")
                    .setLabel("Modifier vos rôles")
                    .setStyle("PRIMARY")
                    .setDisabled(false)
                )

                const menu = new Discord.MessageActionRow().addComponents(new Discord.MessageSelectMenu()
                .setCustomId("menuRoles")
                .setMaxValues(3)
                .setMinValues(0)
                .setPlaceholder("Choississez vos rôles !")
                .addOptions(RLLIST))

                await interaction.reply({components: [menu], ephemeral: true})

        }
    }

});