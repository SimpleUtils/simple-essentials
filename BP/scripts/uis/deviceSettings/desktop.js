import { broadcast, error, success } from '../../functions';
import uiManager from '../../uiManager.js';
import { ModalForm } from '../../lib/form_func.js';
import { removeWarpwithUI, setWarpwithUi } from '../../warp.js';
import * as config from '../../config.js';

uiManager.addUI("admin.platform.desktop | admin.platformSettings.desktop", "Desktop platform config", (player)=>{
    let modalForm = new ModalForm();
    modalForm.title("Tag: platform_desktop")
    modalForm.toggle("Banned", config.desktopBanned)
    modalForm.submitButton("Send");
    modalForm.show(player, false, (player, response)=>{

        const [desktopBanned] = response.formValues;

       if (response.canceled) return uiManager.open(player, "admin.platform")
        config.platformban_desktop(desktopBanned)
    })
}) 