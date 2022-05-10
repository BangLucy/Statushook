const {Webhook} = require('discord-webhook-node');
var os = require('os');
const hook = new Webhook('https://discord.com/api/webhooks/973265618944024687/OH-2qsyFjqeAOQcqiRANv2Jkq83NJnyeAfcMNN47j9rc5ZyUopzQKZTeO6yaB0d93xKe');
const avatarURL = 'https://media.discordapp.net/attachments/491895122884165633/973538186779328522/878088ff8aae36e7d2b89ebcdd20d802_2.jpg';

hook.setUsername('PC Stats');
hook.setAvatar(avatarURL);

hook.send(`OS Arch: ${os.arch()}\nOS Platform: ${os.platform()}\nOS Type: ${os.type()}\nOS Release: ${os.release()}\nOS Uptime: ${os.uptime()}`)
.then(() => console.log('Sent webhook successfully!'))
.catch(err => console.log(err.message));
