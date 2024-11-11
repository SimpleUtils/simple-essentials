import pwarpAPI from "../../api/pwarpAPI";
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";

uiManager.addUI("players.pwarps.list | players.listpwarps", "Homes UI", async (player) => {
    // Retrieve all players asynchronously
    const allPlayers = await pwarpAPI.getAllPlayers();

    // Create the main form
    let form = new ActionForm();
    form.title("§bPlayer Warps UI");

    // Back button to return to the root UI
    form.button(`§cBack\n§7[ Go Back ]`, null, (player) => {
        uiManager.open(player, "players.pwarps.root");
    });

    // Loop over each player with warps and add buttons for each
    for (const warpPlayer of allPlayers) {
        form.button(`§b${warpPlayer}\n§7[ All Warps By ${warpPlayer} ]`, null, async (player) => {
            uiManager.open(player, "players.pwarps.warpsFromPlayer", warpPlayer)
        });
    }

    form.show(player); // Show the main player warps UI
});