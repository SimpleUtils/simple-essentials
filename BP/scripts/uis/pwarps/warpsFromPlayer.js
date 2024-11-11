import uiManager from "../../uiManager";
import pwarpAPI from "../../api/pwarpAPI";
import { ActionForm } from "../../lib/prismarinedb";

uiManager.addUI("players.pwarps.warpsFromPlayer | players.listwarpsfromplayer", "Homes UI", async (player, warpPlayer) => {
    let form2 = new ActionForm();
    const allFromWarpPlayer = await pwarpAPI.getAllfromPlayerName(warpPlayer); // Await the retrieval of warps

    form2.button(`§cBack\n§7[ Go Back ]`, null, (player) => {
        uiManager.open(player, "players.pwarps.list");
    });

    for (const warp of allFromWarpPlayer) {
        form2.button(`§b${warp.data.name}\n§7[ Teleport ]`, null, (player) => {
            pwarpAPI.teleport(player, warp.data.name);
        });
    }

    form2.show(player);
});            