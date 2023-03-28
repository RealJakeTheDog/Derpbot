const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Deletes a specified # of messages')
        .addIntegerOption(option =>
            option.setname('amount')
            .setDescription('The # of messages you would like to delete (Default 10)')
            .setRequired(false)),
    async execute(interaction) {
        if(!URLSearchParams.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {await interaction.reply({content: "You need elevated permissons to run this command", ephemeral: true})}
        var n = int(interaction.options.get('amount')) ?? 10
        interaction.guild.channel.messages.fetch({limit:n
        }).then((messages) => {
            interaction.guild.channel.bulkDelete(messages)
        });
        interaction.reply(`Deleted ${n} messages`)
}}