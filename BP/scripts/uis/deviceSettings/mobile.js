import { broadcast, error, success } from '../../functions';
import uiManager from '../../uiManager.js';
import { ModalForm } from '../../lib/form_func.js';
import { removeWarpwithUI, setWarpwithUi } from '../../warp.js';
import * as config from '../../config.js';

uiManager.addUI("admin.platform.mobile | admin.platformSettings.mobile", "Mobile platform config", (player)=>{
    let modalForm = new ModalForm();
    modalForm.title("Tag: platform_mobile")
    modalForm.toggle("Banned", config.mobileBanned)
    modalForm.submitButton("Send");
    modalForm.show(player, false, (player, response)=>{

        const [mobileBanned] = response.formValues;

       if (response.canceled) return uiManager.open(player, "admin.platform")
        config.platformban_mobile(mobileBanned)
    })
}) 