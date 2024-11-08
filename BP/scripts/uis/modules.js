import * as ui from '@minecraft/server-ui'
import * as mc from '@minecraft/server'
import { openMain } from "./uiManager";
import * as config from '../config'
import * as main from '../main'
import * as simple from '../functions'
import uiManager from '../uiManager';




function openModules(player) {
    if (!player.hasTag('admin')) return error("You can not use the Admin UI", player);

    if (config.broadcasting !== true && config.broadcasting !== false) {
        simple.error(`Broadcast value is not configured properly, value = "${config.broadcasting}"`, player)
    }
    if (config.kickMenuEnabled !== true && config.kickMenuEnabled !== false) {
        simple.error(`kick menu value is not configured properly, value = "${config.kickMenuEnabled}"`, player)
    }

    const modulesForm = new ui.ModalFormData()
        .title("Modules")
        .toggle("Chat Ranks", config.chatRankToggle)
        .toggle("Broadcasting", config.broadcasting)
        .toggle("Kick Menu", config.kickMenuEnabled)
        .toggle("Binding", config.bindSystem)
        .toggle("Codes", config.codeSystem)
        .toggle("Warps", config.warpSystem)
        .toggle("UI Builder", config.uiBuilderSystem)
        .toggle("Bans", config.banSystem)
        .submitButton("Submit");

    modulesForm.show(player).then(res => {
        if (res.canceled) uiManager.open(player, "admin.main")

        const [chatRanks, broadcastVal, kickMenuVal, bindVal, codeVal, warpVal, uiBuilderVal, banVal] = res.formValues;

        config.kickMenuUpdate(kickMenuVal)
        config.broadcastUpdate(broadcastVal)
        config.bindUpdate(bindVal)
        config.warpUpdate(warpVal)
        config.codeUpdate(codeVal)
        config.uiBuilderUpdate(uiBuilderVal)
        config.banUpdate(banVal)
        if (chatRanks === true) {
            config.chatRanksOn()
        } else {
            config.chatRanksOff()
        }

    });
}

export { openModules }