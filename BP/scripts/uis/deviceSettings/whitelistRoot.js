import * as config from '../../config'
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";

uiManager.addUI("admin.platform.whitelist | admin.platformWhitelist", "Platform Config", (player)=>{
    let form = new ActionForm();
    form.title("§bPlatform Whitelist")
    form.button(`§cBack\n§7[ Go back to platform settings ]`, null, (player)=>{
        uiManager.open(player, "admin.platform")
    })
    form.button(`§bAdd\n§r§7[ Add player ]`, null, (player)=>{
        uiManager.open(player, "admin.platform.whitelist.add")
    })
    form.button(`§bRemove\n§r§7[ Remove player ]`, null, (player)=>{
        uiManager.open(player, "admin.platform.whitelist.remove")
    })
    form.show(player)
})