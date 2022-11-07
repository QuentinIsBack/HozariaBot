const Discord = require("discord.js");
const client = require("../../index");
const { MessageEmbed } = require('discord.js');
const discordModals = require('discord-modals');
const { Modal, TextInputComponent, showModal } = discordModals;
discordModals(client);


client.on("messageCreate", async message => {

    if (message.author.bot) return;
    if (message.content.indexOf(client.config.prefix) !== 0) return;
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Channel Changement de Pseudo
    if(message.channelId !== client.config.channelsID.changeNickName) return

    // Has Permission
    if(!message.member.roles.cache.some(role => role.id === client.config.managerRoleID)) return

    switch(command) {
        case "createrename":  {
        
        
                    // Del Input
                    message.delete()

                    // Create Embed
                    const exampleEmbed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Changement de pseudo - Suivez les instruction pour changer de pseudo')
                    .setDescription(
                        "**Dans ce salon, vous pouvez changer votre pseudo.** \n"+
                        "\n"+
                        "Tout spam, caractère spécial au milieu du pseudo empêchant de mentionner ou pub dans le pseudo seront sanctionnés. Les caractères spéciaux devant ou derrière le pseudo sont autorisés. Si vous vous trompez dans la commande, il faudra attendre les 7 jours pour pouvoir changer de nouveau. \n"+
                        "\n"+
                        "__Utilisez le bouton ci-dessous__\n"+
                        "\n"+
                        "Allez-y et sélectionnez votre pseudo ci-dessous."
                        )
                    .setThumbnail('https://static-cdn.jtvnw.net/jtv_user_pictures/d77ee138-4798-4ca1-b1a1-25d588b0fba0-profile_image-70x70.png');
        
                    var accept = new Discord.MessageActionRow()
                    .addComponents(new Discord.MessageButton()
                        .setCustomId("changeName")
                        .setLabel("Changer de pseudo")
                        .setStyle("SUCCESS")
                        .setDisabled(false)
                    )

                    // Send Message
                    message.channel.send({embeds: [exampleEmbed],  components: [accept]})
        
        


            break;
        }
    }

})


client.on("interactionCreate", async interaction => {
    if(interaction.isButton()){
        if(interaction.customId === "changeName"){

            const input = new Discord.TextInputComponent()
            .setCustomId("name")
            .setLabel("Quel pseudo souhaitez-vous ?")
            .setStyle("SHORT")
            .setMinLength(4)
            .setMaxLength(20)
            .setPlaceholder(interaction.member.displayName)
            .setRequired(true)

            const modal = new Modal()
            .setCustomId("modal-customid")
            .setTitle("Changer de pseudo")
            .addComponents([ input ])

            showModal(modal, {
                client: client, // Client to show the Modal through the Discord API.
                interaction: interaction // Show the modal with interaction data.
              });

        }
    }
})

client.on('modalSubmit', async (modal) => {
    if(modal.customId === 'modal-customid') {
      const nameResponse = modal.getTextInputValue('name');


      try {
        if(modal.member.id === client.config.ownerID) {
            return await modal.reply({ 
                content: "Désolé "+"<@"+modal.member.id+">"+" ! Je n'ai pas les autorisations de faire cela avec vous :(",
                ephemeral: true 
              })
        }
        (await modal.guild.members.fetch(modal.member.id)).setNickname(nameResponse);
      } catch(err) {
        console.error(err);
      }
      return await modal.reply({ 
        content: "GG "+"<@"+modal.member.id+">"+" ! Ton pseudo sur le serveur de **Reverb** est maintenant : "+ nameResponse,
        ephemeral: true 
      })




      await modal.reply({ 
        content: "Vous avez changer votre pseudo par "+nameResponse,
        ephemeral: true 
      })
    }  
  });