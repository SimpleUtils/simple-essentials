import pwarpAPI from "../../api/pwarpAPI";
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";

uiManager.addUI("players.pwarps.delete | players.deletepwarps", "Player Warps UI", async (player)=>{
    let allpwarps = await pwarpAPI.getAllfromPlayer(player);
    let form = new ActionForm();
    form.title("§bPlayer Warps UI")
    form.button(`§cBack\n§7[ Go Back ]`, null, (player)=>{
        uiManager.open(player, "players.pwarps.root")
    })
    for (const pwarp of allpwarps) {
        form.button(`§b${pwarp.data.name}\n§7[ Delete ]`, null, (player)=>{
            pwarpAPI.remove(player, pwarp.data.name)
        })
    }
    form.show(player)
})