const Discord = require("discord.js");
const client = require("../../index");

client.on("messageCreate", async message => {

    var heyword = ["bonjour", "coucou", "bjr", "cc", "hey", "yo"];

    for (var i = 0; i < heyword.length; i++) {
        if (message.content.toLowerCase().includes(heyword[i].toLowerCase())) {
          message.react("👋")
          break;
        }
      }

})