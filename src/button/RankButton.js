const Discord = require("discord.js");
const client = require("../../index");

client.on("messageCreate", async message => {
    if(message.content === "button") {
        var row = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("RC")
                .setLabel("Roller Champion")
                .setStyle("PRIMARY")
                .setDisabled(false)
            )
        message.channel.send({content: "Choississez vos rôles", components: [row]})
    }
})

client.on("interactionCreate", async interaction => {
    if(interaction.isButton()){
        if(interaction.customId === "RC"){
            interaction.reply("Vous avez appuyez sur RC")
        }
    }
})