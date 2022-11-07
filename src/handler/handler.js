const client = require("../../index");

/**
 * @param {Client} client
 */

module.exports = async (client) => {
    const modules = {};

    // Buttons
    const controllerPath = require('path').join(__dirname, '../button');
    require('fs')
    .readdirSync(controllerPath)
    .forEach((file) => {
      const name = file.replace(/\.js$/, '');
      modules[name] = require(`../button/${file}`);
    });

    // Events
    const controllerPathE = require('path').join(__dirname, '../events');
    require('fs')
    .readdirSync(controllerPathE)
    .forEach((file) => {
      const name = file.replace(/\.js$/, '');
      modules[name] = require(`../events/${file}`);
    });

    // Commands
    const controllerPathC = require('path').join(__dirname, '../commands');
    require('fs')
    .readdirSync(controllerPathC)
    .forEach((file) => {
      const name = file.replace(/\.js$/, '');
      modules[name] = require(`../commands/${file}`);
    });

}