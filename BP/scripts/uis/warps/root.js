import * as config from '../../config'
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";

uiManager.addUI("admin.warps | admin.warps", "Admin Warps", (player)=>{
    let form = new ActionForm();
    form.title("§f§u§l§l§s§c§r§e§e§n§r§bWarp Config")
    form.button(`§bAdd\n§7Add a warp`, null, (player)=>{
        uiManager.open(player, "admin.warps.add")
    })
    form.button(`§bRemove\n§r§7Remove a warp`, null, (player)=>{
        uiManager.open(player, "admin.warps.remove")
    })
    form.show(player)
})