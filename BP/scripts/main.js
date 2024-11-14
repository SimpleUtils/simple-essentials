import * as mc from '@minecraft/server'
import { Player, World } from '@minecraft/server'
import './functions.js'
import { runCommand } from './commandHandler.js'
import './uis/uiManager.js'
import './scriptevent.js'
import './antiDupe.js'
import './chatRanks.js'
import './api/giftCodes.js'
import './api/actionParser.js'
import './commands/prefix.js'
import './uis/giftCodes/add.js'
import './commands/platform.js'
import './uis/giftCodes/edit.js'
import './uis/giftCodes/redeem.js'
import './uis/giftCodes/root.js'
import './uis/basic/basicConfirmation.js'
import './clearChat.js'
import './lore.js'
import './uis/deviceSettings/root.js'
import './uis/ranks/addRank.js'
import './uis/ranks/removeRank.js'
import './uis/ranks/root.js'
import './uis/deviceSettings/desktop.js'
import './uis/deviceSettings/console.js'
import './uis/deviceSettings/mobile.js'
import './uis/kickmenu.js'
import './uis/credits.js'
import './commands/bind.js'
import './uis/prefix.js'
import './uis/developer.js'
import './uis/broadcast.js'
import './commands/help.js'
import './lib/prismarinedb.js'
import './commands/broadcast.js'
import './commands/lore.js'
import './uiManager.js'
import './commands/clearchat.js'
import './commands/redeem.js'
import './commands/to.js'
import './commands/uis.js'
import './commands/ban.js'
import './commands/warp.js'
import './commands/tpa.js'
import './commands/credits.js'
import './commands/config.js'
import './onItemUse.js'
import './uis/homes/root.js'
import './uis/pwarps/root.js'
import translation from './api/translation.js'
import playerAPI from './api/playerAPI.js'
import './api/banAPI.js'
import { clearChat } from './clearChat.js'
import * as config from './config.js'
import platformAPI from './api/platformAPI.js'
import * as simple from './functions.js'
import { chatRankToggle } from './config.js'
import banAPI from './api/banAPI.js'
import './uis/shop/root.js'
import commandManager from './api/commands/commandManager.js'
import uiManager from './uiManager.js'
import backAPI from './api/backAPI.js'
import './commands/back.js'
import rankAPI from './api/rankAPI.js'
import shopAPI from './api/shopAPI.js'

Player.prototype.success = function (msg) {
    this.sendMessage(translation.getTranslation(this, "success", msg));
}
Player.prototype.info = function (msg) {
    this.sendMessage(translation.getTranslation(this, "info", msg));
}
Player.prototype.error = function (msg) {
    this.sendMessage(translation.getTranslation(this, "error", msg));
}
Player.prototype.warn = function (msg) {
    this.sendMessage(translation.getTranslation(this, "warn", msg));
}

World.prototype.error = function (msg) {
    this.sendMessage(translation.getTranslation(this, "error", msg))
}

let commandPrefix = mc.world.getDynamicProperty("prefix");

if (commandPrefix === undefined) {
    commandPrefix = "-"
}

commandManager.changecommandManagerPrefix(commandPrefix)

function changeCommandPrefix(newPrefix) {
    commandPrefix = newPrefix
    commandManager.changecommandManagerPrefix(newPrefix)
}


mc.system.runInterval(() => {
    let a = "a"
}, 20);

// let test = banAPI.banPlayer(player.name)

