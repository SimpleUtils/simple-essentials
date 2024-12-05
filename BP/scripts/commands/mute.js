import { world } from "@minecraft/server";
import commandManager from "../api/commands/commandManager";
import simplePlayers from "../api/playerAPI";

commandManager.addCommand("mute", {description:"Mute someone", category:"Moderation"}, ({msg,args})=>{
    let player = simplePlayers.verifyPlayer(`${args.join(' ')}`)
    if(!player) return msg.sender.error(`No player on the server with name ${args.join(' ')}`)
    player.tagbeadd("muted")
})
commandManager.addCommand("unmute", {description:"Ummute someone", category:"Moderation"}, ({msg,args})=>{
    let player = simplePlayers.verifyPlayer(`${args.join(' ')}`)
    if(!player) return msg.sender.error(`No player on the server with name ${args.join(' ')}`)
    player.tagberemove("muted")
})