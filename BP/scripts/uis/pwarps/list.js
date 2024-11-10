import pwarpAPI from "../../api/pwarpAPI";
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";

uiManager.addUI("players.pwarps.list | players.listpwarps", "Homes UI", (player)=>{
    let allpwarps = pwarpAPI.getAll();
    let form = new ActionForm();
    form.title("§bPlayer Warps UI")
    form.button(`§cBack\n§7[ Go Back ]`, null, (player)=>{
        uiManager.open(player, "players.pwarps.root")
    })
    for (const warp of allpwarps) {
        form.button(`§b${warp.data.name}\n§7[ By ${warp.data.playername} ]`, null, (player)=>{
            pwarpAPI.teleport(player, warp.data.name)
        })
    }
    form.show(player)
})