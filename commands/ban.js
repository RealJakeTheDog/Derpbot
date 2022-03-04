const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('bans a user you mention')
        .addMentionableOption(option =>
            option.setName('user')
            .setDescription('the user you would like to ban')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('reason for ban. will default to "No Reason"')
            .setRequired(false)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply('`You do not have permission to use this command.`')
        user = interaction.guild.members.cache.get(interaction.options.get('user')?.value)
        reason = interaction.options.get('reason')?.value ?? "No Reason"
        if (user.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply('`You cannot ban an admin.`')
        try {
        user.ban({reason: reason})
        await interaction.reply(`${user.user.name} has been banned. Reason: \`${reason}\``)} catch (error) {return interaction.reply(`Unable to ban member. Error: ${error}`)}
    }
}
