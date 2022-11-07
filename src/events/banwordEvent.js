const Discord = require("discord.js");
const client = require("../../index");

client.on("messageCreate", async message => {

    var banword = ["fdp", "connard", "pute", "salope", "enculé", "enculer"];

    if (message.author.bot) return;

    for (var i = 0; i < banword.length; i++) {
        if (message.content.includes(banword[i])) {
          message.delete();
          return message.member.send("Oulaa "+"<@"+message.member.id+">"+" ! Tu n'as pas le droit de dire "+banword[i] +".");
          break;
        }
      }

})