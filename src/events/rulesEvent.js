const Discord = require("discord.js");
const client = require("../../index");
const { MessageEmbed } = require('discord.js');



client.on("messageCreate", async message => {

    if (message.author.bot) return;
    if (message.content.indexOf(client.config.prefix) !== 0) return;
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    switch(command) {
        case "createrules": {

            // Create Embed
            const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Réglement intérieur - Réagissez ci-dessous pour valider le réglement')
            .setDescription(
                "**🎉 B  I  E  N  V  E  N  U  E 🎉** \n"+
                "\n"+
                "Bienvenue sur le discord du serveur d'Hozaria. \n"+
                "Pour que tout se passe pour le mieux pour vous et pour les autres, merci de lire et de respecter ces quelques règles. \n"+
                "\n"+
                "⚠️ En cas de non respect de ces règles vous encourez des sanctions (warn = avertissement). À partir du 4ème warns vous êtes bannis pendant 7 jours.\n"+
                "⚠️ Le staff peut également vous mute (vous voyez toujours les salons et les gens écrire, mais vous ne pouvez pas écrire)\n"+
                "\n"+
                "\n"+
                "**Accepte le réglement pour accéder au reste du serveur discord 🙂**"
                )
            .setThumbnail('https://static-cdn.jtvnw.net/jtv_user_pictures/d77ee138-4798-4ca1-b1a1-25d588b0fba0-profile_image-70x70.png')

            var accept = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("acceptRules")
                .setLabel("Acceptez les règles")
                .setStyle("SUCCESS")
                .setDisabled(false)
            )

            message.delete()
            message.channel.send({embeds: [exampleEmbed], components: [accept]})

            break;
        }
    }

})

client.on("interactionCreate", async interaction => {
    if(interaction.isButton()){
        if(interaction.customId === "acceptRules"){

            interaction.reply({
                content: "Super <@"+interaction.member.id+"> ! Vous avez accepté le réglement.",
                ephemeral: true
            })

            return interaction.member.roles.add("885800647499321354")
        }
    }
})
