import commandManager from "../api/commands/commandManager";
import * as simple from "../functions"
import * as mc from "@minecraft/server"

commandManager.addCommand("to", {description:"Teleport to people", category:"Moderation"}, ({msg,args})=>{
    const player = msg.sender
    if (!player.hasTag('admin')) return simple.error("You are not an admin!", player)
        if (!args[0]) return simple.error("That is not a player!", player)
        let targetPlayer;
        for (const player of mc.world.getPlayers()) {
            if (player.name.toLowerCase() == args[0].toLowerCase()) targetPlayer = player;
        }
        if (!targetPlayer) return simple.error("That is not an online player!", player)
        if (targetPlayer.name == (`${player.name}`)) return simple.error("You can't teleport to yourself, silly!", player)

        const targetLocation = targetPlayer.location;
        const targetDimension = targetPlayer.dimension;

        simple.commandFeedback("off")
        simple.scriptEngine.runCommandAsync(`tp ${player.name} ${targetLocation.x} ${targetLocation.y} ${targetLocation.z}`)
        simple.commandFeedback("on")
        simple.success(`Successfully teleported to ${targetPlayer.name}!`, player)
})