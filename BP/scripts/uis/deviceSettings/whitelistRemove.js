import * as config from '../../config'
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";
import platformAPI from '../../api/platformAPI';

uiManager.addUI("admin.platform.whitelist.remove | admin.platform.whitelistRemove", "Whitelist UI", (player)=>{
    let allHomes = platformAPI.getAllDocs();
    let form = new ActionForm();
    form.title("§bWhitelist UI")
    form.button(`§cBack\n§7[ Go Back ]`, null, (player)=>{
        uiManager.open(player, "admin.platform.whitelist")
    })
    for (const home of allHomes) {
        form.button(`§b${home.data.name}\n§7[ Remove ]`, null, (player)=>{
            platformAPI.removeFromWhitelist(home.data.name)
        })
    }
    form.show(player)
})