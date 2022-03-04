const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Creates a poll for an X amount of time.')
        .addStringOption(option => 
            option.setName('question')
                .setDescription('What do you want the poll to be?')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('channel')
                .setDescription('The channel to send the poll in. Defaults to current channel.')
                .setRequired(false))
        .addIntegerOption(option => 
            option.setName('timelimit')
                .setDescription('the time limit of the poll, in seconds. If left blank will default to 1H.')
                .setRequired(false)),
    async execute(interaction) {
        msg = (await interaction.options.get("question", true).value);
        cc = await interaction.options.getChannel("channel") ?? interaction.channel;
        tl = await interaction.options.get("timelimit")?.value ?? 3600;
        emb = embedMaker(msg, interaction, 'newpoll', result=undefined)
        poll = await cc.send({embeds: [emb]}).then(sentEmbed => {
            sentEmbed.react('👍')
            sentEmbed.react('👎')
        });
        await interaction.reply({content: 'Sending poll...', ephemeral: true})
        setTimeout(() => pollHandler(interaction, poll = poll.id, msg), tl * 1000)
        },
       
};

function embedMaker(msg, interaction, type, result) {
    if (type == 'newpoll') {
        Embed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('New Poll')
            .setAuthor(`Poll by ${interaction.user.username}`)
            .setDescription(msg)
            .addFields(
                {name : "How to Vode :", value: 'Reply with 👍 for yes and 👎 for no.'}
            ) 
            return Embed };
    if (type == 'endpoll') {
        Embed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Poll Ended')
            .setAuthor(`Poll by ${interaction.user.username}`)
            .setDescription(msg)
            .addFields(
                {name: `The Answer is`, value: `${result}!`}
            )
            return Embed };
    
};

function pollHandler(interaction, poll, msg) {
    console.log(`POLL = ${poll}`)
    const reactions = poll.reactions;
    y = reactions.get('👍')
    n = reactions.get('👎')
    if (y >= n ) {
        embed = embedMaker(msg, interaction, 'endpoll', 'yes')
    };
    if (y <= n) {
        embed = embedMaker(msg, interaction, 'endpoll', 'no')
    };
    if (y == n) {
        embed = embedMaker(msg, interaction, 'endpoll', 'A TIE')
    };
    poll.edit({embeds: [embed]})
}