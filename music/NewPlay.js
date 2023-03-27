const { SlashCommandBuilder } = require('@discordjs/builders');
const { getInfo } = require('ytdl-core-discord');
const ytdl = require('ytdl-core');
const { joinVoiceChannel, createAudioResource, AudioPlayer } = require('@discordjs/voice');
const {VoiceConnectionStatus, AudioPlayerStatus, createAudioPlayer} = require('@discordjs/voice')
const fs = require('fs');
const { IntegrationApplication, MessageEmbed } = require('discord.js');
const { create } = require('domain');
const ytsr = require("ytsr");

var List = []

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('plays a song from a URL or SEARCH')
        .addStringOption(option =>
           option.setName('url')
            .setDescription('the song to play or SEARCH')
            .setRequired(true)),
    async execute(interaction) {
        const VCID = interaction.member.voice.channel
        const GID = interaction.member.guild.id
        if(List = []) {var List = [{"Guilds": {"id": `${GID}`,"VC": `${VCID}`, "Queue": []}}]}
        else {List.Guilds.push({"id": `${GID}`,"VC": `${VCID}`,"Queue": []})}
        Q = List.Guilds.GID.Queue
        url = await ytsr(`${interaction.options.get('url', true).value}`, {limit : 1});
        Q[Q.length] = ytdl(url.items[0].url, {filter: "audioonly", highWaterMark: 1 << 25});


    }
}
