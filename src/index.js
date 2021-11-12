const { Client, Intents, MessageEmbed } = require("discord.js");
require('dotenv').config();

const client = new Client({
    disableEveryone: true,
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING],
});

const { TOKEN, PREFIX, ACCENT_COLOR, STATUS, VERIFIED_ROLE } = process.env;
const util = require('./functions/utilities.js');

client.on("ready", () => {
    client.user.setActivity(STATUS, { type: 'WATCHING' })
    console.log(`${client.user.username} is connected to Discord`)
});

client.on("messageCreate", async (message) => {
    if(message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(PREFIX)) return;

    if(message.content.toLowerCase().includes("verify")) {
        let verifiedrole = message.guild.roles.cache.get(VERIFIED_ROLE);
        let robloxid = await util.bloxlink(message.author.id);
        if(robloxid === ('not_linked')) return message.channel.send({ content: `You don't seem to be linked with Bloxlink.\nPlease verify yourself here: https://blox.link/verify` })
        let robloxusername = await util.getUsernameById(robloxid);

        let embed = new MessageEmbed()
        .setTitle(`Verified`)
        .setColor(ACCENT_COLOR)
        .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${robloxid}&width=420&height=420&format=png`)
        .setDescription(`Welcome **${robloxusername}**`)

        try {
            message.member.setNickname(robloxusername) // remove if you dont want it to rename the users to their roblox username
            message.member.roles.add(verifiedrole)
            message.channel.send({ embeds: [embed] })
        } catch (err) {
            console.error(err)
        }
    }
});

client.login(TOKEN);
