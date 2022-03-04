const {SlashCommandBuilder} = require('@discordjs/builders');
const {Permissions} = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear').setDescription('clears a certain amount of messages')
        .addIntegerOption(option =>
            option.setName('amount')
            .setDescription('amount of messages to clear.')
            .setRequired(true)),
    async execute(interaction) {
        if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {return interaction.reply("`You do not have permission to use this command`")}
        interaction.channel.purge(interaction.options.get('amount'.value))
        return interaction.reply(`>>> Deleted ${interaction.options.get('amount').value} messages`)
    }
}