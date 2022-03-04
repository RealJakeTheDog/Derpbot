
//===============================================Imports==============================================================
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getInfo } = require('ytdl-core-discord');
const ytdl = require('ytdl-core');
const { joinVoiceChannel, createAudioResource, AudioPlayer } = require('@discordjs/voice');
const {VoiceConnectionStatus, AudioPlayerStatus, createAudioPlayer} = require('@discordjs/voice')
const fs = require('fs');
const { IntegrationApplication, MessageEmbed } = require('discord.js');
const { create } = require('domain');
const ytsr = require("ytsr");
// ===================================================================================================================

let time = new Date
var player = createAudioPlayer();
var Queue = []

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('plays a song from a URL or SEARCH')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('the song to play or SEARCH for')
                .setRequired(true)),
// Command Handler =========================================================================================================================================
    async execute(interaction) {
        urlv = interaction.options.get('url', true).value // grabs sent URL from discord
        url = await ytsr(`${urlv}`, {limit : 1}); // Searches YTSR for the video (Currently looks at first video only, stalls on any more than 3)
        VC = interaction.member.voice.channel
        if (Queue.length == 0 ) {
            Queue[Queue.length] = ytdl(url.items[0].url, {filter: "audioonly", highWaterMark: 1 << 25}); // Grabs only the audio for the YT video since we can't display video, sets highWaterMark to 1/25 which increases the amount of data it can transfer and process at once
            //turn this down if your computer runs out of ram or crashes frequently                ^^
            try {
                connection = joinVoiceChannel({ // --->>>>>> Need to set all of this inside a dict/array variable along with the urls but can't figure out how to do it without bricking the music commands
                    channelId: VC.id,
                    guildId: VC.guild.id,
                    adapterCreator: VC.guild.voiceAdapterCreator,
                });
            } catch(error) {console.log(error)};
            connection.subscribe(player)
            interaction.reply('Attempting to play...')
            console.log(`Thumbnail ${url.items[0].bestThumbnail}`) // --->>>>> Thumbnails not working. Not sure why. Bricks the music command when trying to use Format()
            play(interaction, connection)
        } else {
            Queue.push(url) // Adds URL to bottom of array if a song is currently in the Queue
            Queue[Queue.length - 1] = ytdl(url.items[0].url, {filter: "audioonly", highWaterMark: 1 << 25});
            //turn this down as well if you're having problems                                         ^^
            console.log(`Queue lngth ${Queue.length}`)
            interaction.reply('Added To Queue')
        }
    }
}

// URL and CODEC processing Function ============================================================================================================================
async function play() {
    if(Queue.length == 0) {
        connection.destroy();
    } else {
    Queue[0].pipe(fs.createWriteStream('video.mp3'));
    const resource = createAudioResource('video.mp3')
    player.play(resource);
 }
}
// Queue Function (Work In Progress) =============================================================================================================================
player.on(AudioPlayerStatus.Idle, () => {
    try {
        Queue.shift(); //Removes the last played song from the queue and shifts the queue up 1 level
        play(); // Command Handler `^`
    } catch(error) {console.log(error)} // Having problems with it stalling about once a week
})

// ~!~ Embed Command (NOT WORKING) ~!~ =====================================================================================================
async function Format(song, type) {
    if(type == '1') {
        Embed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('***Now Playing***')
            .setDescription(`${song.title}`)
            .setThumbnail(song.bestThumbnail)// Thumbnail not working for some reason. Bricks the entire music command if used.
            .addFields(
                {name:'Duration: ', value: `${song.duration}`}, // Duration seems to return a Ram location instead of an actual duration
                {name: 'Url: ', value: `${song.url}`}

            )
            return Embed
    }
}