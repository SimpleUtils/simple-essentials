import { scriptEngine } from "../functions";
import * as ui from '@minecraft/server-ui'
import * as mc from '@minecraft/server'
import { openPrefix } from "./prefix";
import { openKickMenu } from "./kickmenu";
import { openMain } from "./uiManager";
import { openBroadcast } from "./broadcast";
import * as config from '../config'
import * as simple from '../functions'
import { ActionForm, prismarineDb } from "../lib/prismarinedb";
import uiManager from "../uiManager";

uiManager.addUI("admin.tools | admin.tools", "Admin Tools", (player)=>{
    let form = new ActionForm();
    form.title("§bAdmin Tools")
    form.button(`§bBroadcast\n§7Broadcast anything to players`, "icons/Chat.png", (player)=>{
        if (!config.broadcasting === true) return simple.error("Broadcasting is not enabled!", player)
        uiManager.open(player, "admin.tools.broadcast")
    })
    form.button(`§bShop\n§r§7Open the Admin Shop UI`, "textures/azalea_icons/playershop2.png", (player)=>{
        uiManager.open(player, "admin.shop")
    })
    form.button(`§bKick menu\n§r§7Open the kick menu`, "textures/azalea_icons/ReportedPlayer.png", (player)=>{
        if (!config.kickMenuEnabled === true) return simple.error("Kick menu is not enabled!", player)
        uiManager.open(player, "admin.tools.kick")
    })
    form.button(`§bWarp Config\n§r§7Open the warp config`, "icons/WarpEditor.png", (player)=>{
        if (!config.warpSystem === true) return simple.error("Warp system is not enabled!", player)
        uiManager.open(player, "admin.warps")
    })
    form.button(`§bRanks\n§r§7Open the ranks UI`, "textures/azalea_icons/8.png", (player)=>{
        uiManager.open(player, "admin.ranks")
    })
    form.show(player)
})

function openAdminTools(player) {
    const creditsForm = new ui.ActionFormData()
        .title("Admin Tools")
        .button("§bBroadcast\n§7Broadcast anything to players", "icons/Chat.png")
        .button("§bKick Menu\n§7Kick people from the server", "icons/server.png");

    creditsForm.show(player).then(({ selection }) => {
        switch (selection) {
            case 0:
                if (config.broadcasting === true) {
                openBroadcast(player)
                } else {
                    simple.error("Broadcasting is not enabled!", player)
                }
                break;
            case 1:
                if (config.kickMenuEnabled === true) {
                    openKickMenu(player)
                    } else {
                        simple.error("Kick menu is not enabled!", player)
                    }
                break;    
        }
    });
}
export { openAdminTools }