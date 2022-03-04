const { Client, Collection, Intents } = require('discord.js');
const { Token } = require('./assets.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const fs = require('fs');

client.once('ready', () => {
    console.log('Online and waiting for Interactions...')
});

// Command Maker ====================================================================================================
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));  // Basic Commands
const musicFiles = fs.readdirSync('./Music').filter(file => file.endsWith('.js')); // Music Commands

//Command Files (Misc or Unorganized Commands) ---------------------------------------------------------------------
for (const File of commandFiles) {
    const command = require(`./commands/${File}`);
    client.commands.set(command.data.name, command);
}

// Music Files (10% Complete, does work, just needs a lot of improvements and functions added)----------------------
for (const File of musicFiles) {
    const command = require(`./Music/${File}`);
    client.commands.set(command.data.name, command);
}

//Slash Command Handler =============================================================================
client.on('interactionCreate', async interaction => {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction, client);
    } catch (error) {
       // await ErrorHndl(error)          / Need to do an Error Handler
        console.error(error);
        await interaction.reply({content: `There was an error running this command (error: \`${error}\`)`, ephemeral: true}); // Need a basic error handler
    }
// ===================================================================================================
})

//async function ErrorHndl(error) {          /Need to do an Error Handler
//     if()
//}




client.login(Token)
