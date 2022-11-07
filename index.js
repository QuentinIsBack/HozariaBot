const Discord = require("discord.js");

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_PRESENCES,

    ]
})
module.exports = client;

// Global Variables
client.config = require("./config.json");

client.on("ready", () => {
    console.log("Bot Connecté")
});

// Initializing the project
require("./src/handler/handler.js")(client);

client.login(process.env.TOKEN);