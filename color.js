const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('color')
        .setDescription('sets your color using a hex code')
        .addStringOption(options =>
            options.setName('code')
            .setDescription('The hex code of the color you would like to use')
            .setRequired(true)),
    async execute(interaction, client) {
        clr = interaction.options.get('code')?.value
        usr = interaction.member.user.id
        usrn = client.users.cache.find(user => user.id === usr)
        role = interaction.guild.roles.cache.find(role => role.name === usrn.username)
        console.log(role.color)
        role.edit({color: clr})
        interaction.reply({content: `Color has been changed to ${clr}`})
    }
}