function betterArgs(myString) {
    var myRegexp = /[^\s"]+|"([^"]*)"/gi;
    var myArray = [];

    do {
        var match = myRegexp.exec(myString);
        if (match != null) {
            myArray.push(match[1] ? match[1] : match[0]);
        }
    } while (match != null);

    return myArray;
}

mc.system.afterEvents.scriptEventReceive.subscribe(e => {
    if (
        e.id == "simple:open_ui" &&
        e.sourceType == mc.ScriptEventSource.Entity &&
        e.sourceEntity.typeId == "minecraft:player"
    ) {
        let args = betterArgs(e.message);
        uiManager.open(e.sourceEntity, args[0], ...args.slice(1))
    }
})
mc.world.afterEvents.entityDie.subscribe(e => {
    if (e.deadEntity.typeId === "minecraft:player") {
        backAPI.insertLocation(e.deadEntity)
    }
})
mc.system.runInterval(() => {
    for (const player of mc.world.getPlayers()) {
        if (!player.hasTag("moneyDisplay")) return;
        player.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"§aMoney: §r"},{"score":{"name":"@s","objective":"${shopAPI.money}"}}]}`)
        player.runCommandAsync(`scoreboard objectives add ${shopAPI.money} dummy Money`)
        player.runCommandAsync(`scoreboard players add @s ${shopAPI.money} 0`)
    }
  }, 20);
// Couldn't be bothered to make my own file lmao
commandManager.addCommand("floatingtext", { description: "Floating text" }, ({ msg, args }) => {
    if (!msg.sender.hasTag('admin')) return msg.sender.sendMessage(translation.getTranslation(msg.sender, 'error', "You can't run this command without having permissions"))
    let entity = msg.sender.dimension.spawnEntity("simple:floating_text", msg.sender.location)
    entity.nameTag = args.join(' ').replaceAll("{nl}", "\n")
    msg.sender.sendMessage(translation.getTranslation(msg.sender, 'success', `Set floating text with nametag: ${args.join(' ')}`))
})
// ban system kick :p
mc.world.afterEvents.playerSpawn.subscribe(async ({ player, initialSpawn }) => {
    if (!config.banSystem === true) return console.log("Ban System is disabled, so the player is not getting checked for bans!")
    let bans = banAPI.getBans();
    let checkbanOfTargetPlayerResult;

    for (const ban of bans) {
        if (player.name === ban.data.name) {
            checkbanOfTargetPlayerResult = ban.data.name
        }
    }
    simple.scriptEngine.runCommandAsync(`kick ${checkbanOfTargetPlayerResult} You are banned from this server.`)
})

// Platform bans
mc.world.afterEvents.playerSpawn.subscribe(async ({ player, initialSpawn }) => {
    platformAPI.clearAllPlatformTags(player)
    if (!config.platformSystem === true) return console.log("Platform system is disabled, will not kick people that are on banned platforms, and players will not get platform tags!")
    if (player.clientSystemInfo.platformType === "Desktop") {
        if (config.desktopBanned === true) {
            if (platformAPI.db.findFirst({name: player.name})) return;
            simple.scriptEngine.runCommandAsync(`kick ${player.name} Platform is banned by the server admins.`)
        } else {
            platformAPI.addDesktopTag(player)
            console.log("Player joined successfully on desktop")
        }
    }
    if (player.clientSystemInfo.platformType === "Mobile") {
        if (config.mobileBanned === true) {
            if (platformAPI.db.findFirst({name: player.name})) return;
            simple.scriptEngine.runCommandAsync(`kick ${player.name} Platform is banned by the server admins.`)
        } else {
            platformAPI.addMobileTag(player)
            console.log("Player joined successfully on mobile")
        }
    }
    if (player.clientSystemInfo.platformType === "Console") {
        
        if (config.desktopBanned === true) {
            if (platformAPI.db.findFirst({name: player.name})) return;
            simple.scriptEngine.runCommandAsync(`kick ${player.name} Platform is banned by the server admins.`)
        } else {
            platformAPI.addConsoleTag(player)
            console.log("Player joined successfully on console")
        }
    }
})
mc.world.beforeEvents.playerLeave.subscribe((ev) => {
    playerAPI.handlePlayerLeave(ev.player.name)
})
mc.world.beforeEvents.chatSend.subscribe((eventData) => {
    const msg = eventData
    switch (eventData.message) {
        default:
            if (msg.message.startsWith(commandPrefix)) {
                const removedPrefix = eventData.message.replaceAll(`${commandPrefix}`, ``)
                msg.cancel = true;
                commandManager.run(eventData)
                // runCommand(msg.sender, `${removedPrefix}`, msg)
            } else {
                rankAPI.createMessage(msg.sender, msg.message)
                msg.cancel = true;
            }
    }
    

});

export { changeCommandPrefix, commandPrefix }