const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('derpbot')
        .setDescription('A rundown of the bot, also includes an invite link.'),
    async execute(interaction) {
        interaction.reply('I am a reincarnation of the once powerful Derpbot. All of my commands can be found by typing "/". Invite Link: `https://bit.ly/3JXlWar`')
        return
    }
}