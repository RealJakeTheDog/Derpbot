const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Look at a user\'s info')
        .addMentionableOption(option =>
            option.setName('user')
            .setDescription('The user to lookup')
            .setRequired(true)),
    async execute(interaction, client) {
        interaction.guild.members.fetch()
        user = interaction.guild.members.cache.get(interaction.options.get('user')?.value) 
        console.log(user.permissions)
        async function isVoice(user) {
            console.log(user.voice.channel)
            if(user.voice.channel) return true
            else return false
        };
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`User Info`)
            .setDescription(`Info on ${user.user.tag}`)
            .setAuthor({name: `${user.user.username}`, iconURL: user.user.defualtAvatarURL})
            .addFields(
                { name: 'Joined Since: ', value: `${user.user.createdAt}`},
                { name: 'Is Bot:', value: `${user.user.bot}`},
                { name: 'ID', value: `${user.id}`},
                { name: 'Joined Server On:', value: `${user.joinedAt}`},
                { name: 'In Voice Channel', value: `${await isVoice(user)}`}
            )
            .setFooter({text: 'Run this command using /user (username)'})
        interaction.reply({embeds: [embed]});
    }
},

async function isVoice(user) {
    console.log(user.voice.channel)
    if(user.voice.channel) return true
    else return false
};
