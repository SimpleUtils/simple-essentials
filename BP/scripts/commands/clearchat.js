import { world } from "@minecraft/server";
import commandManager from "../api/commands/commandManager";
import { clearChat } from "../clearChat";

commandManager.addCommand("cc", {description:"Clear the chat", category:"Admin"}, ({msg})=>{
    clearChat(msg.sender)
})