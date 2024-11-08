import { broadcast, error, success } from '../../functions';
import uiManager from '../../uiManager.js';
import { ModalForm } from '../../lib/form_func.js';
import { removeWarpwithUI, setWarpwithUi } from '../../warp.js';
import * as config from '../../config.js';

uiManager.addUI("admin.platform.console | admin.platformSettings.console", "Console platform config", (player)=>{
    let modalForm = new ModalForm();
    modalForm.title("Tag: platform_console")
    modalForm.toggle("Banned", config.consoleBanned)
    modalForm.submitButton("Send");
    modalForm.show(player, false, (player, response)=>{

        const [consoleBanned] = response.formValues;

       if (response.canceled) return uiManager.open(player, "admin.platform")
        config.platformban_console(consoleBanned)
    })
}) 