import pwarpAPI from "../../api/pwarpAPI.js";
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager.js";
import './list.js'
import './create.js'
import './delete.js'

uiManager.addUI("players.pwarps | players.pwarps.root", "PWarps UI", (player)=>{
    let form = new ActionForm();
    form.title("§bPlayer Warps UI")
    form.button(`§bCreate Player Warp\n§7[ Create player warp ]`, null, (player)=>{
        uiManager.open(player, "players.pwarps.create")
    })
    form.button(`§bList Player Warps\n§r§7[ List All Player Warps ]`, null, (player)=>{
        uiManager.open(player, "players.pwarps.list")
    })
    form.button(`§bDelete Player Warp\n§r§7[ Delete a player warp ]`, null, (player)=>{
        uiManager.open(player, "players.pwarps.delete")
    })
    form.show(player)
})