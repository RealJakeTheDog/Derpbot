const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Makes the bot say something.')
        .addStringOption(option =>
            option.setName('message')
            .setDescription('The Message to say')
            .setRequired(true)),
    async execute(interaction) {
        msg = interaction.options.get('message')
        interaction.reply({content: "Ignore this message", ephemeral: true})
        interaction.channel.send(msg.value)
    }
}