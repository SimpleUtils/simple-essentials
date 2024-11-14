import * as mc from '@minecraft/server'
import { runCommand } from './commandHandler.js'
import { success, error } from './functions.js'
import uiManager from './uiManager.js'

mc.system.afterEvents.scriptEventReceive.subscribe((event) => {
    const {
        id,
        initiator,
        message,
        sourceBlock,
        sourceEntity,
        sourceType,
    } = event;
    if (id === "simple:run") {
        runCommand(sourceEntity, message)
        sourceEntity.sendMessage("§c§lDanger §8>>§f§c This scriptevent will be deprecated soon! If you see this in the Admin UI, please report it in bug reports on the Discord!")
    }
    if (id === "simple:open_admin") {
            const player = sourceEntity
            const system = mc.system
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
                    uiManager.open(player, "admin.main")
                }
            }, 1);
        
    }
});