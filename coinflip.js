const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Flips A Coin.'),
    async execute(interaction) {
        int = Math.random()
        if(int >= 0.5) {res="Heads"} else {res = "Tails"}
        interaction.reply(`It was ${res}`)
        return
    }
}