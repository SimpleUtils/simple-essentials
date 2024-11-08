import commandManager from "../api/commands/commandManager"
import * as config from "../config"
import * as simple from "../functions"
import banAPI from "../api/banAPI"
import translation from "../api/translation"

commandManager.addCommand("ban", {description:"Ban people", category:"Moderation"}, ({msg,args})=>{
    const player = msg.sender
    const params = args
    if (!config.banSystem === true) return simple.error("the Ban System is disabled!", player)
    if (!player.hasTag('admin')) return simple.error("You are not an admin!", player)
    if (player.name === params.join(' ')) return simple.error("You can't ban yourself, why would anyone ever do that lol...", player)
    banAPI.banPlayer(params.join(' '))
    simple.success(`Successfully banned ${params.join(' ')}`, player)
    simple.scriptEngine.runCommandAsync(`kick ${params.join(' ')} You are banned from this server!`)
})
commandManager.addCommand("unban", {description:"Unban people if they were wrongfully banned!", category:"Moderation"}, ({msg,args})=>{
    const player = msg.sender
    const params = args
    if (!config.banSystem === true) return error("the Ban System is disabled!", player)
        if (!player.hasTag('admin')) return error("You are not an admin!", player)
        banAPI.unbanPlayer(params.join(' '))
        simple.success(`Successfully unbanned ${params.join(' ')}`, player)
})    
commandManager.addCommand("checkban", {description:"Check if you are in the Ban API", category:"Development"}, ({msg,args})=>{
        const player = msg.sender
        const params = args
        let asdasd = "a"
        if (asdasd === "a") return simple.error("This command is in development!", player)
        if (!config.banSystem === true) return simple.error("the Ban System is disabled!", player)
            let bans = banAPI.getBans();
            let checkbanOfTargetPlayerResult;
            for (const ban of bans) {
                if (player.name === ban.data.name) {
                    checkbanOfTargetPlayerResult = ban.data.name
                } else {
                    checkbanOfTargetPlayerResult = null
                }
            }
            if (!checkbanOfTargetPlayerResult) {
                player.sendMessage(translation.getTranslation(player, 'error', "Not in ban API"))
            } else {
                player.sendMessage(translation.getTranslation(player, 'success', `Is in ban API, with return ${checkbanOfTargetPlayerResult}`))
            }    
        })
commandManager.addCommand("bans", {description: "Check all bans", category:"Moderation"}, ({msg,args})=>{
    if (!config.banSystem === true) return error("the Ban System is disabled!", player)
        let text = [`§7-----> §cBans §7<-----`];
        let allBans = banAPI.getBans();
        for (const ban of allBans) {
            text.push(`§8> §a${ban.data.name}`);
        }
        msg.sender.sendMessage(text.join('\n§r'));
})        