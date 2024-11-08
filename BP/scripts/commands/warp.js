import * as simple from "../functions"
import commandManager from "../api/commands/commandManager"
import * as config from "../config"
import * as warps from "../warp"

commandManager.addCommand("warp", {description:"Warp to server locations", category:"Players"}, ({msg,args})=>{
    if (!config.warpSystem === true) return simple.error("Warp System is disabled!", msg.sender)
        warps.warpTo(msg, args, args)
})
commandManager.addSubcommand("warp", "set", {description: "Set server warps"}, ({msg,args})=>{
    if (!config.warpSystem === true) return simple.error("Warp System is disabled!", msg.sender)
        warps.setWarp(msg, args, args)
})
commandManager.addSubcommand("warp", "remove", {description: "Remove server warps"}, ({msg,args})=>{
    if (!config.warpSystem === true) return simple.error("Warp System is disabled!", msg.sender)
        warps.removeWarp(msg, args, args)
})
