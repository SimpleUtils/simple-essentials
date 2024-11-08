import { world } from "@minecraft/server";
import commandManager from "../api/commands/commandManager";
import { error } from "../functions";

commandManager.addCommand("lore", {description:"Lore system", category:"Admin"}, ({msg,args})=>{
    error("Use a subcommand!")
})
commandManager.addSubcommand("lore", "set", {description:"Set lore"}, ({msg,args})=>{
    msg.sender.runCommandAsync(`scriptevent simple:add_lore ${args.join(' ')}`)
})
commandManager.addSubcommand("lore", "remove", {description:"Remove lore"}, ({msg,args})=>{
    msg.sender.runCommandAsync(`scriptevent simple:remove_lore ${args.join(' ')}`)
})