const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('kicks a user you mention')
        .addMentionableOption(option =>
            option.setName('user')
            .setDescription('user you would like to kick')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('reason for kicking user, defaults to NO REASON GIVEN')
            .setRequired(false)),
    async execute(interaction) {
        usr = interaction.options.get('user')?.value
    }
}