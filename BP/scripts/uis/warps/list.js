import warpAPI from "../../api/warpAPI";
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";

uiManager.addUI("players.warps.list | players.listwarps", "Warps UI", (player)=>{
    let allHomes = warpAPI.getWarps();
    let form = new ActionForm();
    form.title("§bWarps UI")
    if (player.hasTag('admin')) {
    form.button(`§aCreate\n§7[ Create Warp ]`, null, (player)=>{
        uiManager.open(player, "admin.warps.add")
    })
    }
    for (const home of allHomes) {
        form.button(`§b${home.data.name}\n§7[ Teleport ]`, null, (player)=>{
            warpAPI.tpToWarp(player, home.data.name)
        })
    }
    form.show(player)
})