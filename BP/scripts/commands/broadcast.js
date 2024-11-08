import { world } from "@minecraft/server";
import commandManager from "../api/commands/commandManager";
import * as simple from "../functions"
import * as mc from "@minecraft/server"
import uiManager from "../uiManager";

commandManager.addCommand("bc", {description:"Broadcast messages to server", category:"Admin"}, ({msg,args})=>{
    if (!args[0]) {
        const player = msg.sender
        const system = mc.system
                simple.success("Close chat and move to open UI.", player); // Notify the player
     
                let ticks = 0; // Track time in ticks (20 ticks = 1 second)
                let initialLocation = { x: player.location.x, y: player.location.y, z: player.location.z }; // Capture player's initial location
     
                // Run an interval every tick (20 ticks per second)
                let interval = system.runInterval(() => {
                    ticks++;
     
                    // Check if 10 seconds (200 ticks) have passed
                    if (ticks >= (20 * 10)) {
                        system.clearRun(interval); // Stop the interval
                        simple.error("Timed out. You didn't move!", player); // Send a timeout message
                    }
     
                    // Check if the player has moved from their initial location
                    if (player.location.x !== initialLocation.x ||
                        player.location.y !== initialLocation.y ||
                        player.location.z !== initialLocation.z) {
     
                        system.clearRun(interval); // Stop the interval
                        uiManager.open(msg.sender, "admin.tools.broadcast")
                    }
                }, 1); // Execute every tick
    } else {
        simple.broadcast(`${args.join(' ')}`)
    }
})