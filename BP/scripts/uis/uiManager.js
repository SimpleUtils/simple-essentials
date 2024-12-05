import * as ui from '@minecraft/server-ui';
import * as mc from '@minecraft/server';
import { success, error, scriptEngine, broadcast, commandFeedback } from '../functions.js';
import { runCommand } from '../commandHandler.js';
import { changeCommandPrefix, commandPrefix } from '../main.js'
import { openCredits } from './credits.js';
import { openBroadcast } from './broadcast.js';
import { openDev } from './developer.js';
import { openPrefix } from './prefix.js';
import { openKickMenu } from './kickmenu.js';
import { openMainSettings } from './mainSettings.js';
import './kickmenu.js'
import './credits.js'
import './prefix.js'
import './developer.js'
import './broadcast.js'
import './warps/add.js'
import './warps/remove.js'
import './warps/root.js'
import './uiBuilder/add.js'
import './uiBuilder/addButton.js'
import './uiBuilder/edit.js'
import './uiBuilder/editButton.js'
import './uiBuilder/editButtons.js'
import './uiBuilder/root.js'
import { openAdminTools } from './adminTools.js';
import uiManager from "../uiManager.js";
import { ActionForm, playerAPI, prismarineDb } from "../lib/prismarinedb.js";

uiManager.addUI("admin.main | admin.main", "Admin Main", (player)=>{
    let form = new ActionForm();
    form.title("§f§u§l§l§s§c§r§e§e§n§r§bAdmin UI")
    form.button(`§bMain Settings\n§7Configuration`, "icons/slash.png", (player)=>{
        uiManager.open(player, "admin.mainsettings")
    })
    form.button(`§bAdmin Tools\n§r§7Admin`, "icons/server.png", (player)=>{
        uiManager.open(player, "admin.tools")
    })
    form.button(`§bCredits\n§r§7View credits`, "icons/icon.png", (player)=>{
        openCredits(player)
    })
    form.show(player)
})


function openMain(player) {
    if (!player.hasTag('admin')) return error("You can not use the Admin UI", player);

    const form = new ui.ActionFormData()
        .title("Admin UI")
        .button("§bMain Settings\n§7Configuration", "icons/slash.png")
        .button("§bAdmin Tools\n§7Admin", "icons/server.png")
        .button("§bCredits\n§7People who made the addon", "icons/icon.png")
        .button("§bDev tools\n§8Developer stuff fr");

    form.show(player).then(({ selection }) => {
        switch (selection) {
            case 0:
                openMainSettings(player)
                break;
            case 2:
                openCredits(player)
                break;
            case 3:
                if (!player.hasTag('devmode')) return error("Not in Dev mode! (you can break the addon idiot)", player);
                uiManager.open(player, "admin.main") // Call the openDev function if dev tools are selected
                break;
            case 1:
                openAdminTools(player)
                break;
            case 5:
                openKickMenu(player)
                break;
        }
    });
}

mc.world.afterEvents.itemUse.subscribe((event) => {
    const { source, itemStack } = event;
    switch (itemStack.typeId) {
        case "essentials:admin":
            if (!source.hasTag('admin')) return error("You can't use this item!", source)
            uiManager.open(source, "admin.main")
            break;
        case "simple:redeem":
            uiManager.open(source, "admin.codes.redeem")
            break;
    }
});

export { openKickMenu, openMain, openPrefix}