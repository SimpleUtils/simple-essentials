import { world } from "@minecraft/server";
import commandManager from "../api/commands/commandManager";
import backAPI from "../api/backAPI";

commandManager.addCommand("back", {description:"Go back to your last death location", category:"Players"}, ({msg,args})=>{
    backAPI.goBack(msg.sender)
})