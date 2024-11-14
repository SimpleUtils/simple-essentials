import * as config from '../../config'
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";
import './whitelistAdd'
import './whitelistRemove'
import './whitelistRoot'

uiManager.addUI("admin.platform | admin.platformSettings", "Platform Config", (player)=>{
    let form = new ActionForm();
    form.title("§bPlatform Config")
    form.button(`§bWhitelist\n§7[ Edit Whitelist ]`, null, (player)=>{
        uiManager.open(player, "admin.platform.whitelist")
    })
    form.button(`§bConsole\n§7[ Edit Console Platform ]`, null, (player)=>{
        uiManager.open(player, "admin.platform.console")
    })
    form.button(`§bMobile\n§r§7[ Edit Mobile Platform ]`, null, (player)=>{
        uiManager.open(player, "admin.platform.mobile")
    })
    form.button(`§bDesktop\n§r§7[ Edit Desktop Platform ]`, null, (player)=>{
        uiManager.open(player, "admin.platform.desktop")
    })
    form.show(player)
})