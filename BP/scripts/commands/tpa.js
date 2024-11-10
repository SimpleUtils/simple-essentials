import tpaAPI from "../api/tpaAPI";
import commandManager from "../api/commands/commandManager";
import { error } from "../functions";

commandManager.addCommand("tpa", { description: "Teleport to other players", category: "Players" }, ({ msg, args }) => {
   let targetPlayer = args[0]
   if (!targetPlayer) return error("You must declare a target player", msg.sender)
   tpaAPI.requestTo(msg.sender, targetPlayer)
})
commandManager.addSubcommand("tpa", "accept", { description: "Accept teleport requests", category: "Players" }, ({ msg, args }) => {
    tpaAPI.acceptRequest(msg.sender)
})