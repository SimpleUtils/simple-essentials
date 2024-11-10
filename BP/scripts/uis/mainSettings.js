import { error, scriptEngine } from "../functions";
import * as ui from '@minecraft/server-ui'
import * as mc from '@minecraft/server'
import { openPrefix } from "./prefix";
import { openKickMenu } from "./kickmenu";
import { openMain } from "./uiManager";
import { openModules } from "./modules";
import * as config from '../config'
import translation from "../api/translation";
import rankAPI from "../api/rankAPI";

import { ActionForm, prismarineDb } from "../lib/prismarinedb";
import uiManager from "../uiManager";

uiManager.addUI("admin.mainsettings | admin.mainsettings", "Main Settings", (player)=>{
    let form = new ActionForm();
    form.title("§bMain Settings")
    form.button(`§bPrefix\n§7Change command prefix`, "textures/azalea_icons/CustomCommands.png", (player)=>{
        uiManager.open(player, "admin.config.prefix")
    })
    form.button(`§bPlatform settings\n§7Edit platform behaviour`, "textures/azalea_icons/server.png", (player)=>{
        uiManager.open(player, "admin.platform")
    })
    form.button(`§bModules\n§r§7Enable or disable modules`, "textures/azalea_icons/SettingsNewestFirst.png", (player)=>{
        openModules(player)
    })

    form.button(`§bGift Codes\n§r§7Do gift code stuff`, "icons/Chat.png", (player)=>{
        if (!config.codeSystem === true) return error("Code system is disabled!", player)
        uiManager.open(player, "admin.codes.root")
    })
    form.button(`§bUI Builder\n§r§7Make UIs for your server!`, "textures/azalea_icons/GUIMaker/FormsV2.png", (player)=>{
        if (!config.uiBuilderSystem === true) return player.sendMessage(translation.getTranslation(player, 'error', 'UI Builder is not enabled!'))
        uiManager.open(player, "admin.uibuilder.root")
    })
    form.show(player)
})

function openMainSettings(player) {
    const creditsForm = new ui.ActionFormData()
        .title("Main Settings")
        .button("§bPrefix\n§7Change the command prefix", "icons/slash.png")
        .button("§bModules\n§7Enable or disable modules", "icons/server.png")

    creditsForm.show(player).then(({ selection }) => {
        switch (selection) {
            case 0:
                openPrefix(player)
                break;
            case 1:
                openModules(player)
                break;    
        }
    });
}
export { openMainSettings }