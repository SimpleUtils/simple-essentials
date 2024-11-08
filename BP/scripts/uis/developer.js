import { scriptEngine } from "../functions";
import * as ui from '@minecraft/server-ui'
import * as mc from '@minecraft/server'

function openDev(player) {
    if (!player.hasTag('devmode')) return error("You can not use the Developer UI", player);

    const devForm = new ui.ActionFormData()
        .title("Developer Tools")
        .button("soon");

    devForm.show(player).then(({ selection }) => {
        switch (selection) {
            case 0:
                scriptEngine.runCommandAsync("reload");
                break;
        }
    });
}

export { openDev }