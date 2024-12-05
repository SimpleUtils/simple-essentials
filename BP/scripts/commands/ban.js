import commandManager from "../api/commands/commandManager"
import * as config from "../config"
import simplePlayers from "../api/playerAPI"
import * as simple from "../functions"
import banAPI from "../api/banAPI"
import translation from "../api/translation"

commandManager.addCommand("ban", {description:"Ban people", category:"Moderation"}, ({msg,args})=>{
    let plr = simplePlayers.verifyPlayer(args.join(' '))
    if(plr === undefined) return msg.sender.error("You cannot ban someone that is offline!");
    let ban;

    try {
        ban = banAPI.banPlayer(plr);
    } catch (e) {
        msg.sender.error(`TypeError: ${e.message}`)
    }
    plr.runCommandAsync(`kick "${plr.name}" You are banned!`)
    msg.sender.success(`Banned ${plr.name} from the server.`)
})
commandManager.addCommand("unban", {description:"Unban people if they were wrongfully banned!", category:"Moderation"}, ({msg,args})=>{
    let ban;

    try {
        ban = banAPI.unbanPlayer(args.join(' '));
    } catch (e) {
        msg.sender.error(`TypeError: ${e.message}`)
    }
    msg.sender.success(`Unbanned ${args.join(' ')} from the server.`)
})    
commandManager.addCommand("bans", {description: "Check all bans", category:"Moderation"}, async ({msg,args})=>{
    let text = [`§7-----> §cBans §7<-----`];
    let bans = banAPI.getBans();
    for (const ban of bans) {
        text.push(`§8> §a${ban.data.name}`);
    }
    msg.sender.sendMessage(text.join('\n§r'));
})        