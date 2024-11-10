import * as mc from "@minecraft/server";
import commandManager from "../api/commands/commandManager";
import uiManager from "../uiManager";
import { success, error } from '../functions'

commandManager.addCommand("platform", {description:"Platform stuff", category:"Admin"}, ({msg,args})=>{
    const system = mc.system
    const player = msg.sender
    success("Close chat and move to open UI.", player); // Notify the player

    let ticks = 0; // Track time in ticks (20 ticks = 1 second)
    let initialLocation = { x: player.location.x, y: player.location.y, z: player.location.z }; // Capture player's initial location

    // Run an interval every tick (20 ticks per second)
    let interval = system.runInterval(() => {
        ticks++;

        // Check if 10 seconds (200 ticks) have passed
        if (ticks >= (20 * 10)) {
            system.clearRun(interval); // Stop the interval
            error("Timed out. You didn't move!", player); // Send a timeout message
        }

        // Check if the player has moved from their initial location
        if (player.location.x !== initialLocation.x ||
            player.location.y !== initialLocation.y ||
            player.location.z !== initialLocation.z) {

            system.clearRun(interval); // Stop the interval
            uiManager.open(msg.sender, "admin.platform")
        }
    }, 1); // Execute every tick
})

commandManager.addSubcommand("platform", "get", {description:"Get a player's platform"}, ({msg,args})=>{
    const player = msg.sender
    if (!player.hasTag('admin')) return error("You are not an admin!", player)
        if (!args[0]) return error("That is not a player!", player)
        let targetPlayer;
        for (const player of mc.world.getPlayers()) {
            if (player.name.toLowerCase() == args[0].toLowerCase()) targetPlayer = player;
        }
        if (!targetPlayer) return error("That is not an online player!", player)
        let platformDisplay = targetPlayer.getTags()
        .filter(tag => tag.startsWith("platform_"))
        .map(tag => tag.replace("platform_", ""));

        msg.sender.sendMessage(`${targetPlayer.name} is on ${platformDisplay}`)
})