const { Webhook, MessageBuilder } = require('discord-webhook-node');
var os = require('os');
var osu = require('node-os-utils')
const hook = new Webhook('WEBHOOK HERE');
const avatarURL = 'https://media.discordapp.net/attachments/491895122884165633/973538186779328522/878088ff8aae36e7d2b89ebcdd20d802_2.jpg';
const repoURL = 'https://github.com/BangLucy/Statushook'
var cpu = osu.cpu
var runningMachine = ''
var footerURL = ''
var DevTwitter = 'https://twitter.com/BangLucyUwU'
var cpuFree = ''
neoURL = ''


hook.setUsername('PC Stats');
hook.setAvatar(avatarURL);

let totalSeconds = os.uptime()
let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);

if (os.platform() === 'win32') {
    runningMachine = 'Windows'
    neoURL = 'https://media.discordapp.net/attachments/491895122884165633/973567087186432000/unknown.png'
} else if (os.platform() === 'linux') {
    runningMachine = 'Raspberry Pi'
    neoURL = 'https://media.discordapp.net/attachments/491895122884165633/973567403575373824/unknown.png'
}

if (runningMachine === 'Windows') {
    footerURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Windows_logo_-_2021.svg/2048px-Windows_logo_-_2021.svg.png'
} else if (runningMachine === 'Raspberry Pi') {
    footerURL = 'https://www.raspberrypi.com/app/uploads/2022/02/COLOUR-Raspberry-Pi-Symbol-Registered.png'
}

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
freemem = bytesToSize(os.freemem())
totalmem = bytesToSize(os.totalmem())


async function freeCheck(){
    cpu.free()
    .then(info => {
        cpuFree = info;
       })
  };
  async function logFree(){
    await freeCheck();
    setTimeout(() => {
        cpuUsed = 100 - cpuFree;
        const embed = new MessageBuilder()
        .setTitle('PC Stats')
        .setAuthor('BangLucy', '', DevTwitter)
        .setURL(repoURL)
        .addField('OS Arch', os.arch(), true)
        .addField('OS Platform', os.platform(), true)
        .addField('Uptime', `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`, true)
        .addField('Total Memory', `${totalmem}`, true)
        .addField('Free Memory', `${freemem}`, true)
        .addField('​\u200b', '​\u200b', true)
        .addField('CPU', `${cpu.model()}`, true)
        .addField('CPU Free', `${cpuFree.toFixed(2)}%`, true)
        .addField('CPU Usage', `${cpuUsed.toFixed(2)}%`, true)
        .setColor('#FFC0D4')
        .setImage(neoURL)
        .setFooter(runningMachine, footerURL)
        .setTimestamp()

      hook.send(embed)
        
    }, 1100);
  };
logFree()

// hook.send(`OS Arch: ${os.arch()}
// OS Platform: ${os.platform()}
// OS Type: ${os.type()}
// OS Release: ${os.release()}
// OS Uptime: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds
// OS Loadavg: ${os.loadavg()}
// OS Total Memory: ${os.totalmem()}
// OS Free Memory: ${os.freemem()}
// OS CPU Count: ${os.cpus().length}
// OS CPU Model: ${os.cpus()[0].model}
// OS CPU Speed: ${os.cpus()[0].speed}`)
// .then(() => console.log('Sent webhook successfully!'))
// .catch(err => console.log(err.message));



// hook.send(embed)

